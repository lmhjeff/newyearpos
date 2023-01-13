import { groq } from "next-sanity";
import DatePicker from "../../../components/DatePicker";
import { client } from "../../../lib/sanity.client";

interface IOrderItems {
  orderItems?: any;
  _key: string;
  name: string;
  orderQty: number;
  price: number;
}

const query = groq`
    *[_type == "orders" && _createdAt >= "2023-01-13T16:00:00.000Z"]{
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
  }, []);

  return (
    <div className="flex flex-col w-full p-4 space-y-6">
      <div className="flex flex-row items-center space-x-6">
        <DatePicker />
        <button className="p-2 rounded-lg bg-pink-500">Search</button>
      </div>
      <div className="flex flex-row justify-between items-center p-4 bg-[#2d2d2d] text-gray-300 rounded-lg">
        <div className="w-52">貨物名稱</div>
        <div className="">單價</div>
        <div className="w-12">賣出數量</div>
        <div>賣出總金額</div>
      </div>
      <div className="flex flex-col space-y-4">
        {sorted.map((item: IOrderItems) => (
          <div className="flex flex-row  text-gray-200 p-3 text-xl justify-between items-center rounded-lg shadow-md">
            <div className="w-52 break-words">{item.name}</div>
            <div>HKD {item.price}</div>

            <div className="w-10">x{item.orderQty}</div>

            <div>HKD {item.orderQty * item.price}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stocks;

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
