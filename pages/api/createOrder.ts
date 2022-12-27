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
  } = JSON.parse(req.body);

  try {
    await client
      .create({
        _type: "orders",
        orderId: `exjp-${new Date().toLocaleString().replace(",", "")}`,
        orderItems: orderItems,
        subTotal: subTotal,
        discount: discount,
        discountPrice: discountPrice ?? 0, //string
        paymentMethod: paymentMethod,
        total: total,
        preOrder: preOrder,
        createdAt: createdAt,
      })
      .then((res) => {
        console.log("res", res);
      });
  } catch (err) {
    console.log(err);
  }

  return res.status(200).json({ message: "Order placed" });
}
