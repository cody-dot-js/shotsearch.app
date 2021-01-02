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
          className="cursor-pointer"
          src="/shotsearch_icon.png"
          width="32"
          height="32"
        />
      </Link>
      <h1 className="flex-none mr-4 ml-4 inline-block text-3xl font-bold leading-tight text-gray-900">
        <Link href="/">ShotSearch</Link>
      </h1>

      {children}
      <div className="text-xl flex-none ml-4 hover:text-gray-700 focus:text-gray-700 text-gray-400  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
        <a
          href="https://github.com/dev-cprice/shotsearch.app"
          target="noreferrer noopener"
        >
          <GithubIcon />
        </a>
      </div>
    </div>
  </header>
);
