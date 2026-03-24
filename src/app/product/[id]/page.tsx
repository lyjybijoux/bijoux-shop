'use client';

import { useParams } from 'next/navigation';
import useAdminProductsStore from '@/store/adminProducts';

const ProductPage = () => {
	const params = useParams();
	const products = useAdminProductsStore((state) => state.products);

	// 🔥 IMPORTANT : convertir en string pour comparer
	const product = products.find(
		(p) => String(p.id) === String(params.id)
	);

	if (!product) {
		return (
			<main style={main}>
				<p>Produit introuvable 😕</p>
			</main>
		);
	}

	return (
		<main style={main}>
			<div style={container}>
				<img src={product.image} style={image} />

				<div>
					<h1>{product.name}</h1>
					<p style={price}>{product.price} €</p>

					<p style={{ opacity: 0.8 }}>
	{product.description || 'Aucune description disponible.'}
</p>
				</div>
			</div>
		</main>
	);
};

export default ProductPage;

//
// 🎨 STYLES
//

const main: React.CSSProperties = {
	minHeight: '100vh',
	padding: 40,
	background: '#0f172a',
	color: 'white',
};

const container: React.CSSProperties = {
	display: 'flex',
	gap: 40,
	maxWidth: 900,
	margin: '0 auto',
};

const image: React.CSSProperties = {
	width: 300,
	borderRadius: 16,
};

const price: React.CSSProperties = {
	fontSize: 20,
	margin: '10px 0',
};