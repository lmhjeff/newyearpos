import { groq } from "next-sanity";
import CollapseContainer from "../../../../components/CollapseContainer";
import { client } from "../../../../lib/sanity.client";
import useCartStore from "../../../store";

type SearchItemProps = {
  params: {
    searchResult: string;
  };
};

const SearchResult = async ({ params: { searchResult } }: SearchItemProps) => {
  let orders: Order[];

  if (searchResult === "All") {
    const allQuery = groq`
    *[_type == 'orders'] | order(_createdAt desc)
  `;
    orders = await client.fetch(allQuery);
  } else {
    const filterQuery = groq`
    *[_type == 'orders' && status == $searchResult] | order(_createdAt desc)
  `;

    orders = await client.fetch(filterQuery, { searchResult });
  }

  return (
    <div
      className={`flex flex-col space-y-4 overflow-y-scroll h-[550px] scrollbar-none`}
    >
      {orders.map((order: Order) => (
        <CollapseContainer {...order} />
      ))}
    </div>
  );
};

export default SearchResult;
