import { ApiError } from "lib/error";
import { rejectMalformedImageMeta } from "lib/rejectMalformedImageMeta";
import {
  defaultPrefetchOptions,
  defaultQueryOptions,
} from "lib/reactQueryDefaults";
import { QueryClient, useQuery } from "react-query";
import {
  FlickrPhotosSearchParams,
  FlickrPhotosSearchResponse,
} from "types/flickr";
import { ImageMeta, ImageSource } from "types/image-meta";
import wretch from "wretch";

// https://www.flickr.com/services/api/flickr.photos.search.html
export const flickerApi = wretch().url("https://www.flickr.com");

interface Options {
  perPage?: number;
}

export const source: ImageSource = "Flickr";

const getImages = (
  apiKey: string,
  searchValue?: string,
  options: Options = {}
) => async (): Promise<ImageMeta[] | null> => {
  if (!searchValue) {
    return null;
  }

  const { perPage = 25 } = options;

  const params: FlickrPhotosSearchParams = {
    api_key: apiKey,
    format: "json",
    media: "photos",
    method: "flickr.photos.search",
    per_page: perPage,
    text: encodeURIComponent(searchValue),
    extras: [
      "description",
      "owner_name",
      "icon_server",
      "o_dims",
      "url_b",
      "url_q",
      "url_c",
      "url_l",
      "url_o",
    ].join(", "),
  };
  const searchParams = new URLSearchParams(Object.entries(params));
  const url = `/services/rest/?${searchParams}`;
  const response = await flickerApi.url(url).get().res();

  // TODO(cody): handle rate limiting and errors better...
  if (!response.ok) {
    throw new ApiError(source);
  }

  const data = parseFlickerJson(await response.text());

  return data.photos.photo
    .map((item) => ({
      id: `${item.id}`,
      imageHeight: item.height_o || item.height_c,
      imagePageURL: item.url_o || item.url_c,
      imageURL: item.url_o || item.url_c,
      imageWidth: item.width_o || item.width_c,
      source,
      thumbnailURL: item.url_q,
      username: item.ownername,
      userURL: `https://www.flickr.com/photos/${item.ownername}/`,
    }))
    .filter(rejectMalformedImageMeta);
};

function parseFlickerJson(text: string): FlickrPhotosSearchResponse {
  const json = text.substring("jsonFlickrApi(".length, text.length - 1);
  return JSON.parse(json);
}

export function useSearchFlickr(
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

export function prefetchSearchFlickr(
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
