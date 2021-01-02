export type ImageSource = "Flickr" | "Pexels" | "Pixabay" | "Unsplash";

export interface ImageMeta {
  description?: string;
  id: string;
  imageHeight: number;
  imagePageURL: string;
  imageURL: string;
  imageWidth: number;
  source: ImageSource;
  thumbnailURL: string;
  username: string;
  userURL: string;
}
