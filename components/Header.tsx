import * as React from "react";
import Link from "next/link";
import { GithubIcon } from "./GithubIcon";

interface Props {
  children?: React.ReactNode;
}

export const Header = ({ children }: Props) => (
  <header className="z-50 sticky top-0 bg-white shadow">
    <div className="flex items-center	max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <Link href="/">
        <img
          className="cursor-pointer mr-4"
          src="/shotsearch_icon.png"
          width="32"
          height="32"
        />
      </Link>
      <Link href="/">
        <h1 className="prose cursor-pointer flex-initial hidden sm:inline-block mr-4 text-3xl font-bold leading-tight text-gray-900">
          ShotSearch
        </h1>
      </Link>
      {children}
      <div className="text-xl flex-none ml-4 hover:text-gray-700 focus:text-gray-700 text-gray-400  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
        <a
          href="https://github.com/dev-cprice/shotsearch.app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GithubIcon />
        </a>
      </div>
    </div>
  </header>
);
