import { ApiError } from "lib/error";
import {
  defaultPrefetchOptions,
  defaultQueryOptions,
} from "lib/reactQueryDefaults";
import { rejectMalformedImageMeta } from "lib/rejectMalformedImageMeta";
import { QueryClient, useQuery } from "react-query";
import { ImageMeta, ImageSource } from "types/image-meta";
import {
  PixabaySearchPhotosRequestParams,
  PixabaySearchPhotosResponse,
} from "types/pixabay";
import wretch from "wretch";

// https://pixabay.com/api/docs/#api_search_images
export const pixabayApi = wretch().url("https://pixabay.com");

interface Options {
  perPage?: number;
}

export const source: ImageSource = "Pixabay";

const getImages = (
  apiKey: string,
  searchValue?: string,
  options: Options = {}
) => async (): Promise<ImageMeta[] | null> => {
  if (!searchValue) {
    return null;
  }

  const { perPage = 25 } = options;

  const params: PixabaySearchPhotosRequestParams = {
    key: apiKey,
    q: encodeURIComponent(searchValue),
    per_page: perPage,
  };
  const searchParams = new URLSearchParams(Object.entries(params));
  const url = `/api/?${searchParams}`;
  const response = await pixabayApi.url(url).get().res();

  // TODO(cody): handle rate limiting and errors better...
  if (!response.ok) {
    throw new ApiError(source);
  }

  const data: PixabaySearchPhotosResponse = await response.json();

  return data.hits
    .map((item) => ({
      id: `${item.id}`,
      imageHeight: item.imageHeight,
      imagePageURL: item.pageURL,
      imageURL: item.imageURL,
      imageWidth: item.imageWidth,
      source,
      thumbnailURL: item.previewURL,
      username: item.user,
      userURL: `https://pixabay.com/users/${item.user}-${item.user_id}/`,
    }))
    .filter(rejectMalformedImageMeta);
};

export function useSearchPixabay(
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

export function prefetchSearchPixabay(
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
