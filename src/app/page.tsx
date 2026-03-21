'use client';

import dynamic from 'next/dynamic';

// 🚫 empêche complètement le SSR
const HomeClient = dynamic(() => import('./HomeClient'), {
	ssr: false,
});

export default function Page() {
	return <HomeClient />;
}