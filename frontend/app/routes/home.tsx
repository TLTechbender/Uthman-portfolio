import HeroSection from "~/components/heroSection";
import type { Route } from "./+types/home";
import ProjectsSection from "~/components/projectsSection";
import ExperienceTimeline from "~/components/experiencesTimeLine";
import BeyondPortfolioSection from "~/components/beyondPortfolioSection";
import TestimoniesSection from "~/components/testimoniesSection";
import BillingSection from "~/components/billingSection";

import { useMotionValueEvent, useScroll } from "framer-motion";

import type {
  HomepageContentData,
  HomepageSeoData,
} from "~/sanity/interfaces/homepage";
import { sanityFetchWrapper } from "~/sanity/sanityCRUDHandlers";
import {
  homepageSeoQuery,
  portfolioPageContentQueryForHomePage,
} from "~/sanity/queries/homePage";
import { fetchHomepageContentData } from "~/hooks/fetchHomepageData";
import { useLoaderData } from "react-router";
import { useRef } from "react";
import type { PortfolioPageContentData } from "~/sanity/interfaces/portfolioPage";

// Loader now fetches both SEO and content data
export async function loader(): Promise<{
  homePageContentData: HomepageContentData;
  seoData: HomepageSeoData;
  portfolioPageContentDataForHomepage: PortfolioPageContentData;
}> {


  try {
    // Fetch both SEO and content data in parallel
    const [homePageContentData, seoData, portfolioPageContentDataForHomepage] =
      await Promise.all([
        fetchHomepageContentData(),
        sanityFetchWrapper<HomepageSeoData>(homepageSeoQuery),
        sanityFetchWrapper<PortfolioPageContentData>(
          portfolioPageContentQueryForHomePage
        ),
      ]);

    return {
      homePageContentData,
      seoData,
      portfolioPageContentDataForHomepage,
    };
  } catch (error) {


    // Fetch the data that we can still get, and provide fallback for SEO only
    const [homePageContentData, portfolioPageContentDataForHomepage] =
      await Promise.all([
        fetchHomepageContentData(),
        sanityFetchWrapper<PortfolioPageContentData>(
          portfolioPageContentQueryForHomePage
        ),
      ]);

    const fallbackSeoData: HomepageSeoData = {
      _id: "",
      _type: "homepage",
      seo: {
        title: "Portfolio - Suarau Uthman Ololoade",
        description: "Welcome to my portfolio!",
      },
    };

    return {
      homePageContentData,
      seoData: fallbackSeoData,
      portfolioPageContentDataForHomepage,
    };
  }
}


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

export default function Home() {
  const { homePageContentData, portfolioPageContentDataForHomepage } =
    useLoaderData<typeof loader>();

  const targetScrollContainer = useRef<HTMLElement | null>(null);

  //Shoutout to the the yt
  const { scrollY } = useScroll({
    target: targetScrollContainer,
    offset: ["start start", "end end"],
  });


  return (
    <main ref={targetScrollContainer} className="flex flex-col">
      <>
        <HeroSection hero={homePageContentData.hero} />
      </>
      <>
        <ProjectsSection content={portfolioPageContentDataForHomepage} />
      </>
      <>
        <ExperienceTimeline experiences={homePageContentData.experiences} />
      </>
      <>
        <BeyondPortfolioSection
          beyondPortfolioData={homePageContentData.beyondPortfolio}
        />
      </>
      <>
        <TestimoniesSection
          testimoninesData={homePageContentData.testimonials}
        />
      </>
      <>
        <BillingSection />
      </>
    </main>
  );
}
