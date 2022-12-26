"use client";

import { CubeTransparentIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import useCartStore from "../app/store";

const Cart = () => {
  const [items, setItems] = useState<boolean>(false);
  const { removeFromCart } = useCartStore();
  const cart = useCartStore((state) => state.cart);

  console.log("cart", cart);

  return (
    <div
      className={`flex flex-col w-[30%] min-w-[350px] h-screen ${
        cart.length > 0 ? "items-start" : "justify-center"
      } p-2 overflow-scroll mx-2 pt-16`}
    >
      {cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center bg-[#2d2d2d] h-full rounded-md">
          <CubeTransparentIcon className="h-8 w-8 text-gray-400" />
          <div className="text-gray-400 text-center">NO ITEM ADDED!!</div>
        </div>
      ) : (
        <div className="flex flex-col items-center w-full pb-2 h-full overflow-scroll relative">
          <div className="flex flex-col items-center space-y-4 w-full h-[380px] overflow-y-scroll scrollbar-none">
            {cart.length > 0
              ? cart?.map((item, i) => (
                  <div
                    key={item._id}
                    className="flex flex-row justify-between items-center w-full bg-[#2d2d2d] text-md text-white p-4 rounded-md space-x-4"
                  >
                    <div className="flex justify-center items-center bg-white w-6 h-6 rounded-full text-[#2d2d2d]">
                      {i + 1}
                    </div>
                    <div className="flex-1 break-all">
                      {item.name} x {item.qty}
                    </div>
                    <div className=" break-all">@ ${item.price}</div>
                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="flex justify-center items-center bg-red-500 w-6 h-6 pb-1 rounded-full text-center"
                    >
                      x
                    </button>
                  </div>
                ))
              : null}
          </div>
          <div className="flex flex-col justify-between items-center bg-[#2d2d2d] rounded-md w-full h-[380px] absolute bottom-0 p-4 space-y-3">
            <div className="w-full">
              <div className="flex flex-row w-full justify-between items-center">
                <p>Subtotal</p>
                <p>$999</p>
              </div>
              <div className="flex flex-row w-full justify-between items-center">
                <p>Discount</p>
                <p>$999</p>
              </div>
              <hr className="border-dashed border-1 border-white w-full" />
              <div className="flex flex-row w-full justify-between items-center my-2 text-3xl font-semibold">
                <p>Total</p>
                <p>$999</p>
              </div>
            </div>
            <div className="flex flex-col w-full mt-8 space-y-4">
              <h3>Payment Method</h3>
              <div className="flex flex-row w-full justify-between">
                <ul className="grid grid-cols-3 gap-3 items-center w-full">
                  <li className="relative">
                    <input
                      id="default-radio-1"
                      type="radio"
                      value="cash"
                      name="default-radio"
                      className="peer text-black hidden"
                    />
                    <label
                      htmlFor="default-radio-1"
                      className="flex cursor-pointer border-white border-[1px] justify-center items-center px-4 py-2 rounded-lg w-full peer-checked:bg-white peer-checked:text-black text-lg  "
                    >
                      Cash
                    </label>
                  </li>
                  <li className="relative">
                    <input
                      id="default-radio-2"
                      type="radio"
                      value="payme"
                      name="default-radio"
                      className="peer text-black hidden"
                    />
                    <label
                      htmlFor="default-radio-2"
                      className="flex cursor-pointer border-white border-[1px]  justify-center items-center px-4 py-2 rounded-lg w-full peer-checked:bg-white peer-checked:text-black text-lg  "
                    >
                      Payme
                    </label>
                  </li>
                  <li className="relative">
                    <input
                      id="default-radio-3"
                      type="radio"
                      value="payme"
                      name="default-radio"
                      className="peer text-black hidden"
                    />
                    <label
                      htmlFor="default-radio-3"
                      className="flex cursor-pointer border-white border-[1px]  justify-center items-center px-4 py-2 rounded-lg w-full peer-checked:bg-white peer-checked:text-black text-lg  "
                    >
                      FPS
                    </label>
                  </li>
                </ul>
              </div>
              <button className="bg-green-300 w-full rounded-3xl p-4 font-semibold text-lg text-gray-700">
                Place Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;


