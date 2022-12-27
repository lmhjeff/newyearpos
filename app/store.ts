import { devtools, persist } from "zustand/middleware";
import create from "zustand";
import Orders from "./(user)/orders/page";
import { CartSlice, createCartSlice } from "../lib/slices/createCartSlice";
import {
  CategorySlice,
  createCategorySlice,
} from "../lib/slices/createCategorySlice";

// type StoreState = CategorySlice & CartSlice;

interface StoreState {
  cart: Item[];
  add: (item: Item) => void;
  reduce: (item: Item) => void;
  qty: number;
  removeFromCart: (id: string) => void;
  subTotal: number;
  discount?: number;
  totalPrice: number;
}

const useCartStore = create<StoreState>()(
  devtools(
    persist(
      (set, get) => ({
        cart: [],
        qty: 0,
        subTotal: 0,
        discount: 0,
        totalPrice: 0,
        add: (item) => {
          const inCart = get().cart.find((exist) =>
            exist._id === item._id ? true : false
          );

          set((state) => ({
            cart: inCart
              ? state.cart.map((c) =>
                  c._id === item._id ? { ...c, qty: c.qty! + 1 } : c
                )
              : [...state.cart, { ...item, qty: 1 }],
            subTotal: state.subTotal + item.price,
          }));
        },
        reduce: (item: Item) => {
          const inCart = get().cart.find((exist) =>
            exist._id === item._id ? true : false
          );

          if (inCart?.qty! <= 1) {
            set((state) => ({
              cart: state.cart.filter((o) => o._id !== item._id),
              subTotal: state.subTotal - item.price,
            }));
          } else {
            set((state) => ({
              cart: inCart
                ? state.cart.map((c) =>
                    c._id === item._id && c.qty! > 0
                      ? { ...c, qty: c.qty! - 1 }
                      : c
                  )
                : [...state.cart],
              subTotal: inCart ? state.subTotal - item.price : state.subTotal,
            }));
          }
        },
        removeFromCart: (id) => {
          const totalPrice = get().cart.find((item) => item._id === id);
          const { price, qty } = totalPrice!;

          set((state) => ({
            cart: state.cart.filter((o) => o._id !== id),
            subTotal: state.subTotal - price * qty!,
          }));
        },
      }),
      {
        name: "cart-storage",
      }
    )
  )
);

// export const useCartStore = create<StoreState>((...a) => ({
//   ...createCartSlice(...a),
//   ...createCategorySlice(...a),
// }));

export default useCartStore;
