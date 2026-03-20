'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const linkStyle = (active: boolean): React.CSSProperties => ({
	display: 'block',
	padding: '12px 14px',
	borderRadius: 10,
	textDecoration: 'none',
	color: 'white',
	background: active ? '#1e293b' : 'transparent',
	border: active
		? '1px solid rgba(255,255,255,0.08)'
		: '1px solid transparent',
	transition: 'all 0.2s ease',
});

const AdminSidebar = () => {
	const pathname = usePathname();

	const isActive = (path: string) => pathname === path;

	return (
		<aside
			style={{
				width: 260,
				minHeight: '100vh',
				padding: 20,
				background: '#020617',
				borderRight: '1px solid rgba(255,255,255,0.08)',
				position: 'sticky',
				top: 0,
			}}
		>
			{/* HEADER */}
			<div style={{ marginBottom: 24 }}>
				<p style={{ color: 'gold', fontWeight: 700, margin: 0 }}>
					⚙️ Admin Boutique
				</p>
				<p
					style={{
						opacity: 0.6,
						marginTop: 8,
						marginBottom: 0,
					}}
				>
					Gestion du catalogue
				</p>
			</div>

			{/* NAV */}
			<nav style={{ display: 'grid', gap: 10 }}>
				<Link href="/admin" style={linkStyle(isActive('/admin'))}>
					Tableau de bord
				</Link>

				<Link
					href="/admin/products"
					style={linkStyle(isActive('/admin/products'))}
				>
					Produits
				</Link>

				<Link
					href="/admin/categories"
					style={linkStyle(isActive('/admin/categories'))}
				>
					Catégories
				</Link>

				<Link
					href="/admin/themes"
					style={linkStyle(isActive('/admin/themes'))}
				>
					Thèmes
				</Link>

				{/* 🔥 NOUVEAUX ONGLET PHASE 3 */}
				<Link
					href="/admin/customers"
					style={linkStyle(isActive('/admin/customers'))}
				>
					Clients
				</Link>

				<Link
					href="/admin/promos"
					style={linkStyle(isActive('/admin/promos'))}
				>
					Promotions
				</Link>

				<Link
					href="/admin/promo-codes"
					style={linkStyle(isActive('/admin/promo-codes'))}
				>
					Codes promo
				</Link>

				{/* 🚀 PHASE 4 (déjà prêt) */}
				<Link
					href="/admin/orders"
					style={linkStyle(isActive('/admin/orders'))}
				>
					Commandes
				</Link>
			</nav>
		</aside>
	);
};

export default AdminSidebar;