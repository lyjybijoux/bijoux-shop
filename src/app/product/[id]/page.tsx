'use client';

import { useMemo, type CSSProperties } from 'react';
import { useParams } from 'next/navigation';

import useAdminProductsStore from '@/store/adminProducts';
import useCartStore from '@/store/cart';

type ProductItem = {
	id: string;
	name: string;
	price: number;
	image?: string;
	description?: string;
};

const page: CSSProperties = {
	minHeight: '100vh',
	padding: '120px 24px 40px',
	background:
		'radial-gradient(circle at top center, rgba(30,58,138,0.18), transparent 28%), #020617',
	color: 'white',
};

const container: CSSProperties = {
	maxWidth: 1100,
	margin: '0 auto',
	display: 'grid',
	gridTemplateColumns: 'minmax(280px, 420px) minmax(320px, 1fr)',
	gap: 32,
	alignItems: 'start',
};

const imageCard: CSSProperties = {
	padding: 16,
	borderRadius: 24,
	background: 'linear-gradient(180deg, rgba(15,23,42,0.9), rgba(2,6,23,0.95))',
	border: '1px solid rgba(255,255,255,0.08)',
	boxShadow: '0 16px 40px rgba(0,0,0,0.28)',
};

const imageStyle: CSSProperties = {
	width: '100%',
	borderRadius: 16,
	display: 'block',
	background: 'rgba(255,255,255,0.04)',
};

const contentCard: CSSProperties = {
	padding: 24,
	borderRadius: 24,
	background: 'linear-gradient(180deg, rgba(15,23,42,0.9), rgba(2,6,23,0.95))',
	border: '1px solid rgba(255,255,255,0.08)',
	boxShadow: '0 16px 40px rgba(0,0,0,0.28)',
};

const title: CSSProperties = {
	margin: '0 0 12px 0',
	fontSize: 36,
	lineHeight: 1.1,
	fontWeight: 800,
};

const price: CSSProperties = {
	margin: '0 0 18px 0',
	fontSize: 24,
	fontWeight: 700,
	color: '#fde68a',
};

const description: CSSProperties = {
	margin: '0 0 24px 0',
	lineHeight: 1.6,
	color: 'rgba(255,255,255,0.82)',
};

const btnGold: CSSProperties = {
	display: 'inline-flex',
	alignItems: 'center',
	justifyContent: 'center',
	height: 44,
	padding: '0 18px',
	borderRadius: 12,
	border: 'none',
	fontWeight: 700,
	cursor: 'pointer',
	background: 'linear-gradient(135deg,#f8e7a8 0%, #d4af37 55%, #b8860b 100%)',
	color: '#111827',
	boxShadow: '0 10px 30px rgba(212,175,55,0.35)',
};

const ProductPage = () => {
	const params = useParams();
	const rawId = params?.id;
	const id = Array.isArray(rawId) ? rawId[0] : rawId;

	const products = useAdminProductsStore((state) => state.products) as ProductItem[];
	const addToCart = useCartStore((state) => state.addToCart);

	const product = useMemo(
		() => products.find((item) => item.id === id),
		[products, id]
	);

	if (!product) {
		return (
			<div style={page}>
				<div style={{ maxWidth: 1100, margin: '0 auto' }}>Produit introuvable</div>
			</div>
		);
	}

	return (
		<div style={page}>
			<div style={container}>
				<div style={imageCard}>
					<img
						src={product.image || '/placeholder.png'}
						alt={product.name}
						style={imageStyle}
					/>
				</div>

				<div style={contentCard}>
					<h1 style={title}>{product.name}</h1>
					<p style={price}>{product.price} €</p>
					<p style={description}>
						{product.description || 'Description du produit ici.'}
					</p>

					<button
						type="button"
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
			</div>
		</div>
	);
};

export default ProductPage;