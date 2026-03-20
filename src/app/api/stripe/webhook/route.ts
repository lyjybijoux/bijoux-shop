import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

import { stripeServer } from '@/lib/stripe';

export const POST = async (request: Request) => {
	try {
		const body = await request.text();
		const signature = (await headers()).get('stripe-signature');
		const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

		if (!signature || !webhookSecret) {
			return NextResponse.json(
				{ message: 'Signature webhook manquante.' },
				{ status: 400 }
			);
		}

		const event = stripeServer.webhooks.constructEvent(
			body,
			signature,
			webhookSecret
		);

		if (event.type === 'checkout.session.completed') {
			const session = event.data.object as Stripe.Checkout.Session;

			console.log('✅ Paiement confirmé Stripe:', {
				sessionId: session.id,
				customerEmail: session.customer_details?.email ?? null,
				amountTotal: session.amount_total ?? 0,
				currency: session.currency ?? 'eur',
				userId: session.metadata?.userId ?? null,
			});

			// 📌 Ici plus tard :
			// 1. créer la commande en base
			// 2. vider le panier serveur
			// 3. envoyer l’e-mail de confirmation
		}

		return NextResponse.json({ received: true });
	} catch (error) {
		const message =
			error instanceof Error ? error.message : 'Webhook Stripe invalide.';

		return NextResponse.json(
			{ message },
			{ status: 400 }
		);
	}
};