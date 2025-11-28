import type { JSX } from 'react';
import styles from './InfoPage.module.css';
import { Helmet } from 'react-helmet-async';
import { Text, Title } from '@/shared/ui';
import ScrollMouse from '@/shared/assets/icons/scroll-mouse.svg?react';

export const InfoPage = (): JSX.Element => {
	return (
		<>
			<Helmet>
				<title>Информация</title>
			</Helmet>
			<header className={styles['header']}>
				<ul className={styles['header-list']}>
					<li>
						<a href="#second-screen">
							<Text size="l" color="white">
								DISCLAIMER
							</Text>
						</a>
					</li>
					<li>
						<a href="#third-screen">
							<Text size="l" color="white">
								COPYRIGHT & CONTENT POLICY
							</Text>
						</a>
					</li>
					<li>
						<a href="#fourth-screen">
							<Text size="l" color="white">
								CONTACT US
							</Text>
						</a>
					</li>
				</ul>
			</header>
			<section className={styles['first-screen']}>
				<div className={styles['wrapper']}>
					<Title className={styles['title']} tag="h1">
						WELCOME TO l13 STUDIO PAGE
					</Title>
					<ScrollMouse className={styles['scroll-icon']} />
				</div>
			</section>
			<section id="second-screen" className={styles['second-screen']}>
				<div className={styles['wrapper']}>
					<Title className={styles['title']} tag="h2">
						DISCLAIMER
					</Title>
					<div className={styles['blockText']}>
						<Text size="l">
							This website is an unofficial resource for Minecraft Pocket Edition and is not affiliated with Mojang AB.
						</Text>
					</div>
					<div className={styles['blockText']}>
						<Text size="l">
							All Minecraft-related assets, including the name, brand, and game materials, are the property of Mojang AB or their
							respective owners. All rights reserved.
						</Text>
						<Text size="l">
							Official brand guidelines:{' '}
							<a href="https://account.mojang.com/documents/brand_guidelines">
								https://account.mojang.com/documents/brand_guidelines
							</a>
						</Text>
					</div>
				</div>
			</section>
			<section id="third-screen" className={styles['third-screen']}>
				<div className={styles['wrapper']}>
					<Title className={styles['title']} tag="h2">
						📌 COPYRIGHT & CONTENT POLICY
					</Title>
					<div className={styles['blockText']}>
						<Text color="white" size="l">
							All files available on this website belong to their respective authors and developers. We do not claim any
							intellectual property rights over the materials provided and offer access to them under free distribution licenses,
							when applicable.
						</Text>
					</div>
					<div className={styles['blockText']}>
						<Text color="white" size="l">
							If you are a copyright holder and believe that any content on this website infringes your rights or violates
							licensing terms, please contact us — we will promptly take the necessary actions to remove or adjust the material.
						</Text>
					</div>
				</div>
			</section>
			<section id="fourth-screen" className={styles['fourth-screen']}>
				<div className={styles['wrapper']}>
					<Title className={styles['title']} tag="h2">
						CONTACT US
					</Title>
					<div className={styles['blockText']}>
						<Text color="white" size="l">
							If you have any questions, suggestions, or copyright concerns, please reach
						</Text>
					</div>
					<div className={styles['blockText']}>
						<Text color="white" size="l">
							out to us:
						</Text>
					</div>
					<div className={styles['blockText']}>
						<Text color="white" size="l">
							<a href="mailto:kairzhaniskairov@gmail.com">kairzhaniskairov@gmail.com</a>
						</Text>
					</div>
					<div className={styles['blockText']}>
						<Text color="white" size="l">
							We aim to respond as quickly as possible and treat every inquiry with attention.
						</Text>
					</div>
				</div>
			</section>
		</>
	);
};
