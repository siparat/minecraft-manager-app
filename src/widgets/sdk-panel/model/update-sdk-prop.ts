import { updateSdkProps } from '@/entities/app/api';
import { HTTPError } from 'ky';
import type { UpdateSdkSchema } from 'minecraft-manager-schemas';
import toast from 'react-hot-toast';
import type z from 'zod';

export const updateSdkProp = async (appId: number, name: keyof z.infer<typeof UpdateSdkSchema>, value: string): Promise<void> => {
	const toastId = toast.loading('Обновление данных...');
	try {
		await updateSdkProps(appId, { [name]: value });
		toast.success('Данные успешно обновлены', { id: toastId });
	} catch (error) {
		if (error instanceof HTTPError) {
			toast.error(error.message, { id: toastId });
		}
	}
};
