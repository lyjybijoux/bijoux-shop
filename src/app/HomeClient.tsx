'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

import useCartStore from '../store/cart';
import useAuthStore from '../store/auth';
import useAdminProductsStore from '../store/adminProducts';
import useAdminCategoriesStore from '../store/adminCategories';
import useAdminThemesStore from '../store/adminThemes';
import FiltersMenu from '@/components/FiltersMenu';

const MAINTENANCE = true;

////////////////////////////////////////////////////////
// 💎 BASE BOUTON (ALIGNEMENT FIX)
////////////////////////////////////////////////////////

const btnBase = {
	display: 'inline-flex',
	alignItems: 'center',
	justifyContent: 'center',
	height: 36,
	padding: '0 14px',
	borderRadius: 10,
	border: 'none',
	fontWeight: 600,
	cursor: 'pointer',
	lineHeight: 1,
	textDecoration: 'none',
};

const btnGold = {
	...btnBase,
	background: 'linear-gradient(135deg,#f7e7a1,#d4af37)',
	color: '#111',
	boxShadow: '0 4px 15px rgba(212,175,55,0.5)',
};

const btnRuby = {
	...btnBase,
	background: 'linear-gradient(135deg,#7f1d1d,#dc2626)',
	color: 'white',
	boxShadow: '0 4px 15px rgba(220,38,38,0.6)',
};

const btnSapphire = {
	...btnBase,
	background: 'linear-gradient(135deg,#1e3a8a,#2563eb)',
	color: 'white',
	boxShadow: '0 4px 15px rgba(37,99,235,0.6)',
};

////////////////////////////////////////////////////////
// 🎨 STYLES
////////////////////////////////////////////////////////

const main = {
	paddingTop: 80,
	background: '#020617',
	minHeight: '100vh',
	color: 'white',
};

const center = {
	height: '100vh',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	background: '#020617',
	color: 'white',
};

const navbar = {
	position: 'fixed' as const,
	top: 0,
	left: 0,
	width: '100%',
	height: 80,
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	padding: '0 20px',
	background: '#020617',
	zIndex: 1000,
};

const menuButton = {
	position: 'fixed' as const,
	top: 90,
	left: 20,
	...btnGold,
};

const menuBox = {
	position: 'fixed' as const,
	top: 140,
	left: 20,
	width: 260,
	padding: 16,
	borderRadius: 16,
	background: 'rgba(2,6,23,0.9)',
	backdropFilter: 'blur(12px)',
	border: '1px solid rgba(255,255,255,0.08)',
	boxShadow: '0 10px 40px rgba(0,0,0,0.7)',
};

const hero = {
	display: 'flex',
	flexDirection: 'column' as const,
	alignItems: 'center',
	paddingTop: 60,
	paddingBottom: 40,
};

const heroLogo = {
	width: 220,
	marginBottom: 10,
};

const titleBlock = {
	textAlign: 'center' as const,
	marginBottom: 20,
};

const grid = {
	display: 'grid',
	gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
	gap: 20,
	padding: 20,
};

const card = {
	border: '1px solid rgba(255,255,255,0.1)',
	padding: 12,
	borderRadius: 12,
	background: '#020617',
};

const image = {
	width: '100%',
	height: 160,
	objectFit: 'cover' as const,
};

////////////////////////////////////////////////////////
// 🚧 MAINTENANCE
////////////////////////////////////////////////////////

const ComingSoon = () => (
	<div style={center}>
		<h1>🚧 Site en maintenance</h1>
	</div>
);

////////////////////////////////////////////////////////
// 🧠 COMPONENT
////////////////////////////////////////////////////////

const HomeClient = () => {
	const [preview, setPreview] = useState(false);
	const [mounted, setMounted] = useState(false);
	const [openMenu, setOpenMenu] = useState(false);

	const addToCart = useCartStore((state) => state.addToCart);
	const clearCart = useCartStore((state) => state.clearCart);

	const user = useAuthStore((state) => state.user);
	const logout = useAuthStore((state) => state.logout);
	const hasAuthHydrated = useAuthStore((state) => state.hasHydrated);

	const products = useAdminProductsStore((state) => state.products);
	const hasProductsHydrated = useAdminProductsStore((state) => state.hasHydrated);

	useAdminCategoriesStore((state) => state.categories);
	useAdminThemesStore((state) => state.themes);

	const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
	const [selectedTheme, setSelectedTheme] = useState<string | null>(null);

	useEffect(() => {
		setMounted(true);
		const params = new URLSearchParams(window.location.search);
		setPreview(params.get('preview') === 'true');
	}, []);

	useEffect(() => {
		const handleClick = (e: MouseEvent) => {
			const target = e.target as HTMLElement;

			if (!target.closest('#menu') && !target.closest('#menu-btn')) {
				setOpenMenu(false);
			}
		};

		document.addEventListener('mousedown', handleClick);
		return () => document.removeEventListener('mousedown', handleClick);
	}, []);

	if (!mounted || !hasAuthHydrated || !hasProductsHydrated) return null;

	const filteredProducts = products.filter((product: any) => {
		if (selectedCategory && product.categoryId !== selectedCategory) return false;
		if (selectedTheme && product.themeId !== selectedTheme) return false;
		return true;
	});

	if (MAINTENANCE && !preview) return <ComingSoon />;

	return (
		<main style={main}>
			<header style={navbar}>
				<img src="/logo-transparent.png" style={{ height: 40 }} />

				<div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
					{user ? (
						<>
							<Link href="/account" style={btnSapphire}>
								Mon compte
							</Link>

							<button
								style={btnRuby}
								onClick={() => {
									logout();
									clearCart();
								}}
							>
								Déconnexion
							</button>
						</>
					) : (
						<>
							<Link href="/login" style={btnSapphire}>
								Connexion
							</Link>

							<Link href="/register" style={btnGold}>
								Inscription
							</Link>
						</>
					)}
				</div>
			</header>

			<button
				id="menu-btn"
				style={menuButton}
				onClick={() => setOpenMenu(!openMenu)}
			>
				☰ Menu
			</button>

			{openMenu && (
				<div id="menu" style={menuBox}>
					<FiltersMenu
						selectedCategory={selectedCategory}
						setSelectedCategory={setSelectedCategory}
						selectedTheme={selectedTheme}
						setSelectedTheme={setSelectedTheme}
					/>
				</div>
			)}

			<section style={hero}>
				<img src="/logo-transparent.png" style={heroLogo} />
				<p style={{ opacity: 0.7 }}>
					Des créations uniques inspirées par l’élégance et le raffinement.
				</p>
			</section>

			<div style={titleBlock}>
				<p style={{ opacity: 0.6 }}>Boutique</p>
				<h2>Nos créations</h2>
			</div>

			<section style={grid}>
				{filteredProducts.map((product: any) => (
					<div key={product.id} style={card}>
						<img src={product.image} style={image} />

						<h3>{product.name}</h3>
						<p>{product.price} €</p>

						<button
							style={btnGold}
							onClick={() =>
								addToCart({
									id: product.id,
									title: product.name,
									price: product.price,
									quantity: 1,
								})
							}
						>
							Ajouter au panier
						</button>
					</div>
				))}
			</section>
		</main>
	);
};

export default HomeClient;