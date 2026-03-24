'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Address {
	street?: string;
	postalCode?: string;
	city?: string;
}

export interface AuthUser {
	id: string;
	firstName: string;
	lastName?: string;
	email: string;

	phoneMobile?: string;
	phoneFix?: string;

	address?: Address;
}

interface AuthState {
	user: AuthUser | null;
	hasHydrated: boolean;

	setUser: (user: AuthUser | null) => void;
	updateUser: (user: AuthUser) => void;
	logout: () => void;
	setHasHydrated: (state: boolean) => void;
}

const useAuthStore = create<AuthState>()(
	persist(
		(set) => ({
			user: null,
			hasHydrated: false,

			setUser: (user) => set({ user }),

			updateUser: (user) => set({ user }),

			logout: () => set({ user: null }),

			setHasHydrated: (state) => set({ hasHydrated: state }),
		}),
		{
			name: 'auth-storage',

			onRehydrateStorage: () => (state) => {
				state?.setHasHydrated(true);
			},
		}
	)
);

export default useAuthStore;