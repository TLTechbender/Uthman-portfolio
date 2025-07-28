import type { Config } from "@react-router/dev/config";

export default {
  // Enable SSR for proper data fetching
  ssr: true,

  // Enable prerendering for static pages bro, cos I be hitting sanity too many times
  prerender: [
    "/", // homepage
    "/about", // aboutPage
    "/portfolio", // portfolioPage
  ],
} satisfies Config;
