'use client';

import { useState } from 'react';
import useAdminCategoriesStore from '@/store/adminCategories';
import useAdminThemesStore from '@/store/adminThemes';

const FiltersMenu = () => {
	const categories = useAdminCategoriesStore((s) => s.categories);
	const themes = useAdminThemesStore((s) => s.themes);

	const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
	const [selectedTheme, setSelectedTheme] = useState<string | null>(null);

	return (
		<div>
			{/* 🔥 CATÉGORIES */}
			<h3 style={title}>Catégories</h3>

			<div style={list}>
				<button onClick={() => setSelectedCategory(null)} style={item}>
					Toutes
				</button>

				{categories.map((cat) => (
					<button
						key={cat.id}
						onClick={() => setSelectedCategory(cat.name)}
						style={item}
					>
						{cat.name}
					</button>
				))}
			</div>

			{/* 🔥 THEMES */}
			<h3 style={{ ...title, marginTop: 20 }}>Thèmes</h3>

			<div style={list}>
				<button onClick={() => setSelectedTheme(null)} style={item}>
					Tous
				</button>

				{themes.map((theme) => (
					<button
						key={theme.id}
						onClick={() => setSelectedTheme(theme.name)}
						style={item}
					>
						{theme.name}
					</button>
				))}
			</div>
		</div>
	);
};

export default FiltersMenu;

//
// 🎨 STYLES
//

const title = {
	fontSize: 18,
	fontWeight: 600,
	marginBottom: 10,
};

const list = {
	display: 'flex',
	flexDirection: 'column' as const,
	gap: 8,
};

const item = {
	padding: '10px 12px',
	borderRadius: 10,
	border: 'none',
	background: 'rgba(255,255,255,0.05)',
	color: 'white',
	cursor: 'pointer',
};