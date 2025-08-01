import { sanityClient } from "./sanityClient";


export interface ClientError extends Error {
  status?: number;
  data?: any;
}

export async function sanityFetchWrapper<T = any>(
  query: string,
  params: Record<string, any> = {}
): Promise<T> {
  try {
    
    const result = await sanityClient.fetch(query, params);
    return result;
  } catch (error) {

    const sanityError: ClientError = new Error(
      error instanceof Error ? error.message : "Sanity query failed"
    );
    sanityError.name = "SanityError";
    sanityError.status = 500;
    sanityError.data = error;

    throw sanityError;
  }
}
