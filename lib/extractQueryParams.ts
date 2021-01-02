import { ParsedUrlQuery } from "querystring";

export interface QueryParams {
  searchQuery: string;
}

export function extractQueryParams(query: ParsedUrlQuery): QueryParams {
  const { q } = query;
  const searchQuery = (typeof q === "object" ? q[0] : q) ?? "";

  return {
    searchQuery,
  };
}
