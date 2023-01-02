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
      className={`flex flex-col space-y-4 py-4 overflow-y-scroll h-[700px] scrollbar-none`}
    >
      <div className="flex flex-row justify-between items-center w-full pl-10 pr-4 py-4 bg-[#2d2d2d] text-gray-300 rounded-lg">
        <div className="w-32">下單日期</div>
        <div className="flex-1">訂單編號</div>
        <div className="flex-1">訂單狀態</div>
        <div className="flex-1">總金額</div>
        <div className="flex-1">付款方式</div>
      </div>

      {orders.map((order: Order) => (
        <CollapseContainer {...order} />
      ))}
    </div>
  );
};

export default SearchResult;
