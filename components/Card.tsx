"use client";

import urlFor from "../lib/urlFor";
import Image from "next/image";
import useStore from "../app/store";
import { useMemo } from "react";

const Card = (product: Product) => {
  const { _id, image, name, price, quantity } = product;
  const { qty, add, reduce, selectedItemWithId, order } = useStore();

  return (
    <div
      key={_id}
      className="flex flex-col justify-start w-full h-60 max-w-sm rounded-lg shadow-md bg-gray-800 border-gray-700"
    >
      <div className="relative w-full h-36 drop-shadow-xl ">
        <Image
          className="object-cover rounded-lg"
          src={urlFor(image).url()}
          alt={name}
          fill
        />
      </div>
      <div className="px-3 mt-2">
        <h5 className="text-lg font-semibold tracking-tighttext-white">
          {name}
        </h5>
        <p className="text-md text-gray-400">Qty: {quantity}</p>

        <div className="flex flex-row items-center justify-between">
          <div className="text-xl font-bold text-white">${price}</div>
          <div className="flex space-x-4 my-4 items-center">
            <button
              //   onClick={() => reduce()}
              className="w-8 h-8 p-0 text-center text-lg border-2 border-white rounded-md bg-transparent"
            >
              -
            </button>
            <span className="text-lg">{selectedItemWithId.length}</span>
            <button
              onClick={() => add(product)}
              className="w-8 h-8 p-0 text-center text-lg border-2 border-white rounded-md bg-transparent"
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
