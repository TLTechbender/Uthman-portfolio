import type { AboutPageContentData } from "~/sanity/interfaces/aboutPage";
import { aboutPageQuery } from "~/sanity/queries/aboutPage";



import { sanityFetchWrapper } from "~/sanity/sanityCRUDHandlers";

export const fetchAboutpageContentData = async () => {
  const response =
    await sanityFetchWrapper<AboutPageContentData>(aboutPageQuery);
  return response;
};
