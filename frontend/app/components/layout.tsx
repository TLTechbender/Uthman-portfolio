// layout.tsx
import { Outlet } from "react-router";

import Nav from "./nav";
import { motion } from "framer-motion";
import type { Route } from "./+types/layout";
import type { SiteSettings } from "~/sanity/interfaces/siteSettings";
import { fetchSiteSettings } from "~/hooks/fetchSiteSettings";
import { urlFor } from "~/sanity/sanityClient";
import Footer from "./footer";

export async function loader(): Promise<{ siteSettings: SiteSettings }> {


  const siteSettings = await fetchSiteSettings();

  return { siteSettings };
}

export function meta({ data }: Route.MetaArgs) {
  if (!data) return;

  try {
    const assetId = data.siteSettings.navbar.logo.asset._id;

    const favicon16 = urlFor(assetId).width(16).height(16).format("png").url();
    const favicon32 = urlFor(assetId).width(32).height(32).format("png").url();
    const favicon48 = urlFor(assetId).width(48).height(48).format("png").url();
    const appleTouchIcon = urlFor(assetId)
      .width(180)
      .height(180)
      .format("png")
      .url();

    const faviconMeta = [
      {
        tagName: "link",
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: `${favicon16}`,
      },
      {
        tagName: "link",
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: `${favicon32}`,
      },
      {
        tagName: "link",
        rel: "icon",
        type: "image/png",
        sizes: "48x48",
        href: `${favicon48}`,
      },
      {
        tagName: "link",
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: `${appleTouchIcon}`,
      },

      {
        tagName: "link",
        rel: "shortcut icon",
        href: `${favicon32}`,
      },
    ];

    return [...faviconMeta];
  } catch (error) {
 

    return;
  }
}

const Layout: React.FC<Route.ComponentProps> = ({ loaderData }) => {
  const { siteSettings } = loaderData;

  return (
    <div className="flex flex-col min-h-screen bg-[#04070D] pb-2.5 ">
      <div className="fixed top-0 w-full z-99">
        <Nav navbar={siteSettings.navbar} />
      </div>

      <motion.main
        className="flex-1"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        <Outlet />
      </motion.main>

      <Footer footerData={siteSettings.footer} />
    </div>
  );
};

export default Layout;
