import { ApiError } from "lib/error";
import { rejectMalformedImageMeta } from "lib/rejectMalformedImageMeta";
import {
  defaultPrefetchOptions,
  defaultQueryOptions,
} from "lib/reactQueryDefaults";
import { QueryClient, useQuery } from "react-query";
import { ImageMeta, ImageSource } from "types/image-meta";
import {
  PexelsSearchPhotosParams,
  PexelsSearchPhotosResponse,
} from "types/pexels";
import wretch, { Wretcher } from "wretch";

// https://www.pexels.com/api/documentation/#photos-search
export const pexelsApiBase = wretch().url("https://api.pexels.com");

interface Options {
  perPage?: number;
}

export const source: ImageSource = "Pexels";

const getImages = (
  pexelsApi: Wretcher,
  searchValue?: string,
  options: Options = {}
) => async (): Promise<ImageMeta[] | null> => {
  if (!searchValue) {
    return null;
  }

  const { perPage = 25 } = options;

  const params: PexelsSearchPhotosParams = {
    query: encodeURIComponent(searchValue),
    per_page: perPage,
  };
  const searchParams = new URLSearchParams(Object.entries(params));
  const url = `/v1/search?${searchParams}`;
  const response = await pexelsApi.url(url).get().res();

  // TODO(cody): handle rate limiting and errors better...
  if (!response.ok) {
    throw new ApiError(source);
  }

  const data: PexelsSearchPhotosResponse = await response.json();

  return data.photos
    .map((item) => ({
      id: `${item.id}`,
      imageHeight: item.height,
      imagePageURL: item.url,
      imageURL: item.src.original,
      imageWidth: item.width,
      source,
      thumbnailURL: item.src.tiny,
      username: item.photographer,
      userURL: item.photographer_url,
    }))
    .filter(rejectMalformedImageMeta);
};

export function useSearchPexels(
  apiKey: string,
  searchValue?: string,
  options?: Options
) {
  const pexelsApi = pexelsApiBase.auth(apiKey);

  return useQuery(
    [source, searchValue],
    getImages(pexelsApi, searchValue, options),
    defaultQueryOptions(searchValue)
  );
}

export function prefetchSearchPexels(
  queryClient: QueryClient,
  apiKey: string,
  searchValue?: string,
  options?: Options
) {
  const pexelsApi = pexelsApiBase.auth(apiKey);

  return queryClient.prefetchQuery(
    [source, searchValue],
    getImages(pexelsApi, searchValue, options),
    defaultPrefetchOptions
  );
}
