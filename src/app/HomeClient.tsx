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
// 💎 BUTTON BASE
////////////////////////////////////////////////////////

const btnBase = {
	display: 'inline-flex',
	alignItems: 'center',
	justifyContent: 'center',
	height: 36,
	padding: '0 14px',
	borderRadius: 12,
	fontWeight: 600,
	cursor: 'pointer',
	border: 'none',
	transition: 'all 0.25s ease',
};

const btnGold = {
	...btnBase,
	background: 'linear-gradient(135deg,#f7e7a1,#d4af37)',
	color: '#111',
	boxShadow: '0 6px 25px rgba(212,175,55,0.7)',
};

const btnRuby = {
	...btnBase,
	background: 'linear-gradient(135deg,#7f1d1d,#dc2626)',
	color: 'white',
};

const btnSapphire = {
	...btnBase,
	background: 'linear-gradient(135deg,#1e3a8a,#2563eb)',
	color: 'white',
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

const drawer = (open: boolean) => ({
	position: 'fixed' as const,
	top: 0,
	left: 0,
	height: '100vh',
	width: 300,
	padding: 20,
	transform: open ? 'translateX(0)' : 'translateX(-100%)',
	transition: 'transform 0.35s cubic-bezier(0.8, -0.2, 0.2, 1)',
	background: 'linear-gradient(145deg,#020617,#0f172a)',
	boxShadow: '0 30px 80px rgba(0,0,0,0.9)',
	zIndex: 2000,
});

const overlay = (open: boolean) => ({
	position: 'fixed' as const,
	top: 0,
	left: 0,
	width: '100%',
	height: '100%',
	background: 'rgba(0,0,0,0.6)',
	backdropFilter: 'blur(4px)',
	opacity: open ? 1 : 0,
	pointerEvents: open ? 'auto' : 'none',
	transition: 'opacity 0.3s ease',
	zIndex: 1500,
});

const menuItem = {
	padding: '12px 14px',
	borderRadius: 14,
	background: 'rgba(255,255,255,0.04)',
	marginBottom: 10,
	cursor: 'pointer',
	transition: 'all 0.2s ease',
};

const sectionTitle = {
	color: '#facc15',
	fontWeight: 700,
	fontSize: 18,
	marginTop: 20,
	marginBottom: 10,
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

const ComingSoon = () => (
	<div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
		<h1>🚧 Site en maintenance</h1>
	</div>
);

////////////////////////////////////////////////////////

const HomeClient = () => {
	const [openMenu, setOpenMenu] = useState(false);
	const [mounted, setMounted] = useState(false);

	const addToCart = useCartStore((s) => s.addToCart);
	const clearCart = useCartStore((s) => s.clearCart);

	const user = useAuthStore((s) => s.user);
	const logout = useAuthStore((s) => s.logout);
	const hasAuthHydrated = useAuthStore((s) => s.hasHydrated);

	const products = useAdminProductsStore((s) => s.products);
	const hasProductsHydrated = useAdminProductsStore((s) => s.hasHydrated);

	useAdminCategoriesStore((s) => s.categories);
	useAdminThemesStore((s) => s.themes);

	useEffect(() => setMounted(true), []);

	if (!mounted || !hasAuthHydrated || !hasProductsHydrated) return null;
	if (MAINTENANCE) return <ComingSoon />;

	return (
		<main style={main}>
			{/* NAVBAR */}
			<header style={navbar}>
				<button style={btnGold} onClick={() => setOpenMenu(true)}>
					☰ Menu
				</button>

				<div style={{ display: 'flex', gap: 10 }}>
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

			{/* OVERLAY */}
			<div style={overlay(openMenu)} onClick={() => setOpenMenu(false)} />

			{/* DRAWER MENU */}
			<div style={drawer(openMenu)}>
				<div style={menuItem}>🏠 Accueil</div>
				<div style={menuItem}>🛒 Panier</div>
				<div style={menuItem}>✉️ Contact</div>

				<hr style={{ opacity: 0.1, margin: '20px 0' }} />

				<div style={sectionTitle}>Catégories</div>
				<div style={btnGold}>Toutes</div>

				<div style={sectionTitle}>Thèmes</div>
				<div style={btnGold}>Tous</div>
			</div>

			{/* PRODUITS */}
			<section style={grid}>
				{products.map((product: any) => (
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