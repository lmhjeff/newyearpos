"use client";

import { useState } from "react";

const Product = () => {
  const [qty, setQty] = useState<number>(0);
  const adjustCount = (count: number) => {
    setQty((prev) => {
      return prev + count;
    });
  };

  return (
    <div className="flex flex-col items-center max-w-[200px] p-2">
      <img
        src="https://images.unsplash.com/photo-1601637826112-ca99647aaaff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
        alt=""
      />
      <h2 className="font-semibold text-xl">New York Cheese</h2>
      <p className="text-lg">$999</p>
      <div className="flex flex-row items-center justify-between w-[100px]">
        <button
          onClick={() => adjustCount(1)}
          className="w-10 h-10 text-lg rounded-md shadow-md"
        >
          +
        </button>
        <div>{qty}</div>
        <button
          onClick={() => adjustCount(-1)}
          disabled={qty < 1}
          className="w-10 h-10 text-lg rounded-md shadow-md"
        >
          -
        </button>
      </div>
    </div>
  );
};

export default Product;
