"use client";

import "../../styles/globals.css";
import Menu from "../../components/Menu";
import { groq } from "next-sanity";
import { useEffect, useState } from "react";

const useHasHydrated = () => {
  const [hydrated, setHydrated] = useState<boolean>(false);
  useEffect(() => {
    setHydrated(true);
  }, []);

  return hydrated;
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const hasHydrated = useHasHydrated();

  return (
    <html>
      <head />
      <body className="flex flex-row w-screen bg-[#111315] h-screen">
        <Menu />
        <div className="w-full">{hasHydrated ? children : null}</div>
      </body>
    </html>
  );
}
