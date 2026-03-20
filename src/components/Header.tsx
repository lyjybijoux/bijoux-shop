'use client';

import Link from 'next/link';

import useAuthStore from '../store/auth';
import useCartStore from '../store/cart';

const Header = () => {
	const user = useAuthStore((state) => state.user);
	const logout = useAuthStore((state) => state.logout);

	const clearCart = useCartStore((state) => state.clearCart);

	// 🔥 logout propre (auth + panier)
	const handleLogout = () => {
		logout();
		clearCart();
	};

	return (
		<header
			style={{
				display: 'flex',
				justifyContent: 'space-between',
				padding: '16px 24px',
				background: '#020617',
				color: 'white',
			}}
		>
			<Link href="/">💎 Bijoux Shop</Link>

			<div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
				{user ? (
					<>
						<span>Bonjour {user.firstName}</span>

						<Link href="/account">Mon compte</Link>

						<button
							onClick={handleLogout}
							style={{
								padding: '6px 10px',
								borderRadius: 6,
								border: '1px solid #334155',
								background: 'transparent',
								color: 'white',
								cursor: 'pointer',
							}}
						>
							Logout
						</button>
					</>
				) : (
					<>
						<Link href="/login">Connexion</Link>
						<Link href="/register">Inscription</Link>
					</>
				)}
			</div>
		</header>
	);
};

export default Header;