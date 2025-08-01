// TypeScript interfaces for the about page data structure

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

interface SanityImageAsset {
  _id: string;
  metadata: {
    dimensions: {
      width: number;
      height: number;
    };
  };
  url: string;
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

export interface AboutPageSeoData {
  _id: string;
  _type: "aboutPage";
  seo: Seo;
}

export interface AboutPageContentData {
  pageHeading: string;
  subHeading: PortableTextBlock[];
  projectsCount: number;
  clientsCount: number;
  contactLink: ContactLink;
  galleryImages: GalleryImage[];
  bottomQuote: string;
}

export interface ContactLink {
  text: string;
  url: string;
  description?: string;
}
export interface GalleryImage {
  image: {
    asset: SanityImageAsset;
  };
  alt: string;
  caption?: string;
  priority: "high" | "normal" | "low";
}

// Portable Text types for rich text content
export interface PortableTextBlock {
  _type: "block";
  _key: string;
  style: "normal" | "h1" | "h2" | "h3" | "h4" | "blockquote";
  children: PortableTextSpan[];
  markDefs?: PortableTextMarkDef[];
  listItem?: "bullet" | "number";
  level?: number;
}

export interface PortableTextSpan {
  _type: "span";
  _key: string;
  text: string;
  marks: string[];
}

export interface PortableTextMarkDef {
  _type: string;
  _key: string;
  [key: string]: any;
}

// Image block type for images within portable text
export interface PortableTextImage {
  _type: "image";
  _key: string;
  asset: {
    _ref: string;
    _type: "reference";
  };
  alt: string;
  caption?: string;
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
}
