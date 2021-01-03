import { LoadingSpinner } from "./icons/LoadingSpinner";

interface Props {
  isLoading?: boolean;
  className?: string;
}

export const Loading = ({ isLoading = false, className = "" }: Props) =>
  isLoading ? (
    <div
      className={`flex justify-center items-center text-gray-400 font-semibold ${className}`}
    >
      <LoadingSpinner />
      Loading…
    </div>
  ) : null;
