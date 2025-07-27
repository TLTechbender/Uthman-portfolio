import type { HomepageContentData } from "sanity/interfaces/homepage";

import { homepageContentQuery } from "sanity/queries/homePage";

import { sanityFetchWrapper } from "sanity/sanityCRUDHandlers";

export const fetchHomepageContentData = async () => {
  const response =
    await sanityFetchWrapper<HomepageContentData>(homepageContentQuery);
  return response;
};
