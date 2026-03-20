'use client';

import useAdminCategoriesStore from '@/store/adminCategories';
import useAdminThemesStore from '@/store/adminThemes';

type Props = {
	selectedCategory: string | null;
	setSelectedCategory: (id: string | null) => void;
	selectedTheme: string | null;
	setSelectedTheme: (id: string | null) => void;
};

const FiltersMenu = ({
	selectedCategory,
	setSelectedCategory,
	selectedTheme,
	setSelectedTheme,
}: Props) => {
	const categories = useAdminCategoriesStore((s) => s.categories);
	const themes = useAdminThemesStore((s) => s.themes);

	return (
		<div>

			{/* 🔥 NAVIGATION */}
			<div style={navSection}>
				<a href="/" style={navLink}>🏠 Accueil</a>
				<a href="/cart" style={navLink}>🛒 Panier</a>
				<a href="#" style={navLink}>📩 Contact</a>
			</div>

			<hr style={divider} />

			{/* CATÉGORIES */}
			<h3 style={title}>Catégories</h3>

			<div style={list}>
				<button
					onClick={() => setSelectedCategory(null)}
					style={selectedCategory === null ? activeItem : item}
				>
					Toutes
				</button>

				{categories.map((cat) => (
					<button
						key={cat.id}
						onClick={() => setSelectedCategory(cat.id)}
						style={selectedCategory === cat.id ? activeItem : item}
					>
						{cat.name}
					</button>
				))}
			</div>

			{/* THÈMES */}
			<h3 style={title}>Thèmes</h3>

			<div style={list}>
				<button
					onClick={() => setSelectedTheme(null)}
					style={selectedTheme === null ? activeItem : item}
				>
					Tous
				</button>

				{themes.map((theme) => (
					<button
						key={theme.id}
						onClick={() => setSelectedTheme(theme.id)}
						style={selectedTheme === theme.id ? activeItem : item}
					>
						{theme.name}
					</button>
				))}
			</div>
		</div>
	);
};

export default FiltersMenu;



// 🎨 STYLES

const navSection = {
	display: 'grid',
	gap: 10,
	marginBottom: 15,
};

const navLink = {
	color: 'white',
	textDecoration: 'none',
	padding: '8px 10px',
	borderRadius: 8,
	background: '#0f172a',
};

const divider = {
	margin: '15px 0',
	borderColor: 'rgba(255,255,255,0.1)',
};

const title = {
	color: 'gold',
	marginBottom: 10,
};

const list = {
	display: 'grid',
	gap: 6,
	marginBottom: 15,
};

const item = {
	padding: '8px 10px',
	background: 'transparent',
	border: 'none',
	color: 'white',
	textAlign: 'left' as const,
	cursor: 'pointer',
};

const activeItem = {
	...item,
	background: 'linear-gradient(to right, gold, transparent)',
	color: 'gold',
	borderRadius: 8,
};