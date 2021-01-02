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
import { useDebouncedState } from "hooks/useDebouncedState";
import { prefetchSearchFlickr, useSearchFlickr } from "hooks/useSearchFlickr";
import { getApiKeys, ApiKeys } from "lib/apiKeys";
import { GetServerSideProps } from "next";
import { dehydrate, DehydratedState } from "react-query/hydration";
import { useRouter } from "next/router";
import { Header } from "components/Header";
import { SearchField } from "components/SearchField";
import { SearchResults } from "components/SearchResults";
import { extractQueryParams } from "lib/extractQueryParams";
import { EmptyQuery } from "components/EmptyQuery";
import Head from "next/head";

interface Props {
  apiKeys: ApiKeys;
  dehydratedState: DehydratedState;
  initialSearchQuery: string;
}

export default function Index({ apiKeys, initialSearchQuery }: Props) {
  const router = useRouter();
  const [
    searchQuery,
    setSearchQuery,
    searchValue,
    forceSetSearchQuery,
  ] = useDebouncedState<string>(initialSearchQuery, 500);

  React.useEffect(() => {
    if (!initialSearchQuery) {
      forceSetSearchQuery("");
    }
  }, [initialSearchQuery]);

  React.useEffect(() => {
    if (searchQuery) {
      router.push(`/?q=${searchQuery}`);
    } else {
      router.push("/");
    }
    // forceSetSearchQuery(searchQuery);
  }, [searchQuery]);

  // TODO(cody): error handling...
  const unsplash = useSearchUnsplash(apiKeys.unsplash, searchQuery);
  const pexels = useSearchPexels(apiKeys.pexels, searchQuery);
  const pixabay = useSearchPixabay(apiKeys.pixabay, searchQuery);
  const flickr = useSearchFlickr(apiKeys.flickr, searchQuery);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Head>
        <title>ShotSearch</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:title" content="ShotSearch" />
      </Head>
      <Header>
        <SearchField value={searchValue} onChange={setSearchQuery} />
      </Header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
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
      </main>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const queryClient = new QueryClient();
  const apiKeys = getApiKeys();
  const { searchQuery } = extractQueryParams(context.query);

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
