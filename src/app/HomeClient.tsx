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

// 💎 COMING SOON
const ComingSoon = () => (
	<div
		style={{
			height: '100vh',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			background: '#020617',
			color: 'white',
		}}
	>
		<h1>🚧 Site en maintenance</h1>
	</div>
);

const HomeClient = () => {
	const [preview, setPreview] = useState(false);
	const [mounted, setMounted] = useState(false);

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
	const [openMenu, setOpenMenu] = useState(false);

	useEffect(() => {
		setMounted(true);

		const params = new URLSearchParams(window.location.search);
		setPreview(params.get('preview') === 'true');
	}, []);

	if (!mounted || !hasAuthHydrated || !hasProductsHydrated) return null;

	const filteredProducts = products.filter((product: any) => {
		if (selectedCategory && product.categoryId !== selectedCategory) return false;
		if (selectedTheme && product.themeId !== selectedTheme) return false;
		return true;
	});

	// 🚧 MAINTENANCE
	if (MAINTENANCE && !preview) {
		return <ComingSoon />;
	}

	return (
		<main
			style={{
				paddingTop: 80,
				background: '#020617',
				minHeight: '100vh',
				color: 'white',
			}}
		>
			{/* HEADER */}
			<header
				style={{
					position: 'fixed',
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
				}}
			>
				<img src="/logo-transparent.png" style={{ height: 40 }} />

				<div style={{ display: 'flex', gap: 10 }}>
					{user ? (
						<>
							<Link href="/account">Mon compte</Link>
							<button
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
							<Link href="/login">Connexion</Link>
							<Link href="/register">Inscription</Link>
						</>
					)}
				</div>
			</header>

			{/* HERO */}
			<section
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					paddingTop: 60,
					paddingBottom: 40,
					textAlign: 'center',
				}}
			>
				<img
					src="/logo-transparent.png"
					style={{ width: 220, marginBottom: 10 }}
				/>

				<p style={{ opacity: 0.7 }}>
					Des créations uniques inspirées par l’élégance et le raffinement.
				</p>
			</section>

			{/* TITRE */}
			<div style={{ textAlign: 'center', marginBottom: 20 }}>
				<p style={{ opacity: 0.6 }}>Boutique</p>
				<h2>Nos créations</h2>
			</div>

			{/* MENU */}
			<button
				onClick={() => setOpenMenu(!openMenu)}
				style={{
					position: 'fixed',
					top: 90,
					left: 20,
				}}
			>
				☰ Menu
			</button>

			{openMenu && (
				<div
					style={{
						position: 'fixed',
						top: 140,
						left: 20,
						width: 260,
						background: '#020617',
						padding: 16,
					}}
				>
					<FiltersMenu
						selectedCategory={selectedCategory}
						setSelectedCategory={setSelectedCategory}
						selectedTheme={selectedTheme}
						setSelectedTheme={setSelectedTheme}
					/>
				</div>
			)}

			{/* PRODUITS */}
			<section
				style={{
					display: 'grid',
					gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
					gap: 20,
					padding: 20,
				}}
			>
				{filteredProducts.map((product: any) => (
					<div
						key={product.id}
						style={{
							border: '1px solid rgba(255,255,255,0.1)',
							padding: 12,
							borderRadius: 12,
						}}
					>
						<img
							src={product.image || '/placeholder.png'}
							style={{
								width: '100%',
								height: 160,
								objectFit: 'cover',
							}}
						/>

						<h3>{product.name}</h3>
						<p>{product.price} €</p>

						<button
							onClick={() =>
								addToCart({
									id: product.id,
									title: product.name,
									price: product.price,
									quantity: 1,
								})
							}
						>
							Ajouter
						</button>
					</div>
				))}
			</section>
		</main>
	);
};

export default HomeClient;