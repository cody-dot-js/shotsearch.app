import { SuggestionApiResponse } from "pages/api/suggestion";
import * as React from "react";
import wretch from "wretch";
import { ImageSearchIcon } from "./icons/ImageSearch";

interface Props {
  searchQuery?: string;
}

const suggestionApi = wretch().url("/api/suggestion");

export const EmptyQuery = ({ searchQuery }: Props) => {
  const isEmpty = !searchQuery;
  const [suggestion, setSuggestion] = React.useState<string>("");

  React.useEffect(() => {
    const getSuggestion = async () => {
      const res: SuggestionApiResponse = await suggestionApi.get().json();
      setSuggestion(res.suggestion);
    };

    getSuggestion();
  }, []);

  return isEmpty ? (
    <div className="p-6 text-gray-400 font-semibold">
      <p className="flex justify-center items-center">
        {Boolean(suggestion) ? (
          `Try searching for ${suggestion}!`
        ) : (
          <Placeholder />
        )}
      </p>
      <p className="flex justify-center mt-4 text-9xl">
        <ImageSearchIcon />
      </p>
    </div>
  ) : null;
};

const Placeholder = () => (
  <span className="inline-block bg-gray-200 rounded h-6 w-48" />
);
