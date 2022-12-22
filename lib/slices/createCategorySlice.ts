import { groq } from "next-sanity";
import { InitialValueLoadingMsg } from "sanity";
import { StateCreator } from "zustand";
import { client } from "../sanity.client";

export interface CategorySlice {
  categories: Category[];
  products: Product[];
  fetchProducts: () => void;
  fetchCategories: () => void;
}

export const createCategorySlice: CategorySlice = (set: any) => ({
  categories: [],
  products: [],
  fetchCategories: async () => {
    const query = groq`
        *[_type == 'categories'] | order(category asc)
    `;
    const category = await client.fetch(query);

    set({ categories: await category });
  },
  fetchProducts: async (filter: string) => {
    const query = groq`
        *[$filter in categories[]->category] | order(name asc)
    `;

    const allProducts: Product[] = await client.fetch(query, { filter });
    set({ products: await allProducts });
  },
});
