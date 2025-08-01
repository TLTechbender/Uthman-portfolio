
import { motion, type Variants } from "framer-motion";

import NoiseOverlay from "~/components/effects/noiseOverlay";
import AnimatedGradientsHeroSection from "~/components/effects/animatedGradientHeroSection";
import type {
  AboutPageContentData,
  AboutPageSeoData,
} from "~/sanity/interfaces/aboutPage";
import { fetchAboutpageContentData } from "~/hooks/fetchAboutPageData";
import { sanityFetchWrapper } from "~/sanity/sanityCRUDHandlers";
import { aboutPageSeoQuery } from "~/sanity/queries/aboutPage";
import type { Route } from "./+types/about";
import { useLoaderData } from "react-router";
import { PortableText } from "@portabletext/react";
import { urlFor } from "~/sanity/sanityClient";

export async function loader(): Promise<{
  aboutPageContentData: AboutPageContentData;
  seoData: AboutPageSeoData;
}> {
 
  try {
    // Fetch bo th SEO and content data in parallel
    const [aboutPageContentData, seoData] = await Promise.all([
      fetchAboutpageContentData(),
      sanityFetchWrapper<AboutPageSeoData>(aboutPageSeoQuery),
    ]);

    return { aboutPageContentData, seoData };
  } catch (error) {


    // Return content data and fallback SEO data
    const aboutPageContentData = await fetchAboutpageContentData();
    const fallbackSeoData: AboutPageSeoData = {
      _id: "",
      _type: "aboutPage",
      seo: {
        title: "Portfolio - Bolarinwa Paul Ayomide",
        description: "Welcome to my portfolio!",
      },
    };

    return { aboutPageContentData, seoData: fallbackSeoData };
  }
}

export function meta({ data }: Route.MetaArgs) {
  if (!data?.seoData?.seo) {
    // Fallback meta tags if no SEO data
    return [
      { title: "Portfolio" },
      { name: "description", content: "Welcome to my about page!" },
      { property: "og:title", content: "Portfolio" },
      { property: "og:description", content: "Welcome to my about page!" },
      { name: "twitter:title", content: "Portfolio" },
      { name: "twitter:description", content: "Welcome to my about page!" },
    ];
  }

  const { seo } = data.seoData;

  const metaTags = [
    // Basic meta tags (required)
    { title: seo.title },
    { name: "description", content: seo.description },

    // Keywords (if provided)
    ...(seo.keywords && seo.keywords.length > 0
      ? [{ name: "keywords", content: seo.keywords.join(", ") }]
      : []),

    // Canonical URL
    ...(seo.canonicalUrl
      ? [{ tagName: "link", rel: "canonical", href: seo.canonicalUrl }]
      : []),

    // Open Graph meta tags
    { property: "og:title", content: seo.title },
    { property: "og:description", content: seo.description },
    { property: "og:type", content: "website" },
    ...(seo.canonicalUrl
      ? [{ property: "og:url", content: seo.canonicalUrl }]
      : []),

    // Open Graph image (if provided)
    ...(seo.ogImage?.asset?.url
      ? [
          { property: "og:image", content: seo.ogImage.asset.url },
          {
            property: "og:image:width",
            content: seo.ogImage.asset.metadata.dimensions.width.toString(),
          },
          {
            property: "og:image:height",
            content: seo.ogImage.asset.metadata.dimensions.height.toString(),
          },
          ...(seo.ogImage.alt
            ? [{ property: "og:image:alt", content: seo.ogImage.alt }]
            : []),
        ]
      : []),

    // Twitter Card meta tags
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: seo.title },
    { name: "twitter:description", content: seo.description },
    ...(seo.twitterHandle
      ? [{ name: "twitter:creator", content: `@${seo.twitterHandle}` }]
      : []),
    ...(seo.ogImage?.asset?.url
      ? [{ name: "twitter:image", content: seo.ogImage.asset.url }]
      : []),

    // Social media profile links (if provided)
    ...(seo.linkedInHandle
      ? [{ name: "linkedin:creator", content: seo.linkedInHandle }]
      : []),
    ...(seo.behanceHandle
      ? [{ name: "behance:creator", content: seo.behanceHandle }]
      : []),
    ...(seo.instagramHandle
      ? [{ name: "instagram:creator", content: `@${seo.instagramHandle}` }]
      : []),

    // Additional meta tags for better SEO
    ...(seo.twitterHandle
      ? [{ name: "author", content: "Bolarinwa Paul Ayomide" }]
      : []),
    { name: "robots", content: "index, follow" },
    { name: "language", content: "English" },
    { property: "og:locale", content: "en_US" },
  ];

  return metaTags;
}

const portableTextComponents = {
  block: {
    h1: ({ children }: any) => (
      <h1 className="font-semibold text-white/80 text-2xl lg:text-3xl leading-relaxed mb-3 ">
        {children}
      </h1>
    ),
    h2: ({ children }: any) => (
      <h2 className=" font-semibold text-white/80  text-xl lg:text-2xl leading-relaxed mb-2 ">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="mb-2  text-white/80  text-lg lg:text-xl leading-relaxed">
        {children}
      </h3>
    ),
    normal: ({ children }: any) => (
      <p className=" text-white/80 mb-2 text-lg leading-relaxed">{children}</p>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-2 border-cyan-400/50 pl-4 my-3 text-base text-gray-300 italic">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }: any) => (
      <strong className="font-semibold text-cyan-300">{children}</strong>
    ),
    em: ({ children }: any) => (
      <em className="italic text-cyan-200">{children}</em>
    ),
    code: ({ children }: any) => (
      <code className="bg-gray-800/50 px-1.5 py-0.5 rounded text-xs font-mono text-cyan-300 border border-cyan-400/20">
        {children}
      </code>
    ),
    link: ({ children, value }: any) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-white hover:text-cyan-300 transition-colors underline decoration-cyan-400/50 hover:decoration-cyan-300"
      >
        {children}
      </a>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-none space-y-1 mb-3 ml-4">{children}</ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-none space-y-1 mb-3 ml-4">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }: any) => (
      <li className="text-sm text-gray-300 flex items-start">
        <span className="text-white mr-2 mt-0.5 text-xs">•</span>
        <span>{children}</span>
      </li>
    ),
    number: ({ children, index }: any) => (
      <li className="text-sm text-gray-300 flex items-start">
        <span className="text-white mr-2 mt-0.5 text-xs font-mono">
          {(index || 0) + 1}.
        </span>
        <span>{children}</span>
      </li>
    ),
  },
  types: {
    code: ({ value }: any) => (
      <pre className="bg-gray-800/50 border border-cyan-400/20 rounded-lg p-3 mb-3 overflow-x-auto">
        <code className="text-xs font-mono text-cyan-300">{value?.code}</code>
      </pre>
    ),
  },
};

export default function About() {
  const { aboutPageContentData } = useLoaderData<typeof loader>();

  const initialFadeInUp: Variants = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  const initialFadeInScale: Variants = {
    hidden: {
      opacity: 0,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: [0.34, 1.56, 0.64, 1], delay: 0.2 },
    },
  };

  const buttonHover: Variants = {
    rest: { scale: 1 },
    hover: {
      scale: 1.05,
      transition: { duration: 0.2, ease: "easeOut" },
    },
    tap: { scale: 0.98 },
  };

  const initialStaggerContainer: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  return (
    <div className="relative w-full ">
      {/* Background effects */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <NoiseOverlay />
        <AnimatedGradientsHeroSection />
      </motion.div>

      <div className="relative  pt-24 pb-16 ">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          {/* Hero Section - About Us Takes Center Stage */}
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[80vh]"
            variants={initialStaggerContainer}
            initial="hidden"
            animate="visible"
          >
            {/* Main About Us Content - Hero */}
            <div className="lg:col-span-7 order-1 lg:order-1">
              <motion.div className="max-w-2xl" variants={initialFadeInUp}>
                <div className="mb-6">
                  <motion.p
                    className="text-teal-400 font-medium text-sm tracking-[0.3em] mb-4 uppercase"
                    variants={initialFadeInUp}
                  >
                    Welcome to Our World
                  </motion.p>
                  <motion.h1
                    className="text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-8 leading-tight"
                    variants={initialFadeInUp}
                  >
                    {aboutPageContentData.pageHeading}
                  </motion.h1>
                </div>

                <motion.div
                  className="space-y-6 mb-8"
                  variants={initialFadeInUp}
                >
                  <PortableText
                    value={aboutPageContentData.subHeading}
                    components={portableTextComponents}
                  />
                </motion.div>

                {/* Stats Integration */}
                <motion.div
                  className="flex items-center gap-8 mb-8"
                  variants={initialFadeInUp}
                >
                  <div className="text-center">
                    <motion.div
                      className="text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400 mb-1"
                      animate={{
                        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                      style={{ backgroundSize: "200% 200%" }}
                    >
                      {aboutPageContentData.projectsCount}+
                    </motion.div>
                    <div className="text-white/60 text-sm uppercase tracking-wider">
                      Projects
                    </div>
                  </div>
                  <div className="w-px h-12 bg-white/20"></div>
                  <div className="text-center">
                    <motion.div
                      className="text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400 mb-1"
                      animate={{
                        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                      }}
                      transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                      style={{ backgroundSize: "200% 200%" }}
                    >
                      {aboutPageContentData.clientsCount}
                    </motion.div>
                    <div className="text-white/60 text-sm uppercase tracking-wider">
                      Happy clients
                    </div>
                  </div>
                </motion.div>

                {/* Single Call-to-Action Button */}
                <motion.div
                  className="flex flex-col gap-2"
                  variants={initialFadeInUp}
                >
                  <motion.p className="text-white/60 text-sm mb-2">
                    Wanna talk about that project?
                  </motion.p>
                  <motion.a
                    style={{
                      boxShadow: "2px 2px 0px 0px #032A22",
                    }}
                    className="relative cursor-pointer bg-[#0FB492] hover:bg-teal-500 px-8 py-4 rounded-xl text-black hover:text-white text-base font-semibold transition-all duration-300 shadow-lg hover:shadow-teal-500/25 focus:outline-none focus:ring-2 focus:ring-teal-500 w-fit"
                    variants={buttonHover}
                    initial="rest"
                    whileHover="hover"
                    whileTap="tap"
                    href={aboutPageContentData.contactLink.url}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "0%" }}
                      transition={{ duration: 0.3 }}
                    />
                    <span className="relative z-10">
                      {aboutPageContentData.contactLink.text}
                    </span>
                    <motion.div
                      className="absolute inset-0 bg-white/20"
                      initial={{ scale: 0, opacity: 0 }}
                      whileHover={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      style={{ borderRadius: "50%" }}
                    />
                  </motion.a>
                </motion.div>
              </motion.div>
            </div>

            {/* Supporting Images - Simplified */}
            <div className="lg:col-span-5 order-2 lg:order-2">
              <motion.div
                className="grid grid-cols-2 gap-4 lg:gap-6 h-[600px]"
                variants={initialFadeInScale}
              >
                {/* Large accent image */}
                <div className="col-span-2 row-span-2 overflow-hidden rounded-2xl">
                  <img
                    src={urlFor(
                      aboutPageContentData.galleryImages[0].image.asset._id
                    )
                      .format("webp")
                      .quality(80)
                      .url()}
                    alt="Designer showcase"
                    className="h-full w-full hover:cursor-none hover:scale-105 hover:grayscale-0 grayscale-100 object-cover transition-all duration-500"
                  />
                </div>

                {/* Supporting image 1 */}
                <div className="overflow-hidden rounded-xl">
                  <img
                    src={urlFor(
                      aboutPageContentData.galleryImages[1].image.asset._id
                    )
                      .format("webp")
                      .quality(80)
                      .url()}
                    alt="Designer portrait"
                    className="h-full w-full hover:cursor-none hover:scale-105 hover:grayscale-0 grayscale-100 transition-all duration-500 object-cover"
                  />
                </div>

                {/* Supporting image 2 */}
                <div className="overflow-hidden rounded-xl">
                  <img
                    src={urlFor(
                      aboutPageContentData.galleryImages[2].image.asset._id
                    )
                      .format("webp")
                      .quality(80)
                      .url()}
                    alt="Designer workspace"
                    className="h-full w-full object-cover hover:cursor-none hover:scale-105 hover:grayscale-0 transition-all duration-500 grayscale-100"
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>

          {aboutPageContentData.bottomQuote && (
            <motion.div
              className="mt-16 mb-8"
              variants={initialFadeInUp}
              initial="hidden"
              animate="visible"
            >
              <div className="max-w-4xl mx-auto text-center">
                <motion.blockquote
                  className="text-2xl lg:text-3xl text-white/80 italic font-light leading-relaxed"
                  variants={initialFadeInUp}
                >
                  "{aboutPageContentData.bottomQuote}"
                </motion.blockquote>
                <motion.div
                  className="w-24 h-1 bg-gradient-to-r from-teal-400 to-emerald-400 mx-auto mt-8"
                  variants={initialFadeInScale}
                />
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
