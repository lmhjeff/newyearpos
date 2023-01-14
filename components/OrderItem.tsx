"use client";
interface IOrderItems {
  orderItems?: any;
  _key: string;
  name: string;
  orderQty: number;
  price: number;
}

const OrderItem = (sortedItem: IOrderItems) => {
  return (
    <div className="flex flex-row  text-gray-200 p-3 text-xl justify-between items-center rounded-lg shadow-md">
      <div className="w-48 break-words">{sortedItem.name}</div>
      <div className="w-24">HKD {sortedItem.price}</div>

      <div className="w-20">x{sortedItem.orderQty}</div>

      <div className="w-24">HKD {sortedItem.orderQty * sortedItem.price}</div>
    </div>
  );
};

export default OrderItem;
