// TypeScript interfaces for Site Settings

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
  metadata: any;
  url: string;
}

interface NavbarLogo {
  asset: SanityImageAsset;
  alt: string;
  hotspot?: SanityImageHotspot | null;
  crop?: SanityImageCrop | null;
}

export interface Navbar {
  logo: NavbarLogo;
  contact: string;
}

export type SocialPlatform =
  | "twitter"
  | "instagram"
  | "behance"
  | "dribbble"
  | "linkedin"
  | "github"
  | "youtube"
  | "tiktok"
  | "facebook"
  | "discord"
  | "twitch"
  | "pinterest";

export interface SocialLink {
  platform: SocialPlatform;
  url: string;
  isEnabled: boolean;
}

export interface FooterData {
  socialLinks: SocialLink[];
  email: string;
}

export interface SiteSettings {
  _id: string;
  _type: "siteSettings";
  navbar: Navbar;
  footer: FooterData;
}
