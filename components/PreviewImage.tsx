import Image from "next/image";
import { ImageMeta } from "types/image-meta";

interface Props {
  imageMeta: ImageMeta;
}

export const PreviewImage = ({ imageMeta }: Props) => {
  const {
    imageURL,
    thumbnailURL,
    imagePageURL,
    userURL,
    username,
    source,
  } = imageMeta;

  return (
    <div>
      <a href={imageURL}>
        <Image className="z-0" src={thumbnailURL} width={280} height={200} />
      </a>
      This <a href={imagePageURL}>Photo</a> was taken by{" "}
      <a href={userURL}>{username}</a> on {source}.
    </div>
  );
};
