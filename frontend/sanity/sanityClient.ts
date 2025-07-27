import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const sanityClient = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID!,
  dataset: import.meta.env.VITE_SANITY_DATASET!,
  useCdn: false,
  apiVersion: "2025-04-01",
});

const builder = imageUrlBuilder(sanityClient);
export const urlFor = (source: string) => builder.image(source);
