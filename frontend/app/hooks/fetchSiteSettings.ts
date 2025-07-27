import type { SiteSettings } from "sanity/interfaces/siteSettings";
import { siteSettingsQuery } from "sanity/queries/sitesettings";
import { sanityFetchWrapper } from "sanity/sanityCRUDHandlers";

export const fetchSiteSettings = async () => {
  const response = await sanityFetchWrapper<SiteSettings>(siteSettingsQuery);
  return response;
};
