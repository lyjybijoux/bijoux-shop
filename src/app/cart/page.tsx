'use client';

import { useState } from 'react';
import useCartStore from '@/store/cart';
import usePromoStore from '@/store/admin-promo-codes-store';
import useAdminProductsStore from '@/store/adminProducts';

const CartPage = () => {
	const { items, removeFromCart, increaseQty, decreaseQty } = useCartStore();
	const applyPromoCode = usePromoStore((s) => s.applyPromoCode);
	const products = useAdminProductsStore((s) => s.products);

	const [code, setCode] = useState('');
	const [loading, setLoading] = useState(false);

	const total = items.reduce(
		(sum, item) => sum + item.price * item.quantity,
		0
	);

	const totalWithPromo = applyPromoCode(code, total);

	// 🔥 CHECKOUT STRIPE (FIX COMPLET)
	const handleCheckout = async () => {
		if (items.length === 0) return;

		setLoading(true);

		try {
			const res = await fetch('/api/checkout', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					items: items.map((item) => ({
						name: item.title,
						price: item.price,
						quantity: item.quantity,
					})),
				}),
			});

			// 🔥 DEBUG IMPORTANT
			if (!res.ok) {
				const text = await res.text();
				console.error('❌ API ERROR:', text);
				alert('Erreur serveur checkout');
				return;
			}

			const data = await res.json();

			if (!data?.url) {
				console.error('❌ Pas d’URL Stripe:', data);
				alert('Erreur Stripe');
				return;
			}

			// 🚀 REDIRECTION STRIPE
			window.location.href = data.url;

		} catch (err) {
			console.error('❌ Checkout error:', err);
			alert('Erreur paiement');
		} finally {
			setLoading(false);
		}
	};

	return (
		<main style={container}>
			<div style={card}>
				<h1 style={title}>🛒 Panier</h1>

				{/* PRODUITS */}
				<div style={list}>
					{items.length === 0 ? (
						<p style={{ opacity: 0.6 }}>Panier vide</p>
					) : (
						items.map((item) => {
							const product = products.find((p) => p.id === item.id);

							return (
								<div key={item.id} style={itemRow}>
									<img
										src={product?.image || '/placeholder.png'}
										style={image}
									/>

									<div style={{ flex: 1 }}>
										<p style={name}>{item.title}</p>
										<p style={price}>{item.price} €</p>
									</div>

									<div style={qtyBox}>
										<button onClick={() => decreaseQty(item.id)} style={qtyBtn}>
											-
										</button>
										<span>{item.quantity}</span>
										<button onClick={() => increaseQty(item.id)} style={qtyBtn}>
											+
										</button>
									</div>

									<button
										onClick={() => removeFromCart(item.id)}
										style={deleteBtn}
									>
										🗑
									</button>
								</div>
							);
						})
					)}
				</div>

				{/* PROMO */}
				<div style={promoBox}>
					<input
						placeholder="Code promo"
						value={code}
						onChange={(e) => setCode(e.target.value)}
						style={input}
					/>
					<button style={button}>Appliquer</button>
				</div>

				{/* TOTAL */}
				<div style={totals}>
					<div style={row}>
						<span>Total</span>
						<strong>{total} €</strong>
					</div>

					<div style={rowPromo}>
						<span>Avec promo</span>
						<strong>{totalWithPromo} €</strong>
					</div>
				</div>

				{/* CHECKOUT */}
				<button
					style={{
						...checkoutBtn,
						opacity: items.length === 0 ? 0.5 : 1,
						cursor: items.length === 0 ? 'not-allowed' : 'pointer',
					}}
					onClick={handleCheckout}
					disabled={items.length === 0 || loading}
				>
					{loading ? 'Redirection...' : 'Payer maintenant 💎'}
				</button>
			</div>
		</main>
	);
};

export default CartPage;

//
// 🎨 STYLES
//

const container = {
	minHeight: '100vh',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	background: 'linear-gradient(180deg,#020617,#0f172a)',
	padding: 20,
};

const card = {
	width: 450,
	padding: 30,
	borderRadius: 20,
	background: '#020617',
	border: '1px solid rgba(255,255,255,0.08)',
	boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
};

const title = {
	marginBottom: 20,
	fontSize: 26,
};

const list = {
	display: 'grid',
	gap: 12,
	marginBottom: 20,
};

const itemRow = {
	display: 'flex',
	alignItems: 'center',
	gap: 12,
	background: '#0f172a',
	padding: 10,
	borderRadius: 12,
};

const image = {
	width: 50,
	height: 50,
	objectFit: 'cover' as const,
	borderRadius: 8,
};

const name = {
	margin: 0,
	fontWeight: 600,
};

const price = {
	margin: 0,
	opacity: 0.7,
};

const qtyBox = {
	display: 'flex',
	alignItems: 'center',
	gap: 6,
};

const qtyBtn = {
	width: 28,
	height: 28,
	borderRadius: 6,
	border: 'none',
	background: '#1e293b',
	color: 'white',
	cursor: 'pointer',
};

const deleteBtn = {
	background: 'transparent',
	border: 'none',
	cursor: 'pointer',
	fontSize: 18,
};

const promoBox = {
	display: 'flex',
	gap: 10,
	marginBottom: 20,
};

const input = {
	flex: 1,
	padding: 12,
	borderRadius: 10,
	border: '1px solid #334155',
	background: '#020617',
	color: 'white',
};

const button = {
	padding: '12px 16px',
	borderRadius: 10,
	border: 'none',
	background: 'linear-gradient(135deg,#f7e7a1,#d4af37,#b8962e)',
	color: '#020617',
	fontWeight: 600,
	cursor: 'pointer',
};

const totals = {
	display: 'grid',
	gap: 10,
};

const row = {
	display: 'flex',
	justifyContent: 'space-between',
	opacity: 0.8,
};

const rowPromo = {
	display: 'flex',
	justifyContent: 'space-between',
	fontSize: 18,
	fontWeight: 700,
	color: '#d4af37',
};

const checkoutBtn = {
	marginTop: 20,
	width: '100%',
	padding: '14px',
	borderRadius: 12,
	border: 'none',
	background: 'linear-gradient(135deg,#f7e7a1,#d4af37,#b8962e)',
	color: '#020617',
	fontWeight: 700,
	fontSize: 16,
};