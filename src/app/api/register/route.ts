import { NextRequest, NextResponse } from 'next/server';
import { customers } from '@/lib/customers';
import bcrypt from 'bcryptjs';

interface RegisterBody {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
}

export const POST = async (request: NextRequest) => {
	try {
		const body = (await request.json()) as RegisterBody;
		const { firstName, lastName, email, password } = body;

		if (!firstName || !lastName || !email || !password) {
			return NextResponse.json(
				{ message: 'Tous les champs sont obligatoires.' },
				{ status: 400 }
			);
		}

		if (password.length < 6) {
			return NextResponse.json(
				{ message: 'Le mot de passe doit contenir au moins 6 caractères.' },
				{ status: 400 }
			);
		}

		const normalizedEmail = email.trim().toLowerCase();

		const existingCustomer = customers.find(
			(customer) => customer.email === normalizedEmail
		);

		if (existingCustomer) {
			return NextResponse.json(
				{ message: 'Un compte existe déjà avec cette adresse e-mail.' },
				{ status: 409 }
			);
		}

		// 🔐 Hash du mot de passe
		const hashedPassword = await bcrypt.hash(password, 10);

		const newCustomer = {
			id: crypto.randomUUID(),
			firstName: firstName.trim(),
			lastName: lastName.trim(),
			email: normalizedEmail,
			password: hashedPassword,
		};

		customers.push(newCustomer);

		console.log(customers);

		return NextResponse.json(
			{
				message: 'Compte créé avec succès.',
				customer: {
					id: newCustomer.id,
					firstName: newCustomer.firstName,
					lastName: newCustomer.lastName,
					email: newCustomer.email,
				},
			},
			{ status: 201 }
		);
	} catch {
		return NextResponse.json(
			{ message: 'Erreur serveur.' },
			{ status: 500 }
		);
	}
};