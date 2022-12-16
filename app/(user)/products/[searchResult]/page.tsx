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
    *[$filter in categories[]->category]
  `;
  const products = await client.fetch(query, { filter });

  console.log("products", products);

  return (
    <div>
      <p>You searched for {filter}</p>
      <div>
        {products.map((product: any) => (
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
            <p>price: {product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResult;
