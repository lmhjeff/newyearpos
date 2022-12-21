"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import path from "path";

const menu = [
  {
    name: "Products",
    path: "/products",
  },
  {
    name: "Orders",
    path: "/orders",
  },
  {
    name: "Studio",
    path: "/studio",
  },
];

const Navigation = () => {
  const pathname = usePathname();

  return (
    <div className="my-8 flex flex-col w-full ">
      <ul className="text-gray-400 text-center space-y-6">
        {menu.map((m) => (
          <Link key={m.name} href={m.path} target={m.path === "/studio" ? "_blank" : ""}>
            <li
              
              className={`${
                m.path === pathname
                  ? `bg-[#2d2d2d] rounded-md text-white`
                  : "text-gray-400"
              } p-4 cursor-pointer hover:bg-[#2d2d2d] hover:rounded-md hover:text-white`}
            >
              {m.name}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Navigation;
