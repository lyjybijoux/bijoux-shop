import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const MAINTENANCE_MODE = true;
const SECRET = 'mon-acces-prive-123';

export default function middleware(req: NextRequest) {
	const { pathname, searchParams } = req.nextUrl;

	// ✅ laisser passer les fichiers système
	if (
		pathname.startsWith('/_next') ||
		pathname.startsWith('/api') ||
		pathname === '/favicon.ico'
	) {
		return NextResponse.next();
	}

	// ✅ laisser passer la page maintenance
	if (pathname === '/maintenance') {
		return NextResponse.next();
	}

	const hasAccess = searchParams.get('access') === SECRET;
	const hasCookie = req.cookies.get('admin-access')?.value === 'true';

	// 🔓 accès admin
	if (hasAccess) {
		const res = NextResponse.next();
		res.cookies.set('admin-access', 'true', { path: '/' });
		return res;
	}

	// 🚧 redirection maintenance
	if (MAINTENANCE_MODE && !hasCookie) {
		return NextResponse.redirect(new URL('/maintenance', req.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ['/((?!_next|favicon.ico).*)'],
};