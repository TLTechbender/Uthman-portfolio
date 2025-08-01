export const portfolioPageSeoQuery = `*[_type == "portfolioPage"][0]{
  _id,
  _type,
  seo{
    title,
    description,
    ogImage{
      asset->{
        _id,
        url,
        metadata{
          dimensions{
            width,
            height
          }
        }
      },
      alt,
      hotspot,
      crop
    },
    keywords,
    canonicalUrl,
    twitterHandle,
    linkedInHandle,
    behanceHandle,
    instagramHandle
  }
}`;

export const portfolioPageContentQuery = `*[_type == "portfolioPage"][0] {
  _id,
  _rev,
  
  
   
  portfolioProjects[] {
    projectName,
    shortDescription,
    projectLink {
      text,
      url
    },
    projectImage {
    asset->{
      _id,
      url,
      metadata {
        dimensions {
          width,
          height
        }
      },
      alt,
      caption
    }
}
  }
}`;
