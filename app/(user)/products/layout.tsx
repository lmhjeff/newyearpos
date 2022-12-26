import { groq } from "next-sanity";
import PreviewSuspense from "../../../components/PreviewSuspense";

import { previewData } from "next/headers";
import Cart from "../../../components/Cart";
import Category from "../../../components/Category";
import PreviewCategory from "../../../components/PreviewCategory";
import Search from "../../../components/Search";
import { client } from "../../../lib/sanity.client";

const query = groq`
  *[_type == 'categories'] | order(category asc)
`;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const category = await client.fetch(query);

  if (previewData()) {
    return (
      <PreviewSuspense
        fallback={
          <div role="status">
            <p className="text-center text-lg animate-pulse text-green-300">
              {" "}
              Loading Preview Data...
            </p>
          </div>
        }
      >
        <PreviewCategory query={query} />
      </PreviewSuspense>
    );
  }

  return (
    <main className="flex flex-row w-full">
      <div className="flex flex-col w-4/5 p-4 h-screen">
        <Search />
        <Category category={category} />
        {children}
      </div>
      <Cart />
    </main>
  );
}
