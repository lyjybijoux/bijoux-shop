'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import useAuthStore from '@/store/auth';

type Suggestion = {
	label: string;
	city: string;
	postalCode: string;
};

const EditAccountPage = () => {
	const router = useRouter();

	const user = useAuthStore((state) => state.user);
	const updateUser = useAuthStore((state) => state.updateUser);

	const [form, setForm] = useState({
		firstName: user?.firstName || '',
		lastName: user?.lastName || '',
		email: user?.email || '',

		phoneMobile: user?.phoneMobile || '',
		phoneFix: user?.phoneFix || '',

		address: user?.address?.street || '',
		postalCode: user?.address?.postalCode || '',
		city: user?.address?.city || '',
	});

	const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

	////////////////////////////////////////////////////////

	const handleAddressChange = async (value: string) => {
		setForm((prev) => ({ ...prev, address: value }));

		if (value.length < 3) {
			setSuggestions([]);
			return;
		}

		try {
			const res = await fetch(
				`https://api-adresse.data.gouv.fr/search/?q=${value}&limit=5`
			);

			const data = await res.json();

			if (!data?.features) return;

			const results = data.features.map((f: any) => ({
				label: f.properties.label,
				city: f.properties.city,
				postalCode: f.properties.postcode,
			}));

			setSuggestions(results);
		} catch {
			setSuggestions([]);
		}
	};

	const selectSuggestion = (s: Suggestion) => {
		setForm((prev) => ({
			...prev,
			address: s.label,
			city: s.city,
			postalCode: s.postalCode,
		}));

		setSuggestions([]);
	};

	////////////////////////////////////////////////////////

	const handleSave = () => {
		if (!user) return;

		updateUser({
			...user,
			firstName: form.firstName,
			lastName: form.lastName,
			email: form.email,
			phoneMobile: form.phoneMobile,
			phoneFix: form.phoneFix,
			address: {
				street: form.address,
				postalCode: form.postalCode,
				city: form.city,
			},
		});

		router.push('/account');
	};

	return (
		<main style={container}>
			<div style={card}>
				<h1 style={title}>Modifier mes informations</h1>

				<div style={grid}>
					<input
						style={input}
						value={form.firstName}
						onChange={(e) =>
							setForm((p) => ({ ...p, firstName: e.target.value }))
						}
						placeholder="Prénom"
					/>

					<input
						style={input}
						value={form.lastName}
						onChange={(e) =>
							setForm((p) => ({ ...p, lastName: e.target.value }))
						}
						placeholder="Nom"
					/>

					<input
						style={input}
						value={form.email}
						onChange={(e) =>
							setForm((p) => ({ ...p, email: e.target.value }))
						}
						placeholder="Email"
					/>

					{/* 📱 MOBILE */}
					<input
						style={input}
						value={form.phoneMobile}
						onChange={(e) =>
							setForm((p) => ({
								...p,
								phoneMobile: e.target.value,
							}))
						}
						placeholder="+33 6 12 34 56 78"
					/>

					{/* ☎️ FIX */}
					<input
						style={input}
						value={form.phoneFix}
						onChange={(e) =>
							setForm((p) => ({
								...p,
								phoneFix: e.target.value,
							}))
						}
						placeholder="+33 2 40 00 00 00"
					/>

					{/* 🔥 ADRESSE */}
					<div style={{ position: 'relative' }}>
						<input
							style={input}
							value={form.address}
							onChange={(e) =>
								handleAddressChange(e.target.value)
							}
							placeholder="Adresse"
						/>

						{suggestions.length > 0 && (
							<div style={suggestBox}>
								{suggestions.map((s, i) => (
									<div
										key={i}
										style={suggestItem}
										onClick={() => selectSuggestion(s)}
									>
										{s.label}
									</div>
								))}
							</div>
						)}
					</div>

					<input
						style={input}
						value={form.postalCode}
						onChange={(e) =>
							setForm((p) => ({
								...p,
								postalCode: e.target.value,
							}))
						}
						placeholder="Code postal"
					/>

					<input
						style={input}
						value={form.city}
						onChange={(e) =>
							setForm((p) => ({ ...p, city: e.target.value }))
						}
						placeholder="Ville"
					/>
				</div>

				<div style={actions}>
					<button onClick={() => router.push('/account')} style={btnGhost}>
						Annuler
					</button>

					<button onClick={handleSave} style={btnGold}>
						Enregistrer
					</button>
				</div>
			</div>
		</main>
	);
};

export default EditAccountPage;

////////////////////////////////////////////////////////
// 🎨 STYLE
////////////////////////////////////////////////////////

const container = {
	minHeight: '100vh',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	background: '#020617',
	padding: 20,
};

const card = {
	width: '100%',
	maxWidth: 520,
	padding: 30,
	borderRadius: 20,
	background: '#0f172a',
	border: '1px solid rgba(255,255,255,0.1)',
};

const title = {
	fontSize: 26,
	marginBottom: 20,
};

const grid = {
	display: 'flex',
	flexDirection: 'column' as const,
	gap: 12,
};

const input = {
	height: 48,
	padding: '0 14px',
	borderRadius: 12,
	border: '1px solid rgba(255,255,255,0.1)',
	background: '#020617',
	color: 'white',
};

const suggestBox = {
	position: 'absolute' as const,
	top: 50,
	left: 0,
	right: 0,
	background: '#0f172a',
	borderRadius: 10,
	border: '1px solid rgba(255,255,255,0.1)',
};

const suggestItem = {
	padding: 10,
	cursor: 'pointer',
};

const actions = {
	display: 'flex',
	justifyContent: 'space-between',
	marginTop: 20,
};

const btnGhost = {
	padding: '10px 16px',
	borderRadius: 10,
	border: '1px solid rgba(255,255,255,0.2)',
	background: 'transparent',
	color: 'white',
};

const btnGold = {
	padding: '10px 16px',
	borderRadius: 10,
	border: 'none',
	background: 'linear-gradient(135deg,#f7e7a1,#d4af37)',
	color: '#111',
	fontWeight: 600,
};