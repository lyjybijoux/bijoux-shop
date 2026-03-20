'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface AuthUser {
	id: string;
	firstName: string;
	email: string;
}

interface AuthState {
	user: AuthUser | null;
	hasHydrated: boolean;

	setUser: (user: AuthUser | null) => void;
	logout: () => void;
	setHasHydrated: (state: boolean) => void;
}

const useAuthStore = create<AuthState>()(
	persist(
		(set) => ({
			user: null,
			hasHydrated: false,

			setUser: (user) => set({ user }),
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