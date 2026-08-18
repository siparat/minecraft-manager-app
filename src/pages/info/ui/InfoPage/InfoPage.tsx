import { useLayoutEffect, type JSX } from 'react';
import styles from './InfoPage.module.css';
import { Helmet } from 'react-helmet-async';

export const InfoPage = (): JSX.Element => {
	useLayoutEffect(() => {
		document.body.classList.add('info-page-active');
		return () => document.body.classList.remove('info-page-active');
	}, []);

	return (
		<>
			<Helmet>
				<title>About — MC MOD DEV Studio</title>
			</Helmet>

			{/* ── HEADER ── */}
			<header className={styles.header}>
				<div className={styles.headerInner}>
					<a href="#" className={styles.logo}>
						<span className={styles.logoBox}>M</span>
						MC MOD DEV
					</a>
					<nav className={styles.nav}>
						<a href="#disclaimer" className={styles.navLink}>Disclaimer</a>
						<a href="#copyright" className={styles.navLink}>Content Policy</a>
						<a href="#contact" className={styles.navCta}>Contact us ↗</a>
					</nav>
				</div>
			</header>

			{/* ── HERO ── */}
			<section className={styles.hero}>
				<div className={styles.heroTop}>
					<span className={styles.heroBadge}>
						<span className={styles.badgeLine} />
						Independent mod resource
					</span>
				</div>
				<div className={styles.heroContent}>
					<h1 className={styles.heroTitle}>
						<span className={styles.heroTitleAccent}>MC MOD</span>
						<br />DEV Studio
					</h1>
					<div className={styles.heroRight}>
						<p className={styles.heroDesc}>
							Your go-to source for Minecraft Pocket Edition mods, maps and add-ons.
							Curated, safe, and always up to date.
						</p>
						<div className={styles.heroStats}>
							<div className={styles.stat}>
								<span className={styles.statNum}>500+</span>
								<span className={styles.statLabel}>Mods available</span>
							</div>
							<div className={styles.statDivider} />
							<div className={styles.stat}>
								<span className={styles.statNum}>24h</span>
								<span className={styles.statLabel}>Support response</span>
							</div>
							<div className={styles.statDivider} />
							<div className={styles.stat}>
								<span className={styles.statNum}>100%</span>
								<span className={styles.statLabel}>Free to download</span>
							</div>
						</div>
					</div>
				</div>
				<div className={styles.heroScroll}>
					<span className={styles.scrollLine} />
					<span className={styles.scrollText}>scroll</span>
				</div>
			</section>

			{/* ── DISCLAIMER ── */}
			<section id="disclaimer" className={styles.section}>
				<div className={styles.sectionInner}>
					<div className={styles.sideCol}>
						<span className={styles.sectionNum}>01</span>
						<span className={styles.sectionTag}>Disclaimer</span>
					</div>
					<div className={styles.mainCol}>
						<h2 className={styles.sectionTitle}>Independent<br />Resource</h2>
						<div className={styles.textBlock}>
							<p>
								MC MOD DEV Studio is an <mark className={styles.mark}>independent, fan-made resource</mark> for
								Minecraft Pocket Edition. We are not affiliated with, endorsed by, or officially
								connected to Mojang AB or Microsoft in any way.
							</p>
						</div>
						<div className={styles.textBlock}>
							<p>
								All trademarks, service marks, trade names, and game assets — including the
								Minecraft name and brand — belong to Mojang AB and their respective owners.
								All rights reserved.
							</p>
						</div>
						<a
							href="https://account.mojang.com/documents/brand_guidelines"
							target="_blank"
							rel="noreferrer"
							className={styles.outLink}
						>
							Brand guidelines ↗
						</a>
					</div>
				</div>
			</section>

			{/* ── COPYRIGHT ── */}
			<section id="copyright" className={`${styles.section} ${styles.sectionAlt}`}>
				<div className={styles.sectionInner}>
					<div className={styles.sideCol}>
						<span className={styles.sectionNum}>02</span>
						<span className={styles.sectionTag}>Content Policy</span>
					</div>
					<div className={styles.mainCol}>
						<h2 className={styles.sectionTitle}>Copyright<br />&amp; Usage</h2>
						<div className={styles.policyGrid}>
							<div className={styles.policyCard}>
								<span className={styles.policyIcon}>⚖️</span>
								<h3 className={styles.policyCardTitle}>Ownership</h3>
								<p className={styles.policyCardText}>
									All mods, maps, and content files hosted on this platform are the intellectual
									property of their respective creators. We distribute them strictly under
									applicable free-distribution or open licenses.
								</p>
							</div>
							<div className={styles.policyCard}>
								<span className={styles.policyIcon}>📩</span>
								<h3 className={styles.policyCardTitle}>DMCA & Takedowns</h3>
								<p className={styles.policyCardText}>
									If you are a rights holder and believe any material infringes your copyright,
									contact us directly. We take such reports seriously and will act promptly
									to remove or adjust the relevant content.
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* ── CONTACT ── */}
			<section id="contact" className={styles.contactSection}>
				<div className={styles.contactInner}>
					<span className={styles.contactNum}>03</span>
					<p className={styles.contactEyebrow}>Get in touch</p>
					<h2 className={styles.contactTitle}>Have a question<br />or request?</h2>
					<p className={styles.contactDesc}>
						Content removal request, feedback, or just saying hi —
						we respond within 24 hours.
					</p>
					<a href="mailto:irinavkt572@gmail.com" className={styles.contactEmail}>
						<span>irinavkt572@gmail.com</span>
						<span className={styles.contactArrow}>→</span>
					</a>
				</div>
			</section>

			{/* ── FOOTER ── */}
			<footer className={styles.footer}>
				<span className={styles.footerLogo}>MC MOD DEV Studio</span>
				<span className={styles.footerNote}>© {new Date().getFullYear()} — Fan-made, not affiliated with Mojang</span>
			</footer>
		</>
	);
};
