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
  paymentMethod: string;
  selectedItemWithId: (id: string) => void;
}

const useCartStore = create<StoreState>()(
  devtools(
    persist(
      (set, get) => ({
        cart: [],
        qty: 0,
        add: (item) => {
          const inCart = get().cart.find((exist) =>
            exist._id === item._id ? true : false
          );

          set((state) => ({
            cart: inCart
              ? state.cart.map((c) =>
                  c._id === item._id ? { ...c, qty: c.qty + 1 } : c
                )
              : [...state.cart, { ...item, qty: 1 }],
          }));
        },
        reduce: (item: Item) => {
          const inCart = get().cart.find((exist) =>
            exist._id === item._id ? true : false
          );

          if (inCart?.qty! <= 1) {
            set((state) => ({
              cart: state.cart.filter((o) => o._id !== item._id),
            }));
          } else {
            set((state) => ({
              cart: inCart
                ? state.cart.map((c) =>
                    c._id === item._id && c.qty > 0
                      ? { ...c, qty: c.qty - 1 }
                      : c
                  )
                : [...state.cart],
            }));
          }
        },
        removeFromCart: (id) =>
          set((state) => ({
            cart: state.cart.filter((o) => o._id !== id),
          })),
        subTotal: 0,
        discount: 0,
        totalPrice: 0,
        paymentMethod: "cash",
        selectedItemWithId: (id) =>
          set((state) => ({
            cart: state.cart.filter((item) => item._id === id),
          })),
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
