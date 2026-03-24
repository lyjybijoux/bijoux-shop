'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import CartDrawer from './CartDrawer';
import CartButton from './CartButton';
import Toast from './Toast';
import FiltersMenu from './FiltersMenu';

const ClientProviders = () => {
	const [openMenu, setOpenMenu] = useState(false);
	const pathname = usePathname();

	// 🔥 On cache les filtres sur certaines pages
	const HIDDEN_ROUTES = ['/account', '/cart', '/contact'];

	const hideFilters = HIDDEN_ROUTES.some((route) =>
		pathname.startsWith(route)
	);

	const showFilters = !hideFilters;

	return (
		<>
			{/* 🔥 BOUTON MENU GLOBAL */}
			<button
				onClick={() => setOpenMenu(true)}
				style={menuButton}
			>
				☰ Menu
			</button>

			{/* 🔥 DRAWER MENU */}
			{openMenu && (
				<div style={drawerOverlay}>
					<div style={drawer}>
						{/* HEADER */}
						<div style={drawerHeader}>
							<h2 style={{ margin: 0 }}>Navigation</h2>

							<button
								onClick={() => setOpenMenu(false)}
								style={closeButton}
							>
								✕
							</button>
						</div>

						{/* LIENS */}
						<div style={drawerLinks}>
							<Link href="/" style={drawerLink} onClick={() => setOpenMenu(false)}>
								🏠 Accueil
							</Link>

							<Link href="/cart" style={drawerLink} onClick={() => setOpenMenu(false)}>
								🛒 Panier
							</Link>

							<Link href="/contact" style={drawerLink} onClick={() => setOpenMenu(false)}>
								✉️ Contact
							</Link>

							<Link href="/account" style={drawerLink} onClick={() => setOpenMenu(false)}>
								👤 Mon compte
							</Link>
						</div>

						{/* 🔥 FILTRES CONDITIONNELS */}
						{showFilters && (
							<>
								<hr style={divider} />
								<FiltersMenu />
							</>
						)}
					</div>
				</div>
			)}

			{/* AUTRES PROVIDERS */}
			<CartDrawer />
			<CartButton />
			<Toast />
		</>
	);
};

export default ClientProviders;

//
// 🎨 STYLES
//

const menuButton = {
	position: 'fixed' as const,
	top: 20,
	left: 20,
	zIndex: 999,
	padding: '10px 16px',
	borderRadius: 12,
	border: 'none',
	background: 'linear-gradient(135deg, #f7e7a1, #d4af37)',
	color: '#111',
	fontWeight: 700,
	cursor: 'pointer',
	boxShadow: '0 10px 25px rgba(212,175,55,0.5)',
};

const drawerOverlay = {
	position: 'fixed' as const,
	inset: 0,
	background: 'rgba(0,0,0,0.6)',
	zIndex: 1000,
	display: 'flex',
};

const drawer = {
	width: 320,
	background: '#020617',
	padding: 20,
	display: 'flex',
	flexDirection: 'column' as const,
};

const drawerHeader = {
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	marginBottom: 20,
};

const closeButton = {
	background: 'transparent',
	border: '1px solid rgba(255,255,255,0.2)',
	color: 'white',
	borderRadius: 8,
	padding: '6px 10px',
	cursor: 'pointer',
};

const drawerLinks = {
	display: 'flex',
	flexDirection: 'column' as const,
	gap: 12,
};

const drawerLink = {
	padding: '12px 14px',
	borderRadius: 10,
	background: 'rgba(255,255,255,0.05)',
	color: 'white',
	textDecoration: 'none',
	fontWeight: 500,
};

const divider = {
	margin: '20px 0',
	borderColor: 'rgba(255,255,255,0.1)',
};