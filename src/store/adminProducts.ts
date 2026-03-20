'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Product {
	id: string;
	name: string;
	description?: string;
	price: number;
	image: string;
	inStock: boolean;
	stockQuantity: number;
	categoryId: string | null;
	themeId: string | null;
}

interface Store {
	products: Product[];
	hasHydrated: boolean;

	setHasHydrated: (value: boolean) => void;

	addProduct: (product: Omit<Product, 'id'>) => void;
	deleteProduct: (id: string) => void;

	toggleStock: (id: string) => void;
	updatePrice: (id: string, price: number) => void;
	updateStockQuantity: (id: string, quantity: number) => void;
	updateProduct: (id: string, updates: Partial<Product>) => void;
}

const useAdminProductsStore = create<Store>()(
	persist(
		(set, get) => ({
			products: [],
			hasHydrated: false,

			setHasHydrated: (value) => set({ hasHydrated: value }),

			addProduct: (product) => {
				set({
					products: [
						...get().products,
						{
							...product,
							id: crypto.randomUUID(),
						},
					],
				});
			},

			deleteProduct: (id) => {
				set({
					products: get().products.filter((p) => p.id !== id),
				});
			},

			toggleStock: (id) => {
				set({
					products: get().products.map((p) =>
						p.id === id ? { ...p, inStock: !p.inStock } : p
					),
				});
			},

			updatePrice: (id, price) => {
				set({
					products: get().products.map((p) =>
						p.id === id ? { ...p, price } : p
					),
				});
			},

			updateStockQuantity: (id, quantity) => {
				set({
					products: get().products.map((p) =>
						p.id === id
							? {
									...p,
									stockQuantity: quantity,
									inStock: quantity > 0,
							  }
							: p
					),
				});
			},

			updateProduct: (id, updates) => {
				set({
					products: get().products.map((p) =>
						p.id === id ? { ...p, ...updates } : p
					),
				});
			},
		}),
		{
			name: 'admin-products',
			onRehydrateStorage: () => (state) => {
				state?.setHasHydrated(true);
			},
		}
	)
);

export default useAdminProductsStore;