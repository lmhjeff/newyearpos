import { groq } from "next-sanity";
import Image from "next/image";
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
  const products = await client.fetch(query, { filter });

  console.log("products", products);

  return (
    <div>
      <p className="text-sm text-gray-400">You searched for {filter}</p>
      {products.length > 0 ? (
        <div className="grid grid-cols-3 gap-4 overflow-scroll h-[600px]">
          {products.map((product: Product) => (
            <div key={product._id} className="my-4">
              <div className="relative w-40 h-40 drop-shadow-xl">
                <Image
                  className="object-cover"
                  src={urlFor(product.image).url()}
                  alt={product.name}
                  fill
                />
              </div>
              <h1>{product.name}</h1>
              <div className="flex flex-row space-x-8 items-center">
                <p className="text-gray-500">${product.price}</p>
                <p className="text-gray-500">Qty: {product.quantity}</p>
              </div>
              <div className="flex w-full space-x-4 my-4 items-center">
                <button className="w-10 h-10 p-0 text-center text-lg border-2 border-white rounded-md bg-transparent">
                  -
                </button>
                <span className="text-lg">0</span>
                <button className="w-10 h-10 p-0 text-center text-lg border-2 border-white rounded-md bg-transparent">
                  +
                </button>
              </div>
            </div>
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
