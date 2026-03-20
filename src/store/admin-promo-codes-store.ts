'use client';

import { create } from 'zustand';

export type PromoCode = {
	id: string;
	code: string;
	value: number;
};

type Store = {
	promoCodes: PromoCode[];
	addPromoCode: (code: string, value: number) => void;
	deletePromoCode: (id: string) => void;
	applyPromoCode: (code: string, total: number) => number; // 👈 OBLIGATOIRE
};

const usePromoStore = create<Store>((set, get) => ({
	promoCodes: [],

	addPromoCode: (code, value) => {
		set((state) => ({
			promoCodes: [
				...state.promoCodes,
				{
					id: crypto.randomUUID(),
					code,
					value,
				},
			],
		}));
	},

	deletePromoCode: (id) => {
		set((state) => ({
			promoCodes: state.promoCodes.filter((p) => p.id !== id),
		}));
	},

	applyPromoCode: (code, total) => {
		const promo = get().promoCodes.find((p) => p.code === code);

		if (!promo) return total;

		return total - promo.value;
	},
}));

export default usePromoStore;