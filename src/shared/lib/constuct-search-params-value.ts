export const constructSearchParamsValue = <T extends string | number | boolean>(value: T | T[]): string => {
	if (Array.isArray(value)) {
		return value.join('+');
	}
	return value.toString();
};
