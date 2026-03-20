import { NextRequest, NextResponse } from 'next/server';
import { customers } from '@/lib/customers';
import bcrypt from 'bcryptjs';

interface LoginBody {
	email: string;
	password: string;
}

export const POST = async (request: NextRequest) => {
	try {
		const body = (await request.json()) as LoginBody;
		const { email, password } = body;

		if (!email || !password) {
			return NextResponse.json(
				{ message: 'Email et mot de passe requis.' },
				{ status: 400 }
			);
		}

		const normalizedEmail = email.trim().toLowerCase();

		const customer = customers.find(
			(c) => c.email === normalizedEmail
		);

		if (!customer) {
			return NextResponse.json(
				{ message: 'Compte introuvable.' },
				{ status: 404 }
			);
		}

		const isValid = await bcrypt.compare(password, customer.password);

		if (!isValid) {
			return NextResponse.json(
				{ message: 'Mot de passe incorrect.' },
				{ status: 401 }
			);
		}

		return NextResponse.json(
			{
				message: 'Connexion réussie.',
				customer: {
					id: customer.id,
					firstName: customer.firstName,
					email: customer.email,
				},
			},
			{ status: 200 }
		);
	} catch {
		return NextResponse.json(
			{ message: 'Erreur serveur.' },
			{ status: 500 }
		);
	}
};