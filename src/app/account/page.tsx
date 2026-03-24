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

	const totalSpent = orders.reduce((sum, o) => sum + o.total, 0);
	const totalItems = orders.reduce((sum, o) => sum + o.items.length, 0);

	return (
		<main style={container}>
			{/* HEADER */}
			<div style={header}>
				
				{/* TITRE */}
				<h1 style={title}>Mon compte</h1>

				{/* ACTION DROITE */}
				<div style={headerRight}>
					<button
						onClick={() => {
							logout();
							clearCart();
							router.push('/');
						}}
						style={btnRuby}
					>
						Se déconnecter
					</button>
				</div>
			</div>

			{/* GRID */}
			<div style={grid}>
				{/* INFOS */}
				<div style={card}>
					<h2 style={cardTitle}>👤 Informations</h2>

					<div style={info}><span style={label}>Prénom</span><span>{user.firstName}</span></div>
					<div style={info}><span style={label}>Nom</span><span>{user.lastName || '-'}</span></div>
					<div style={info}><span style={label}>Email</span><span>{user.email}</span></div>
					<div style={info}><span style={label}>Téléphone mobile</span><span>{user.phoneMobile || '-'}</span></div>
					<div style={info}><span style={label}>Téléphone fixe</span><span>{user.phoneFix || '-'}</span></div>

					<div style={info}>
						<span style={label}>Adresse postale</span>
						<span>
							{user.address
								? `${user.address.street} ${user.address.postalCode} ${user.address.city}`
								: '-'}
						</span>
					</div>

					<div style={info}><span style={label}>Statut</span><span style={{ color: '#22c55e' }}>Actif</span></div>
					<div style={info}><span style={label}>Nombre de commandes</span><span>{orders.length}</span></div>
					<div style={info}><span style={label}>Articles commandés</span><span>{totalItems}</span></div>
					<div style={info}><span style={label}>Montant total</span><span>{totalSpent.toFixed(2)} €</span></div>
				</div>

				{/* COMMANDES */}
				<div style={card}>
					<h2 style={cardTitle}>🧾 Mes commandes</h2>

					{orders.length === 0 ? (
						<p style={{ opacity: 0.6 }}>
							Aucune commande pour le moment.
						</p>
					) : (
						orders.map((order) => (
							<div
								key={order.id}
								style={orderCard}
								onClick={() =>
									router.push(`/account/orders/${order.id}`)
								}
							>
								<div>
									<p style={orderId}>Commande #{order.id.slice(0, 6)}</p>
									<p style={orderMeta}>
										{new Date(order.date).toLocaleDateString()} • {order.items.length} article(s)
									</p>
								</div>

								<div style={{ textAlign: 'right' }}>
									<p style={orderTotal}>{order.total} €</p>
									<p style={statusPaid}>Payée</p>
								</div>
							</div>
						))
					)}

					<button
						style={btnGold}
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
							style={btnSapphire}
							onClick={() => router.push('/account/edit')}
						>
							Modifier mes informations
						</button>

						<button style={btnSapphire}>
							Changer mot de passe
						</button>

						<button style={btnRuby}>
							Supprimer mon compte
						</button>
					</div>
				</div>
			</div>
		</main>
	);
};

export default AccountPage;

////////////////////////////////////////////////////////
// 🎨 STYLES
////////////////////////////////////////////////////////

const container = {
	padding: 40,
	color: 'white',
};

const header = {
	display: 'grid',
	gridTemplateColumns: '1fr auto 1fr',
	alignItems: 'center',
	marginBottom: 30,
};

const headerRight = {
	display: 'flex',
	justifyContent: 'flex-end',
	gap: 12,
};

const title = {
	fontSize: 28,
	textAlign: 'center' as const,
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

const orderCard = {
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	padding: 12,
	borderRadius: 10,
	background: '#0f172a',
	border: '1px solid rgba(255,255,255,0.05)',
	cursor: 'pointer',
};

const orderId = { fontWeight: 600 };
const orderMeta = { fontSize: 12, opacity: 0.6 };
const orderTotal = { fontWeight: 600 };
const statusPaid = { fontSize: 12, color: '#22c55e' };

const actionsColumn = {
	display: 'flex',
	flexDirection: 'column' as const,
	gap: 12,
	marginTop: 10,
};

////////////////////////////////////////////////////////
// 💎 BOUTONS PREMIUM
////////////////////////////////////////////////////////

const btnBase = {
	padding: '10px 16px',
	borderRadius: 10,
	border: 'none',
	fontWeight: 600,
	cursor: 'pointer',
	transition: '0.2s',
};

const btnGold = {
	...btnBase,
	background: 'linear-gradient(135deg,#f7e7a1,#d4af37)',
	color: '#111',
	boxShadow: '0 0 15px rgba(212,175,55,0.6)',
};

const btnRuby = {
	...btnBase,
	background: 'linear-gradient(135deg,#7f1d1d,#dc2626)',
	color: 'white',
	boxShadow: '0 0 15px rgba(220,38,38,0.6)',
};

const btnSapphire = {
	...btnBase,
	background: 'linear-gradient(135deg,#1e3a8a,#2563eb)',
	color: 'white',
	boxShadow: '0 0 15px rgba(37,99,235,0.6)',
};