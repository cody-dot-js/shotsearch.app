import * as React from "react";
import { useDebouncedState } from "hooks/useDebouncedState";
import Head from "next/head";
import { Header } from "./Header";
import { SearchField } from "./SearchField";
import { Drawer } from "./Drawer";

interface Props {
  children: React.ReactNode;
  initialSearchValue?: string;
  onSearch?: (searchValue: string) => void;
  onSearchChange?: (searchValue: string) => void;
}

export function Layout({
  children,
  initialSearchValue = "",
  onSearch,
  onSearchChange,
}: Props) {
  const [
    searchQuery,
    setSearchQuery,
    searchValue,
    // forceSetSearchQuery,
  ] = useDebouncedState<string>(initialSearchValue, 250);

  const [isSettingsOpen, setIsSettingsOpen] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (searchQuery) {
      onSearch?.(searchQuery);
    }
  }, [onSearch, searchQuery]);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    onSearchChange?.(value);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Head>
        <title>ShotSearch</title>
        <link rel="icon" href="/favicon.ico" key="favicon" />
        {/* <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width"
          key="viewport"
        /> */}
        <meta property="og:title" content="ShotSearch" key="title" />
        {/* <link
          rel="stylesheet"
          href="https://rsms.me/inter/inter.css"
          key="inter"
        /> */}
      </Head>
      <Header>
        <SearchField
          className="mr-4"
          value={searchValue}
          onChange={handleSearchChange}
        />
        <SettingsButton onClick={() => setIsSettingsOpen(true)} />
      </Header>
      <Drawer
        title="Settings"
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      >
        <p>TODO: settings...</p>
      </Drawer>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">{children}</main>
    </div>
  );
}

const SettingsButton = ({ onClick }: { onClick?: () => void }) => (
  <button
    type="button"
    onClick={onClick}
    className="text-lg font-medium rounded-md text-gray-500 hover:text-gray-800 focus:text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800"
  >
    <svg
      className="h-6 w-6"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  </button>
);
