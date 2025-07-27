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
  console.log("🔍 Loader running...");

  const siteSettings = await fetchSiteSettings();

  return { siteSettings };
}
export function meta({ data }: Route.MetaArgs) {
  if (!data?.siteSettings?.navbar?.logo?.asset) {
    return [];
  }

  const faviconUrl = urlFor(data.siteSettings.navbar.logo.asset._id)
    .width(48)
    .height(48)
    .format("png")
    .url();

  return [
    {
      tagName: "link",
      rel: "icon",
      type: "image/png",
      sizes: "48x48",
      href: faviconUrl,
    },
    {
      tagName: "link",
      rel: "apple-touch-icon",
      sizes: "48x48",
      href: faviconUrl,
    },
  ];
}

const Layout: React.FC<Route.ComponentProps> = ({ loaderData }) => {
  const { siteSettings } = loaderData;

  return (
    <div className="flex flex-col min-h-screen bg-[#04070D] mb-12">
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
