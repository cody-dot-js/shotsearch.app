import { ImageMeta, ImageSource } from "types/image-meta";
import { ImageSearchIcon } from "./icons/ImageSearch";

interface Props {
  images?: ImageMeta[] | null;
  searchValue: string;
  source: ImageSource;
}

export const EmptyResults = ({ images, searchValue, source }: Props) => {
  const isEmpty = (searchValue && images == null) || images?.length === 0;
  return isEmpty ? (
    <div className="p-6 text-gray-400 justify-center flex items-center font-semibold flex-wrap">
      <div>
        <p>
          No {source} results for search query: {searchValue}
        </p>
        <p className="mt-4 text-9xl flex justify-center">
          <ImageSearchIcon />
        </p>
      </div>
    </div>
  ) : null;
};
