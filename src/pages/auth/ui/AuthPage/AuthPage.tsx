import type { JSX } from 'react';
import styles from './AuthPage.module.css';
import { AuthorizationForm } from '@/features/auth';
import { Helmet } from 'react-helmet-async';

export const AuthPage = (): JSX.Element => {
	return (
		<>
			<Helmet>
				<title>Авторизация — Minecraft Manager</title>
			</Helmet>
			<div className={styles['page']}>
				{/* Gradient background */}
				<div className={styles['bg']} />

				{/* Floating orbs */}
				<div className={`${styles['orb']} ${styles['orb1']}`} />
				<div className={`${styles['orb']} ${styles['orb2']}`} />
				<div className={`${styles['orb']} ${styles['orb3']}`} />

				{/* Subtle grid overlay */}
				<div className={styles['gridOverlay']} />

				{/* Content */}
				<div className={styles['split']}>
					{/* ─ Brand panel ─ */}
					<div className={styles['brand']}>
						<div className={styles['logoWrap']}>
							<div className={styles['logoIcon']}>⛏️</div>
							<div className={styles['logoText']}>
								Minecraft<span>Manager</span>
							</div>
						</div>

						<h1 className={styles['brandHeadline']}>
							Управляй своими<br />
							<em>Minecraft-серверами</em><br />
							с лёгкостью
						</h1>

						<p className={styles['brandDesc']}>
							Централизованная панель для управления приложениями,
							модами и политиками ваших серверов. Всё в одном месте.
						</p>

						<div className={styles['pills']}>
							{[
								'Управление приложениями',
								'Моды и плагины',
								'SDK и интеграции',
								'Политики доступа',
							].map((label) => (
								<div key={label} className={styles['pill']}>
									<span className={styles['pillDot']} />
									{label}
								</div>
							))}
						</div>
					</div>

					{/* ─ Auth card ─ */}
					<div className={styles['card']}>
						<div className={styles['cardHeader']}>
							<h2 className={styles['cardTitle']}>Добро пожаловать</h2>
							<p className={styles['cardSubtitle']}>
								Введите учётные данные, чтобы войти в систему
							</p>
						</div>
						<AuthorizationForm />
					</div>
				</div>
			</div>
		</>
	);
};

