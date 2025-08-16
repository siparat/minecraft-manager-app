import { Input } from '@/shared/ui';
import type { ChangeEvent, JSX } from 'react';
import { useSearchParams } from 'react-router-dom';

export const InputSearch = (): JSX.Element => {
	const [searchParams, setSearchParams] = useSearchParams();

	const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
		const value = e.target.value;
		setSearchParams({ q: value });
	};

	return <Input onChange={handleChange} defaultValue={searchParams.get('q') || undefined} placeholder="Поиск..." />;
};
