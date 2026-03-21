'use client';

import { useSearchParams } from 'next/navigation';

const HomeContent = () => {
	const searchParams = useSearchParams();
	const preview = searchParams.get('preview') === 'true';

	if (!preview) {
		return <div>🚧 Maintenance</div>;
	}

	return <div>🔓 Site débloqué</div>;
};

export default HomeContent;