'use client';

import { create } from 'zustand';

export type Customer = {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	createdAt: string;
	totalSpent: number;
	orderCount: number;
	loyaltyPoints: number;
};

type Store = {
	customers: Customer[];
	addCustomer: (firstName: string, lastName: string, email: string) => void;
	deleteCustomer: (id: string) => void;
	addOrderToCustomer: (id: string, amount: number) => void;
	searchCustomers: (query: string) => Customer[];
	getStats: () => { totalCustomers: number; totalRevenue: number };
};

const useAdminCustomersStore = create<Store>((set, get) => ({
	customers: [],

	addCustomer: (firstName, lastName, email) => {
		set((state) => ({
			customers: [
				...state.customers,
				{
					id: crypto.randomUUID(),
					firstName,
					lastName,
					email,
					createdAt: new Date().toISOString(),
					totalSpent: 0,
					orderCount: 0,
					loyaltyPoints: 0,
				},
			],
		}));
	},

	deleteCustomer: (id) => {
		set((state) => ({
			customers: state.customers.filter((c) => c.id !== id),
		}));
	},

	addOrderToCustomer: (id, amount) => {
		set((state) => ({
			customers: state.customers.map((c) =>
				c.id === id
					? {
							...c,
							orderCount: c.orderCount + 1,
							totalSpent: c.totalSpent + amount,
							loyaltyPoints: c.loyaltyPoints + Math.floor(amount),
					  }
					: c
			),
		}));
	},

	searchCustomers: (query) => {
		const q = query.toLowerCase();
		return get().customers.filter(
			(c) =>
				c.firstName.toLowerCase().includes(q) ||
				c.lastName.toLowerCase().includes(q) ||
				c.email.toLowerCase().includes(q)
		);
	},

	getStats: () => {
		const customers = get().customers;
		return {
			totalCustomers: customers.length,
			totalRevenue: customers.reduce(
				(sum, c) => sum + c.totalSpent,
				0
			),
		};
	},
}));

export default useAdminCustomersStore;