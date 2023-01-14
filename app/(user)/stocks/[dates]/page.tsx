import { groq } from "next-sanity";
import OrderItem from "../../../../components/OrderItem";
import { client } from "../../../../lib/sanity.client";

type SearchDatesProps = {
  params: {
    dates: string[];
  };
};

interface IOrderItems {
  orderItems?: any;
  _key: string;
  name: string;
  orderQty: number;
  price: number;
}

const SeachDate = async ({ params: { dates } }: SearchDatesProps) => {
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
      <div className="flex flex-row justify-between items-center p-4 bg-[#2d2d2d] text-gray-300 rounded-lg">
        <div className="w-48">貨物名稱</div>
        <div className="w-24">單價</div>
        <div className="w-16">賣出數量</div>
        <div className="w-24">賣出總金額</div>
      </div>
      <div className="flex flex-col space-y-4">
        {sorted.map((item: IOrderItems) => (
          <OrderItem key={item._key} {...item} />
        ))}
      </div>
    </div>
  );
};

export default SeachDate;
