import { useModStore } from './store';

export const modLoader = async (): Promise<void> => {
	const { fetchAllVersions } = useModStore.getState();
	await fetchAllVersions();
};
