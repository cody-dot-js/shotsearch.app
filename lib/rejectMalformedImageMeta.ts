import { ImageMeta } from "types/image-meta";

export function rejectMalformedImageMeta(imageMeta: ImageMeta): boolean {
  const { imageWidth, imageHeight } = imageMeta;

  return Boolean(imageHeight) && Boolean(imageWidth);
}
