import * as React from "react";
import Link from "next/link";
import { GithubIcon } from "./icons/GithubIcon";

interface Props {
  children?: React.ReactNode;
}

export const Header = ({ children }: Props) => (
  <header className="sticky top-0 bg-white shadow z-30">
    <div className="flex items-center	justify-between max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
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
    </div>
  </header>
);
