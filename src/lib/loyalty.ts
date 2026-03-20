export const calculatePoints = (amount: number) => {
	return Math.floor(amount); // 1€ = 1 point
};

export const getCustomerLevel = (points: number) => {
	if (points >= 1000) return 'Gold 🏆';
	if (points >= 500) return 'Silver 🥈';
	return 'Bronze 🥉';
};