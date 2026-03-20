import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const MAINTENANCE_MODE = true;

// clé secrète pour bypass
const SECRET = 'mon-acces-prive-123';

export default function middleware(req: NextRequest) {
	const url = req.nextUrl;

	// autoriser accès si query ?access=SECRET
	const hasAccess = req.nextUrl.searchParams.get('access') === SECRET;

	// autoriser aussi si cookie déjà présent
	const hasCookie = req.cookies.get('admin-access')?.value === 'true';

	// si accès validé → poser cookie
	if (hasAccess) {
		const res = NextResponse.next();
		res.cookies.set('admin-access', 'true', {
			path: '/',
		});
		return res;
	}

	// si maintenance active + pas autorisé → rediriger
	if (MAINTENANCE_MODE && !hasCookie) {
		return NextResponse.redirect(new URL('/maintenance', req.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ['/((?!_next|favicon.ico).*)'],
};