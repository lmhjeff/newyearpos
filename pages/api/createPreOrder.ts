import dayjs from "dayjs";
import type { NextApiRequest, NextApiResponse } from "next";
import { client } from "../../lib/sanity.client";
import urlFor from "../../lib/urlFor";
import uuid from "short-uuid";

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
        orderId: uuid.generate(),
        orderItems: orderItems,
        subTotal: subTotal,
        discount: discount,
        discountPrice: discountPrice ?? "0", //string
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
        <div style="display:flex; flex-direction:column; background: #84d8ff; justify-content: center; align-items: center;">
          <div style="display:flex; flex-direction:column; justify-content: center; align-items: center; background: #ffffff; width: 75%; padding: 1rem; margin-top: 0.75rem; margin-top: 0.875rem;">
            <div>
              <a href="https://exjapanshopping.boutir.com/">
                <img src="https://img.boutirapp.com/i/EfheqyWX8Af9PrxnbC5DVwrd0UVq9yi5Hw8D0BjE93W=sxs" width="50" height="50" />
              </a>
            </div>

            <h2 style="font-size: 1.5rem; color: #84d8ff; ">EX JAPAN 日本代購已經收到你的訂單</h2>

            <div style="margin: 4px 4px;">感謝你的訂購。你可在下面找到有關是次訂購的詳情：</div>

            <div style="display:flex; flex-direction:column; width: 100%;">
              <div style="display: flex; flex-direction: row; justify-content: space-between; width: 100%;">
                <div>訂單號碼:</div>
                <div style="font-size: 1.5rem;">${orderId}</div>
              </div>

              <div style="display: flex; flex-direction: row; justify-content: space-between; width: 100%;">
                <div>收件人姓名:</div>
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
                <div>付款方式:</div>
                <div>${paymentMethod}</div>
              </div>

              <div style="display: flex; flex-direction: row; justify-content: space-between; width: 100%;">
                <div style="flex: 1 1 0%; ">送貨地址:</div>
                <div style="display: flex; overflow-wrap: break-word; justify-content: flex-end; width: 75%; ">${address}</div>
              </div>

              <div style="display: flex; flex-direction: row; justify-content: space-between; width: 100%;">
                <div>預計發貨日期:</div>
                <div>2023-01-19</div>
              </div>
            </div>
           
            <div style="display:flex; flex-direction:column; width: 100%;">
              <h1 style="font-size: 1.5rem; line-height: 2rem; font-weight: 600; width: 100%;">已購產品</h1>
              <div style="display: flex; margin-top: 1rem; flex-direction: column; width: 100%; border-top-width: 1px;">
                ${orderItems.map(
                  (item: OrderItem) =>
                    `<div style="display: flex; padding-top: 1rem; flex-direction: row; justify-content: space-between; width: 100%;">
                      <img style="object-fit: cover;" src="${urlFor(
                        item.image
                      ).url()}" width="128" height="128" />

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
            <div>
              <p style="line-height: 2;">
              如你對賣家有任何查詢，可電郵賣家至  <a style="color: #84d8ff;" href="mailto:exjapanshopping@gmail.com">exjapanshopping@gmail.com</a>

              瀏覽網頁時遇上問題嗎? 請回應此電郵，我們會儘快答覆。
              
              購物愉快
              
              祝好
              </p>
            </div>
          </div>
        </div>
  `;

        const msg = {
          to: `${email}`,
          from: "exjapanshopping@gmail.com", // Use the email address or domain you verified above
          subject: `EX JAPAN 日本代購 - 新年送禮預訂`,
          text: "hi",
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
