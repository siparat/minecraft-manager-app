import { useLayoutEffect, type JSX, type ReactNode } from 'react';
import styles from './InfoPage.module.css';
import { Helmet } from 'react-helmet-async';

const MOJANG_BRAND_URL = 'https://account.mojang.com/documents/brand_guidelines';
const CONTACT_EMAIL = 'irinavkt572@gmail.com';

const stats = [
	{ value: '500+', label: 'Mods available' },
	{ value: '24h', label: 'Support response' },
	{ value: '100%', label: 'Free to download' }
];

const policies = [
	{
		icon: <ScaleIcon />,
		title: 'Ownership',
		text: 'All mods, maps, and content files hosted on this platform are the intellectual property of their respective creators. We distribute them strictly under applicable free-distribution or open licenses.'
	},
	{
		icon: <MailIcon />,
		title: 'DMCA & Takedowns',
		text: 'If you are a rights holder and believe any material infringes your copyright, contact us directly. We take such reports seriously and will act promptly to remove or adjust the relevant content.'
	}
];

export const InfoPage = (): JSX.Element => {
	useLayoutEffect(() => {
		document.body.classList.add('info-page-active');
		return (): void => document.body.classList.remove('info-page-active');
	}, []);

	return (
		<div className={styles.page}>
			<Helmet>
				<title>About — MC MOD DEV Studio</title>
			</Helmet>

			<div className={styles.dust} aria-hidden="true">
				{Array.from({ length: 18 }, (_, i) => (
					<span key={i} className={styles.mote} style={{ left: `${(i * 37) % 100}%`, animationDelay: `${(i * 0.7) % 9}s` }} />
				))}
			</div>

			<header className={styles.header}>
				<div className={styles.headerInner}>
					<a href="#" className={styles.logo}>
						<CrownMark />
						<span>
							MC MOD DEV
							<small>Studio</small>
						</span>
					</a>
					<nav className={styles.nav}>
						<a href="#disclaimer" className={styles.navLink}>
							Disclaimer
						</a>
						<a href="#copyright" className={styles.navLink}>
							Content Policy
						</a>
						<a href="#contact" className={styles.navCta}>
							Contact us <ArrowIcon />
						</a>
					</nav>
				</div>
			</header>

			<section className={styles.hero}>
				<span className={styles.heroEyebrow}>
					<SparkIcon /> Independent mod resource <SparkIcon />
				</span>
				<h1 className={styles.heroTitle}>
					<span className={styles.heroTitleAccent}>MC MOD</span>
					<span className={styles.heroTitleSub}>DEV Studio</span>
				</h1>
				<p className={styles.heroDesc}>
					Your go-to source for Minecraft Pocket Edition mods, maps and add-ons. Curated, safe, and always up to date.
				</p>
				<ul className={styles.heroStats}>
					{stats.map((stat, i) => (
						<li key={stat.label} className={styles.statCard} style={{ animationDelay: `${0.5 + i * 0.12}s` }}>
							<span className={styles.statNum}>{stat.value}</span>
							<span className={styles.statLabel}>{stat.label}</span>
						</li>
					))}
				</ul>
				<a href="#disclaimer" className={styles.heroScroll} aria-label="Scroll to content">
					<span className={styles.scrollMouse}>
						<span />
					</span>
				</a>
			</section>

			<Section
				id="disclaimer"
				num="01"
				tag="Disclaimer"
				icon={<ShieldIcon />}
				title={
					<>
						Independent
						<br />
						Resource
					</>
				}>
				<p>
					MC MOD DEV Studio is an <mark className={styles.mark}>independent, fan-made resource</mark> for Minecraft Pocket Edition. We
					are not affiliated with, endorsed by, or officially connected to Mojang AB or Microsoft in any way.
				</p>
				<p>
					All trademarks, service marks, trade names, and game assets — including the Minecraft name and brand — belong to Mojang AB
					and their respective owners. All rights reserved.
				</p>
				<a href={MOJANG_BRAND_URL} target="_blank" rel="noreferrer" className={styles.outLink}>
					Brand guidelines <ArrowIcon />
				</a>
			</Section>

			<Section
				id="copyright"
				num="02"
				tag="Content Policy"
				icon={<BookIcon />}
				title={
					<>
						Copyright
						<br />
						&amp; Usage
					</>
				}
				alt>
				<div className={styles.policyGrid}>
					{policies.map((policy) => (
						<article key={policy.title} className={styles.policyCard}>
							<span className={styles.policyIcon}>{policy.icon}</span>
							<h3 className={styles.policyCardTitle}>{policy.title}</h3>
							<p className={styles.policyCardText}>{policy.text}</p>
						</article>
					))}
				</div>
			</Section>

			<section id="contact" className={styles.contact}>
				<div className={styles.contactCard}>
					<span className={styles.contactNum}>03</span>
					<span className={styles.contactIcon}>
						<MailIcon />
					</span>
					<p className={styles.contactEyebrow}>Get in touch</p>
					<h2 className={styles.contactTitle}>
						Have a question
						<br />
						or request?
					</h2>
					<p className={styles.contactDesc}>Content removal request, feedback, or just saying hi — we respond within 24 hours.</p>
					<a href={`mailto:${CONTACT_EMAIL}`} className={styles.contactEmail}>
						<span>{CONTACT_EMAIL}</span>
						<ArrowIcon />
					</a>
				</div>
			</section>

			<footer className={styles.footer}>
				<CrownMark />
				<span className={styles.footerLogo}>MC MOD DEV Studio</span>
				<span className={styles.footerNote}>© {new Date().getFullYear()} — Fan-made, not affiliated with Mojang</span>
			</footer>
		</div>
	);
};

interface SectionProps {
	id: string;
	num: string;
	tag: string;
	icon: ReactNode;
	title: ReactNode;
	alt?: boolean;
	children: ReactNode;
}

const Section = ({ id, num, tag, icon, title, alt, children }: SectionProps): JSX.Element => (
	<section id={id} className={alt ? `${styles.section} ${styles.sectionAlt}` : styles.section}>
		<div className={styles.sectionInner}>
			<aside className={styles.sideCol}>
				<span className={styles.sectionIcon}>{icon}</span>
				<span className={styles.sectionNum}>{num}</span>
				<span className={styles.sectionTag}>{tag}</span>
			</aside>
			<div className={styles.mainCol}>
				<h2 className={styles.sectionTitle}>{title}</h2>
				<div className={styles.textBlock}>{children}</div>
			</div>
		</div>
	</section>
);

function CrownMark(): JSX.Element {
	return (
		<svg className={styles.crown} viewBox="0 0 32 32" aria-hidden="true">
			<path d="M6 22 L4 10 L11 15 L16 7 L21 15 L28 10 L26 22 Z" />
			<rect x="6" y="23" width="20" height="3" rx="1" />
		</svg>
	);
}

function ArrowIcon(): JSX.Element {
	return (
		<svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true">
			<path d="M5 12h14M13 6l6 6-6 6" />
		</svg>
	);
}

function SparkIcon(): JSX.Element {
	return (
		<svg className={styles.spark} viewBox="0 0 24 24" aria-hidden="true">
			<path d="M12 2l2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4z" />
		</svg>
	);
}

function ShieldIcon(): JSX.Element {
	return (
		<svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true">
			<path d="M12 3l8 3v6c0 4.5-3.4 8.2-8 9-4.6-.8-8-4.5-8-9V6z" />
			<path d="M9 12l2 2 4-4" />
		</svg>
	);
}

function BookIcon(): JSX.Element {
	return (
		<svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true">
			<path d="M4 5a2 2 0 012-2h13v16H6a2 2 0 00-2 2z" />
			<path d="M4 19V5M9 8h6" />
		</svg>
	);
}

function ScaleIcon(): JSX.Element {
	return (
		<svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true">
			<path d="M12 3v18M6 7h12M6 7l-3 6a3 3 0 006 0zM18 7l-3 6a3 3 0 006 0z" />
		</svg>
	);
}

function MailIcon(): JSX.Element {
	return (
		<svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true">
			<rect x="3" y="5" width="18" height="14" rx="2" />
			<path d="M3 7l9 6 9-6" />
		</svg>
	);
}
