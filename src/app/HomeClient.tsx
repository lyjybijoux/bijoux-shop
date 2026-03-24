'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

import useCartStore from '../store/cart';
import useAuthStore from '../store/auth';
import useAdminProductsStore from '../store/adminProducts';
import useAdminCategoriesStore from '../store/adminCategories';
import useAdminThemesStore from '../store/adminThemes';

const MAINTENANCE = true;

////////////////////////////////////////////////////////
// 💎 BASE BOUTON
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
};

////////////////////////////////////////////////////////

const main = {
	paddingTop: 80,
	background: '#020617',
	minHeight: '100vh',
	color: 'white',
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

const HomeClient = () => {
	const [mounted, setMounted] = useState(false);

	const addToCart = useCartStore((s) => s.addToCart);

	const products = useAdminProductsStore((s) => s.products);
	const hasProductsHydrated = useAdminProductsStore((s) => s.hasHydrated);

	useAdminCategoriesStore((s) => s.categories);
	useAdminThemesStore((s) => s.themes);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted || !hasProductsHydrated) return null;

	return (
		<main style={main}>
			<section style={grid}>
				{products.map((product: any) => (
					<Link
						key={product.id}
						href={`/product/${product.id}`}
						style={{ textDecoration: 'none', color: 'inherit' }}
					>
						<div style={card}>
							<img src={product.image} style={image} />

							<h3>{product.name}</h3>
							<p>{product.price} €</p>

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