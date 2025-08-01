import AnimatedGradientProjectsSection from "~/components/effects/animatedGradientProjectsSection";
import ProjectCard from "~/components/effects/projectCard";
import { fetchPortfolioPageContentData } from "~/hooks/fetchPortfolioPageData";
import type {
  PortfolioPageContentData,
  PortfolioPageSeoData,
} from "~/sanity/interfaces/portfolioPage";
import { portfolioPageSeoQuery } from "~/sanity/queries/portfolioPage";
import { sanityFetchWrapper } from "~/sanity/sanityCRUDHandlers";
import type { Route } from "./+types/portfolio";
import { useLoaderData } from "react-router";
import { urlFor } from "~/sanity/sanityClient";

export async function loader(): Promise<{
  portfolioPageContentData: PortfolioPageContentData;
  seoData: PortfolioPageSeoData;
}> {
  try {
    // Fetch bo th SEO and content data in parallel
    const [portfolioPageContentData, seoData] = await Promise.all([
      fetchPortfolioPageContentData(),
      sanityFetchWrapper<PortfolioPageSeoData>(portfolioPageSeoQuery),
    ]);

    return { portfolioPageContentData, seoData };
  } catch (error) {
    // Return content data and fallback SEO data
    const portfolioPageContentData = await fetchPortfolioPageContentData();
    const fallbackSeoData: PortfolioPageSeoData = {
      _id: "",
      _type: "portfolioPage",
      seo: {
        title: "Portfolio - Suarau uthman Ololade",
        description: "Welcome to my portfolio Projects!",
      },
    };

    return { portfolioPageContentData, seoData: fallbackSeoData };
  }
}

// Meta function using loader data (synchronous)
export function meta({ data }: Route.MetaArgs) {
  if (!data?.seoData?.seo) {
    // Fallback meta tags if no SEO data
    return [
      { title: "Portfolio" },
      { name: "description", content: "Welcome to my portfolio!" },
      { property: "og:title", content: "Portfolio" },
      { property: "og:description", content: "Welcome to my portfolio!" },
      { name: "twitter:title", content: "Portfolio" },
      { name: "twitter:description", content: "Welcome to my portfolio!" },
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

export default function Portfolio() {
  const { portfolioPageContentData } = useLoaderData<typeof loader>();
  return (
    <div className="w-full relative h-full pt-24 pb-16">
      {/* Background layer - lowest z-index */}
      <AnimatedGradientProjectsSection />

      {/* Content layer - higher z-index with proper positioning */}
      <div className="relative flex flex-col py-16">
        <div className="mb-8">
          <h2 className="text-white text-4xl font-bold mb-4 capitalize text-center">
            My Portfolio
          </h2>
          <h3 className="text-[#FFFFFF99] text-xl text-center capitalize">
            projects and case studies that proves my expertise
          </h3>
        </div>

        <div className="relative">
          {portfolioPageContentData.portfolioProjects.map((project, i) => (
            <ProjectCard
              key={i}
              title={project.projectName}
              //I have alwasy found typing sanity image assets tricky up until this day nigga
              previewImage={urlFor(project.projectImage.asset._id)
                .quality(100)
                .format("webp")
                .url()}
              shortDescription={project.shortDescription}
              buttonLink={project.projectLink.url}
              buttonText={project.projectLink.text}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
