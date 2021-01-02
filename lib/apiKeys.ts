export interface ApiKeys {
  flickr: string;
  pexels: string;
  pixabay: string;
  unsplash: string;
}

export function getApiKeys(): ApiKeys {
  const {
    FLICKR_API_KEY = "",
    PEXELS_API_KEY = "",
    PIXABAY_API_KEY = "",
    UNSPLASH_API_KEY = "",
  } = process.env;

  return {
    flickr: FLICKR_API_KEY,
    pexels: PEXELS_API_KEY,
    pixabay: PIXABAY_API_KEY,
    unsplash: UNSPLASH_API_KEY,
  };
}
