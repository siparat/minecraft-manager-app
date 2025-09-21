export const COMPARISON_OPERATIONS = [
	{ label: 'Равен', value: 'equals' },
	{ label: 'Больше', value: 'gt' },
	{ label: 'Больше или равно', value: 'gte' },
	{ label: 'Меньше', value: 'lt' },
	{ label: 'Меньше или равно', value: 'lte' }
] as const;

export type OperationValue = (typeof COMPARISON_OPERATIONS)[number]['value'];
