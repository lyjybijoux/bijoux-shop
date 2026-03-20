'use client';

import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

import useOrdersStore from '@/store/orders';

const SuccessPage = () => {
	const router = useRouter();
	const searchParams = useSearchParams();

	const sessionId = searchParams.get('session_id');
	const addOrder = useOrdersStore((s) => s.addOrder);

	useEffect(() => {
		if (!sessionId) return;

		console.log('✅ Session Stripe:', sessionId);

		addOrder({
			id: sessionId,
			items: [
				{
					name: 'Commande Stripe',
					price: 0,
					quantity: 1,
				},
			],
			total: 0,
			date: new Date().toISOString(),
		});

		setTimeout(() => {
			router.push('/account');
		}, 1500);
	}, [sessionId]);

	return (
		<div style={{ padding: 40 }}>
			<h1>✅ Paiement réussi</h1>
			<p>Traitement de votre commande...</p>
		</div>
	);
};

export default SuccessPage;