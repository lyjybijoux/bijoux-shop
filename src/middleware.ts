import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PRIVATE_PATH = '/jennifer-guilloteau/0311';

export function middleware(req: NextRequest) {
	const { pathname } = req.nextUrl;

	// 🔓 accès privé
	if (pathname.startsWith(PRIVATE_PATH)) {
		return NextResponse.next();
	}

	// 🔧 maintenance page autorisée
	if (pathname === '/maintenance') {
		return NextResponse.next();
	}

	// ⚙️ assets next
	if (
		pathname.startsWith('/_next') ||
		pathname.startsWith('/favicon.ico')
	) {
		return NextResponse.next();
	}

	// 🔁 redirection globale
	return NextResponse.redirect(new URL('/maintenance', req.url));
}

export const config = {
	matcher: '/:path*',
};