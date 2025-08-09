import type { HTMLAttributes, JSX } from 'react';
import HammerIcon from '@/shared/assets/icons/hammer.svg?react';
import ExitIcon from '@/shared/assets/icons/exit.svg?react';
import styles from './Actions.module.css';
import classNames from 'classnames';
import { useAuthStore } from '@/features/auth/model/store';
import { useNavigate } from 'react-router-dom';
import { Routes } from '@/shared/config';
import { Root, Trigger } from '@radix-ui/react-dialog';
import { CreateAppModal } from '@/features/create-app';

export const Actions = ({ className, ...props }: HTMLAttributes<HTMLUListElement>): JSX.Element => {
	const logout = useAuthStore((state) => state.logout);
	const navigate = useNavigate();

	const onLogout = (): void => {
		logout();
		navigate(Routes.AUTH);
	};

	return (
		<ul {...props} className={classNames(className, styles['list'])}>
			<Root>
				<Trigger asChild>
					<button className={classNames(styles['button'], styles['green'])}>
						<HammerIcon />
						<p>Создать</p>
					</button>
				</Trigger>
				<CreateAppModal />
			</Root>
			<button onClick={onLogout} className={classNames(styles['button'], styles['red'])}>
				<ExitIcon />
				<p>Выйти</p>
			</button>
		</ul>
	);
};
