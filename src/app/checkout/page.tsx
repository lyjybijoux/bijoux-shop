'use client';

import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

import useCartStore from '../../store/cart';
import useAuthStore from '../../store/auth';

const stripePromise = loadStripe(
	process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? ''
);

const CheckoutPage = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	const items = useCartStore((state) => state.items);
	const userId = useCartStore((state) => state.userId);

	const user = useAuthStore((state) => state.user);
	const hasHydrated = useAuthStore((state) => state.hasHydrated);

	if (!hasHydrated) return null;

	const total = items.reduce(
		(sum, item) => sum + item.price * item.quantity,
		0
	);

	const handleCheckout = async () => {
		try {
			setLoading(true);
			setError('');

			if (items.length === 0) {
				setError('Votre panier est vide.');
				return;
			}

			const response = await fetch('/api/checkout', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					items,
					userId,
					userEmail: user?.email ?? null,
				}),
			});

			const data = (await response.json()) as {
				url?: string;
				message?: string;
			};

			if (!response.ok || !data.url) {
				throw new Error(data.message || 'Impossible de lancer le paiement.');
			}

			const stripe = await stripePromise;

			if (!stripe) {
				throw new Error('Stripe.js n’a pas pu être initialisé.');
			}

			window.location.href = data.url;
		} catch (error) {
			const message =
				error instanceof Error ? error.message : 'Erreur inconnue.';
			setError(message);
		} finally {
			setLoading(false);
		}
	};

	if (items.length === 0) {
		return (
			<main style={container}>
				<div style={card}>
					<h1 style={title}>Checkout</h1>
					<p style={muted}>Votre panier est vide.</p>
				</div>
			</main>
		);
	}

	return (
		<main style={container}>
			<div style={layout}>
				<section style={card}>
					<h1 style={title}>Checkout</h1>
					<p style={muted}>Vérifiez vos articles avant paiement.</p>

					<div style={itemsList}>
						{items.map((item) => (
							<div key={item.id} style={itemRow}>
								<div>
									<p style={itemTitle}>{item.title}</p>
									<p style={itemMeta}>
										{item.quantity} × {item.price} €
									</p>
								</div>

								<p style={itemPrice}>
									{item.price * item.quantity} €
								</p>
							</div>
						))}
					</div>
				</section>

				<aside style={card}>
					<h2 style={sectionTitle}>Résumé</h2>

					<div style={summaryRow}>
						<span>Sous-total</span>
						<span>{total} €</span>
					</div>

					<div style={summaryRow}>
						<span>Livraison</span>
						<span>Offerte</span>
					</div>

					<div style={summaryTotal}>
						<span>Total</span>
						<span>{total} €</span>
					</div>

					{error ? <p style={errorStyle}>{error}</p> : null}

					<button
						type="button"
						onClick={handleCheckout}
						disabled={loading}
						style={payButton}
					>
						{loading ? 'Redirection...' : 'Payer avec Stripe'}
					</button>
				</aside>
			</div>
		</main>
	);
};

export default CheckoutPage;

const container: React.CSSProperties = {
	padding: 40,
	color: 'white',
};

const layout: React.CSSProperties = {
	display: 'grid',
	gridTemplateColumns: 'minmax(0, 1fr) 360px',
	gap: 24,
	alignItems: 'start',
};

const card: React.CSSProperties = {
	background: '#1e293b',
	borderRadius: 16,
	padding: 24,
	border: '1px solid rgba(255,255,255,0.08)',
};

const title: React.CSSProperties = {
	fontSize: 28,
	marginBottom: 8,
};

const sectionTitle: React.CSSProperties = {
	fontSize: 20,
	marginBottom: 16,
};

const muted: React.CSSProperties = {
	opacity: 0.7,
	marginBottom: 20,
};

const itemsList: React.CSSProperties = {
	display: 'flex',
	flexDirection: 'column',
	gap: 12,
};

const itemRow: React.CSSProperties = {
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	padding: 12,
	borderRadius: 12,
	background: '#0f172a',
	border: '1px solid rgba(255,255,255,0.05)',
};

const itemTitle: React.CSSProperties = {
	margin: 0,
	fontWeight: 600,
};

const itemMeta: React.CSSProperties = {
	margin: '4px 0 0',
	opacity: 0.65,
	fontSize: 14,
};

const itemPrice: React.CSSProperties = {
	margin: 0,
	fontWeight: 600,
};

const summaryRow: React.CSSProperties = {
	display: 'flex',
	justifyContent: 'space-between',
	marginBottom: 10,
	opacity: 0.85,
};

const summaryTotal: React.CSSProperties = {
	display: 'flex',
	justifyContent: 'space-between',
	marginTop: 18,
	paddingTop: 18,
	borderTop: '1px solid rgba(255,255,255,0.08)',
	fontSize: 18,
	fontWeight: 700,
};

const payButton: React.CSSProperties = {
	marginTop: 20,
	width: '100%',
	padding: '14px 16px',
	borderRadius: 10,
	border: 'none',
	background: 'linear-gradient(135deg, #f7e7a1 0%, #d4af37 45%, #b8962e 100%)',
	color: '#111',
	fontWeight: 700,
	cursor: 'pointer',
};

const errorStyle: React.CSSProperties = {
	marginTop: 14,
	color: '#fca5a5',
};