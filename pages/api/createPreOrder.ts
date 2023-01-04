import dayjs from "dayjs";
import type { NextApiRequest, NextApiResponse } from "next";
import { client } from "../../lib/sanity.client";
import urlFor from "../../lib/urlFor";

const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default async function createPreOrder(
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
        username: username,
        phoneNumber: phoneNumber,
        email: email,
      })
      .then(async (res) => {
        console.log("Whole lot of stuff just happened", res);
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
          status,
          username,
          phoneNumber,
          email,
        } = res;

        // const htmlContent = `

        //   <div style="background:blue; color:red; font-size: 12px; padding: 4px; ">
        //     <h1 style="font-size:24px;">${orderId}</h1>
        //     ${orderItems.map(
        //       (order: any) =>
        //         `
        //           <div>
        //             <img src="${urlFor(
        //               order.image
        //             ).url()}" width="128" height="128" />
        //             <div>${order.name}</div>
        //             <div>${order.price}</div>
        //             <div>${order.orderQty}</div>

        //           </div>
        //         `
        //     )}
        //     <p >${username}</p>
        //     <p>${paymentMethod}</p>
        //     <p>${phoneNumber}</p>
        //     <p>${subTotal}</p>
        //     <p>${total}</p>
        //     <p>${dayjs(createdAt).format("YYYY/MM/DD HH:mm:ss")}</p>

        //   </div>
        // `;

        const htmlContent = `
      <div style="display:flex; flex-direction:column; justify-content: center; align-items: center; width: 50%; padding: 1rem; margin-top: 0.75rem; margin-top: 0.875rem; ">
        <div style="display: flex; flex-direction: row; justify-content: space-between; width: 100%;">
          <div>客人姓名:</div>
          <div>${username}</div>
        </div>
        <div style="display: flex; flex-direction: row; justify-content: space-between; width: 100%;">
          <div>電話號碼:</div>
          <div>${phoneNumber}</div>
        </div>
        <div style="display: flex; flex-direction: row; justify-content: space-between; width: 100%;">
          <div>電郵:</div>
          <div>${email}</div>
        </div>
        <div style="display: flex; flex-direction: row; justify-content: space-between; width: 100%;">
          <div style="flex: 1 1 0%; ">送貨地址:</div>
          <div style="display: flex; overflow-wrap: break-word; justify-content: flex-end; width: 75%; ">${address}</div>
        </div>
        <h1 style="font-size: 1.5rem; line-height: 2rem; font-weight: 600; width: 100%;">已購產品</h1>
        <div style="display: flex; margin-top: 1rem; flex-direction: column; width: 100%; border-top-width: 1px;">
          ${orderItems.map(
            (item: OrderItem) =>
              `<div style="display: flex; padding-top: 1rem; flex-direction: row; justify-content: space-between; width: 100%;">
              <img src="${urlFor(item.image).url()}" width="128" height="128" />

              <div style="display: flex; justify-content: center; align-items: center;">
                ${item.name}
              </div>
              <div style="display: flex; margin-top: 1.5rem; flex-direction: column; justify-content: center; align-items: flex-end;">
                <div>x ${item.orderQty}</div>
                <div>HKD ${item.price}</div>
              </div>
            </div>`
          )}
          <div style="display: flex; padding-top: 0.5rem; margin-top: 0.75rem; margin-top: 0.875rem; flex-direction: column; justify-content: space-between; 
            align-items: flex-end; width: 100%;">
            <div style="display: flex; flex-direction: row; justify-content: space-between; width: 50%;">
              <div>小計</div>
              <div>HKD ${subTotal}</div>
            </div>
            <div style="display: flex; flex-direction: row; justify-content: space-between; width: 50%;">
              <div>${discount === "percentage" ? "折扣%" : "折扣價"}</div>
              <div style="color: #EF4444; ">
                ${
                  discount === "percentage"
                    ? `x ${discountPrice}`
                    : `HKD -${discountPrice}`
                }
              </div>
            </div>
            <div style="display: flex; font-size: 1.25rem; line-height: 1.75rem; font-weight: 800; 
              flex-direction: row; justify-content: space-between; width: 50%;">
              <div>總數</div>
              <div>HKD ${total}</div>
            </div>
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
          console.log("email sent");
        } catch (error: any) {
          console.error(error);

          if (error.response) {
            console.error(error.response.body);
          }
        }
      });
  } catch (err) {
    console.log("Transaction failed: ", err);
  }

  return res.status(200).json({ message: "Order placed" });
}
