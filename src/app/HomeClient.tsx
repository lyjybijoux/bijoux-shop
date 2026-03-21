'use client';

import { useEffect, useState } from 'react';

const MAINTENANCE = true;

// 💎 COMING SOON
const ComingSoon = () => (
	<div style={{
		height: '100vh',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		background: '#020617',
		color: 'white'
	}}>
		<h1>🚧 Site en maintenance</h1>
	</div>
);

const HomeClient = () => {
	const [preview, setPreview] = useState(false);
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);

		const params = new URLSearchParams(window.location.search);
		setPreview(params.get('preview') === 'true');
	}, []);

	if (!mounted) return null;

	// 🚧 maintenance
	if (MAINTENANCE && !preview) {
		return <ComingSoon />;
	}

	// 🔓 site visible
	return (
		<div style={{ padding: 40 }}>
			<h1>🔓 Site débloqué</h1>
			<p>Ta boutique va s’afficher ici 👇</p>
		</div>
	);
};

export default HomeClient;