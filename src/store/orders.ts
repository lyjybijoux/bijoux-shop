import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type OrderItem = {
	name: string;
	price: number;
	quantity: number;
};

export type Order = {
	id: string;
	items: OrderItem[];
	total: number;
	date: string;
};

type Store = {
	orders: Order[];
	addOrder: (order: Order) => void;
};

const useOrdersStore = create<Store>()(
	persist(
		(set) => ({
			orders: [],

			addOrder: (order) =>
				set((state) => ({
					orders: [order, ...state.orders],
				})),
		}),
		{
			name: 'orders-storage',
		}
	)
);

export default useOrdersStore;