export interface PixabayHitItem {
  /**
   * A unique identifier for this image.
   */
  id: number;
  /**
   * Source page on Pixabay, which provides a download link for the original image of the dimension imageWidth x imageHeight and the file size imageSize.
   */
  pageURL: string;
  type: "photo";
  tags: string;
  /**
   * Low resolution images with a maximum width or height of 150 px (previewWidth x previewHeight).
   */
  previewURL: string;
  previewWidth: number;
  previewHeight: number;
  /**
   * Medium sized image with a maximum width or height of 640 px (webformatWidth x webformatHeight). URL valid for 24 hours.
   * Replace '_640' in any webformatURL value to access other image sizes:
   * Replace with '_180' or '_340' to get a 180 or 340 px tall version of the image, respectively. Replace with '_960' to get the image in a maximum dimension of 960 x 720 px.
   */
  webformatURL: string;
  webformatWidth: number;
  webformatHeight: number;
  /**
   * Scaled image with a maximum width/height of 1280px.
   */
  largeImageURL: string;
  /**
   * Full HD scaled image with a maximum width/height of 1920px.
   */
  fullHDURL: string;
  /**
   * URL to the original image (imageWidth x imageHeight).
   */
  imageURL: string;
  imageWidth: number;
  imageHeight: number;
  imageSize: number;
  /**
   * URL to a vector resource if available, else omitted.
   */
  vectorURL?: string;
  /**
   * Total number of views.
   */
  views: number;
  /**
   * Total number of downloads.
   */
  downloads: number;
  /**
   * Total number of favorites.
   */
  favorites: number;
  /**
   * Total number of likes.
   */
  likes: number;
  /**
   * Total number of comments.
   */
  comments: number;
  /**
   * User ID of the contributor. Profile URL: https://pixabay.com/users/{ USERNAME }-{ ID }/
   */
  user_id: number;
  /**
   * User name of the contributor. Profile URL: https://pixabay.com/users/{ USERNAME }-{ ID }/
   */
  user: string;
  /**
   * Profile picture URL (250 x 250 px).
   */
  userImageURL: string;
}

export interface PixabaySearchPhotosResponse {
  /**
   * The total number of hits.
   */
  total: number;
  /**
   * The number of images accessible through the API. By default, the API is limited to return a maximum of 500 images per query.
   */
  totalHits: number;
  hits: PixabayHitItem[];
}

export interface PixabaySearchPhotosRequestParams {
  /**
   * Your API key
   */
  key: string;
  /**
   * A URL encoded search term. If omitted, all images are returned. This value may not exceed 100 characters.
   * Example: "yellow+flower"
   */
  q: string;
  /**
   * Language code of the language to be searched in.
   * Accepted values: cs, da, de, en, es, fr, id, it, hu, nl, no, pl, pt, ro, sk, fi, sv, tr, vi, th, bg, ru, el, ja, ko, zh
   * Default: "en"
   */
  lang?:
    | "cs"
    | "da"
    | "de"
    | "en"
    | "es"
    | "fr"
    | "id"
    | "it"
    | "hu"
    | "nl"
    | "no"
    | "pl"
    | "pt"
    | "ro"
    | "sk"
    | "fi"
    | "sv"
    | "tr"
    | "vi"
    | "th"
    | "bg"
    | "ru"
    | "el"
    | "ja"
    | "ko"
    | "zh";
  /**
   * Retrieve individual images by ID.
   */
  id?: string;
  /**
   * Filter results by image type.
   * Accepted values: "all", "photo", "illustration", "vector"
   * Default: "all"
   */
  image_type?: "all" | "photo" | "illustration" | "vector";
  /**
   * 	Whether an image is wider than it is tall, or taller than it is wide.
   * Accepted values: "all", "horizontal", "vertical"
   * Default: "all"
   */
  orientation?: "all" | "horizontal" | "vertical";
  /**
   * Filter results by category.
   * Accepted values: backgrounds, fashion, nature, science, education, feelings, health, people, religion, places, animals, industry, computer, food, sports, transportation, travel, buildings, business, music
   */
  category?:
    | "backgrounds"
    | "fashion"
    | "nature"
    | "science"
    | "education"
    | "feelings"
    | "health"
    | "people"
    | "religion"
    | "places"
    | "animals"
    | "industry"
    | "computer"
    | "food"
    | "sports"
    | "transportation"
    | "travel"
    | "buildings"
    | "business"
    | "music";
  /**
   * Minimum image width.
   * Default: "0"
   */
  min_width?: number;
  /**
   * Minimum image height.
   * Default: "0"
   */
  min_height?: number;
  /**
   * Filter images by color properties. A comma separated list of values may be used to select multiple properties.
   * Accepted values: "grayscale", "transparent", "red", "orange", "yellow", "green", "turquoise", "blue", "lilac", "pink", "white", "gray", "black", "brown"
   */
  colors?:
    | "grayscale"
    | "transparent"
    | "red"
    | "orange"
    | "yellow"
    | "green"
    | "turquoise"
    | "blue"
    | "lilac"
    | "pink"
    | "white"
    | "gray"
    | "black"
    | "brown";
  /**
   * Select images that have received an Editor's Choice award.
   * Accepted values: "true", "false"
   * Default: "false"
   */
  editors_choice?: boolean;
  /**
   * 	A flag indicating that only images suitable for all ages should be returned.
   * Accepted values: "true", "false"
   * Default: "false"
   */
  safesearch?: boolean;
  /**
   * 	How the results should be ordered.
   * Accepted values: "popular", "latest"
   * Default: "popular"
   */
  order?: "popular" | "latest";
  /**
   * Returned search results are paginated. Use this parameter to select the page number.
   * Default: 1
   */
  page?: number;
  /**
   * Determine the number of results per page.
   * Accepted values: 3 - 200
   * Default: 20
   */
  per_page?: number;
  /**
   * JSONP callback function name
   */
  callback?: string;
  /**
   * Indent JSON output. This option should not be used in production.
   * Accepted values: "true", "false"
   * Default: "false"
   */
  pretty?: boolean;
}
