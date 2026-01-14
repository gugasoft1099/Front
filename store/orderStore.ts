import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Order } from '@/types';

interface OrderStore {
  orders: Order[];
  addOrder: (order: Order) => void;
  getOrderById: (orderId: string) => Order | undefined;
  getOrderByNumber: (orderNumber: string) => Order | undefined;
}

export const useOrderStore = create<OrderStore>()(
  persist(
    (set, get) => ({
      orders: [],

      addOrder: (order) => {
        set((state) => ({
          orders: [order, ...state.orders]
        }));
      },

      getOrderById: (orderId) => {
        return get().orders.find((order) => order.id === orderId);
      },

      getOrderByNumber: (orderNumber) => {
        return get().orders.find((order) => order.orderNumber === orderNumber);
      }
    }),
    {
      name: 'orders-storage'
    }
  )
);
