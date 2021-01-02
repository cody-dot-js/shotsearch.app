export interface PexelsPhotosItem {
  /**
   * The id of the photo.
   */
  id: number;
  /**
   * The real width of the photo in pixels.
   */
  width: number;
  /**
   * The real height of the photo in pixels.
   */
  height: number;
  /**
   * The Pexels URL where the photo is located.
   */
  url: string;
  /**
   * The name of the photographer who took the photo.
   */
  photographer: string;
  /**
   * The URL of the photographer"s Pexels profile.
   */
  photographer_url: string;
  /**
   * The id of the photographer.
   */
  photographer_id: number;
  /**
   * The average color of the photo. Useful for a placeholder while the image loads.
   */
  avg_color: string;
  /**
   * An assortment of different image sizes that can be used to display this Photo.
   */
  src: {
    /**
     * The image without any size changes. It will be the same as the width and height attributes.
     */
    original: string;
    /**
     * The image resized to W 940px X H 650px DPR 1.
     */
    large: string;
    /**
     * The image resized W 940px X H 650px DPR 2.
     */
    large2x: string;
    /**
     * The image scaled proportionally so that it"s new height is 350px.
     */
    medium: string;
    /**
     * The image scaled proportionally so that it"s new height is 130px.
     */
    small: string;
    /**
     * The image cropped to W 800px X H 1200px.
     */
    portrait: string;
    /**
     * The image cropped to W 1200px X H 627px.
     */
    landscape: string;
    /**
     * The image cropped to W 280px X H 200px.
     */
    tiny: string;
  };
  liked: boolean;
}

export interface PexelsSearchPhotosResponse {
  /**
   * The total number of hits for the query.
   */
  total_results: number;
  /**
   * The current page number.
   */
  page: number;
  /**
   * The number of photos returned with each page.
   */
  per_page: number;
  /**
   * An array of Photo objects.
   */
  photos: PexelsPhotosItem[];
  /**
   * The URL to retrieve the next page of the search results.
   */
  next_page: string;
}

export interface PexelsSearchPhotosParams {
  /**
   * The search query. Ocean, Tigers, Pears, etc.
   */
  query: string;
  /**
   * Desired photo orientation. The current supported orientations are: landscape, portrait or square.
   */
  orientation?: "landscape" | "portrait" | "square";
  /**
   * Minimum photo size. The current supported sizes are: large(24MP), medium(12MP) or small(4MP).
   */
  size?: "large" | "medium" | "small";
  /**
   * Desired photo color. Supported colors: red, orange, yellow, green, turquoise, blue, violet, pink, brown, black, gray, white or any hexidecimal color code (eg. #ffffff).
   */
  color?: string;
  /**
   * The locale of the search you are performing. The current supported locales are: 'en-US' 'pt-BR' 'es-ES' 'ca-ES' 'de-DE' 'it-IT' 'fr-FR' 'sv-SE' 'id-ID' 'pl-PL' 'ja-JP' 'zh-TW' 'zh-CN' 'ko-KR' 'th-TH' 'nl-NL' 'hu-HU' 'vi-VN' 'cs-CZ' 'da-DK' 'fi-FI' 'uk-UA' 'el-GR' 'ro-RO' 'nb-NO' 'sk-SK' 'tr-TR' 'ru-RU'.
   */
  locale?:
    | "en-US"
    | "pt-BR"
    | "es-ES"
    | "ca-ES"
    | "de-DE"
    | "it-IT"
    | "fr-FR"
    | "sv-SE"
    | "id-ID"
    | "pl-PL"
    | "ja-JP"
    | "zh-TW"
    | "zh-CN"
    | "ko-KR"
    | "th-TH"
    | "nl-NL"
    | "hu-HU"
    | "vi-VN"
    | "cs-CZ"
    | "da-DK"
    | "fi-FI"
    | "uk-UA"
    | "el-GR"
    | "ro-RO"
    | "nb-NO"
    | "sk-SK"
    | "tr-TR"
    | "ru-RU";
  /**
   * The number of results you are requesting per page. Default: 15 Max: 80
   */
  per_page?: number;
  /**
   * The number of the page you are requesting. Default: 1
   */
  page?: number;
}
