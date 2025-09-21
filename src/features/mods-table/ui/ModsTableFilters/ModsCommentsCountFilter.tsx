import { ComparisonOperatorSelect } from '@/features/comparison-operator-select';
import { Input } from 'antd';
import type { JSX } from 'react';
import styles from './ModsTableFilters.module.css';
import type { UseModsTableFilters } from '../../model/mods-table-filters.hook';

interface Props {
	filters: UseModsTableFilters;
}

export const ModsCommentsCountFilter = ({ filters }: Props): JSX.Element => {
	const { commentsCount, setCommentsCount, commentsCountOperator, setCommentsCountOperator } = filters;

	return (
		<div className={styles['filterItem']}>
			<Input
				min={0}
				value={commentsCount || undefined}
				onChange={(e) => setCommentsCount(Number(e.currentTarget.value))}
				type="number"
				placeholder="Кол-во комментариев"
			/>
			<ComparisonOperatorSelect value={commentsCountOperator} onChange={setCommentsCountOperator} />
		</div>
	);
};
