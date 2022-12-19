export const categories = [
  {
    title: "Categories",
    name: "categories",
    type: "document",
    fields: [
      {
        type: "string",
        name: "category",
        title: "Category",
      },
      {
        name: "image",
        title: "Image",
        type: "image",
        options: {
          hotspot: true,
        },
      },
    ],
  },
];
