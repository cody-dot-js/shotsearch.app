import * as React from "react";
import { QueryClient } from "react-query";
import { prefetchSearchPexels, useSearchPexels } from "hooks/useSearchPexels";
import {
  prefetchSearchPixabay,
  useSearchPixabay,
} from "hooks/useSearchPixabay";
import {
  prefetchSearchUnsplash,
  useSearchUnsplash,
} from "hooks/useSearchUnsplash";
import { prefetchSearchFlickr, useSearchFlickr } from "hooks/useSearchFlickr";
import { getApiKeys, ApiKeys } from "lib/apiKeys";
import { GetServerSideProps } from "next";
import { dehydrate, DehydratedState } from "react-query/hydration";
import { useRouter } from "next/router";
import { SearchResults } from "components/SearchResults";
import { EmptyQuery } from "components/EmptyQuery";
import { Layout } from "components/Layout";
import { makeSearchPath } from ".";

interface Props {
  apiKeys: ApiKeys;
  dehydratedState: DehydratedState;
  initialSearchQuery: string;
}

export default function Index({ apiKeys, initialSearchQuery }: Props) {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = React.useState<string>(
    initialSearchQuery
  );

  React.useEffect(() => {
    router.push(makeSearchPath(searchQuery));
  }, [searchQuery]);

  // TODO(cody): error handling...
  const unsplash = useSearchUnsplash(apiKeys.unsplash, searchQuery);
  const pexels = useSearchPexels(apiKeys.pexels, searchQuery);
  const pixabay = useSearchPixabay(apiKeys.pixabay, searchQuery);
  const flickr = useSearchFlickr(apiKeys.flickr, searchQuery);

  return (
    <Layout initialSearchValue={initialSearchQuery} onSearch={setSearchQuery}>
      <EmptyQuery searchQuery={searchQuery} />
      <SearchResults
        images={unsplash.data}
        isLoading={unsplash.isLoading}
        searchQuery={searchQuery}
        source="Unsplash"
      />
      <SearchResults
        source="Pexels"
        images={pexels.data}
        isLoading={pexels.isLoading}
        searchQuery={searchQuery}
      />
      <SearchResults
        source="Pixabay"
        images={pixabay.data}
        isLoading={pixabay.isLoading}
        searchQuery={searchQuery}
      />
      <SearchResults
        source="Flickr"
        images={flickr.data}
        isLoading={flickr.isLoading}
        searchQuery={searchQuery}
      />
    </Layout>
  );
}

type QueryParams = {
  searchQuery?: string;
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const queryClient = new QueryClient();
  const apiKeys = getApiKeys();
  const { searchQuery = "" }: QueryParams = context.query;

  await prefetchSearchFlickr(queryClient, apiKeys.flickr, searchQuery);
  await prefetchSearchPexels(queryClient, apiKeys.pexels, searchQuery);
  await prefetchSearchPixabay(queryClient, apiKeys.pixabay, searchQuery);
  await prefetchSearchUnsplash(queryClient, apiKeys.unsplash, searchQuery);

  const props: Props = {
    apiKeys,
    dehydratedState: dehydrate(queryClient),
    initialSearchQuery: searchQuery,
  };

  return {
    props,
  };
};
