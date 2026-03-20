'use client';

import { useParams, useRouter } from 'next/navigation';
import useAuthStore from '../../../../store/auth';

type OrderItem = {
	name: string;
	price: number;
	quantity: number;
	image: string;
};

type Order = {
	id: string;
	date: string;
	status: 'paid' | 'pending' | 'shipped';
	total: number;
	items: OrderItem[];
};

// 🔥 MOCK DATA
const mockOrders: Order[] = [
	{
		id: 'CMD-001',
		date: '2026-03-18',
		status: 'paid',
		total: 89,
		items: [
			{
				name: 'Bracelet Or',
				price: 49,
				quantity: 1,
				image: '/placeholder.png',
			},
			{
				name: 'Collier Luxe',
				price: 40,
				quantity: 1,
				image: '/placeholder.png',
			},
		],
	},
	{
		id: 'CMD-002',
		date: '2026-03-10',
		status: 'shipped',
		total: 144,
		items: [
			{
				name: 'Bague Élégance',
				price: 72,
				quantity: 2,
				image: '/placeholder.png',
			},
		],
	},
];

const OrderDetailPage = () => {
	const params = useParams();
	const router = useRouter();

	const user = useAuthStore((state) => state.user);
	const hasHydrated = useAuthStore((state) => state.hasHydrated);

	const order = mockOrders.find((o) => o.id === params.id);

	if (!hasHydrated) return null;

	if (!user) {
		router.replace('/login');
		return null;
	}

	if (!order) {
		return <p style={{ padding: 40 }}>Commande introuvable</p>;
	}

	return (
		<main style={container}>
			{/* HEADER */}
			<div style={header}>
				<button style={btnOutline} onClick={() => router.back()}>
					← Retour
				</button>

				<h1>Commande {order.id}</h1>
			</div>

			{/* INFOS */}
			<div style={card}>
				<p>Date : {order.date}</p>
				<p>
					Statut :{' '}
					<span style={statusStyle(order.status)}>
						{getStatusLabel(order.status)}
					</span>
				</p>
				<p>Total : {order.total} €</p>
			</div>

			{/* PRODUITS */}
			<div style={card}>
				<h2>Articles</h2>

				<div style={itemsList}>
					{order.items.map((item, index) => (
						<div key={index} style={itemCard}>
							<img src={item.image} style={itemImage} />

							<div style={{ flex: 1 }}>
								<p>{item.name}</p>
								<p style={{ opacity: 0.6 }}>
									{item.quantity} × {item.price} €
								</p>
							</div>

							<p>{item.price * item.quantity} €</p>
						</div>
					))}
				</div>
			</div>
		</main>
	);
};

export default OrderDetailPage;

//
// 🔥 HELPERS
//

const getStatusLabel = (status: string) => {
	switch (status) {
		case 'paid':
			return 'Payée';
		case 'pending':
			return 'En attente';
		case 'shipped':
			return 'Expédiée';
		default:
			return status;
	}
};

const statusStyle = (status: string) => ({
	color:
		status === 'paid'
			? '#22c55e'
			: status === 'pending'
			? '#f59e0b'
			: '#3b82f6',
});

//
// 🎨 STYLES
//

const container = {
	padding: 40,
	color: 'white',
};

const header = {
	display: 'flex',
	alignItems: 'center',
	gap: 20,
	marginBottom: 20,
};

const card = {
	background: '#1e293b',
	borderRadius: 16,
	padding: 20,
	marginBottom: 20,
};

const itemsList = {
	display: 'flex',
	flexDirection: 'column' as const,
	gap: 10,
};

const itemCard = {
	display: 'flex',
	alignItems: 'center',
	gap: 10,
	padding: 10,
	borderRadius: 10,
	background: '#0f172a',
};

const itemImage = {
	width: 60,
	height: 60,
	objectFit: 'cover' as const,
	borderRadius: 8,
};

const btnOutline = {
	padding: '8px 14px',
	borderRadius: 8,
	background: 'transparent',
	border: '1px solid rgba(255,255,255,0.2)',
	color: 'white',
	cursor: 'pointer',
};