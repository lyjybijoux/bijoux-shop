'use client';

import { useEffect, useState, type ChangeEvent, type CSSProperties } from 'react';
import { useRouter } from 'next/navigation';

import useAuthStore from '@/store/auth';

type Suggestion = {
	label: string;
	city: string;
	postcode: string;
	name: string;
};

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
	const updateUser = useAuthStore((state) => state.updateUser);

	const [form, setForm] = useState<FormState>({
		firstName: '',
		email: '',
		street: '',
		city: '',
		zip: '',
	});

	const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
	const [showSuggestions, setShowSuggestions] = useState(false);

	////////////////////////////////////////////////////////
	// INIT
	////////////////////////////////////////////////////////

	useEffect(() => {
		if (!hasHydrated) return;

		if (!user) {
			router.replace('/login');
			return;
		}

		setForm({
			firstName: user.firstName || '',
			email: user.email || '',
			street: user.address?.street || '',
			city: user.address?.city || '',
			zip: user.address?.zip || '',
		});
	}, [user, hasHydrated, router]);

	////////////////////////////////////////////////////////
	// INPUT HANDLER
	////////////////////////////////////////////////////////

	const handleChange =
		(field: keyof FormState) =>
		(e: ChangeEvent<HTMLInputElement>) => {
			const value = e.target.value;

			setForm((prev) => ({
				...prev,
				[field]: value,
			}));

			// 🔥 AUTOCOMPLETE UNIQUEMENT SUR STREET
			if (field === 'street' && value.length > 3) {
				fetchAddress(value);
			}
		};

	////////////////////////////////////////////////////////
	// FETCH API FRANCE
	////////////////////////////////////////////////////////

	const fetchAddress = async (query: string) => {
		try {
			const res = await fetch(
				`https://api-adresse.data.gouv.fr/search/?q=${query}&limit=5`
			);

			const data = await res.json();

			const results = data.features.map((item: any) => ({
				label: item.properties.label,
				city: item.properties.city,
				postcode: item.properties.postcode,
				name: item.properties.name,
			}));

			setSuggestions(results);
			setShowSuggestions(true);
		} catch (err) {
			console.error(err);
		}
	};

	////////////////////////////////////////////////////////
	// SELECT SUGGESTION
	////////////////////////////////////////////////////////

	const selectSuggestion = (s: Suggestion) => {
		setForm((prev) => ({
			...prev,
			street: s.name,
			city: s.city,
			zip: s.postcode,
		}));

		setShowSuggestions(false);
	};

	////////////////////////////////////////////////////////
	// SUBMIT
	////////////////////////////////////////////////////////

	const handleSubmit = () => {
		updateUser({
			firstName: form.firstName,
			email: form.email,
			address: {
				street: form.street,
				city: form.city,
				zip: form.zip,
			},
		});

		alert('Profil mis à jour ✨');

		router.push('/account');
	};

	if (!hasHydrated || !user) return null;

	return (
		<main style={container}>
			<div style={wrapper}>
				<div style={header}>
					<h1 style={title}>Modifier mes informations</h1>
					<p style={subtitle}>
						Mets à jour ton profil en toute simplicité
					</p>
				</div>

				<div style={card}>
					<div style={formGrid}>
						<Input label="Prénom" value={form.firstName} onChange={handleChange('firstName')} />
						<Input label="Email" value={form.email} onChange={handleChange('email')} />

						{/* 🔥 STREET AVEC AUTOCOMPLETE */}
						<div style={{ position: 'relative' }}>
							<Input label="Adresse" value={form.street} onChange={handleChange('street')} />

							{showSuggestions && (
								<div style={suggestionsBox}>
									{suggestions.map((s, i) => (
										<div
											key={i}
											style={suggestionItem}
											onClick={() => selectSuggestion(s)}
										>
											{s.label}
										</div>
									))}
								</div>
							)}
						</div>

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
// INPUT
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
// STYLES
////////////////////////////////////////////////////////

const container: CSSProperties = {
	minHeight: '100vh',
	display: 'flex',
	justifyContent: 'center',
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
};

const subtitle: CSSProperties = {
	opacity: 0.6,
};

const card: CSSProperties = {
	background: 'linear-gradient(180deg,#1e293b,#020617)',
	borderRadius: 20,
	padding: 24,
	border: '1px solid rgba(255,255,255,0.08)',
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
};

const suggestionsBox: CSSProperties = {
	position: 'absolute',
	top: '100%',
	left: 0,
	right: 0,
	background: '#0f172a',
	borderRadius: 12,
	border: '1px solid rgba(255,255,255,0.1)',
	marginTop: 6,
	zIndex: 50,
};

const suggestionItem: CSSProperties = {
	padding: 10,
	cursor: 'pointer',
	borderBottom: '1px solid rgba(255,255,255,0.05)',
};

const actions: CSSProperties = {
	display: 'flex',
	justifyContent: 'space-between',
};

const btnGhost: CSSProperties = {
	padding: '10px 16px',
	borderRadius: 12,
	border: '1px solid rgba(255,255,255,0.2)',
	background: 'transparent',
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
};