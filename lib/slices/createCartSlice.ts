import { StateCreator } from "zustand";
import Product from "../../components/Product";

export interface CartSlice {
  cart: Product[];
  //   add: (product: Product) => void;
  //   reduce: (product: Product) => void;
  removeFromCart: (id: string) => void;
}

export const createCartSlice: StateCreator<CartSlice> = (set, get) => ({
  cart: [],
  // add: (product:Product) => {
  //     const cart = get().cart
  //     const findProduct = cart.find(p=> p._id === product._id)
  //     if(findProduct) {
  //         findProduct.quantity! += 1
  //     } else {
  //         cart.push({...product, quantity +1})
  //     }
  //     set({cart})
  // }
  removeFromCart: (id: string) => {
    set({ cart: get().cart.filter((product) => product._id !== id) });
  },
});
