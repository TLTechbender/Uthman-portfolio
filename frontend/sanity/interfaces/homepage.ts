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

export interface HomepageSeoData {
  _id: string;
  _type: "homepage";
  seo: Seo;
}






// TypeScript interfaces for Homepage Content
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

interface SanityImage {
  asset: SanityImageAsset;
  alt: string;
  hotspot?: SanityImageHotspot | null;
  crop?: SanityImageCrop | null;
}

interface SanityImageOptionalAlt {
  asset: SanityImageAsset;
  alt?: string;
  hotspot?: SanityImageHotspot | null;
  crop?: SanityImageCrop | null;
}

// Hero Section Types
interface HireLink {
  text: string;
  url: string;
}

interface CvLink {
  text: string;
  externalUrl: string;
}

export interface Hero {
  centerPieceImage: SanityImage;
  beforeTypewriterText: string;
  typewriterWords: string[];
  remainingText: string;
  subHeading?: string;
  hireLink?: HireLink;
  cvLink?: CvLink;
}

// Experience Types
export interface Experience {
  jobTitle: string;
  duration: string;
  description: string;
    order?: number;
    organisationLogo: SanityImage;
}

// Beyond Portfolio Types
interface CurrentBook {
  description: string;
  bookImage: SanityImage;
  popupContent: any[]; // Sanity block content
}

interface TechTool {
  logo: SanityImageOptionalAlt;
  alt: string;
  name: string;
}

interface TechStack {
  heading?: string;
  tools?: TechTool[];
  popupContent?: any[]; // Sanity block content
}

interface CollaboratorAvatar {
  avatar: SanityImage;
  alt: string;
  name?: string;
}

interface Collaborators {
  heading?: string;
  avatars?: CollaboratorAvatar[];
  popupContent?: any[]; // Sanity block content
}

interface Persona {
  heading?: string;
  personaItems?: string[];
  popupContent?: any[]; // Sanity block content
}

interface RecentWork {
  heading?: string;
  workImage: SanityImage;
  popupContent?: any[]; // Sanity block content
}

export interface BeyondPortfolio {
  currentBook: CurrentBook;
  techStack?: TechStack;
  collaborators?: Collaborators;
  persona?: Persona;
  recentWork?: RecentWork;
}

// Testimonial Types
export interface Testimonial {
  name: string;
  avatar?: SanityImage;
  position: string;
  testimony: string;
  rating: number;
  order?: number;
}

// Main Homepage Content Interface
export interface HomepageContentData {
  _id: string;
  _type: "homepage";
  hero: Hero;
  experiences: Experience[];
  beyondPortfolio: BeyondPortfolio;
  testimonials?: Testimonial[];
}