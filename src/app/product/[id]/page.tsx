'use client';

import { useParams } from 'next/navigation';
import useAdminProductsStore from '@/store/adminProducts';

const ProductPage = () => {
	const params = useParams();
	const id = params?.id as string;

	const products = useAdminProductsStore((s) => s.products);
	const product = products.find((p: any) => p.id === id);

	if (!product) return <div>Produit introuvable</div>;

	return (
		<div style={{ padding: 40 }}>
			<h1>{product.name}</h1>
			<p>{product.price} €</p>
		</div>
	);
};

export default ProductPage;