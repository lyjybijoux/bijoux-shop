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

	const address = (user as { address?: { street?: string; city?: string; zip?: string } }).address;

	const totalOrders = orders.length;
	const totalSpent = orders.reduce((sum, order) => sum + order.total, 0);
	const totalItems = orders.reduce((sum, order) => sum + order.items.length, 0);

	const postalAddress = address
		? [address.street, address.zip, address.city].filter(Boolean).join(', ')
		: 'Non renseignée';

	return (
		<main style={container}>
			<div style={header}>
				<div style={headerLeft}>
					<div style={avatar}>
						{user.firstName?.[0]?.toUpperCase() || 'U'}
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

			<div style={grid}>
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
						<span style={label}>Adresse postale</span>
						<span style={infoValueMultiline}>{postalAddress}</span>
					</div>

					<div style={info}>
						<span style={label}>Statut</span>
						<span style={statusActive}>Actif</span>
					</div>

					<div style={info}>
						<span style={label}>Nombre de commandes</span>
						<span>{totalOrders}</span>
					</div>

					<div style={info}>
						<span style={label}>Articles commandés</span>
						<span>{totalItems}</span>
					</div>

					<div style={info}>
						<span style={label}>Montant total</span>
						<span>{totalSpent.toFixed(2)} €</span>
					</div>
				</div>

				<div style={card}>
					<h2 style={cardTitle}>🧾 Mes commandes</h2>

					<div style={ordersList}>
						{orders.length === 0 ? (
							<p style={emptyText}>Aucune commande pour le moment.</p>
						) : (
							orders.map((order) => (
								<div
									key={order.id}
									style={{ ...orderCard, cursor: 'pointer' }}
									onClick={() => router.push(`/account/orders/${order.id}`)}
								>
									<div>
										<p style={orderId}>Commande #{order.id.slice(0, 6)}</p>

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

				<div style={card}>
					<h2 style={cardTitle}>⚙️ Paramètres</h2>

					<p style={settingsText}>
						Gère ton compte, mets à jour tes informations et sécurise ton accès.
					</p>

					<div style={actionsColumn}>
				<button
					type="button"
					style={btnOutline}
					onClick={() => router.push('/account/edit')}
					>
					Modifier mes informations
				</button>

						<button
							type="button"
							style={btnOutline}
							onClick={() => {
								alert('Page de changement de mot de passe à brancher ici.');
							}}
						>
							Changer mot de passe
						</button>

						<button
							type="button"
							style={dangerBtn}
							onClick={() => {
								const confirmed = window.confirm(
									'Es-tu sûr de vouloir supprimer ton compte ?'
								);

								if (confirmed) {
									alert('Suppression du compte à brancher ici.');
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

const container = {
	padding: 40,
	color: 'white',
};

const header = {
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	marginBottom: 30,
	gap: 20,
	flexWrap: 'wrap' as const,
};

const headerLeft = {
	display: 'flex',
	alignItems: 'center',
	gap: 12,
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
	fontSize: 18,
};

const title = {
	fontSize: 28,
	margin: 0,
};

const subtitle = {
	opacity: 0.6,
	marginTop: 6,
	marginBottom: 0,
};

const statsGrid = {
	display: 'grid',
	gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
	gap: 16,
	marginBottom: 20,
};

const statCard = {
	background: '#0f172a',
	borderRadius: 14,
	padding: 18,
	border: '1px solid rgba(255,255,255,0.06)',
};

const statLabel = {
	fontSize: 13,
	opacity: 0.65,
	margin: 0,
	marginBottom: 8,
};

const statValue = {
	fontSize: 24,
	fontWeight: 700,
	margin: 0,
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
	marginTop: 0,
	marginBottom: 15,
};

const info = {
	display: 'flex',
	justifyContent: 'space-between',
	marginBottom: 10,
	gap: 16,
};

const infoValueMultiline = {
	textAlign: 'right' as const,
	maxWidth: 260,
	wordBreak: 'break-word' as const,
};

const label = {
	opacity: 0.6,
};

const statusActive = {
	color: '#22c55e',
	fontWeight: 600,
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
	padding: '12px 14px',
	borderRadius: 10,
	background: 'transparent',
	border: '1px solid rgba(255,255,255,0.2)',
	color: 'white',
	cursor: 'pointer',
	width: '100%',
};

const dangerBtn = {
	padding: '12px 14px',
	borderRadius: 10,
	border: 'none',
	background: '#b91c1c',
	color: 'white',
	cursor: 'pointer',
	width: '100%',
};

const actionsColumn = {
	display: 'flex',
	flexDirection: 'column' as const,
	gap: 12,
};

const settingsText = {
	opacity: 0.7,
	marginTop: 0,
	marginBottom: 10,
};

const ordersList = {
	display: 'flex',
	flexDirection: 'column' as const,
	gap: 10,
	marginBottom: 10,
};

const emptyText = {
	opacity: 0.6,
	margin: 0,
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
	margin: 0,
};

const orderMeta = {
	fontSize: 12,
	opacity: 0.6,
	margin: '4px 0 0 0',
};

const orderTotal = {
	fontWeight: 600,
	margin: 0,
};

const statusPaid = {
	fontSize: 12,
	color: '#22c55e',
	margin: '4px 0 0 0',
};