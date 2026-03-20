'use client';

import { useEffect, useState } from 'react';

export default function Page() {
	const [sessionId, setSessionId] = useState<string | null>(null);

	useEffect(() => {
		const params = new URLSearchParams(window.location.search);
		const id = params.get('session_id');
		setSessionId(id);

		if (id) {
			console.log('✅ Session Stripe:', id);
		}
	}, []);

	return (
		<main
			style={{
				minHeight: '100vh',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				gap: 20,
				textAlign: 'center',
				padding: 20,
			}}
		>
			<h1>🎉 Paiement réussi</h1>

			<p>
				Merci pour votre achat 💎<br />
				Votre commande a bien été prise en compte.
			</p>

			{sessionId && (
				<p style={{ opacity: 0.6 }}>
					ID commande : {sessionId}
				</p>
			)}

			<a href="/" style={{ color: 'gold' }}>
				Retour à la boutique
			</a>
		</main>
	);
}