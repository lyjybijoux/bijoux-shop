'use client';

import { useState } from 'react';
import useAdminThemesStore from '../../../store/adminThemes';

const ThemesPage = () => {
	const { themes, addTheme, deleteTheme } = useAdminThemesStore();

	const [name, setName] = useState('');

	return (
		<div style={{ padding: 20 }}>
			<h1>Thèmes</h1>

			<input
				placeholder="Nom du thème"
				value={name}
				onChange={(e) => setName(e.target.value)}
			/>

			<button
				onClick={() => {
					addTheme(name);
					setName('');
				}}
			>
				Ajouter
			</button>

			{themes.map((t) => (
				<div key={t.id}>
					{t.name}
					<button onClick={() => deleteTheme(t.id)}>
						Supprimer
					</button>
				</div>
			))}
		</div>
	);
};

export default ThemesPage;