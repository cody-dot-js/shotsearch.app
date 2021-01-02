export interface UnsplashSearchPhotosItem {
  id: string;
  created_at: string;
  width: number;
  height: number;
  color: string;
  blur_hash: string;
  likes: number;
  liked_by_user: boolean;
  description: string;
  user: {
    id: string;
    username: string;
    name: string;
    first_name: string;
    last_name: string;
    instagram_username: string;
    twitter_username: string;
    portfolio_url: string;
    profile_image: {
      small: string;
      medium: string;
      large: string;
    };
    links: {
      self: string;
      html: string;
      photos: string;
      likes: string;
    };
  };
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
  };
  links: {
    self: string;
    html: string;
    download: string;
  };
}

export interface UnsplashSearchPhotosResponse {
  total: number;
  total_pages: number;
  results: UnsplashSearchPhotosItem[];
}

export interface UnsplashSearchPhotosParams {
  /**
   * Your API access key
   */
  client_id: string;
  /**
   * Search terms.
   */
  query: string;
  /**
   * Page number to retrieve. (Optional; default: 1)
   */
  page?: number;
  /**
   * Number of items per page. (Optional; default: 10)
   */
  per_page?: number;
  /**
   * How to sort the photos. (Optional; default: relevant). Valid values are latest and relevant.
   */
  order_by?: "latest" | "relevant";
  /**
   * Collection ID(‘s) to narrow search. Optional. If multiple, comma-separated.
   */
  collections?: number | string;
  /**
   * Limit results by content safety. (Optional; default: low). Valid values are low and high.
   */
  content_filter?: "low" | "high";
  /**
   * Filter results by color. Optional. Valid values are: black_and_white, black, white, yellow, orange, red, purple, magenta, green, teal, and blue.
   */
  color?:
    | "black_and_white"
    | "black"
    | "white"
    | "yellow"
    | "orange"
    | "red"
    | "purple"
    | "magenta"
    | "green"
    | "teal"
    | "blue";
  /**
   * Filter by photo orientation. Optional. (Valid values: landscape, portrait, squarish)
   */
  orientation?: "landscape" | "portrait" | "squarish";
}
