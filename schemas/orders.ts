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
      {
        name: "address",
        title: "Address",
        type: "string",
      },
      {
        name: "remark",
        title: "Remark",
        type: "text",
      },
      {
        name: "status",
        title: "Status",
        type: "string",
      },
      {
        name: "username",
        title: "Customer Name",
        type: "string",
      },
      {
        name: "phoneNumber",
        title: "Phone Number",
        type: "number",
      },
      {
        name: "email",
        title: "Email",
        type: "string",
      },
    ],
  },
];
