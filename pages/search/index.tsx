import * as React from "react";
import { useRouter } from "next/router";
import { EmptyQuery } from "components/EmptyQuery";
import { Layout } from "components/Layout";
import { GetStaticProps } from "next";
import { Loading } from "components/Loading";

export const searchPath = "/search";

export const makeSearchPath = (query: string): string =>
  `${searchPath}/${query}`;

export default function SearchIndex() {
  const router = useRouter();

  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  return (
    <Layout
      onSearch={(query) => router.push(makeSearchPath(query))}
      onSearchChange={(value) => setIsLoading(Boolean(value))}
    >
      <EmptyQuery />
      <Loading isLoading={isLoading} />
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};
