"use client";

import { CubeTransparentIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

const Cart = () => {
  const [items, setItems] = useState<boolean>(false);
  return (
    <div className="flex flex-col w-[20%] bg-gray-400 h-screen justify-center items-center">
      {!items ? (
        <div className="flex flex-col items-center">
          <CubeTransparentIcon className="h-8 w-8 text-gray-600" />
          <div className="text-gray-600">NO ITEM ADDED!!</div>
        </div>
      ) : (
        <div>Many Items</div>
      )}
    </div>
  );
};

export default Cart;
