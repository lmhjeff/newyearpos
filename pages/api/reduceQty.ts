import type { NextApiRequest, NextApiResponse } from "next";
import { client } from "../../lib/sanity.client";

export default async function reduceQty(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const orderItems = JSON.parse(req.body);

  const newPatch = orderItems.map((order: any) =>
    client.patch(order._key).dec({ quantity: order.orderQty }).commit()
  );

  try {
    await client
      .transaction()
      .patch(newPatch)
      .commit()
      .then((res) => {
        console.log("Quantity reduced", res);
      });
  } catch (err) {
    console.log("Quantity failed: ", err);
  }

  return res.status(200).json({ message: "Quantity reduced sucessfully" });
}
