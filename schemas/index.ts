import { categories } from "./categories";
import { products } from "./products";
import { orders } from "./orders";
import { orderItem } from "./orderItem";


export const schemaTypes = [
  ...categories,
  ...products,
  ...orders,
  ...orderItem,
];
