'use client';

import { useEffect, useState, type ChangeEvent, type CSSProperties } from 'react';
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

	const handleChange =
		(field: keyof FormState) =>
		(e: ChangeEvent<HTMLInputElement>) => {
			setForm((prev) => ({
				...prev,
				[field]: e.target.value,
			}));
		};

	const handleSubmit = () => {
		console.log('SAVE', form);
		alert('Sauvegarde réussie ✨');
		router.push('/account');
	};

	if (!hasHydrated || !user) return null;

	return (
		<main style={container}>
			<div style={wrapper}>
				{/* HEADER */}
				<div style={header}>
					<h1 style={title}>Modifier mes informations</h1>
					<p style={subtitle}>
						Mets à jour ton profil en toute simplicité
					</p>
				</div>

				{/* CARD */}
				<div style={card}>
					<div style={formGrid}>
						<Input label="Prénom" value={form.firstName} onChange={handleChange('firstName')} />
						<Input label="Email" value={form.email} onChange={handleChange('email')} />
						<Input label="Adresse" value={form.street} onChange={handleChange('street')} />
						<Input label="Code postal" value={form.zip} onChange={handleChange('zip')} />
						<Input label="Ville" value={form.city} onChange={handleChange('city')} />
					</div>

					<div style={actions}>
						<button style={btnGhost} onClick={() => router.back()}>
							Annuler
						</button>

						<button style={btnGold} onClick={handleSubmit}>
							Enregistrer
						</button>
					</div>
				</div>
			</div>
		</main>
	);
};

export default AccountEditPage;

////////////////////////////////////////////////////////
// 💎 INPUT COMPONENT
////////////////////////////////////////////////////////

const Input = ({
	label,
	value,
	onChange,
}: {
	label: string;
	value: string;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) => {
	return (
		<div style={inputWrapper}>
			<label style={inputLabel}>{label}</label>
			<input style={input} value={value} onChange={onChange} />
		</div>
	);
};

////////////////////////////////////////////////////////
// 🎨 STYLES
////////////////////////////////////////////////////////

const container: CSSProperties = {
	minHeight: '100vh',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'flex-start',
	paddingTop: 80,
	color: 'white',
};

const wrapper: CSSProperties = {
	width: '100%',
	maxWidth: 720,
};

const header: CSSProperties = {
	marginBottom: 30,
};

const title: CSSProperties = {
	fontSize: 30,
	fontWeight: 700,
	marginBottom: 5,
};

const subtitle: CSSProperties = {
	opacity: 0.6,
};

const card: CSSProperties = {
	background: 'linear-gradient(180deg,#1e293b,#020617)',
	borderRadius: 20,
	padding: 24,
	border: '1px solid rgba(255,255,255,0.08)',
	boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
};

const formGrid: CSSProperties = {
	display: 'grid',
	gap: 16,
	marginBottom: 24,
};

const inputWrapper: CSSProperties = {
	display: 'flex',
	flexDirection: 'column',
	gap: 6,
};

const inputLabel: CSSProperties = {
	fontSize: 13,
	opacity: 0.6,
};

const input: CSSProperties = {
	padding: '12px 14px',
	borderRadius: 12,
	border: '1px solid rgba(255,255,255,0.1)',
	background: '#0f172a',
	color: 'white',
	outline: 'none',
};

const actions: CSSProperties = {
	display: 'flex',
	justifyContent: 'space-between',
};

const btnGhost: CSSProperties = {
	padding: '10px 16px',
	borderRadius: 12,
	background: 'transparent',
	border: '1px solid rgba(255,255,255,0.2)',
	color: 'white',
	cursor: 'pointer',
};

const btnGold: CSSProperties = {
	padding: '10px 18px',
	borderRadius: 12,
	background: 'linear-gradient(135deg,#f7e7a1,#d4af37)',
	color: '#111',
	border: 'none',
	cursor: 'pointer',
	boxShadow: '0 8px 25px rgba(212,175,55,0.4)',
};