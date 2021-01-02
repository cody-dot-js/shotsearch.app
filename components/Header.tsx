import * as React from "react";

interface Props {
  children?: React.ReactNode;
}

export const Header = ({ children }: Props) => (
  <header className="z-50 sticky top-0 bg-white shadow">
    <div className="flex items-center	max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <h1 className="flex-none mr-4 inline-block text-3xl font-bold leading-tight text-gray-900">
        ShotSearch
      </h1>
      {children}
    </div>
  </header>
);
