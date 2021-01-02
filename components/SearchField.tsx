import { SearchIcon } from "./SearchIcon";

interface Props {
  value?: string;
  onChange?: (newValue: string) => void;
}

export const SearchField = ({ value, onChange }: Props) => (
  <div className="flex-grow mt-1 flex rounded-md shadow-sm">
    <input
      type="search"
      name="searchQuery"
      placeholder="Search..."
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-l-md sm:text-sm border-gray-300"
    />
    <span className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 text-lg">
      <SearchIcon />
    </span>
  </div>
);
