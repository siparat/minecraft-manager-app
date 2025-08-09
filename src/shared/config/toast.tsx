import { type DefaultToastOptions } from 'react-hot-toast';
import Spinner from '@/shared/assets/icons/spinner.svg?react';

export const TOAST_DEFAULT_CONFIG: DefaultToastOptions = {
	duration: 4000,
	position: 'bottom-right',
	className: 'toast',
	loading: {
		duration: Infinity,
		icon: <Spinner />
	}
};
