import type { NextApiRequest, NextApiResponse } from "next";
import { client } from "../../lib/sanity.client";

export default async function createOrder(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    orderItems,
    subTotal,
    discount,
    discountPrice,
    paymentMethod,
    total,
    preOrder,
    createdAt,
    address,
    status,
  } = JSON.parse(req.body);

  try {
    await client
      .create({
        _type: "orders",
        orderId: `EXJP-${new Date().toLocaleString().replace(",", "")}`,
        orderItems: orderItems,
        subTotal: subTotal,
        discount: discount,
        discountPrice: discountPrice ?? 0, //string
        paymentMethod: paymentMethod,
        total: +total.toFixed(2), //+make string to number
        preOrder: preOrder,
        createdAt: createdAt,
        address: address,
        status: status,
      })
      .then((res) => {
        console.log("Whole lot of stuff just happened", res);
      });
  } catch (err) {
    console.log("Transaction failed: ", err);
  }

  return res.status(200).json({ message: "Order placed" });
}
