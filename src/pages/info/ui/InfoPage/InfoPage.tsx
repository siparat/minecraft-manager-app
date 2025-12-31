import type { JSX } from 'react';
import styles from './InfoPage.module.css';
import { Helmet } from 'react-helmet-async';
import { Text, Title } from '@/shared/ui';

export const InfoPage = (): JSX.Element => {
	return (
		<>
			<Helmet>
				<title>Информация</title>
			</Helmet>
			<div className={styles['wrapper']}>
				<div>
					<Title tag="h1">Hamit</Title>
					<Text size="m">Best application, mods, maps, skins, textures for Minecraft PE</Text>
				</div>
				<div className={styles['blockText']}>
					<Text size="m">DISCLAIMER: This is an unofficial web site for Minecraft Pocket Edition.</Text>
					<Text size="m">
						This web site is not affiliated in any way with Mojang AB. The Minecraft Name, the Minecraft Brand and the Minecraft
						Assets are all property of Mojang AB or their respectful owner.
					</Text>
					<Text size="m">
						All rights reserved. In accordance with{' '}
						<a href="http://account.mojang.com/documents/brand_guidelines">http://account.mojang.com/documents/brand_guidelines</a>
					</Text>
				</div>
				<div className={styles['blockText']}>
					<Text size="m">
						All files available for download in this application belong to various developers, I do not in any way claim intellectual
						property or intellectual property for the files and data, and provide them under a free license.
					</Text>
				</div>
				<div className={styles['blockText']}>
					<Text size="m">
						If you believe that I have violated your intellectual property rights or any other agreement, write to me by E-mail
						(listed in the developer's contacts), I will immediately take the necessary measures.
					</Text>
				</div>
				<div className={styles['blockText']}>
					<Text size="l">
						Feedback to us – <a href="mailto:djumakanov.hamit@gmail.com">djumakanov.hamit@gmail.com</a>
					</Text>
				</div>
			</div>
		</>
	);
};
