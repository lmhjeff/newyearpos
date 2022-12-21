import { devtools, persist } from "zustand/middleware";
import create from "zustand";
import Orders from "./(user)/orders/page";

interface StoreState {
  order: Item[];
  add: (item: Item) => void;
  reduce: () => void;
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
    persist((set, get) => ({
      order: [],
      qty: 0,
      add: (item) =>
        set((state) => ({
          order: [...state.order, item],
        })),
      reduce: () =>
        set((state) => ({
          qty: state.qty - 1,
        })),
      removeFromCart: (id) =>
        set((state) => ({
          order: state.order.filter((o) => o._id !== id),
        })),
      subTotal: 0,
      discount: 0,
      totalPrice: 0,
      paymentMethod: "cash",
      selectedItemWithId: (id) =>
        set((state) => ({
          order: state.order.filter((item) => item._id === id),
        })),
    }))
  )
);

export default useCartStore;
