import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export const POST = async (req: Request) => {
	const body = await req.text();

	const signature = req.headers.get('stripe-signature');

	if (!signature) {
		return NextResponse.json(
			{ error: 'No signature' },
			{ status: 400 }
		);
	}

	let event: Stripe.Event;

	try {
		event = stripe.webhooks.constructEvent(
			body,
			signature,
			process.env.STRIPE_WEBHOOK_SECRET as string
		);
	} catch (err) {
		console.error('❌ Signature invalide', err);
		return NextResponse.json(
			{ error: 'Invalid signature' },
			{ status: 400 }
		);
	}

	// 🔥 EVENT IMPORTANT
	if (event.type === 'checkout.session.completed') {
		const session = event.data.object as Stripe.Checkout.Session;

		console.log('💰 COMMANDE VALIDÉE:', session.id);

		// 👉 ICI plus tard :
		// - sauvegarder en DB
		// - envoyer email
		// - etc
	}

	return NextResponse.json({ received: true });
};