'use client';

import { useEffect, useState } from 'react';

const MAINTENANCE = true;

const ComingSoon = () => {
	return (
		<main className="min-h-screen flex items-center justify-center bg-black text-white">
			<h1>🚧 Maintenance</h1>
		</main>
	);
};

const HomeContent = () => {
	const [preview, setPreview] = useState(false);
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);

		const params = new URLSearchParams(window.location.search);
		setPreview(params.get('preview') === 'true');
	}, []);

	// 🔥 évite crash SSR
	if (!mounted) return null;

	if (MAINTENANCE && !preview) {
		return <ComingSoon />;
	}

	return (
		<div style={{ padding: 40 }}>
			<h1>🔓 Site débloqué</h1>
		</div>
	);
};

export default HomeContent;