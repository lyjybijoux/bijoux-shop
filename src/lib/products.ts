export interface Product {
	id: string;
	name: string;
	price: number;
	image: string;
}

export const products: Product[] = [
	{
		id: '1',
		name: 'Collier Élégance',
		price: 49,
		image: '/bijou1.jpg',
	},
	{
		id: '2',
		name: 'Bracelet Luxe',
		price: 39,
		image: '/bijou2.jpg',
	},
];