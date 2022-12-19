export const products = [
  {
    title: "Products",
    name: "products",
    type: "document",
    fields: [
      {
        name: "image",
        title: "Image",
        type: "image",
        options: {
          hotspot: true,
        },
      },
      {
        name: "name",
        title: "Product name",
        type: "string",
        validation: (Rule: { required: () => any }) => Rule.required(),
      },
      {
        name: "quantity",
        title: "Quantity",
        type: "number",
        validation: (Rule: { required: () => any }) => Rule.required().min(0),
      },
      {
        name: "price",
        title: "Price",
        type: "number",
        validation: (Rule: { required: () => any }) => Rule.required().min(0),
      },
      {
        name: "categories",
        title: "Categories",
        type: "array",
        of: [
          {
            type: "reference",
            to: {
              type: "categories",
            },
          },
        ],
      },
    ],
  },
];
