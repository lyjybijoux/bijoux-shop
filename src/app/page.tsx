'use client';

import dynamic from 'next/dynamic';

// 🚫 désactive le SSR (évite ton erreur Vercel)
const HomeClient = dynamic(() => import('./HomeClient'), {
	ssr: false,
});

export default function Page() {
	return <HomeClient />;
}