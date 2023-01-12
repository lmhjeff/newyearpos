import { groq } from "next-sanity";
import { client } from "../../../lib/sanity.client";

interface IOrderItems {
  orderItems?: any;
  _key: string;
  name: string;
  orderQty: number;
  price: number;
}

const query = groq`
    *[_type == "orders" && _createdAt >= "2023-01-10T16:00:00.000Z"]{
        orderItems[] {
        _key,
        name,
        orderQty,
        price
        }
    }
`;

const Stocks = async () => {
  const newArr: any = [];
  const purchasedItems = await client.fetch(query);
  purchasedItems.map((item: IOrderItems) =>
    item.orderItems.forEach((i: IOrderItems) => newArr.push(i))
  );
  // { ...current, orderQty: current.orderQty + acc.orderQty }
  const sorted = newArr.reduce((acc: any, current: any) => {
    // let obj = acc.find((item: any) => item._key === current._key);
    // if (!obj) {
    //   const newCurr = {
    //     name: current.name,
    //     orderQty: current.orderQty,
    //   };
    //   console.log("newCurr", newCurr);

    //   return acc.concat([newCurr]);
    // } else {
    //   console.log("else");
    //   const newData = {
    //     name: current.name,
    //     orderQty: current.orderQty + acc.orderQty,
    //   };

    //   return acc.concat([newData]);
    // return acc.concat([current]);
    const name = current.name;
    if (acc[name]) {
      acc[name]++;
    } else {
      acc[name] = 1;
    }
    return acc;
  }, {});
  console.log("sorted", sorted);
  //   console.log("sorted", sorted);
  return <div>{JSON.stringify(purchasedItems)}</div>;
};

export default Stocks;
