'use client';

import { useState } from 'react';
import Link from 'next/link';

interface RegisterResponse {
	message: string;
	customer?: {
		firstName: string;
		lastName: string;
		email: string;
	};
}

const RegisterPage = () => {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState('');
	const [error, setError] = useState('');

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		setLoading(true);
		setMessage('');
		setError('');

		try {
			const response = await fetch('/api/register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					firstName,
					lastName,
					email,
					password,
				}),
			});

			const data = (await response.json()) as RegisterResponse;

			if (!response.ok) {
				throw new Error(data.message || 'Une erreur est survenue.');
			}

			setMessage(data.message);
			setFirstName('');
			setLastName('');
			setEmail('');
			setPassword('');
		} catch (error) {
			const message =
				error instanceof Error ? error.message : 'Une erreur est survenue.';
			setError(message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<main style={main}>
			<div style={card}>
				<h1 style={title}>Créer un compte</h1>

				<p style={subtitle}>
					Inscrivez-vous pour suivre vos commandes.
				</p>

				<form onSubmit={handleSubmit} style={form}>
					<input
						type="text"
						placeholder="Prénom"
						value={firstName}
						onChange={(event) => setFirstName(event.target.value)}
						required
						style={inputStyle}
					/>

					<input
						type="text"
						placeholder="Nom"
						value={lastName}
						onChange={(event) => setLastName(event.target.value)}
						required
						style={inputStyle}
					/>

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

					{message && (
						<p style={{ color: '#86efac', margin: 0 }}>{message}</p>
					)}

					{error && (
						<p style={{ color: '#fca5a5', margin: 0 }}>{error}</p>
					)}

					<button type="submit" style={buttonStyle} disabled={loading}>
						{loading ? 'Inscription...' : 'S’inscrire'}
					</button>
				</form>

				{/* 🔥 Lien connexion */}
				<div style={linkContainer}>
					<span style={{ opacity: 0.7 }}>
						Déjà un compte ?
					</span>

					<Link
						href="/login"
						style={link}
						onMouseEnter={(e) =>
							Object.assign(e.currentTarget.style, linkHover)
						}
						onMouseLeave={(e) =>
							Object.assign(e.currentTarget.style, link)
						}
					>
						Se connecter
					</Link>
				</div>
			</div>
		</main>
	);
};

export default RegisterPage;

//
// 🎨 STYLES
//

const main: React.CSSProperties = {
	minHeight: '100vh',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	padding: 24,
	background: '#0f172a',
	color: 'white',
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

const subtitle: React.CSSProperties = {
	opacity: 0.8,
	marginBottom: 24,
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
	outline: 'none',
};

const buttonStyle: React.CSSProperties = {
	marginTop: 8,
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