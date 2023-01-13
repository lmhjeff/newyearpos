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
  const sorted = newArr.reduce((acc: any, cur: any) => {
    let found = false;

    for (let i = 0; i < acc.length; i++) {
      if (acc[i].name === cur.name) {
        found = true;
        acc[i].orderQty = acc[i].orderQty + cur.orderQty;
      }
    }

    if (!found) {
      acc.push(cur);
    }

    return acc;
    // let obj = acc.find((item: any) => item._key === current._key);
    // console.log("obj", obj);
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
    // }
  }, []);

  //it's work, but not perfect
  //   const sorted = newArr.reduce((acc:any, current:any) => {
  //        const name = current.name;
  //     if (acc[name]) {
  //       acc[name]++;
  //     } else {
  //       acc[name] = 1;
  //     }
  //     return acc;
  //   }, [])

  console.log("sorted", sorted);
  console.log("newArr", newArr);

  return <div>{JSON.stringify(purchasedItems)}</div>;
};

export default Stocks;
