'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import useAuthStore from '@/store/auth';
import useOrdersStore from '@/store/orders';
import useCartStore from '@/store/cart';

const AccountPage = () => {
	const router = useRouter();

	// 🔐 Auth
	const user = useAuthStore((state) => state.user);
	const logout = useAuthStore((state) => state.logout);
	const hasHydrated = useAuthStore((state) => state.hasHydrated);

	// 📦 Commandes
	const orders = useOrdersStore((state) => state.orders);

	// 🛒 Cart
	const clearCart = useCartStore((state) => state.clearCart);

	// 🔥 REDIRECT PROPRE
	useEffect(() => {
		if (hasHydrated && !user) {
			router.replace('/login');
		}
	}, [user, hasHydrated, router]);

	// 🔥 HYDRATION
	if (!hasHydrated) return null;

	if (!user) {
		return <p style={{ padding: 40 }}>Redirection...</p>;
	}

	return (
		<main style={container}>
			{/* HEADER */}
			<div style={header}>
				<h1 style={title}>Mon compte</h1>

				<button
					onClick={() => {
						logout();
						clearCart();
						router.push('/');
					}}
					style={logoutBtn}
				>
					Se déconnecter
				</button>
			</div>

			{/* GRID */}
			<div style={grid}>
				{/* INFOS */}
				<div style={card}>
					<h2 style={cardTitle}>👤 Informations</h2>

					<div style={info}>
						<span style={label}>Prénom</span>
						<span>{user.firstName}</span>
					</div>

					<div style={info}>
						<span style={label}>Email</span>
						<span>{user.email}</span>
					</div>
				</div>

				{/* COMMANDES */}
				<div style={card}>
					<h2 style={cardTitle}>🧾 Mes commandes</h2>

					<div style={ordersList}>
						{orders.length === 0 ? (
							<p style={{ opacity: 0.6 }}>
								Aucune commande pour le moment.
							</p>
						) : (
							orders.map((order) => (
								<div
									key={order.id}
									style={{ ...orderCard, cursor: 'pointer' }}
									onClick={() =>
										router.push(`/account/orders/${order.id}`)
									}
								>
									<div>
										<p style={orderId}>
											Commande #{order.id.slice(0, 6)}
										</p>

										<p style={orderMeta}>
											{new Date(order.date).toLocaleDateString()} •{' '}
											{order.items.length} article(s)
										</p>
									</div>

									<div style={{ textAlign: 'right' }}>
										<p style={orderTotal}>{order.total} €</p>
										<p style={statusPaid}>Payée</p>
									</div>
								</div>
							))
						)}
					</div>

					<button
						style={btnOutline}
						onClick={() => router.push('/')}
					>
						Voir la boutique
					</button>
				</div>

				{/* ACTIONS */}
				<div style={card}>
					<h2 style={cardTitle}>⚙️ Paramètres</h2>

					<button style={btnOutline}>
						Modifier mes informations
					</button>

					<button style={dangerBtn}>
						Supprimer mon compte
					</button>
				</div>
			</div>
		</main>
	);
};

export default AccountPage;

//
// 🎨 STYLES
//

const container = {
	padding: 40,
	color: 'white',
};

const header = {
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	marginBottom: 30,
};

const title = {
	fontSize: 28,
};

const grid = {
	display: 'grid',
	gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
	gap: 20,
};

const card = {
	background: '#1e293b',
	borderRadius: 16,
	padding: 20,
	border: '1px solid rgba(255,255,255,0.08)',
};

const cardTitle = {
	marginBottom: 15,
};

const info = {
	display: 'flex',
	justifyContent: 'space-between',
	marginBottom: 10,
};

const label = {
	opacity: 0.6,
};

const logoutBtn = {
	padding: '8px 14px',
	borderRadius: 8,
	border: 'none',
	background: '#ef4444',
	color: 'white',
	cursor: 'pointer',
};

const btnOutline = {
	marginTop: 10,
	padding: '10px 14px',
	borderRadius: 8,
	background: 'transparent',
	border: '1px solid rgba(255,255,255,0.2)',
	color: 'white',
	cursor: 'pointer',
};

const dangerBtn = {
	marginTop: 10,
	padding: '10px 14px',
	borderRadius: 8,
	border: 'none',
	background: '#b91c1c',
	color: 'white',
	cursor: 'pointer',
};

const ordersList = {
	display: 'flex',
	flexDirection: 'column' as const,
	gap: 10,
};

const orderCard = {
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	padding: 12,
	borderRadius: 10,
	background: '#0f172a',
	border: '1px solid rgba(255,255,255,0.05)',
};

const orderId = {
	fontWeight: 600,
};

const orderMeta = {
	fontSize: 12,
	opacity: 0.6,
};

const orderTotal = {
	fontWeight: 600,
};

const statusPaid = {
	fontSize: 12,
	color: '#22c55e',
};