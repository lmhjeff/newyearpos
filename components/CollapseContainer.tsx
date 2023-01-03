// @ts-noch/eck
"use client";

import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import urlFor from "../lib/urlFor";
import Image from "next/image";

const orderStatus: { [key: string]: string } = {
  Completed: "已完成",
  PreOrder: "預訂貨品",
  WaitingForDelivery: "等待發貨",
};

// const statusColor: { [key: string]: string } = {
//   Completed: "#6be2a2",
//   PreOrder: "#FF8F3A",
//   WaitingForDelivery: "#ff5f5a",
// };

const CollapseContainer = (order: Order) => {
  const {
    orderId,
    orderItems,
    subTotal,
    discount,
    discountPrice,
    paymentMethod,
    total,
    preOrder,
    createdAt,
    address,
    remark,
    status,
    username,
    phoneNumber,
    email,
  } = order;
  const [collapse, setCollapse] = useState<string[]>([]);

  const toggleCollapse = (id: string) => {
    if (collapse.includes(id)) {
      const openCollapse = collapse.filter((order) => order !== id);
      setCollapse(openCollapse);
      return;
    }
    setCollapse([...collapse, id]);
  };

  return (
    <div
      key={orderId}
      onClick={() => toggleCollapse(orderId)}
      className={`flex flex-col justify-between items-center text-white text-lg border-[1px] ${
        preOrder ? "border-orange-300" : "border-green-400"
      } rounded-lg`}
    >
      <div
        className={`flex flex-row w-full items-center rounded-lg ${
          collapse.includes(orderId)
            ? "bg-[#65dce1] text-gray-900"
            : "bg-transparent"
        }`}
      >
        {collapse.includes(orderId) ? (
          <ChevronUpIcon className="w-6 h-6 mx-2" />
        ) : (
          <ChevronDownIcon className="w-6 h-6 mx-2" />
        )}
        <div
          className={`flex flex-row justify-between items-center w-full py-4  `}
        >
          <div className="w-32">
            {dayjs(createdAt).format("YYYY/MM/DD HH:mm:ss")}
          </div>
          <div className="flex-1">{orderId}</div>
          <div className={`flex-1`}>{orderStatus[status]}</div>
          <div className="flex-1">{total}</div>
          <div className="flex-1">{paymentMethod}</div>
        </div>
      </div>
      <div
        className={`${
          collapse.includes(orderId) ? "flex justify-center w-full" : "hidden"
        } ease-in-out`}
      >
        <div className="flex flex-col justify-center items-center w-1/2 p-4 space-y-3">
          <div className="flex flex-row w-full justify-between">
            <div>客人姓名:</div>
            <div>{username}</div>
          </div>
          <div className="flex flex-row w-full justify-between">
            <div>電話號碼:</div>
            <div>{phoneNumber}</div>
          </div>
          <div className="flex flex-row w-full justify-between">
            <div>電郵:</div>
            <div>{email}</div>
          </div>
          <div className="flex flex-row w-full justify-between">
            <div>客人備註:</div>
            <div>{remark}</div>
          </div>
          <div className="flex flex-row w-full justify-between">
            <div className="flex-1">地址：</div>
            <div className="flex justify-end break-words w-3/4">{address}</div>
          </div>
          <h1 className="w-full text-2xl font-semibold">已購產品</h1>
          <div className="divide-y flex flex-col w-full space-y-4">
            {orderItems.map((item) => (
              <div className="flex flex-row justify-between w-full pt-4">
                <Image
                  className="object-cover w-32 h-32"
                  src={urlFor(item.image).url()}
                  alt={item.name}
                  priority
                  width={200}
                  height={200}
                />

                <div className="flex items-center justify-center">
                  {item.name}
                </div>
                <div className="flex flex-col items-end justify-center space-y-6">
                  <div>x {item.orderQty}</div>
                  <div>HKD {item.price}</div>
                </div>
              </div>
            ))}
            <div className="flex flex-col items-end justify-between w-full space-y-3 pt-2">
              <div className="flex flex-row w-1/2 justify-between">
                <div>小計</div>
                <div>HKD {subTotal}</div>
              </div>
              <div className="flex flex-row w-1/2 justify-between">
                <div>{discount === "percentage" ? "折扣%" : "折扣價"}</div>
                <div className="text-red-500">
                  {discount === "percentage"
                    ? `x ${discountPrice}`
                    : `HKD -${discountPrice}`}
                </div>
              </div>
              <div className="flex flex-row font-extrabold text-xl w-1/2 justify-between">
                <div>總數</div>
                <div>HKD {total}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollapseContainer;
