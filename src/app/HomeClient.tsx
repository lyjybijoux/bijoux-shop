'use client';

import { useEffect, useState } from 'react';

const MAINTENANCE = true;

const ComingSoon = () => (
	<div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
		<h1>🚧 Maintenance</h1>
	</div>
);

export default function HomeClient() {
	const [preview, setPreview] = useState(false);
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);

		const params = new URLSearchParams(window.location.search);
		setPreview(params.get('preview') === 'true');
	}, []);

	if (!mounted) return null;

	if (MAINTENANCE && !preview) {
		return <ComingSoon />;
	}

	return (
		<div style={{ padding: 40 }}>
			<h1>🔓 Site débloqué</h1>
		</div>
	);
}