'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import useAuthStore from '@/store/auth';
import useOrdersStore from '@/store/orders';
import useCartStore from '@/store/cart';

const AccountPage = () => {
	const router = useRouter();

	const user = useAuthStore((state) => state.user);
	const logout = useAuthStore((state) => state.logout);
	const hasHydrated = useAuthStore((state) => state.hasHydrated);

	const orders = useOrdersStore((state) => state.orders);

	const clearCart = useCartStore((state) => state.clearCart);

	useEffect(() => {
		if (hasHydrated && !user) {
			router.replace('/login');
		}
	}, [user, hasHydrated, router]);

	if (!hasHydrated) return null;

	if (!user) {
		return <p style={{ padding: 40 }}>Redirection...</p>;
	}

	// 🔥 SAFE ACCESS (évite erreurs TS)
	const address = (user as any).address;

	const totalOrders = orders.length;
	const totalSpent = orders.reduce((sum, order) => sum + order.total, 0);
	const totalItems = orders.reduce((sum, order) => sum + order.items.length, 0);

	return (
		<main style={container}>
			{/* HEADER */}
			<div style={header}>
				<div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
					{/* Avatar */}
					<div style={avatar}>
						{user.firstName?.[0]?.toUpperCase()}
					</div>

					<div>
						<h1 style={title}>Mon compte</h1>
						<p style={subtitle}>
							Bienvenue {user.firstName || 'utilisateur'} 👋
						</p>
					</div>
				</div>

				<button
					type="button"
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

			{/* STATS */}
			<div style={statsGrid}>
				<div style={statCard}>
					<p style={statLabel}>Commandes</p>
					<p style={statValue}>{totalOrders}</p>
				</div>

				<div style={statCard}>
					<p style={statLabel}>Articles achetés</p>
					<p style={statValue}>{totalItems}</p>
				</div>

				<div style={statCard}>
					<p style={statLabel}>Total dépensé</p>
					<p style={statValue}>{totalSpent.toFixed(2)} €</p>
				</div>
			</div>

			{/* GRID */}
			<div style={grid}>
				{/* INFOS */}
				<div style={card}>
					<h2 style={cardTitle}>👤 Informations</h2>

					<div style={info}>
						<span style={label}>Prénom</span>
						<span>{user.firstName || '—'}</span>
					</div>

					<div style={info}>
						<span style={label}>Email</span>
						<span>{user.email || '—'}</span>
					</div>

					<div style={info}>
						<span style={label}>Adresse</span>
						<span>
							{address
								? `${address.street}, ${address.city}`
								: 'Non renseignée'}
						</span>
					</div>

					<div style={info}>
						<span style={label}>Statut</span>
						<span style={statusActive}>Actif</span>
					</div>

					<div style={info}>
						<span style={label}>Commandes</span>
						<span>{totalOrders}</span>
					</div>
				</div>

				{/* COMMANDES */}
				<div style={card}>
					<h2 style={cardTitle}>🧾 Mes commandes</h2>

					<div style={ordersList}>
						{orders.length === 0 ? (
							<p style={emptyText}>
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
						type="button"
						style={btnOutline}
						onClick={() => router.push('/')}
					>
						Voir la boutique
					</button>
				</div>

				{/* PARAMÈTRES */}
				<div style={card}>
					<h2 style={cardTitle}>⚙️ Paramètres</h2>

					<div style={actionsColumn}>
						<button
							type="button"
							style={btnOutline}
							onClick={() => console.log('edit')}
						>
							Modifier mes informations
						</button>

						<button
							type="button"
							style={btnOutline}
							onClick={() => console.log('password')}
						>
							Changer mot de passe
						</button>

						<button
							type="button"
							style={dangerBtn}
							onClick={() => {
								if (confirm('Supprimer le compte ?')) {
									console.log('delete');
								}
							}}
						>
							Supprimer mon compte
						</button>
					</div>
				</div>
			</div>
		</main>
	);
};

export default AccountPage;

//
// 🎨 STYLES
//

const container = { padding: 40, color: 'white' };

const header = {
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	marginBottom: 30,
};

const avatar = {
	width: 48,
	height: 48,
	borderRadius: '50%',
	background: '#111827',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	fontWeight: 700,
};

const title = { fontSize: 28, margin: 0 };

const subtitle = { opacity: 0.6, margin: 0 };

const statsGrid = {
	display: 'grid',
	gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
	gap: 16,
	marginBottom: 20,
};

const statCard = {
	background: '#0f172a',
	borderRadius: 14,
	padding: 16,
};

const statLabel = { opacity: 0.6 };

const statValue = { fontSize: 22, fontWeight: 700 };

const grid = {
	display: 'grid',
	gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
	gap: 20,
};

const card = {
	background: '#1e293b',
	borderRadius: 16,
	padding: 20,
};

const cardTitle = { marginBottom: 15 };

const info = {
	display: 'flex',
	justifyContent: 'space-between',
	marginBottom: 10,
};

const label = { opacity: 0.6 };

const statusActive = { color: '#22c55e' };

const logoutBtn = {
	padding: '8px 14px',
	borderRadius: 8,
	background: '#ef4444',
	color: 'white',
	border: 'none',
	cursor: 'pointer',
};

const btnOutline = {
	padding: '10px',
	borderRadius: 8,
	background: 'transparent',
	border: '1px solid rgba(255,255,255,0.2)',
	color: 'white',
	cursor: 'pointer',
};

const dangerBtn = {
	padding: '10px',
	borderRadius: 8,
	background: '#b91c1c',
	color: 'white',
	border: 'none',
	cursor: 'pointer',
};

const actionsColumn = {
	display: 'flex',
	flexDirection: 'column' as const,
	gap: 10,
};

const ordersList = {
	display: 'flex',
	flexDirection: 'column' as const,
	gap: 10,
};

const emptyText = { opacity: 0.6 };

const orderCard = {
	display: 'flex',
	justifyContent: 'space-between',
	padding: 12,
	background: '#0f172a',
	borderRadius: 10,
};

const orderId = { fontWeight: 600 };

const orderMeta = { fontSize: 12, opacity: 0.6 };

const orderTotal = { fontWeight: 600 };

const statusPaid = { fontSize: 12, color: '#22c55e' };