import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Product = {
	id: string;
	name: string;
	price: number;
	image: string;
};

type Store = {
	products: Product[];
	addProduct: (product: Product) => void;
	deleteProduct: (id: string) => void;
};

const useAdminProductsStore = create<Store>()(
	persist(
		(set) => ({
			products: [],

			addProduct: (product) =>
				set((state) => ({
					products: [...state.products, product],
				})),

			deleteProduct: (id) =>
				set((state) => ({
					products: state.products.filter((p) => p.id !== id),
				})),
		}),
		{
			name: 'products-storage',
		}
	)
);

export default useAdminProductsStore;