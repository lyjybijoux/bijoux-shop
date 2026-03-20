'use client';

import useUIStore from '../store/ui';

const Toast = () => {
	const toast = useUIStore((state) => state.toast);

	if (!toast) return null;

	return (
		<div
			style={{
				position: 'fixed',
				bottom: 30,
				left: '50%',
				transform: 'translateX(-50%)',
				background: 'linear-gradient(45deg, gold, orange)',
				color: '#020617',
				padding: '12px 20px',
				borderRadius: 10,
				fontWeight: 'bold',
				boxShadow: '0 0 20px rgba(255,215,0,0.6)',
				zIndex: 999,
				animation: 'fadeInUp 0.3s ease',
			}}
		>
			✨ {toast}
		</div>
	);
};

export default Toast;