import type { JSX } from 'react';
import styles from './ModsTableFilters.module.css';
import { Text } from '@/shared/ui';
import { InputSearch } from '@/features/input-search';
import { Select } from 'antd';
import { ModCategoryLabels, useModStore } from '@/entities/mod';
import { ModsRatingFilter } from './ModsRatingFilter';
import { ModsCommentsCountFilter } from './ModsCommentsCountFilter';
import type { UseModsTableFilters } from '../../model/mods-table-filters.hook';
import { ModCategory } from 'minecraft-manager-schemas';

interface Props {
	filters: UseModsTableFilters;
}

export const ModsTableFilters = ({ filters }: Props): JSX.Element => {
	const unknownVersions = useModStore((state) => state.allVersions);
	const { setVersions, setQuery, setCategory } = filters;

	return (
		<div className={styles['filters']}>
			<Text size="l">Фильтры</Text>
			<div className={styles['filtersWrapper']}>
				<InputSearch className={styles['inputSearch']} placeholder="Поиск по названию" onChange={setQuery} debounceMs={600} />
				<Select
					className={styles['select']}
					mode="tags"
					allowClear
					placeholder="Выберите версии"
					options={unknownVersions.map(({ version }) => ({ label: version, value: version }))}
					onChange={(versions) => setVersions(!versions.length ? undefined : versions)}
				/>
				<Select
					className={styles['select']}
					allowClear
					placeholder="Тип мода"
					options={Object.values(ModCategory).map((c) => ({ label: ModCategoryLabels[c], value: c }))}
					onChange={setCategory}
				/>

				<ModsRatingFilter filters={filters} />
				<ModsCommentsCountFilter filters={filters} />
			</div>
		</div>
	);
};
