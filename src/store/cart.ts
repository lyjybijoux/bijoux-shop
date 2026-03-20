'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type CartItem = {
	id: string;
	title: string;
	price: number;
	quantity: number;
};

type Store = {
	items: CartItem[];
	userId: string | null;

	addToCart: (item: CartItem) => void;
	removeFromCart: (id: string) => void;
	increaseQty: (id: string) => void;
	decreaseQty: (id: string) => void;

	setUserId: (userId: string) => void;
	clearCart: () => void;
};

const useCartStore = create<Store>()(
	persist(
		(set, get) => ({
			items: [],
			userId: null,

			// 🔥 Ajouter au panier
			addToCart: (item) => {
				const existing = get().items.find((i) => i.id === item.id);

				if (existing) {
					set({
						items: get().items.map((i) =>
							i.id === item.id
								? { ...i, quantity: i.quantity + 1 }
								: i
						),
					});
				} else {
					set({
						items: [...get().items, item],
					});
				}
			},

			// ❌ Supprimer
			removeFromCart: (id) => {
				set({
					items: get().items.filter((i) => i.id !== id),
				});
			},

			// ➕ Quantité
			increaseQty: (id) => {
				set({
					items: get().items.map((i) =>
						i.id === id ? { ...i, quantity: i.quantity + 1 } : i
					),
				});
			},

			// ➖ Quantité
			decreaseQty: (id) => {
				set({
					items: get().items.map((i) =>
						i.id === id
							? { ...i, quantity: Math.max(1, i.quantity - 1) }
							: i
					),
				});
			},

			// 🔥 LIAISON USER → PANIER
			setUserId: (userId) => {
				const currentUserId = get().userId;

				// 👉 si on change d'utilisateur → reset panier
				if (currentUserId && currentUserId !== userId) {
					set({
						userId,
						items: [],
					});
				} else {
					set({ userId });
				}
			},

			// 🧹 Reset panier
			clearCart: () => {
				set({ items: [] });
			},
		}),
		{
			name: 'cart-storage',
		}
	)
);

export default useCartStore;