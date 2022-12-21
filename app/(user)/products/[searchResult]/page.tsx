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
  console.log("searchResult", decodeURI(searchResult));
  const filter = decodeURI(searchResult);

  console.log("filter", filter);
  const query = groq`
    *[$filter in categories[]->category] | order(name asc)
  `;
  const products: Product[] = await client.fetch(query, { filter });

  console.log("products", products);

  return (
    <div>
      <p className="text-sm text-gray-400">You searched for {filter}</p>
      {products.length > 0 ? (
        <div className="grid grid-cols-3 gap-4 overflow-scroll h-[600px]">
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
