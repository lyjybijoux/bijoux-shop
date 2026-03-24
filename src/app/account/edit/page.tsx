'use client';

import { useEffect, useState, type ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';

import useAuthStore from '@/store/auth';

type FormState = {
	firstName: string;
	email: string;
	street: string;
	city: string;
	zip: string;
};

const AccountEditPage = () => {
	const router = useRouter();

	const user = useAuthStore((state) => state.user);
	const hasHydrated = useAuthStore((state) => state.hasHydrated);

	const [form, setForm] = useState<FormState>({
		firstName: '',
		email: '',
		street: '',
		city: '',
		zip: '',
	});

	useEffect(() => {
		if (!hasHydrated) return;

		if (!user) {
			router.replace('/login');
			return;
		}

		const address = (user as any).address;

		setForm({
			firstName: user.firstName || '',
			email: user.email || '',
			street: address?.street || '',
			city: address?.city || '',
			zip: address?.zip || '',
		});
	}, [user, hasHydrated, router]);

	if (!hasHydrated || !user) return null;

	const handleChange =
		(field: keyof FormState) =>
		(e: ChangeEvent<HTMLInputElement>) => {
			setForm((prev) => ({
				...prev,
				[field]: e.target.value,
			}));
		};

	const handleSubmit = () => {
		console.log('SAVE USER →', form);

		// 🔥 ici tu brancheras ton backend / firebase / API

		alert('Informations mises à jour (simulation)');
		router.push('/account');
	};

	return (
		<main style={container}>
			<div style={header}>
				<h1 style={title}>Modifier mes informations</h1>
			</div>

			<div style={card}>
				<div style={formGrid}>
					<input
						style={input}
						placeholder="Prénom"
						value={form.firstName}
						onChange={handleChange('firstName')}
					/>

					<input
						style={input}
						placeholder="Email"
						value={form.email}
						onChange={handleChange('email')}
					/>

					<input
						style={input}
						placeholder="Adresse"
						value={form.street}
						onChange={handleChange('street')}
					/>

					<input
						style={input}
						placeholder="Code postal"
						value={form.zip}
						onChange={handleChange('zip')}
					/>

					<input
						style={input}
						placeholder="Ville"
						value={form.city}
						onChange={handleChange('city')}
					/>
				</div>

				<div style={actions}>
					<button
						type="button"
						style={btnOutline}
						onClick={() => router.back()}
					>
						Annuler
					</button>

					<button
						type="button"
						style={btnGold}
						onClick={handleSubmit}
					>
						Enregistrer
					</button>
				</div>
			</div>
		</main>
	);
};

export default AccountEditPage;

//
// 🎨 STYLES
//

const container = {
	padding: 40,
	color: 'white',
};

const header = {
	marginBottom: 20,
};

const title = {
	fontSize: 26,
};

const card = {
	background: '#1e293b',
	borderRadius: 16,
	padding: 20,
	border: '1px solid rgba(255,255,255,0.08)',
	maxWidth: 600,
};

const formGrid = {
	display: 'grid',
	gap: 12,
	marginBottom: 20,
};

const input = {
	padding: '12px 14px',
	borderRadius: 10,
	border: '1px solid rgba(255,255,255,0.15)',
	background: '#0f172a',
	color: 'white',
};

const actions = {
	display: 'flex',
	justifyContent: 'space-between',
	gap: 10,
};

const btnOutline = {
	padding: '10px 14px',
	borderRadius: 10,
	background: 'transparent',
	border: '1px solid rgba(255,255,255,0.2)',
	color: 'white',
	cursor: 'pointer',
};

const btnGold = {
	padding: '10px 14px',
	borderRadius: 10,
	background: 'linear-gradient(135deg,#f7e7a1,#d4af37)',
	color: '#111',
	border: 'none',
	cursor: 'pointer',
};