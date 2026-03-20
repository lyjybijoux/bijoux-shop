import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Category = {
	id: string;
	name: string;
	slug: string;
};

type Store = {
	categories: Category[];

	addCategory: (name: string) => void;
	deleteCategory: (id: string) => void;

	getCategoryById: (id: string) => Category | undefined;
};

// 🔤 slug propre
const slugify = (text: string): string =>
	text
		.toLowerCase()
		.trim()
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '') // accents
		.replace(/\s+/g, '-')
		.replace(/[^\w-]+/g, '');

const useAdminCategoriesStore = create<Store>()(
	persist(
		(set, get) => ({
			categories: [],

			addCategory: (name) => {
				const clean = name.trim();
				if (!clean) return;

				const slug = slugify(clean);

				// 🔒 éviter doublons
				const exists = get().categories.some(
					(c) => c.slug === slug
				);
				if (exists) return;

				const newCategory: Category = {
					id: crypto.randomUUID(),
					name: clean,
					slug,
				};

				set((state) => ({
					categories: [...state.categories, newCategory],
				}));
			},

			deleteCategory: (id) => {
				set((state) => ({
					categories: state.categories.filter(
						(c) => c.id !== id
					),
				}));
			},

			getCategoryById: (id) => {
				return get().categories.find((c) => c.id === id);
			},
		}),
		{
			name: 'categories-storage',
		}
	)
);

/*
interface Category {
	id: string;
	name: string;
}

interface Store {
	categories: Category[];
	addCategory: (name: string) => void;
	deleteCategory: (id: string) => void;
}
const useAdminCategoriesStore = create<Store>()(
	persist(
		(set, get) => ({
			categories: [],

			addCategory: (name) => {
				set({
					categories: [
						...get().categories,
						{
							id: crypto.randomUUID(),
							name,
						},
					],
				});
			},

			deleteCategory: (id) => {
				set({
					categories: get().categories.filter((c) => c.id !== id),
				});
			},
		}),
		{
			name: 'admin-categories',
		}
	)
);
*/

export default useAdminCategoriesStore;