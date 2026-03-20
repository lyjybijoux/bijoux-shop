import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const MAINTENANCE_MODE = true;
const SECRET = 'mon-acces-prive-123';

export default function middleware(req: NextRequest) {
	const url = req.nextUrl;

	// ⚠️ IMPORTANT : laisser passer la page maintenance
	if (url.pathname.startsWith('/maintenance')) {
		return NextResponse.next();
	}

	const hasAccess = url.searchParams.get('access') === SECRET;
	const hasCookie = req.cookies.get('admin-access')?.value === 'true';

	if (hasAccess) {
		const res = NextResponse.next();
		res.cookies.set('admin-access', 'true', { path: '/' });
		return res;
	}

	if (MAINTENANCE_MODE && !hasCookie) {
		return NextResponse.redirect(new URL('/maintenance', req.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ['/((?!_next|favicon.ico).*)'],
};