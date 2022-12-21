"use client";

import { CubeTransparentIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import useCartStore from "../app/store";

const Cart = () => {
  const [items, setItems] = useState<boolean>(false);
  const { order, removeFromCart } = useCartStore();

  console.log("order", order);

  return (
    <div
      className={`flex flex-col w-[30%] min-w-[350px] h-screen ${
        order.length > 0 ? "items-start" : "justify-center"
      } p-2 overflow-scroll mx-2`}
    >
      {!order.length ? (
        <div className="flex flex-col items-center justify-center">
          <CubeTransparentIcon className="h-8 w-8 text-gray-600" />
          <div className="text-gray-600 text-center">NO ITEM ADDED!!</div>
        </div>
      ) : (
        <div className="flex flex-col w-full space-y-4 pt-16 pb-2 min-h-[600px] overflow-scroll">
          {order.map((item, i) => (
            <div
              key={item._id}
              className="flex flex-row items-center w-full bg-[#2d2d2d] text-white p-4 rounded-md space-x-4"
            >
              <div className="bg-white w-6 h-6 text-center rounded-full text-[#2d2d2d]">
                {i + 1}
              </div>
              <div>{item.name} x 1</div>
              <div>@ ${item.price}</div>
              <button
                onClick={() => removeFromCart(item._id)}
                className="bg-red-500 w-6 h-6 rounded-full text-center"
              >
                x
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;
