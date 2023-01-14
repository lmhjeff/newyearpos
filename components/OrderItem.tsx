"use client";

import { groq } from "next-sanity";
import { client } from "../lib/sanity.client";
import DatePicker from "./DateRangePicker";
interface IOrderItems {
  orderItems?: any;
  _key: string;
  name: string;
  orderQty: number;
  price: number;
}

const OrderItem = (sortedItem: IOrderItems) => {
  //   const newArr: any = [];
  //   const purchasedItems = await client.fetch(query);
  //   purchasedItems.map((item: IOrderItems) =>
  //     item.orderItems.forEach((i: IOrderItems) => newArr.push(i))
  //   );

  //   const sorted = newArr.reduce((acc: any, cur: any) => {
  //     let found = false;

  //     for (let i = 0; i < acc.length; i++) {
  //       if (acc[i].name === cur.name) {
  //         found = true;
  //         acc[i].orderQty = acc[i].orderQty + cur.orderQty;
  //       }
  //     }

  //     if (!found) {
  //       acc.push(cur);
  //     }

  //     return acc;
  //   }, []);

  return (
    <div className="flex flex-row  text-gray-200 p-3 text-xl justify-between items-center rounded-lg shadow-md">
      <div className="w-48 break-words">{sortedItem.name}</div>
      <div className="w-24">HKD {sortedItem.price}</div>

      <div className="w-16">x{sortedItem.orderQty}</div>

      <div className="w-24">HKD {sortedItem.orderQty * sortedItem.price}</div>
    </div>
  );
};

export default OrderItem;
