'use client';

import { useState } from 'react';
import useUIStore from '../store/ui';
import useCartStore from '../store/cart';

const CartDrawer = () => {
	const isOpen = useUIStore((state) => state.isCartOpen);
	const closeCart = useUIStore((state) => state.closeCart);

	const items = useCartStore((state) => state.items);
	const addToCart = useCartStore((state) => state.addToCart);
	const removeFromCart = useCartStore((state) => state.removeFromCart);

	const [loading, setLoading] = useState(false);

	const total = (items || []).reduce(
		(acc, item) => acc + item.price * item.quantity,
		0
	);

	// 🔥 CHECKOUT FIX
	const handleCheckout = async () => {
		if (items.length === 0) return;

		setLoading(true);

		try {
			console.log('🛒 Drawer checkout:', items);

			const res = await fetch('/api/checkout', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					items: items.map((item) => ({
						name: item.title, // 🔥 FIX IMPORTANT
						price: item.price,
						quantity: item.quantity,
					})),
				}),
			});

			if (!res.ok) {
				const text = await res.text();
				console.error('❌ API ERROR:', text);
				return;
			}

			const data = await res.json();

			if (data.url) {
				window.location.href = data.url;
			} else {
				console.error('❌ Pas de URL Stripe');
			}
		} catch (err) {
			console.error('❌ Checkout error', err);
		} finally {
			setLoading(false);
		}
	};

	if (!isOpen) return null;

	return (
		<>
			{/* OVERLAY */}
			<div
				onClick={closeCart}
				style={{
					position: 'fixed',
					inset: 0,
					background: 'rgba(0,0,0,0.5)',
					backdropFilter: 'blur(3px)',
					zIndex: 200,
				}}
			/>

			{/* DRAWER */}
			<div
				style={{
					position: 'fixed',
					right: 0,
					top: 0,
					width: 340,
					height: '100vh',
					background: 'linear-gradient(180deg, #0f172a, #020617)',
					color: 'white',
					padding: 20,
					zIndex: 300,
					display: 'flex',
					flexDirection: 'column',
					boxShadow: '-10px 0 40px rgba(0,0,0,0.7)',
				}}
			>
				{/* HEADER */}
				<h2 style={{ color: 'gold', marginBottom: 20 }}>
					🛒 Panier
				</h2>

				{/* LISTE */}
				<div
					style={{
						flex: 1,
						overflowY: 'auto',
						paddingRight: 5,
					}}
				>
					{items.length === 0 ? (
						<p style={{ opacity: 0.6 }}>
							Votre panier est vide
						</p>
					) : (
						items.map((item) => (
							<div
								key={item.id}
								style={{
									marginBottom: 20,
									paddingBottom: 12,
									borderBottom:
										'1px solid rgba(255,255,255,0.08)',
								}}
							>
								<p style={{ marginBottom: 5 }}>
									{item.title}
								</p>

								<p style={{ color: 'gold' }}>
									{item.quantity} x {item.price} €
								</p>

								<div
									style={{
										display: 'flex',
										alignItems: 'center',
										gap: 10,
										marginTop: 10,
									}}
								>
									<button
										onClick={() => removeFromCart(item.id)}
										style={btnMinus}
									>
										−
									</button>

									<span style={qty}>{item.quantity}</span>

									<button
										onClick={() => addToCart(item)}
										style={btnPlus}
									>
										+
									</button>
								</div>
							</div>
						))
					)}
				</div>

				{/* FOOTER */}
				{items.length > 0 && (
					<div style={footer}>
						<h3 style={{ marginBottom: 10 }}>
							Total :{' '}
							<span style={{ color: 'gold' }}>
								{total} €
							</span>
						</h3>

						<button
							onClick={handleCheckout}
							disabled={loading}
							style={{
								...checkoutBtn,
								opacity: loading ? 0.6 : 1,
								cursor: loading ? 'not-allowed' : 'pointer',
							}}
						>
							{loading ? 'Redirection...' : '💳 Payer maintenant'}
						</button>
					</div>
				)}

				{/* CLOSE */}
				<button onClick={closeCart} style={closeBtn}>
					Fermer
				</button>
			</div>
		</>
	);
};

export default CartDrawer;

//
// 🎨 STYLES
//

const btnMinus = {
	width: 32,
	height: 32,
	borderRadius: '50%',
	border: 'none',
	background: '#7f1d1d',
	color: 'white',
	cursor: 'pointer',
};

const btnPlus = {
	width: 32,
	height: 32,
	borderRadius: '50%',
	border: 'none',
	background: '#1e3a8a',
	color: 'white',
	cursor: 'pointer',
};

const qty = {
	minWidth: 20,
	textAlign: 'center' as const,
};

const footer = {
	marginTop: 20,
	paddingTop: 15,
	borderTop: '1px solid rgba(255,255,255,0.1)',
};

const checkoutBtn = {
	width: '100%',
	padding: 15,
	background: 'linear-gradient(45deg, gold, orange)',
	border: 'none',
	fontWeight: 'bold',
	borderRadius: 10,
};

const closeBtn = {
	marginTop: 15,
	width: '100%',
	padding: 10,
	background: 'transparent',
	border: '1px solid gold',
	color: 'gold',
	cursor: 'pointer',
	borderRadius: 10,
};