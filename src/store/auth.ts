'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface AuthUser {
	id: string;
	firstName: string;
	email: string;

	// ✅ AJOUT ADDRESS
	address?: {
		street?: string;
		city?: string;
		zip?: string;
	};
}

interface AuthState {
	user: AuthUser | null;
	hasHydrated: boolean;

	setUser: (user: AuthUser | null) => void;
	logout: () => void;
	setHasHydrated: (state: boolean) => void;

	// ✅ AJOUT UPDATE
	updateUser: (data: Partial<AuthUser>) => void;
}

const useAuthStore = create<AuthState>()(
	persist(
		(set) => ({
			user: null,
			hasHydrated: false,

			setUser: (user) => set({ user }),

			logout: () => set({ user: null }),

			setHasHydrated: (state) => set({ hasHydrated: state }),

			// ✅ UPDATE USER
			updateUser: (data) =>
				set((state) => ({
					user: state.user
						? {
								...state.user,
								...data,
								address: {
									...state.user.address,
									...data.address,
								},
						  }
						: null,
				})),
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