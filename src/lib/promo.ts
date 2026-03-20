const CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

export const generatePromoCode = (length = 8): string => {
	let result = '';

	for (let i = 0; i < length; i++) {
		const index = Math.floor(Math.random() * CHARS.length);
		result += CHARS[index];
	}

	return result;
};

export const generatePromoCodeWithPrefix = (
	prefix: string,
	length = 6
): string => {
	return `${prefix.toUpperCase()}-${generatePromoCode(length)}`;
};