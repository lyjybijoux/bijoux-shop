import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export const POST = async (req: Request) => {
	try {
		const { items } = await req.json();

		const baseUrl =
			process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

		const session = await stripe.checkout.sessions.create({
			payment_method_types: ['card'],

			line_items: items.map((item: any) => ({
				price_data: {
					currency: 'eur',
					product_data: {
						name: item.name,
					},
					unit_amount: Math.round(item.price * 100),
				},
				quantity: item.quantity,
			})),

			mode: 'payment',

			// 🔥 ICI LE FIX IMPORTANT
			success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
			cancel_url: `${baseUrl}/cart`,
		});

		return NextResponse.json({ url: session.url });
	} catch (error) {
		console.error('❌ Stripe error:', error);

		return NextResponse.json(
			{ error: 'Erreur Stripe' },
			{ status: 500 }
		);
	}
};