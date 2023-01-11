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

  const sorted = newArr.reduce((acc: any, item: any) => {
    // const obj = {};
    // const newObj = {
    //   ...obj,
    //   name: acc[item.name],
    //   orderQty: acc + item.orderQty,
    // };
    // console.log(11111, newObj);
  }, []);
  console.log("newArr", newArr);
  //   console.log("sorted", sorted);
  return <div>{JSON.stringify(purchasedItems)}</div>;
};

export default Stocks;
