'use client';

import { useEffect, useState, type CSSProperties } from 'react';
import Link from 'next/link';

import useCartStore from '../store/cart';
import useAuthStore from '../store/auth';
import useAdminProductsStore from '../store/adminProducts';
import useAdminCategoriesStore from '../store/adminCategories';
import useAdminThemesStore from '../store/adminThemes';

const MAINTENANCE = true;

type ProductItem = {
	id: string;
	name: string;
	price: number;
	image?: string;
	categoryId?: string | null;
	themeId?: string | null;
};

type CategoryItem = {
	id: string;
	name: string;
};

type ThemeItem = {
	id: string;
	name: string;
};

////////////////////////////////////////////////////////
// 💎 BOUTONS
////////////////////////////////////////////////////////

const btnBase: CSSProperties = {
	display: 'inline-flex',
	alignItems: 'center',
	justifyContent: 'center',
	height: 40,
	padding: '0 16px',
	borderRadius: 12,
	border: 'none',
	fontWeight: 700,
	cursor: 'pointer',
	lineHeight: 1,
	textDecoration: 'none',
	transition: 'transform 180ms ease, box-shadow 180ms ease, opacity 180ms ease',
	whiteSpace: 'nowrap',
};

const btnGold: CSSProperties = {
	...btnBase,
	background: 'linear-gradient(135deg,#f8e7a8 0%, #d4af37 55%, #b8860b 100%)',
	color: '#111827',
	boxShadow: '0 10px 30px rgba(212,175,55,0.35)',
};

const btnRuby: CSSProperties = {
	...btnBase,
	background: 'linear-gradient(135deg,#991b1b 0%, #dc2626 100%)',
	color: '#ffffff',
	boxShadow: '0 10px 30px rgba(220,38,38,0.28)',
};

const btnSapphire: CSSProperties = {
	...btnBase,
	background: 'linear-gradient(135deg,#1d4ed8 0%, #2563eb 100%)',
	color: '#ffffff',
	boxShadow: '0 10px 30px rgba(37,99,235,0.28)',
};

const filterChipBase: CSSProperties = {
	width: '100%',
	display: 'flex',
	alignItems: 'center',
	padding: '14px 16px',
	borderRadius: 14,
	border: '1px solid rgba(255,255,255,0.06)',
	background: 'rgba(255,255,255,0.03)',
	color: '#e5e7eb',
	fontWeight: 700,
	fontSize: 16,
	cursor: 'pointer',
	textAlign: 'left',
	transition: 'opacity 180ms ease, transform 180ms ease, border-color 180ms ease',
};

const filterChipActive: CSSProperties = {
	background: 'linear-gradient(90deg, rgba(250,204,21,0.95) 0%, rgba(212,175,55,0.72) 58%, rgba(212,175,55,0.06) 100%)',
	color: '#fff4bf',
	border: '1px solid rgba(250,204,21,0.22)',
	boxShadow: '0 10px 24px rgba(212,175,55,0.18)',
};

////////////////////////////////////////////////////////
// 🎨 STYLES
////////////////////////////////////////////////////////

const main: CSSProperties = {
	paddingTop: 88,
	background:
		'radial-gradient(circle at top center, rgba(30,58,138,0.18), transparent 28%), #020617',
	minHeight: '100vh',
	color: 'white',
};

const center: CSSProperties = {
	height: '100vh',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	background: '#020617',
	color: 'white',
};

const navbar: CSSProperties = {
	position: 'fixed',
	top: 0,
	left: 0,
	width: '100%',
	height: 80,
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	padding: '0 20px',
	background: 'rgba(2,6,23,0.9)',
	backdropFilter: 'blur(14px)',
	borderBottom: '1px solid rgba(255,255,255,0.06)',
	zIndex: 1000,
};

const navActions: CSSProperties = {
	display: 'flex',
	gap: 10,
	alignItems: 'center',
};

const menuTrigger: CSSProperties = {
	...btnGold,
	gap: 10,
};

const overlay = (open: boolean): CSSProperties => ({
	position: 'fixed',
	top: 0,
	left: 0,
	width: '100%',
	height: '100%',
	background: 'rgba(2, 6, 23, 0.55)',
	backdropFilter: 'blur(4px)',
	opacity: open ? 1 : 0,
	pointerEvents: open ? 'auto' : 'none',
	transition: 'opacity 220ms ease',
	zIndex: 1400,
});

const drawer = (open: boolean): CSSProperties => ({
	position: 'fixed',
	top: 0,
	left: 0,
	width: 320,
	maxWidth: 'calc(100vw - 24px)',
	height: '100vh',
	background: 'linear-gradient(180deg, rgba(2,6,23,0.98), rgba(15,23,42,0.98))',
	backdropFilter: 'blur(18px)',
	borderRight: '1px solid rgba(255,255,255,0.06)',
	boxShadow: '0 24px 80px rgba(0,0,0,0.65)',
	transform: open ? 'translateX(0)' : 'translateX(-105%)',
	transition: 'transform 280ms cubic-bezier(0.22, 1, 0.36, 1)',
	zIndex: 1500,
	overflowY: 'auto',
});

const drawerInner: CSSProperties = {
	padding: '22px 18px 32px',
	minHeight: '100%',
	display: 'flex',
	flexDirection: 'column',
};

const drawerHeader: CSSProperties = {
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	marginBottom: 18,
	paddingBottom: 14,
	borderBottom: '1px solid rgba(255,255,255,0.06)',
};

const drawerTitle: CSSProperties = {
	fontSize: 18,
	fontWeight: 800,
	color: '#f8fafc',
};

const closeButton: CSSProperties = {
	width: 40,
	height: 40,
	borderRadius: 12,
	border: '1px solid rgba(255,255,255,0.08)',
	background: 'rgba(255,255,255,0.04)',
	color: '#ffffff',
	cursor: 'pointer',
	fontSize: 18,
};

const drawerLinks: CSSProperties = {
	display: 'grid',
	gap: 14,
	marginBottom: 18,
};

const drawerLink: CSSProperties = {
	display: 'flex',
	alignItems: 'center',
	gap: 12,
	padding: '18px',
	borderRadius: 20,
	background: 'rgba(255,255,255,0.04)',
	border: '1px solid rgba(255,255,255,0.06)',
	color: '#e5e7eb',
	textDecoration: 'none',
	fontWeight: 800,
};

const drawerSection: CSSProperties = {
	marginTop: 6,
	paddingTop: 18,
	borderTop: '1px solid rgba(255,255,255,0.06)',
};

const sectionTitle: CSSProperties = {
	color: '#fde047',
	fontWeight: 800,
	fontSize: 18,
};

const filterList: CSSProperties = {
	display: 'grid',
	gap: 10,
};

const hero: CSSProperties = {
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	paddingTop: 48,
	paddingBottom: 36,
};

const heroLogo: CSSProperties = {
	width: 220,
	marginBottom: 12,
};

const titleBlock: CSSProperties = {
	textAlign: 'center',
	marginBottom: 20,
};

const grid: CSSProperties = {
	display: 'grid',
	gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
	gap: 20,
	padding: 20,
};

const card: CSSProperties = {
	border: '1px solid rgba(255,255,255,0.08)',
	padding: 12,
	borderRadius: 18,
	background: '#020617',
};

const image: CSSProperties = {
	width: '100%',
	height: 160,
	objectFit: 'cover',
	borderRadius: 12,
	marginBottom: 10,
};

const productTitle: CSSProperties = {
	fontSize: 18,
	fontWeight: 700,
};

const productPrice: CSSProperties = {
	marginBottom: 10,
};

////////////////////////////////////////////////////////

const ComingSoon = () => (
	<div style={center}>
		<h1>🚧 Site en maintenance</h1>
	</div>
);

////////////////////////////////////////////////////////

const HomeClient = () => {
	const [preview, setPreview] = useState(false);
	const [mounted, setMounted] = useState(false);
	const [openMenu, setOpenMenu] = useState(false);

	const addToCart = useCartStore((s) => s.addToCart);
	const clearCart = useCartStore((s) => s.clearCart);

	const user = useAuthStore((s) => s.user);
	const logout = useAuthStore((s) => s.logout);
	const hasAuthHydrated = useAuthStore((s) => s.hasHydrated);

	const products = useAdminProductsStore((s) => s.products) as ProductItem[];
	const hasProductsHydrated = useAdminProductsStore((s) => s.hasHydrated);

	const categories = useAdminCategoriesStore((s) => s.categories) as CategoryItem[];
	const themes = useAdminThemesStore((s) => s.themes) as ThemeItem[];

	const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
	const [selectedTheme, setSelectedTheme] = useState<string | null>(null);

	useEffect(() => {
		setMounted(true);
		const params = new URLSearchParams(window.location.search);
		setPreview(params.get('preview') === 'true');
	}, []);

	if (!mounted || !hasAuthHydrated || !hasProductsHydrated) return null;

	const filteredProducts = products.filter((p) => {
		if (selectedCategory && p.categoryId !== selectedCategory) return false;
		if (selectedTheme && p.themeId !== selectedTheme) return false;
		return true;
	});

	if (MAINTENANCE && !preview) return <ComingSoon />;

	return (
		<main style={main}>
			<header style={navbar}>
				<button style={menuTrigger} onClick={() => setOpenMenu(true)}>
					☰ Menu
				</button>

				<div style={navActions}>
					<Link href="/login" style={btnSapphire}>Connexion</Link>
				</div>
			</header>

			<div style={overlay(openMenu)} onClick={() => setOpenMenu(false)} />

			<aside style={drawer(openMenu)}>
				<div style={drawerInner}>
					<div style={drawerHeader}>
						<div style={drawerTitle}>Navigation</div>
						<button style={closeButton} onClick={() => setOpenMenu(false)}>✕</button>
					</div>
				</div>
			</aside>

			<section style={hero}>
				<img src="/logo-transparent.png" style={heroLogo} />
			</section>

			<div style={titleBlock}>
				<h2>Nos créations</h2>
			</div>

			{/* ✅ PRODUITS CLIQUABLES */}
			<section style={grid}>
				{filteredProducts.map((product) => (
					<Link
						key={product.id}
						href={`/product/${product.id}`}
						style={{ textDecoration: 'none', color: 'inherit' }}
					>
						<div style={card}>
							<img src={product.image || '/placeholder.png'} style={image} />

							<h3 style={productTitle}>{product.name}</h3>
							<p style={productPrice}>{product.price} €</p>

							<button
								style={btnGold}
								onClick={(e) => {
									e.preventDefault();
									e.stopPropagation();
									addToCart({
										id: product.id,
										title: product.name,
										price: product.price,
										quantity: 1,
									});
								}}
							>
								Ajouter au panier
							</button>
						</div>
					</Link>
				))}
			</section>
		</main>
	);
};

export default HomeClient;