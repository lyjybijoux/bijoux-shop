export type Order = {
	id: string;
	date: string;
	total: number;
	status: 'paid' | 'pending' | 'shipped';
	items: number;
};

export const mockOrders: Order[] = [
	{
		id: 'CMD-001',
		date: '2026-03-18',
		total: 89,
		status: 'paid',
		items: 2,
	},
	{
		id: 'CMD-002',
		date: '2026-03-10',
		total: 144,
		status: 'shipped',
		items: 3,
	},
];