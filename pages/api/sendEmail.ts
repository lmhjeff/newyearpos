import type { NextApiRequest, NextApiResponse } from "next";

const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
export default async function sendEmail(
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
    username,
    phoneNumber,
    email,
    orderId,
  } = JSON.parse(req.body);

  const htmlContent = `
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
                <div>HKD ${subTotal}</div>
              </div>
              <div className="flex flex-row w-1/2 justify-between">
                <div>{discount === "percentage" ? "折扣%" : "折扣價"}</div>
                <div className="text-red-500">
                  {${discount} === "percentage"
                    ? x ${discountPrice}
                    : HKD -${discountPrice}}
                </div>
              </div>
              <div className="flex flex-row font-extrabold text-xl w-1/2 justify-between">
                <div>總數</div>
                <div>HKD ${total}</div>
              </div>
            </div>
          </div>
  `;

  const msg = {
    to: `${email}`,
    from: "exjapanshopping@gmail.com", // Use the email address or domain you verified above
    subject: `EX JAPAN 日本代購 - 新年送禮預訂`,
    text: "and easy to do anywhere, even with Node.js",
    html: htmlContent,
  };

  try {
    await sgMail.send(msg);
  } catch (error: any) {
    console.error(error);

    if (error.response) {
      console.error(error.response.body);
    }
  }
}
