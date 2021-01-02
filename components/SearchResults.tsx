import { ImageMeta, ImageSource } from "types/image-meta";
import { EmptyResults } from "./EmptyResults";
import { Loading } from "./Loading";
import { PreviewImage } from "./PreviewImage";

interface Props {
  images?: ImageMeta[] | null;
  isLoading?: boolean;
  searchQuery: string;
  source: ImageSource;
}

export const SearchResults = ({
  images,
  isLoading = false,
  searchQuery,
  source,
}: Props) =>
  images == null ? null : (
    <article className="mt-0 md:mt-0 md:col-span-2 mb-4 bg-white">
      <div className="shadow sm:rounded-md sm:overflow-hidden">
        <header className="shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h2 className="m-0 mr-4 mb-0 text-2xl font-bold leading-tight text-gray-900">
              {source} {!isLoading && <>({images.length})</>}
            </h2>
          </div>
        </header>
        <Loading isLoading={isLoading} />
        <EmptyResults
          images={images}
          searchValue={searchQuery}
          source={source}
        />
        <ImagePreviews images={images} />
      </div>
    </article>
  );

const ImagePreviews = ({ images = [] }: { images: ImageMeta[] }) =>
  images.length === 0 ? null : (
    <ul className="list-none p-4 grid grid-cols-4 gap-1">
      {images.map((imageMeta) => (
        <li key={imageMeta.id}>
          <PreviewImage imageMeta={imageMeta} />
        </li>
      ))}
    </ul>
  );
