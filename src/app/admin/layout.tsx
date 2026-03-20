import type { ReactNode } from 'react';

import AdminSidebar from '../../components/admin/AdminSidebar';

interface AdminLayoutProps {
	children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
	return (
		<div
			style={{
				display: 'grid',
				gridTemplateColumns: '260px 1fr',
				minHeight: '100vh',
				background: '#0f172a',
				color: 'white',
			}}
		>
			<AdminSidebar />

			<div style={{ padding: 24 }}>
				{children}
			</div>
		</div>
	);
};

export default AdminLayout;