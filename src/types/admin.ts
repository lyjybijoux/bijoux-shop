export interface AdminCategory {
	id: string;
	name: string;
	slug: string;
}

export interface AdminTheme {
	id: string;
	name: string;
	slug: string;
}

export interface AdminProduct {
	id: string;
	name: string;
	description: string;
	price: number;
	image: string;
	inStock: boolean;
	stockQuantity: number;
	categoryId: string | null;
	themeId: string | null;
	createdAt: string;
}