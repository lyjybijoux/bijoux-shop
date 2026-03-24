'use client';

import { useEffect, useState, type CSSProperties } from 'react';
import Link from 'next/link';

import useCartStore from '../store/cart';
import useAuthStore from '../store/auth';
import useAdminProductsStore from '../store/adminProducts';

const main: CSSProperties = {
	paddingTop: 80,
	background: '#020617',
	minHeight: '100vh',
	color: 'white',
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
	borderRadius: 16,
	background: '#020617',
	cursor: 'pointer',
	transition: 'transform 0.2s ease',
};

const image: CSSProperties = {
	width: '100%',
	height: 160,
	objectFit: 'cover',
	borderRadius: 10,
};

const productTitle: CSSProperties = {
	fontSize: 18,
	fontWeight: 700,
	marginTop: 10,
};

const productPrice: CSSProperties = {
	margin: '6px 0 12px',
	opacity: 0.8,
};

const btnGold: CSSProperties = {
	padding: '10px 14px',
	borderRadius: 10,
	background: 'linear-gradient(135deg,#f7e7a1,#d4af37)',
	color: '#111',
	border: 'none',
	fontWeight: 700,
	cursor: 'pointer',
};

type ProductItem = {
	id: string;
	name: string;
	price: number;
	image?: string;
};

const HomeClient = () => {
	const [mounted, setMounted] = useState(false);

	const products = useAdminProductsStore((s) => s.products) as ProductItem[];
	const hasProductsHydrated = useAdminProductsStore((s) => s.hasHydrated);

	const addToCart = useCartStore((s) => s.addToCart);

	useEffect(() => setMounted(true), []);

	if (!mounted || !hasProductsHydrated) return null;

	return (
		<main style={main}>
			<section style={grid}>
				{products.map((product) => (
					<Link
						key={product.id}
						href={`/product/${product.id}`}
						style={{ textDecoration: 'none', color: 'inherit' }}
					>
						<div style={card}>
							<img
								src={product.image || '/placeholder.png'}
								alt={product.name}
								style={image}
							/>

							<h3 style={productTitle}>{product.name}</h3>
							<p style={productPrice}>{product.price} €</p>

							<button
								type="button"
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