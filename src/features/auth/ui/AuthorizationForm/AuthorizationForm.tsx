import type { JSX } from 'react';
import styles from './AuthorizationForm.module.css';
import { Button, Input, Text } from '@/shared/ui';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginSchema } from 'minecraft-manager-schemas';
import type z from 'zod';
import { login } from '../../api';
import { HTTPError } from 'ky';
import { useAuthStore } from '../../model/store';
import { useNavigate } from 'react-router-dom';
import { Routes } from '@/shared/config';

export const AuthorizationForm = (): JSX.Element => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		setError
	} = useForm({ resolver: zodResolver(LoginSchema) });
	const setToken = useAuthStore((state) => state.setToken);
	const navigate = useNavigate();

	const onSubmit = async (data: z.infer<typeof LoginSchema>): Promise<void> => {
		try {
			const { token } = await login(data);
			setToken(token);
			await navigate(Routes.MAIN);
		} catch (error) {
			if (error instanceof HTTPError) {
				setError('root', { message: error.message });
			}
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className={styles['form']}>
			<Input {...register('username')} error={errors.username?.message} placeholder="Garner01" label="Имя пользователя" />
			<Input {...register('password')} error={errors.password?.message} type="password" placeholder="*****************" label="Пароль" />
			<Button className={styles['button']}>Авторизироваться</Button>
			{errors.root && <Text color="red">{errors.root.message}</Text>}
		</form>
	);
};
