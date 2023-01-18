import { groq } from "next-sanity";
import OrderItem from "../../../../components/OrderItem";
import { client } from "../../../../lib/sanity.client";

type SearchDatesProps = {
  params: {
    dates: string;
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
  const filteredDates = dates.split("%2C");
  console.log("filteredDates", filteredDates);
  const startDate = filteredDates[0];
  const endDate = filteredDates[1];
  const status = filteredDates[2].replace("%20", "");

  const statusQuery = {
    All: groq`
      *[_type == "orders" && _createdAt >= $startDate && _createdAt <= $endDate]{
          orderItems[] {
          _key,
          name,
          orderQty,
          price
          }
      }
    `,
    Completed: groq`
      *[_type == "orders" && _createdAt >= $startDate && _createdAt <= $endDate && status == 'Completed']{
          orderItems[] {
          _key,
          name,
          orderQty,
          price
          }
      }
    `,
    PreOrder: groq`
    *[_type == "orders" && _createdAt >= $startDate && _createdAt <= $endDate && status == 'PreOrder']{
        orderItems[] {
        _key,
        name,
        orderQty,
        price
        }
    }
  `,
    WaitingForDelivery: groq`
  *[_type == "orders" && _createdAt >= $startDate && _createdAt <= $endDate && status == 'WaitingForDelivery']{
      orderItems[] {
      _key,
      name,
      orderQty,
      price
      }
  }
`,
  };

  const query = statusQuery[status] ?? statusQuery["All"];
  console.log("query", query);

  const newArr: any = [];
  const purchasedItems = await client.fetch(query, { startDate, endDate });
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
    <div className="flex flex-col space-y-4 overflow-y-scroll h-[550px] scrollbar-none">
      {sorted.map((item: IOrderItems) => (
        <OrderItem key={item._key} {...item} />
      ))}
    </div>
  );
};

export default SeachDate;
