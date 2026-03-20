import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Theme {
	id: string;
	name: string;
}

interface Store {
	themes: Theme[];
	addTheme: (name: string) => void;
	deleteTheme: (id: string) => void;
}

const useAdminThemesStore = create<Store>()(
	persist(
		(set, get) => ({
			themes: [],

			addTheme: (name) => {
				set({
					themes: [
						...get().themes,
						{
							id: crypto.randomUUID(),
							name,
						},
					],
				});
			},

			deleteTheme: (id) => {
				set({
					themes: get().themes.filter((t) => t.id !== id),
				});
			},
		}),
		{
			name: 'admin-themes',
		}
	)
);

export default useAdminThemesStore;