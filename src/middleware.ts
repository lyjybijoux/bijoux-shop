import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PRIVATE_PATH = '/jennifer-guilloteau/0311';

export const proxy = (req: NextRequest) => {
	const { pathname } = req.nextUrl;

	// 🔓 accès privé
	if (pathname.startsWith(PRIVATE_PATH)) {
		return NextResponse.next();
	}

	// 🔧 autoriser la page maintenance (sinon boucle infinie)
	if (pathname === '/maintenance') {
		return NextResponse.next();
	}

	// ⚙️ autoriser Next.js assets
	if (pathname.startsWith('/_next')) {
		return NextResponse.next();
	}

	// 🔁 redirection globale
	return NextResponse.redirect(new URL('/maintenance', req.url));
};

export const config = {
	matcher: '/:path*',
};