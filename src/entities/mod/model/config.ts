import { ModCategory } from 'minecraft-manager-schemas';

export const ModCategoryLabels = {
	[ModCategory.ADDON]: 'Моды',
	[ModCategory.SKIN_PACK]: 'Скины',
	[ModCategory.TEXTURE_PACK]: 'Текстурпаки',
	[ModCategory.WORLD]: 'Карты'
} satisfies Record<ModCategory, string>;
