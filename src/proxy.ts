import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PRIVATE_PATH = '/jennifer-guilloteau/0311';

export function proxy(req: NextRequest) {
	const { pathname } = req.nextUrl;

	console.log('PROXY HIT:', pathname); // 🔥 debug

	// accès privé
	if (pathname.startsWith(PRIVATE_PATH)) {
		return NextResponse.next();
	}

	// maintenance
	if (pathname === '/maintenance') {
		return NextResponse.next();
	}

	// assets next
	if (
		pathname.startsWith('/_next') ||
		pathname.startsWith('/favicon.ico')
	) {
		return NextResponse.next();
	}

	// 🔁 REDIRECT GLOBAL
	return NextResponse.redirect(new URL('/maintenance', req.url));
}

export const config = {
	matcher: ['/', '/((?!_next|favicon.ico).*)'],
};