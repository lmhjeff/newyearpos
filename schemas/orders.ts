export const orders = [
  {
    title: "Orders",
    name: "orders",
    type: "document",
    fields: [
      {
        name: "orderId",
        title: "Order ID",
        type: "string",
      },
      {
        name: "orderItems",
        title: "Order Items",
        type: "array",
        of: [
          {
            title: "Order Item",
            type: "orderItem",
          },
        ],
      },
      {
        name: "subTotal",
        title: "SubTotal",
        type: "number",
      },
      {
        name: "discount",
        title: "Discount (Selling Price / %)",
        type: "string",
      },
      {
        name: "discountPrice",
        title: "Price - Depends on discount (Number / %)",
        type: "string",
      },
      {
        name: "paymentMethod",
        title: "PaymentMethod",
        type: "string",
      },
      {
        name: "total",
        title: "Total",
        type: "number",
      },
      {
        name: "preOrder",
        title: "Pre Order",
        type: "boolean",
        initialValue: false,
      },
      {
        name: "createdAt",
        title: "Created At",
        type: "datetime",
      },
    ],
  },
];
