import { Select } from 'antd';
import type { JSX } from 'react';
import { COMPARISON_OPERATIONS, type OperationValue } from '../../model/constants';
import type { DefaultOptionType, SelectProps } from 'antd/es/select';
import styles from './ComparisonOperatorSelect.module.css';
import classNames from 'classnames';

export interface Props extends Omit<SelectProps, 'onChange'> {
	onChange: (value: OperationValue) => unknown;
	value: OperationValue;
}

export const ComparisonOperatorSelect = ({ className, ...props }: Props): JSX.Element => {
	return (
		<Select
			{...props}
			className={classNames(styles['select'], className)}
			defaultValue="equals"
			options={COMPARISON_OPERATIONS as unknown as DefaultOptionType[]}
		/>
	);
};
