import { SuggestionApiResponse } from "pages/api/suggestion";
import * as React from "react";
import wretch from "wretch";

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
    <div className="h-48 p-6 text-gray-400 justify-center flex items-center font-semibold">
      {Boolean(suggestion) ? (
        <p>Try searching for {suggestion}!</p>
      ) : (
        <Placeholder />
      )}
    </div>
  ) : null;
};

const Placeholder = () => <p className="bg-gray-300 rounded h-4 w-48" />;
