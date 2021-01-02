export enum FlickrLicense {
  "All Rights Reserved" = 0,
  "Attribution-NonCommercial-ShareAlike License" = 1,
  "Attribution-NonCommercial License" = 2,
  "Attribution-NonCommercial-NoDerivs License" = 3,
  "Attribution License" = 4,
  "Attribution-ShareAlike License" = 5,
  "Attribution-NoDerivs License" = 6,
  "No known copyright restrictions" = 7,
  "United States Government Work" = 8,
  "Public Domain Dedication (CC0)" = 9,
  "Public Domain Mark" = 10,
}

export interface FlickrPhotosSearchParams {
  /**
   * Return a list of photos matching some criteria. Only photos visible to the calling user will be returned. To return private or semi-private photos, the caller must be authenticated with 'read' permissions, and have permission to view the photos. Unauthenticated calls will only return public photos.
   */
  method: "flickr.photos.search";
  /**
   * Your API application key
   */
  api_key: string;
  /**
   * The NSID of the user who's photo to search. If this parameter isn't passed then everybody's public photos will be searched. A value of "me" will search against the calling user's photos for authenticated calls.
   */
  user_id?: string;
  /**
   * A comma-delimited list of tags. Photos with one or more of the tags listed will be returned. You can exclude results that match a term by prepending it with a - character.
   */
  tags?: string;
  /**
   * Either 'any' for an OR combination of tags, or 'all' for an AND combination. Defaults to 'any' if not specified.
   */
  tag_mode?: "any" | "all";
  /**
   * A free text search. Photos who's title, description or tags contain the text will be returned. You can exclude results that match a term by prepending it with a - character.
   */
  text?: string;
  /**
   * Minimum upload date. Photos with an upload date greater than or equal to this value will be returned. The date can be in the form of a unix timestamp or mysql datetime.
   */
  min_upload_date?: string;
  /**
   * Maximum upload date. Photos with an upload date less than or equal to this value will be returned. The date can be in the form of a unix timestamp or mysql datetime.
   */
  max_upload_date?: string;
  /**
   * Minimum taken date. Photos with an taken date greater than or equal to this value will be returned. The date can be in the form of a mysql datetime or unix timestamp.
   */
  min_taken_date?: string;
  /**
   * Maximum taken date. Photos with an taken date less than or equal to this value will be returned. The date can be in the form of a mysql datetime or unix timestamp.
   */
  max_taken_date?: string;
  /**
   * The license id for photos (for possible values see the flickr.photos.licenses.getInfo method). Multiple licenses may be comma-separated.
   */
  license?: FlickrLicense;
  /**
   * The order in which to sort returned photos. Defaults to date-posted-desc (unless you are doing a radial geo query, in which case the default sorting is by ascending distance from the point specified). The possible values are: date-posted-asc, date-posted-desc, date-taken-asc, date-taken-desc, interestingness-desc, interestingness-asc, and relevance.
   */
  sort?:
    | "date-posted-asc"
    | "date-posted-desc"
    | "date-taken-asc"
    | "date-taken-desc"
    | "interestingness-desc"
    | "interestingness-asc"
    | "relevance";
  /**
   * Return photos only matching a certain privacy level. This only applies when making an authenticated call to view photos you own. Valid values are:
   * - 1 public photos
   * - 2 private photos visible to friends
   * - 3 private photos visible to family
   * - 4 private photos visible to friends & family
   * - 5 completely private photos
   */
  privacy_filter?: 1 | 2 | 3 | 4 | 5;
  /**
   * comma-delimited list of 4 values defining the Bounding Box of the area that will be searched.
   *
   * The 4 values represent the bottom-left corner of the box and the top-right corner, minimum_longitude, minimum_latitude, maximum_longitude, maximum_latitude.
   *
   * Longitude has a range of -180 to 180 , latitude of -90 to 90. Defaults to -180, -90, 180, 90 if not specified.
   *
   * Unlike standard photo queries, geo (or bounding box) queries will only return 250 results per page.
   *
   * Geo queries require some sort of limiting agent in order to prevent the database from crying. This is basically like the check against "parameterless searches" for queries without a geo component.
   *
   * A tag, for instance, is considered a limiting agent as are user defined min_date_taken and min_date_upload parameters — If no limiting factor is passed we return only photos added in the last 12 hours (though we may extend the limit in the future).
   */
  bbox?: string;
  /**
   * Recorded accuracy level of the location information. Current range is 1-16 :
   * - World level is 1
   * - Country is ~3
   * - Region is ~6
   * - City is ~11
   * - Street is ~16
   * Defaults to maximum value if not specified.
   */
  accuracy?:
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 13
    | 14
    | 15
    | 16;
  /**
   * Safe search setting:
   * - 1 for safe.
   * - 2 for moderate.
   * - 3 for restricted.
   * (Please note: Un-authed calls can only see Safe content.)
   */
  safe_search?: 1 | 2 | 3;
  /**
   * Content Type setting:
   * - 1 for photos only.
   * - 2 for screenshots only.
   * - 3 for 'other' only.
   * - 4 for photos and screenshots.
   * - 5 for screenshots and 'other'.
   * - 6 for photos and 'other'.
   * - 7 for photos, screenshots, and 'other' (all).
   */
  content_type?: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  /**
   * Aside from passing in a fully formed machine tag, there is a special syntax for searching on specific properties :
   * - Find photos using the 'dc' namespace : "machine_tags" => "dc:"
   * - Find photos with a title in the 'dc' namespace : "machine_tags" => "dc:title="
   * - Find photos titled "mr. camera" in the 'dc' namespace : "machine_tags" => "dc:title=\"mr. camera\"
   * - Find photos whose value is "mr. camera" : "machine_tags" => "*:*=\"mr. camera\""
   * - Find photos that have a title, in any namespace : "machine_tags" => "*:title="
   * - Find photos that have a title, in any namespace, whose value is "mr. camera" : "machine_tags" => "*:title=\"mr. camera\""
   * - Find photos, in the 'dc' namespace whose value is "mr. camera" : "machine_tags" => "dc:*=\"mr. camera\""
   * Multiple machine tags may be queried by passing a comma-separated list. The number of machine tags you can pass in a single query depends on the tag mode (AND or OR) that you are querying with. "AND" queries are limited to (16) machine tags. "OR" queries are limited to (8).
   */
  machine_tags?: string;
  /**
   * Either 'any' for an OR combination of tags, or 'all' for an AND combination. Defaults to 'any' if not specified.
   */
  machine_tag_mode?: "any" | "all";
  /**
   * The id of a group who's pool to search. If specified, only matching photos posted to the group's pool will be returned.
   */
  groud_id?: string;
  /**
   * Search your contacts. Either 'all' or 'ff' for just friends and family. (Experimental)
   */
  contacts?: "all" | "ff";
  /**
   * A 32-bit identifier that uniquely represents spatial entities. (not used if bbox argument is present).
   *
   * Geo queries require some sort of limiting agent in order to prevent the database from crying. This is basically like the check against "parameterless searches" for queries without a geo component.  *
   *
   * A tag, for instance, is considered a limiting agent as are user defined min_date_taken and min_date_upload parameters — If no limiting factor is passed we return only photos added in the last 12 hours (though we may extend the limit in the future).
   */
  woe_id?: string;
  /**
   * A Flickr place id. (not used if bbox argument is present).
   *
   * Geo queries require some sort of limiting agent in order to prevent the database from crying. This is basically like the check against "parameterless searches" for queries without a geo component.
   *
   * A tag, for instance, is considered a limiting agent as are user defined min_date_taken and min_date_upload parameters — If no limiting factor is passed we return only photos added in the last 12 hours (though we may extend the limit in the future).
   */
  place_id?: string;
  /**
   * Filter results by media type. Possible values are all (default), photos or videos
   */
  media?: "all" | "photos" | "vidoes";
  /**
   * Any photo that has been geotagged, or if the value is "0" any photo that has not been geotagged.
   *
   * Geo queries require some sort of limiting agent in order to prevent the database from crying. This is basically like the check against "parameterless searches" for queries without a geo component.
   *
   * A tag, for instance, is considered a limiting agent as are user defined min_date_taken and min_date_upload parameters — If no limiting factor is passed we return only photos added in the last 12 hours (though we may extend the limit in the future).
   */
  has_geo?: string;
  /**
   * Geo context is a numeric value representing the photo's geotagginess beyond latitude and longitude. For example, you may wish to search for photos that were taken "indoors" or "outdoors".
   *
   * The current list of context IDs is :
   *
   * - 0, not defined.
   * - 1, indoors.
   * - 2, outdoors.
   *
   * Geo queries require some sort of limiting agent in order to prevent the database from crying. This is basically like the check against "parameterless searches" for queries without a geo component.
   *
   * A tag, for instance, is considered a limiting agent as are user defined min_date_taken and min_date_upload parameters — If no limiting factor is passed we return only photos added in the last 12 hours (though we may extend the limit in the future).
   */
  geo_context?: 0 | 1 | 2;
  /**
   * A valid latitude, in decimal format, for doing radial geo queries.
   *
   * Geo queries require some sort of limiting agent in order to prevent the database from crying. This is basically like the check against "parameterless searches" for queries without a geo component.
   *
   * A tag, for instance, is considered a limiting agent as are user defined min_date_taken and min_date_upload parameters — If no limiting factor is passed we return only photos added in the last 12 hours (though we may extend the limit in the future).
   */
  lat?: string;
  /**
   * A valid longitude, in decimal format, for doing radial geo queries.
   *
   * Geo queries require some sort of limiting agent in order to prevent the database from crying. This is basically like the check against "parameterless searches" for queries without a geo component.
   *
   * A tag, for instance, is considered a limiting agent as are user defined min_date_taken and min_date_upload parameters — If no limiting factor is passed we return only photos added in the last 12 hours (though we may extend the limit in the future).
   */
  lon?: string;
  /**
   * A valid radius used for geo queries, greater than zero and less than 20 miles (or 32 kilometers), for use with point-based geo queries. The default value is 5 (km).
   */
  radius?: number;
  /**
   * The unit of measure when doing radial geo queries. Valid options are "mi" (miles) and "km" (kilometers). The default is "km".
   */
  radius_units?: "mi" | "km";
  /**
   * Limit the scope of the search to only photos that are part of the Flickr Commons project. Default is false.
   */
  is_commons?: boolean;
  /**
   * Limit the scope of the search to only photos that are in a gallery? Default is false, search all photos.
   */
  in_gallery?: boolean;
  /**
   * Limit the scope of the search to only photos that are for sale on Getty. Default is false.
   */
  is_getty?: boolean;
  /**
   * A comma-delimited list of extra information to fetch for each returned record. Currently supported fields are: description, license, date_upload, date_taken, owner_name, icon_server, original_format, last_update, geo, tags, machine_tags, o_dims, views, media, path_alias, url_sq, url_t, url_s, url_q, url_m, url_n, url_z, url_c, url_l, url_o
   */
  extras?: string;
  /**
   * Number of photos to return per page. If this argument is omitted, it defaults to 100. The maximum allowed value is 500.
   */
  per_page?: number;
  /**
   * The page of results to return. If this argument is omitted, it defaults to 1.
   */
  page?: number;
  format: "json";
}

export interface FlickrPhotoItem {
  id: string;
  owner: string;
  secret: string;
  server: string;
  farm: number;
  title: string;
  ispublic: number;
  isfriend: number;
  isfamily: number;
  license: FlickrLicense;
  description?: { _content: string };
  o_width?: string;
  o_height?: string;
  dateupload?: string;
  lastupdate?: string;
  datetaken?: string;
  datetakengranularity?: number;
  datetakenunknown?: string;
  ownername: string;
  iconserver?: string;
  iconfarm?: number;
  views?: string;
  tags?: string;
  machine_tags?: string;
  originalsecret?: string;
  originalformat?: string;
  latitude?: number;
  longitude?: number;
  accuracy?: number;
  context?: number;
  media?: string;
  media_status?: string;
  url_sq: string;
  height_sq: number;
  width_sq: number;
  url_t: string;
  height_t: number;
  width_t: number;
  url_s: string;
  height_s: number;
  width_s: number;
  url_q: string;
  height_q: number;
  width_q: number;
  url_m: string;
  height_m: number;
  width_m: number;
  url_n: string;
  height_n: number;
  width_n: number;
  url_z: string;
  height_z: number;
  width_z: number;
  url_c: string;
  height_c: number;
  width_c: number;
  url_o?: string;
  height_o?: number;
  width_o?: number;
  pathalias?: unknown;
}

export interface FlickrPhotosSearchResponse {
  photos: {
    page: number;
    pages: number;
    perpage: number;
    total: string;
    photo: FlickrPhotoItem[];
  };
  stat: string;
}
