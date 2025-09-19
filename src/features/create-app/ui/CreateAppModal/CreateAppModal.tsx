import { Button, ContentBox, Input } from '@/shared/ui';
import { Content, Close, DialogTitle, Overlay, Portal } from '@radix-ui/react-dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { useEffect, useState, type JSX } from 'react';
import styles from './CreateAppModal.module.css';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import type { AppLanguage } from '@/entities/app';
import { getAllLanguages, translateText, uploadFile } from '../../api';
import toast from 'react-hot-toast';
import ArrowIcon from '@/shared/assets/icons/arrow.svg?react';
import TranslateIcon from '@/shared/assets/icons/translate.svg?react';
import classNames from 'classnames';
import { HTTPError } from 'ky';
import type z from 'zod';
import { CreateAppSchema, type TranslateSchema } from 'minecraft-manager-schemas';
import { Dropzone } from '@/entities/dropzone';
import { zodResolver } from '@hookform/resolvers/zod';
import { createApp } from '../../api/create-app';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

type FormValues = z.infer<typeof CreateAppSchema>;

export const CreateAppModal = (): JSX.Element => {
	const [languages, setLanguages] = useState<AppLanguage[]>([]);
	const [languagesIsOpen, setLanguagesIsOpen] = useState(false);
	const navigate = useNavigate();

	const {
		register,
		control,
		handleSubmit,
		setValue,
		watch,
		clearErrors,
		reset,
		formState: { errors }
	} = useForm<FormValues>({
		resolver: zodResolver(CreateAppSchema),
		defaultValues: {
			packageName: '',
			logo: undefined,
			banner: undefined,
			translations: []
		}
	});

	const { replace } = useFieldArray({
		control,
		name: 'translations'
	});

	const appName = watch('translations.0.name');

	useEffect(() => {
		const fetchAllLanguages = async (): Promise<void> => {
			try {
				const langs = await getAllLanguages();
				const formTranslations = [{ languageId: langs[0].id, name: '' }, ...langs.slice(1).map((l) => ({ languageId: l.id, name: '' }))];
				setLanguages(langs.slice(1));
				replace(formTranslations);
			} catch {
				toast.error('Невозможно создать приложение. Обратитесь к разработчику');
			}
		};
		fetchAllLanguages();
	}, [replace]);

	const toggleInputsWrapper = (): void => setLanguagesIsOpen((v) => !v);

	const translate = async (code: string, index: number): Promise<void> => {
		if (!appName) {
			toast.error('Заполните название на русском');
			return;
		}
		const toastId = toast.loading('Перевод...');
		try {
			const dto: z.infer<typeof TranslateSchema> = { code, text: appName };
			const translation = await translateText(dto);
			const text = translation.translations[0].text;
			setValue(`translations.${index}.name`, text, { shouldDirty: true });
			clearErrors(`translations.${index}.name`);
			toast.success(text, { id: toastId });
		} catch (error) {
			if (error instanceof HTTPError) {
				toast.error('Произошла ошибка: ' + error.message, { id: toastId });
			}
		}
	};

	const translateAllLanguages = async (): Promise<void> => {
		if (!appName) {
			toast.error('Заполните название на русском');
			return;
		}
		const toastId = toast.loading('Перевод...');
		for (const language of languages) {
			try {
				const dto: z.infer<typeof TranslateSchema> = { code: language.code, text: appName };
				const translation = await translateText(dto);
				const text = translation.translations[0].text;
				setValue(`translations.${language.id - 1}.name`, text, { shouldDirty: true });
				clearErrors(`translations.${language.id - 1}.name`);
				toast.success(text, { id: toastId });
			} catch (error) {
				if (error instanceof HTTPError) {
					toast.error('Произошла ошибка: ' + error.message, { id: toastId });
				}
			}
		}
	};

	const onSubmit = async (data: FormValues): Promise<void> => {
		const toastId = toast.loading('Создание приложения');
		try {
			await createApp(data);
			toast.success('Приложение успешно создано', { id: toastId });
			reset();
			navigate(0);
		} catch (error) {
			if (error instanceof HTTPError) {
				toast.error(error.message, { id: toastId });
			}
		}
	};
	return (
		<Portal>
			<Overlay className="dialogOverlay" />
			<Content className="dialogContent">
				<VisuallyHidden asChild>
					<DialogTitle>Создать приложение</DialogTitle>
				</VisuallyHidden>
				<ContentBox className={styles['modal']} title="Создать приложение">
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className={styles['inputWrapper']}>
							<Controller
								name={`translations.0.name`}
								control={control}
								render={({ field }) => (
									<Input
										error={errors.translations?.[0]?.name?.message}
										{...field}
										label="Название"
										placeholder="Моды на оружие"
									/>
								)}
							/>
							<button tabIndex={-1} onClick={translateAllLanguages} type="button" className={styles['translateButton']}>
								<TranslateIcon />
							</button>
							<button onClick={toggleInputsWrapper} type="button" className={styles['arrowButton']}>
								<ArrowIcon className={classNames({ [styles['rotate']]: !languagesIsOpen })} />
							</button>
						</div>

						<motion.div
							initial={{ height: 0, opacity: 0 }}
							animate={languagesIsOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
							transition={{ duration: 0.7 }}
							className={classNames(styles['inputsWrapper'], { [styles['open']]: languagesIsOpen })}>
							{languages.map((l, i) => (
								<div className={styles['inputWrapper']} key={l.id}>
									<Controller
										name={`translations.${i + 1}.name`}
										control={control}
										render={({ field }) => (
											<Input
												error={errors.translations?.[i + 1]?.name?.message}
												{...field}
												label={l.nameRu}
												placeholder={l.nameOriginal}
											/>
										)}
									/>
									<button
										tabIndex={-1}
										onClick={() => translate(l.code, i + 1)}
										type="button"
										className={styles['translateButton']}>
										<TranslateIcon />
									</button>
								</div>
							))}
						</motion.div>

						<Input error={errors.packageName?.message} {...register('packageName')} label="Имя пакета" placeholder="com.dev.name" />

						<div className={styles['wrapper']}>
							<Dropzone
								uploadFile={uploadFile}
								error={errors.logo?.message}
								onUpload={([file]) => setValue('logo', file?.url || '')}
								placeholder="512x512 .png"
								types={['image/png']}
								sizes={[512, 512]}
								label="Лого"
							/>
							<Dropzone
								uploadFile={uploadFile}
								error={errors.banner?.message}
								onUpload={([file]) => setValue('banner', file?.url || '')}
								placeholder="720x320 .png"
								types={['image/png']}
								sizes={[720, 320]}
								label="Баннер"
							/>
						</div>

						<div className={styles['wrapper']}>
							<Button appearance="primary" type="submit">
								Создать
							</Button>
							<Close asChild>
								<Button type="button" appearance="ghost">
									Отмена
								</Button>
							</Close>
						</div>
					</form>
				</ContentBox>
			</Content>
		</Portal>
	);
};
