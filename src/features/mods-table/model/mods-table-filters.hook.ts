import type { OperationValue } from '@/features/comparison-operator-select/model/constants';
import type { ModCategory } from 'minecraft-manager-schemas';
import { useState, type Dispatch, type SetStateAction } from 'react';
import { useSearchParams } from 'react-router-dom';

export interface UseModsTableFilters {
	rating?: number;
	setRating: Dispatch<SetStateAction<number | undefined>>;
	ratingOperator: OperationValue;
	setRatingOperator: Dispatch<SetStateAction<OperationValue>>;
	commentsCount?: number;
	setCommentsCount: Dispatch<SetStateAction<number | undefined>>;
	commentsCountOperator: OperationValue;
	setCommentsCountOperator: Dispatch<SetStateAction<OperationValue>>;
	versions?: string[];
	setVersions: Dispatch<SetStateAction<string[] | undefined>>;
	query?: string;
	setQuery: Dispatch<SetStateAction<string | undefined>>;
	category?: ModCategory;
	setCategory: Dispatch<SetStateAction<ModCategory | undefined>>;
}

export const useModsTableFilters = (): UseModsTableFilters => {
	const [searchParams] = useSearchParams();
	const [category, setCategory] = useState<ModCategory>();
	const [rating, setRating] = useState<number>();
	const [ratingOperator, setRatingOperator] = useState<OperationValue>('equals');
	const [commentsCount, setCommentsCount] = useState<number>();
	const [commentsCountOperator, setCommentsCountOperator] = useState<OperationValue>('equals');
	const [versions, setVersions] = useState<string[]>();
	const [query, setQuery] = useState<string | undefined>(searchParams.get('q') || undefined);

	return {
		rating,
		setRating,
		ratingOperator,
		setRatingOperator,
		versions,
		setVersions,
		query,
		setQuery,
		commentsCount,
		setCommentsCount,
		commentsCountOperator,
		setCommentsCountOperator,
		category,
		setCategory
	};
};
