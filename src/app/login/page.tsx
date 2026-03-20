'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import useAuthStore from '../../store/auth';
import useCartStore from '../../store/cart';

interface LoginResponse {
	message: string;
	customer?: {
		id: string;
		firstName: string;
		email: string;
	};
}

const LoginPage = () => {
	const router = useRouter();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const user = useAuthStore((state) => state.user);
const hasHydrated = useAuthStore((state) => state.hasHydrated);
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState('');
	const [error, setError] = useState('');

	const setUser = useAuthStore((state) => state.setUser);
	const setCartUserId = useCartStore((state) => state.setUserId);

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		setLoading(true);
		setMessage('');
		setError('');

		try {
			const response = await fetch('/api/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email, password }),
			});

			const data = (await response.json()) as LoginResponse;

			if (!response.ok) {
				throw new Error(data.message || 'Erreur de connexion');
			}

			if (data.customer) {
				setUser(data.customer);
				setCartUserId(data.customer.id);
			}

			setMessage(`Bienvenue ${data.customer?.firstName}`);

			setTimeout(() => {
				router.push('/account');
			}, 800);
		} catch (error) {
			const message =
				error instanceof Error ? error.message : 'Erreur inconnue';
			setError(message);
		} finally {
			setLoading(false);
		}
	};
if (!hasHydrated) return null;

	return (
		<main style={main}>
			<div style={card}>
				<h1 style={title}>Connexion</h1>

				<form onSubmit={handleSubmit} style={form}>
					<input
						type="email"
						placeholder="Adresse e-mail"
						value={email}
						onChange={(event) => setEmail(event.target.value)}
						required
						style={inputStyle}
					/>

					<input
						type="password"
						placeholder="Mot de passe"
						value={password}
						onChange={(event) => setPassword(event.target.value)}
						required
						style={inputStyle}
					/>

					{message && <p style={{ color: '#86efac' }}>{message}</p>}
					{error && <p style={{ color: '#fca5a5' }}>{error}</p>}

					<button type="submit" disabled={loading} style={buttonStyle}>
						{loading ? 'Connexion...' : 'Se connecter'}
					</button>
				</form>

				{/* 🔥 Lien création compte */}
				<div style={linkContainer}>
					<span style={{ opacity: 0.7 }}>
						Pas encore de compte ?
					</span>

					<Link
						href="/register"
						style={link}
						onMouseEnter={(e) =>
							Object.assign(e.currentTarget.style, linkHover)
						}
						onMouseLeave={(e) =>
							Object.assign(e.currentTarget.style, link)
						}
					>
						Créer un compte
					</Link>
				</div>
			</div>
		</main>
	);
};

export default LoginPage;

//
// 🎨 STYLES
//

const main: React.CSSProperties = {
	minHeight: '100vh',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	background: '#0f172a',
	color: 'white',
	padding: 24,
};

const card: React.CSSProperties = {
	width: '100%',
	maxWidth: 420,
	background: '#1e293b',
	padding: 24,
	borderRadius: 16,
};

const title: React.CSSProperties = {
	fontSize: 28,
	marginBottom: 8,
};

const form: React.CSSProperties = {
	display: 'grid',
	gap: 12,
};

const inputStyle: React.CSSProperties = {
	width: '100%',
	padding: '14px 16px',
	borderRadius: 10,
	border: '1px solid #334155',
	background: '#0f172a',
	color: 'white',
};

const buttonStyle: React.CSSProperties = {
	padding: '14px 16px',
	borderRadius: 10,
	border: 'none',
	background: 'linear-gradient(135deg, #f7e7a1 0%, #d4af37 45%, #b8962e 100%)',
	color: '#111',
	fontWeight: 700,
	cursor: 'pointer',
};

const linkContainer: React.CSSProperties = {
	marginTop: 16,
	fontSize: 14,
	textAlign: 'center',
	display: 'flex',
	justifyContent: 'center',
	gap: 6,
};

const link: React.CSSProperties = {
	color: '#d4af37',
	fontWeight: 600,
	textDecoration: 'none',
	cursor: 'pointer',
};

const linkHover: React.CSSProperties = {
	textDecoration: 'underline',
};