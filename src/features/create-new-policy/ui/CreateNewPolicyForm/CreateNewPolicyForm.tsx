import { Button, Input, Switch, Text } from '@/shared/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { HTTPError } from 'ky';
import { CreatePolicySchema } from 'minecraft-manager-schemas';
import { useState, type JSX } from 'react';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import type z from 'zod';
import styles from './CreateNewPolicyForm.module.css';
import { Editor } from '@/widgets/editor';
import { createNewPolicy } from '../../api';
import { Routes } from '@/shared/config';
import { htmlToTxt } from '@/shared/lib';

type FormValues = z.infer<typeof CreatePolicySchema>;

export const CreateNewPolicyForm = (): JSX.Element => {
	const [saveAsRaw, setSaveAsRaw] = useState<boolean>(false);

	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		reset,
		control,
		formState: { errors }
	} = useForm<FormValues>({
		resolver: zodResolver(CreatePolicySchema)
	});

	const onSubmit = async (dto: FormValues): Promise<void> => {
		const toastId = toast.loading('Создание политики...');

		if (saveAsRaw) {
			dto.content = htmlToTxt(dto.content);
		}

		try {
			await createNewPolicy(dto);
			toast.success(`Политика успешно создана по адресу /policy/${dto.slug}`, { id: toastId });
			reset();
			navigate(Routes.POLICIES);
		} catch (error) {
			if (error instanceof HTTPError) {
				toast.error(error.message, { id: toastId });
			}
		}
	};
	return (
		<form className={styles['form']} onSubmit={handleSubmit(onSubmit)}>
			<Input {...register('title')} error={errors.title?.message} label="Заголовок" placeholder="Политика для приложения TNT" />
			<Input {...register('slug')} error={errors.slug?.message} label="Адрес политики" addon="/policy/" placeholder="tnt" />
			<fieldset>
				<Controller
					name="content"
					control={control}
					render={({ field: { value, onChange } }) => <Editor value={value} onChange={onChange} />}
				/>
				{errors.content?.message && (
					<Text size="m" color="red">
						{errors.content?.message}
					</Text>
				)}
			</fieldset>

			<fieldset className={styles['switchWrapper']}>
				<Text size="l">Сохранить в виде отдельного файла файла</Text>
				<Switch type="button" value={saveAsRaw} onSwitch={setSaveAsRaw} />
			</fieldset>

			<Button>Создать</Button>
		</form>
	);
};
