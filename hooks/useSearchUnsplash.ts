import { ApiError } from "lib/error";
import {
  defaultPrefetchOptions,
  defaultQueryOptions,
} from "lib/reactQueryDefaults";
import { rejectMalformedImageMeta } from "lib/rejectMalformedImageMeta";
import { QueryClient, useQuery } from "react-query";
import { ImageMeta, ImageSource } from "types/image-meta";
import {
  UnsplashSearchPhotosParams,
  UnsplashSearchPhotosResponse,
} from "types/unsplash";
import wretch from "wretch";

// https://unsplash.com/documentation#search-photos
export const unsplashApi = wretch().url("https://api.unsplash.com");

export const source: ImageSource = "Unsplash";

interface Options {
  perPage?: number;
}

const getImages = (
  apiKey: string,
  searchValue?: string,
  options: Options = {}
) => async (): Promise<ImageMeta[] | null> => {
  if (!searchValue) {
    return null;
  }

  const { perPage = 25 } = options;

  const params: UnsplashSearchPhotosParams = {
    client_id: apiKey,
    query: encodeURIComponent(searchValue),
    per_page: perPage,
  };
  const searchParams = new URLSearchParams(Object.entries(params));
  const url = `/search/photos?${searchParams}`;
  const response = await unsplashApi.url(url).get().res();

  // TODO(cody): handle rate limiting and errors better...
  if (!response.ok) {
    throw new ApiError(source);
  }

  const data: UnsplashSearchPhotosResponse = await response.json();

  return data.results
    .map((item) => ({
      description: item.description,
      id: item.id,
      imageHeight: item.height,
      imagePageURL: item.links.html,
      imageURL: item.urls.full,
      imageWidth: item.width,
      source,
      thumbnailURL: item.urls.thumb,
      username: item.user.username,
      userURL: item.user.links.html,
    }))
    .filter(rejectMalformedImageMeta);
};

export function useSearchUnsplash(
  apiKey: string,
  searchValue?: string,
  options?: Options
) {
  return useQuery(
    [source, searchValue],
    getImages(apiKey, searchValue, options),
    defaultQueryOptions(searchValue)
  );
}

export function prefetchSearchUnsplash(
  queryClient: QueryClient,
  apiKey: string,
  searchValue?: string,
  options?: Options
) {
  return queryClient.prefetchQuery(
    [source, searchValue],
    getImages(apiKey, searchValue, options),
    defaultPrefetchOptions
  );
}
