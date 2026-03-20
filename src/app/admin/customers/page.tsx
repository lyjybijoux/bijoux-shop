'use client';

import useAdminCustomersStore from '../../../store/admin-customers-store';

const CustomersPage = () => {
	const { customers } = useAdminCustomersStore();

	return (
		<div style={{ padding: 20 }}>
			<h1>Clients</h1>

			{customers.length === 0 ? (
				<p>Aucun client</p>
			) : (
				customers.map((c) => (
					<div key={c.id}>
						{c.firstName} {c.lastName} - {c.email}
					</div>
				))
			)}
		</div>
	);
};

export default CustomersPage;