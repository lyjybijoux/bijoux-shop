'use client';

import { useState } from 'react';

export default function MaintenancePage() {
	const [email, setEmail] = useState('');
	const [success, setSuccess] = useState(false);

	const handleSubmit = async () => {
		const res = await fetch('/api/subscribe', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email }),
		});

		if (res.ok) {
			setSuccess(true);
			setEmail('');
		}
	};

	return (
		<main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 20 }}>
			<h1>🚧 Site en construction</h1>

			{success ? (
				<p>✅ Merci ! Tu seras prévenu du lancement</p>
			) : (
				<>
					<input
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="Ton email"
						style={{ padding: 10 }}
					/>
					<button onClick={handleSubmit} style={{ padding: 10 }}>
						Me prévenir
					</button>
				</>
			)}
		</main>
	);
}