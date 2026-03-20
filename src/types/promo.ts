export type PromoCode = {
	id: string;
	code: string;
	type: 'percentage' | 'fixed';
	value: number;
	active: boolean;

	minAmount?: number;
	maxUses?: number;
	usedCount: number;

	expiresAt?: string;
	createdAt: string;
};