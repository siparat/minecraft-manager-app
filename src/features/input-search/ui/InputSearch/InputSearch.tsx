import { Input } from '@/shared/ui';
import debounce from 'lodash.debounce';
import type { ChangeEvent, InputHTMLAttributes, JSX } from 'react';
import { useSearchParams } from 'react-router-dom';

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'> {
	debounceMs?: number;
	onChange?: (value: string) => unknown;
}

export const InputSearch = ({ debounceMs, onChange, ...props }: Props): JSX.Element => {
	const [searchParams, setSearchParams] = useSearchParams();

	const handleChange = debounce((e: ChangeEvent<HTMLInputElement>): void => {
		const value = e.target.value;
		setSearchParams({ q: value });
		onChange?.(value);
	}, debounceMs || 0);

	return <Input {...props} onChange={handleChange} defaultValue={searchParams.get('q') || undefined} />;
};
