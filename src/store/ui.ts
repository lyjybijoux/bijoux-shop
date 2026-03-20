import { create } from 'zustand';

interface UIState {
	isCartOpen: boolean;
	toast: string | null;

	openCart: () => void;
	closeCart: () => void;

	showToast: (message: string) => void;
}

const useUIStore = create<UIState>((set) => ({
	isCartOpen: false,
	toast: null,

	openCart: () => set({ isCartOpen: true }),
	closeCart: () => set({ isCartOpen: false }),

	showToast: (message) => {
		set({ toast: message });

		setTimeout(() => {
			set({ toast: null });
		}, 2000);
	},
}));

export default useUIStore;