"use client";

import urlFor from "../lib/urlFor";
import Image from "next/image";
import useCartStore from "../app/store";
import { useEffect, useMemo } from "react";

const Card = (product: Product) => {
  const { _id, image, name, price, quantity } = product;
  const { add, reduce, cart } = useCartStore();

  const qty: number | undefined = cart.find((a) => a._id === _id)?.qty;

  return (
    <div
      key={_id}
      className="flex flex-col justify-start w-full h-60 max-w-sm rounded-lg shadow-md bg-[#2d2d2d] border-gray-700"
    >
      <div className="relative w-full h-36 drop-shadow-xl ">
        <Image
          className="object-cover rounded-lg"
          src={urlFor(image).url()}
          alt={name}
          fill
          sizes="50vw"
          priority
        />
      </div>
      <div className="px-3 mt-2">
        <h5 className="text-lg font-semibold tracking-tighttext-white">
          {name}
        </h5>
        <p className="text-md text-gray-400">Qty: {quantity}</p>

        <div className="flex flex-row items-center justify-between">
          <div className="text-xl font-bold text-white">${price}</div>
          <div className="flex space-x-4 items-center pb-2">
            <button
              onClick={() => reduce(product)}
              className="w-8 h-8 p-0 text-center text-lg border-2 border-gray-500 rounded-md bg-transparent"
            >
              -
            </button>
            <span className="text-lg">{qty ?? 0}</span>
            <button
              onClick={() => add(product)}
              className="w-8 h-8 p-0 text-center text-lg border-2 border-gray-500 rounded-md bg-transparent"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
