import { groq } from "next-sanity";
import Image from "next/image";
import Card from "../../../../components/Card";
import { client } from "../../../../lib/sanity.client";
import urlFor from "../../../../lib/urlFor";
import { isMobile } from "react-device-detect";
import Orders from "../page";

// const Panel = Collapse.Panel;

type SearchItemProps = {
  params: {
    searchResult: string;
  };
};

const SearchResult = async ({ params: { searchResult } }: SearchItemProps) => {
  let orders: Order[];

  if (searchResult === "All") {
    console.log("all");
    const allQuery = groq`
    *[_type == 'orders'] | order(_createdAt desc)
  `;
    orders = await client.fetch(allQuery);
  } else {
    console.log("filter");
    const filterQuery = groq`
    *[_type == 'orders' && status == $searchResult] | order(_createdAt desc)
  `;

    orders = await client.fetch(filterQuery, { searchResult });
  }

  console.log(typeof orders);

  return (
    <div className="flex flex-col">
      {/* {JSON.stringify(orders)} */}
      <div>
        {orders.map((order) => (
          <div
            key={order._id}
            className="flex flex-row w-full rounded-full space-x-4"
          >
            <div>{order.orderId}</div>

            <div>{order._id}</div>
            <div>{order.total}</div>
            <div>{order.paymentMethod}</div>
            <div>{order?.status ?? "undefined"}</div>
          </div>
        ))}
      </div>
      {/* {orders?.map((order: Order) => (
        <div
          key={order._id}
          className="flex flex-row w-full rounded-full space-x-4"
        >
          <div>{order.orderId}</div>

          <div>{order.total}</div>
          <div>{order.paymentMethod}</div>
          <div>{order.status}</div>
        </div>
      ))} */}
    </div>
  );
};

export default SearchResult;
