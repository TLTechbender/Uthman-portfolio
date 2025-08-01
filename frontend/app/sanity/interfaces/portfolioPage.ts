export interface SanityImageAsset {
  _id: string;
  metadata: {
    dimensions: {
      width: number;
      height: number;
    };
  };
  url: string;
}

interface SanityImageHotspot {
  x: number;
  y: number;
}

interface SanityImageCrop {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

interface SeoOgImage {
  asset: SanityImageAsset;
  alt?: string;
  hotspot?: SanityImageHotspot | null;
  crop?: SanityImageCrop | null;
}

interface Seo {
  title: string;
  description: string;
  ogImage?: SeoOgImage;
  keywords?: string[];
  canonicalUrl?: string;
  twitterHandle?: string;
  linkedInHandle?: string;
  behanceHandle?: string;
  instagramHandle?: string;
}

export interface PortfolioPageSeoData {
  _id: string;
  _type: "portfolioPage";
  seo: Seo;
}

// Extended interface for images with alt text and caption
export interface ProjectImage {
  asset: SanityImageAsset;
  alt: string;
  caption?: string;
}

// Project link interface
export interface ProjectLink {
  text: string;
  url: string;
}

// Individual portfolio project interface
export interface PortfolioProject {
  projectName: string;
  shortDescription: string;
  projectLink: ProjectLink;
  projectImage: ProjectImage;
}

export interface PortfolioPageContentData {
  _id: string;
  _rev: string;

  portfolioProjects: PortfolioProject[];
}
