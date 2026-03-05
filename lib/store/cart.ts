import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type CartItem = {
  product_id: string;
  variant_id: string;
  name: string;
  variant_name: string;
  price_cents: number;
  quantity: number;
  image_path?: string | null;
};

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (variant_id: string) => void;
  updateQuantity: (variant_id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        set((state) => {
          const existingItem = state.items.find((i) => i.variant_id === item.variant_id);
          if (existingItem) {
            return {
              items: state.items.map((i) =>
                i.variant_id === item.variant_id
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              ),
            };
          }
          return { items: [...state.items, item] };
        });
      },
      removeItem: (variant_id) => {
        set((state) => ({
          items: state.items.filter((i) => i.variant_id !== variant_id),
        }));
      },
      updateQuantity: (variant_id, quantity) => {
        set((state) => ({
          items: state.items.map((i) =>
            i.variant_id === variant_id ? { ...i, quantity } : i
          ),
        }));
      },
      clearCart: () => set({ items: [] }),
      totalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },
      totalPrice: () => {
        return get().items.reduce((total, item) => total + item.price_cents * item.quantity, 0);
      },
    }),
    {
      name: 'azo-cart-storage',
    }
  )
);
