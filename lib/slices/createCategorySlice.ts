import { groq } from "next-sanity";
import { InitialValueLoadingMsg } from "sanity";
import { StateCreator } from "zustand";
import { client } from "../sanity.client";

export interface CategorySlice {
  categories: Category[];
  products: Product[];
  fetchProducts: (filter: string) => void;
  fetchCategories: () => void;
}

export const createCategorySlice: StateCreator<CategorySlice> = (set: any) => ({
  categories: [],
  products: [],
  fetchProducts: async (filter: string) => {
    const query = groq`
        *[$filter in categories[]->category] | order(name asc)
    `;

    const allProducts: Product[] = await client.fetch(query, { filter });
    set({ products: allProducts });
  },
  fetchCategories: async () => {
    const query = groq`
        *[_type == 'categories'] | order(category asc)
    `;
    const category = await client.fetch(query);

    set({ categories: category });
  },
});
