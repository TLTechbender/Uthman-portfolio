import type { PortfolioPageContentData } from "~/sanity/interfaces/portfolioPage";

import { portfolioPageContentQuery } from "~/sanity/queries/portfolioPage";

import { sanityFetchWrapper } from "~/sanity/sanityCRUDHandlers";

export const fetchPortfolioPageContentData = async () => {
  const response = await sanityFetchWrapper<PortfolioPageContentData>(
    portfolioPageContentQuery
  );
  return response;
};
