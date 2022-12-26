import { groq } from "next-sanity";
import Image from "next/image";
import Card from "../../../../components/Card";
import { client } from "../../../../lib/sanity.client";
import urlFor from "../../../../lib/urlFor";

type SearchItemProps = {
  params: {
    searchResult: string;
  };
};

const SearchResult = async ({ params: { searchResult } }: SearchItemProps) => {
  const filter = decodeURI(searchResult);

  const query = groq`
    *[$filter in categories[]->category] | order(name asc)
  `;
  const products: Product[] = await client.fetch(query, { filter });

  return (
    <div className="overflow-hidden">
      <p className="text-sm text-gray-400 mb-2">You searched for {filter}</p>
      {products.length > 0 ? (
        <div className="grid grid-cols-3 gap-4 h-[520px] overflow-y-scroll scrollbar-none">
          {products.map((product: Product) => (
            <Card {...product} />
          ))}
        </div>
      ) : (
        <div className="flex justify-center w-full h-full items-center text-lg">
          NO ITEMS
        </div>
      )}
    </div>
  );
};

export default SearchResult;
