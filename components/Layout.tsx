import * as React from "react";
import { useDebouncedState } from "hooks/useDebouncedState";
import Head from "next/head";
import { Header } from "./Header";
import { SearchField } from "./SearchField";
import { Drawer } from "./Drawer";
import { SettingsIcon } from "./icons/SettingsIcon";

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
    <>
      <Head>
        <title>ShotSearch</title>
        <link rel="icon" href="/favicon.ico" key="favicon" />
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width"
          key="viewport"
        />
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
    </>
  );
}

const SettingsButton = ({ onClick }: { onClick?: () => void }) => (
  <button
    type="button"
    onClick={onClick}
    className="text-lg font-medium rounded-md text-gray-500 hover:text-gray-800 focus:text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800"
  >
    <SettingsIcon />
  </button>
);
