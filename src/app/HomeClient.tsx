'use client';

import { useEffect, useState } from 'react';
import useCartStore from '../store/cart';
import useAdminProductsStore from '../store/adminProducts';

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
	const products = useAdminProductsStore((state) => state.products);

	useEffect(() => {
		setMounted(true);

		const params = new URLSearchParams(window.location.search);
		setPreview(params.get('preview') === 'true');
	}, []);

	if (!mounted) return null;

	// 🚧 maintenance
	if (MAINTENANCE && !preview) {
		return <ComingSoon />;
	}

	// 🔓 site visible
	return (
		<div style={{ padding: 40, color: 'white', background: '#020617', minHeight: '100vh' }}>
			<h1>💎 Boutique LYJY</h1>

			<div style={{ display: 'grid', gap: 20, marginTop: 20 }}>
				{products.length === 0 ? (
					<p>Aucun produit pour le moment</p>
				) : (
					products.map((product: any) => (
						<div
							key={product.id}
							style={{
								border: '1px solid rgba(255,255,255,0.1)',
								padding: 15,
								borderRadius: 10,
							}}
						>
							<img
								src={product.image || '/placeholder.png'}
								style={{
									width: '100%',
									height: 150,
									objectFit: 'cover',
									borderRadius: 8,
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
								style={{
									background: 'gold',
									padding: '8px 12px',
									borderRadius: 8,
									border: 'none',
									cursor: 'pointer',
								}}
							>
								Ajouter
							</button>
						</div>
					))
				)}
			</div>
		</div>
	);
};

export default HomeClient;