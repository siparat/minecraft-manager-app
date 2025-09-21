import { ComparisonOperatorSelect } from '@/features/comparison-operator-select';
import { Input } from 'antd';
import type { JSX } from 'react';
import styles from './ModsTableFilters.module.css';
import type { UseModsTableFilters } from '../../model/mods-table-filters.hook';

interface Props {
	filters: UseModsTableFilters;
}

export const ModsRatingFilter = ({ filters }: Props): JSX.Element => {
	const { rating, setRating, ratingOperator, setRatingOperator } = filters;

	return (
		<div className={styles['filterItem']}>
			<Input
				step={0.1}
				max={5}
				min={0}
				value={rating || undefined}
				onChange={(e) => setRating(Number(e.currentTarget.value))}
				type="number"
				placeholder="Оценка"
			/>
			<ComparisonOperatorSelect value={ratingOperator} onChange={setRatingOperator} />
		</div>
	);
};
