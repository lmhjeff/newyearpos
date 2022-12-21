import { devtools, persist } from "zustand/middleware";
import create from "zustand";

interface storeState {
  order: Item[];
  add: () => void;
  reduce: () => void;
  removeFromCart: (id: number) => void;
  totalPrice: number;
  discount?: number;
  paymentMethod: string;
}

const useStore = create((set) => ({}));
