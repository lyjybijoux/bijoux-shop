'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

import CartDrawer from './CartDrawer';
import CartButton from './CartButton';
import Toast from './Toast';

const ClientProviders = () => {
	const pathname = usePathname();

	const shouldShowHome =
		pathname !== '/' && !pathname.startsWith('/admin');

	return (
		<>
			{/* 🏠 BOUTON ACCUEIL */}
			{shouldShowHome && (
				<Link
					href="/"
					style={homeButton}
					onMouseEnter={(e) =>
						Object.assign(e.currentTarget.style, homeHover)
					}
					onMouseLeave={(e) =>
						Object.assign(e.currentTarget.style, homeButton)
					}
				>
					Accueil
				</Link>
			)}

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

const homeButton: React.CSSProperties = {
	position: 'fixed',
	top: 20,
	left: 20,
	padding: '10px 16px',
	borderRadius: 10,
	background: 'linear-gradient(135deg, #f7e7a1 0%, #d4af37 45%, #b8962e 100%)',
	color: '#111',
	fontWeight: 600,
	textDecoration: 'none',
	boxShadow:
		'inset 0 1px 1px rgba(255,255,255,0.5), 0 4px 12px rgba(0,0,0,0.3)',
	zIndex: 2000,
	cursor: 'pointer',
};

const homeHover: React.CSSProperties = {
	filter: 'brightness(1.1)',
};