import * as React from "react";

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

interface Props {
  searchQuery?: string;
}

export const EmptyQuery = ({ searchQuery }: Props) => {
  const isEmpty = !searchQuery;

  const suggestion = React.useMemo(() => sample(suggestions), [searchQuery]);

  return isEmpty ? (
    <div className="h-48 p-6 text-gray-400 justify-center flex items-center font-semibold">
      Try searching for {suggestion}!
    </div>
  ) : null;
};
