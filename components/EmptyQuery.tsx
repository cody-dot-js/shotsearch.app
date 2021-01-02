import * as React from "react";
import { extractQueryParams } from "lib/extractQueryParams";
import { useRouter } from "next/router";

const suggestions = [
  "pacific northwest",
  "fast cars",
  "retrowave",
  "bitcoin",
  "web development",
  "programming",
  "coffee",
  "nature",
];

const sample = (list: unknown[]) =>
  list[Math.floor(Math.random() * list.length)];

export const EmptyQuery = () => {
  const router = useRouter();
  const { query } = router;
  const { searchQuery } = extractQueryParams(query);

  const isEmpty = searchQuery.length === 0;

  const suggestion = React.useMemo(() => sample(suggestions), [searchQuery]);

  return isEmpty ? (
    <div className="h-48 p-6 text-gray-400 justify-center flex items-center font-semibold">
      Try searching for {suggestion}!
    </div>
  ) : null;
};
