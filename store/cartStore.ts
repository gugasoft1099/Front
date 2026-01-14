import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Product } from '@/types';

interface CartStore {
  items: CartItem[];
  addItem: (product: Product, quantity: number, selectedColor?: string, selectedSize?: string) => void;
  removeItem: (productId: string, selectedColor?: string, selectedSize?: string) => void;
  updateQuantity: (productId: string, quantity: number, selectedColor?: string, selectedSize?: string) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (product, quantity, selectedColor, selectedSize) => {
        set((state) => {
          const existingItemIndex = state.items.findIndex(
            (item) =>
              item.product.id === product.id &&
              item.selectedColor === selectedColor &&
              item.selectedSize === selectedSize
          );

          if (existingItemIndex > -1) {
            const newItems = [...state.items];
            newItems[existingItemIndex].quantity += quantity;
            return { items: newItems };
          }

          return {
            items: [
              ...state.items,
              { product, quantity, selectedColor, selectedSize }
            ]
          };
        });
      },

      removeItem: (productId, selectedColor, selectedSize) => {
        set((state) => ({
          items: state.items.filter(
            (item) =>
              !(
                item.product.id === productId &&
                item.selectedColor === selectedColor &&
                item.selectedSize === selectedSize
              )
          )
        }));
      },

      updateQuantity: (productId, quantity, selectedColor, selectedSize) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.product.id === productId &&
            item.selectedColor === selectedColor &&
            item.selectedSize === selectedSize
              ? { ...item, quantity }
              : item
          )
        }));
      },

      clearCart: () => {
        set({ items: [] });
      },

      getTotal: () => {
        return get().items.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
        );
      },

      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      }
    }),
    {
      name: 'cart-storage'
    }
  )
);
