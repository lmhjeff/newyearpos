import create from "zustand";
import { devtools, persist } from "zustand/middleware";
interface StoreState {
  cart: Item[];
  add: (item: Item) => void;
  reduce: (item: Item) => void;
  qty: number;
  removeFromCart: (id: string) => void;
  subTotal: number;
  discount?: number;
  totalPrice: number;
  reset: () => void;
  storeStatus: string;
  setStatus: (status: string) => void;
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
        storeStatus: "All",
        add: (item) => {
          const inCart = get().cart.find((exist) =>
            exist._id === item._id ? true : false
          );

          set((state) => ({
            cart: inCart
              ? state.cart.map((c) =>
                  c._id === item._id ? { ...c, orderQty: c.orderQty! + 1 } : c
                )
              : [...state.cart, { ...item, orderQty: 1 }],
            subTotal: state.subTotal + item.price,
          }));
        },
        reduce: (item: Item) => {
          const inCart = get().cart.find((exist) =>
            exist._id === item._id ? true : false
          );

          if (inCart?.orderQty! <= 1) {
            set((state) => ({
              cart: state.cart.filter((o) => o._id !== item._id),
              subTotal: state.subTotal - item.price,
            }));
          } else {
            set((state) => ({
              cart: inCart
                ? state.cart.map((c) =>
                    c._id === item._id && c.orderQty! > 0
                      ? { ...c, orderQty: c.orderQty! - 1 }
                      : c
                  )
                : [...state.cart],
              subTotal: inCart ? state.subTotal - item.price : state.subTotal,
            }));
          }
        },
        removeFromCart: (id) => {
          const totalPrice = get().cart.find((item) => item._id === id);
          const { price, orderQty } = totalPrice!;

          set((state) => ({
            cart: state.cart.filter((o) => o._id !== id),
            subTotal: state.subTotal - price * orderQty!,
          }));
        },
        reset: () => {
          set((state) => ({
            cart: [],
            qty: 0,
            subTotal: 0,
            discount: 0,
            totalPrice: 0,
          }));
        },
        setStatus: (status) => {
          set((state) => ({
            storeStatus: status,
          }));
        },
      }),
      {
        name: "cart-storage",
      }
    )
  )
);

export default useCartStore;
