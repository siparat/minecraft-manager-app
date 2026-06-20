import { useLayoutEffect, useEffect, useRef, type JSX } from 'react';
import styles from './InfoPage.module.css';
import { Helmet } from 'react-helmet-async';

export const InfoPage = (): JSX.Element => {
	const revealRefs = useRef<HTMLElement[]>([]);

	useLayoutEffect(() => {
		const root = document.getElementById('root');

		document.body.style.backgroundImage = '';
		document.body.style.backgroundSize = '';
		document.body.style.backgroundAttachment = '';
		document.body.style.background = '#0a0a1a';
		document.body.style.scrollBehavior = 'smooth';

		if (root) {
			root.style.padding = '0';
			root.style.height = 'auto';
		}

		return () => {
			document.body.style.background = '';
			document.body.style.scrollBehavior = '';
			if (root) {
				root.style.padding = '';
				root.style.height = '';
			}
		};
	}, []);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add(styles['visible']);
					}
				});
			},
			{ threshold: 0.15 }
		);

		const elements = document.querySelectorAll(`.${styles['reveal']}`);
		elements.forEach((el) => observer.observe(el));

		return () => observer.disconnect();
	}, []);

	const addRevealRef = (el: HTMLElement | null) => {
		if (el && !revealRefs.current.includes(el)) {
			revealRefs.current.push(el);
		}
	};

	return (
		<>
			<Helmet>
				<title>Информация</title>
			</Helmet>

			<div className={styles['grid-overlay']} />

			<header className={styles['header']}>
				<span className={styles['header-brand']}>ADDONS MCPE STUDIO</span>
				<nav className={styles['header-nav']}>
					<a href="#disclaimer" className={styles['nav-link']}>Disclaimer</a>
					<a href="#copyright" className={styles['nav-link']}>Copyright</a>
					<a href="#contact" className={styles['nav-link']}>Contact</a>
				</nav>
			</header>

			<div className={styles['page']}>
				<section className={styles['hero']}>
					<h1 className={styles['hero-title']}>
						WELCOME TO
						<span className={styles['hero-title-accent']}>ADDONS MCPE STUDIO</span>
					</h1>
					<p className={styles['hero-subtitle']}>
						Unofficial resource for Minecraft Pocket Edition — built with care by the community.
					</p>
					<div className={styles['hero-scroll']}>
						<span className={styles['hero-scroll-text']}>Scroll to explore</span>
						<div className={styles['scroll-indicator']}>
							<div className={styles['scroll-dot']} />
						</div>
					</div>
				</section>

				<section id="disclaimer" className={`${styles['section']} ${styles['section-disclaimer']}`}>
					<div className={styles['section-inner']}>
						<p
							ref={addRevealRef}
							className={`${styles['section-tag']} ${styles['reveal']}`}
						>
							Section 01
						</p>
						<h2
							ref={addRevealRef}
							className={`${styles['section-title']} ${styles['reveal']} ${styles['reveal-delay-1']}`}
						>
							<em>Disclaimer</em>
						</h2>
						<div className={styles['cards']}>
							<div
								ref={addRevealRef}
								className={`${styles['card']} ${styles['reveal']} ${styles['reveal-delay-1']}`}
							>
								<p className={styles['card-text']}>
									This website is an unofficial resource for Minecraft Pocket Edition and is not affiliated with Mojang AB.
								</p>
							</div>
							<div
								ref={addRevealRef}
								className={`${styles['card']} ${styles['reveal']} ${styles['reveal-delay-2']}`}
							>
								<p className={styles['card-text']}>
									All Minecraft-related assets, including the name, brand, and game materials, are the property of Mojang AB or their respective owners. All rights reserved.
								</p>
								<a
									href="https://account.mojang.com/documents/brand_guidelines"
									target="_blank"
									rel="noopener noreferrer"
									className={styles['card-link']}
								>
									Official brand guidelines
								</a>
							</div>
						</div>
					</div>
				</section>

				<section id="copyright" className={`${styles['section']} ${styles['section-copyright']}`}>
					<div className={styles['section-inner']}>
						<p
							ref={addRevealRef}
							className={`${styles['section-tag']} ${styles['reveal']}`}
						>
							Section 02
						</p>
						<h2
							ref={addRevealRef}
							className={`${styles['section-title']} ${styles['reveal']} ${styles['reveal-delay-1']}`}
						>
							Copyright &amp; <em>Content Policy</em>
						</h2>
						<div className={styles['cards']}>
							<div
								ref={addRevealRef}
								className={`${styles['card']} ${styles['reveal']} ${styles['reveal-delay-1']}`}
							>
								<p className={styles['card-text']}>
									All files available on this website belong to their respective authors and developers. We do not claim any intellectual property rights over the materials provided and offer access to them under free distribution licenses, when applicable.
								</p>
							</div>
							<div
								ref={addRevealRef}
								className={`${styles['card']} ${styles['reveal']} ${styles['reveal-delay-2']}`}
							>
								<p className={styles['card-text']}>
									If you are a copyright holder and believe that any content on this website infringes your rights or violates licensing terms, please contact us — we will promptly take the necessary actions to remove or adjust the material.
								</p>
							</div>
						</div>
					</div>
				</section>

				<section id="contact" className={`${styles['section']} ${styles['section-contact']}`}>
					<div className={styles['section-inner']}>
						<p
							ref={addRevealRef}
							className={`${styles['section-tag']} ${styles['reveal']}`}
						>
							Section 03
						</p>
						<h2
							ref={addRevealRef}
							className={`${styles['section-title']} ${styles['reveal']} ${styles['reveal-delay-1']}`}
						>
							Contact <em>Us</em>
						</h2>
						<div
							ref={addRevealRef}
							className={`${styles['contact-card']} ${styles['reveal']} ${styles['reveal-delay-2']}`}
						>
							<p className={styles['contact-intro']}>
								If you have any questions, suggestions, or copyright concerns, please reach out to us.
							</p>
							<div>
								<a href="mailto:naryobbba@gmail.com" className={styles['contact-email']}>
									naryobbba@gmail.com
								</a>
							</div>
							<p className={styles['contact-note']}>
								We aim to respond as quickly as possible and treat every inquiry with attention.
							</p>
						</div>
					</div>
				</section>
			</div>
		</>
	);
};
