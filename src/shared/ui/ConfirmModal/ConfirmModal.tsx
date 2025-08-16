import type { HTMLAttributes, JSX, ReactNode } from 'react';
import styles from './ConfirmModal.module.css';
import { Close, Content, DialogTitle, Overlay, Portal } from '@radix-ui/react-dialog';
import { Button, ContentBox } from '..';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

interface Props extends HTMLAttributes<HTMLDivElement> {
	callback: (...args: any[]) => any;
	children: ReactNode;
}

export const ConfirmModal = ({ className, children, callback, ...props }: Props): JSX.Element => {
	return (
		<Portal>
			<Overlay className="dialogOverlay" />
			<Content className="dialogContent">
				<VisuallyHidden asChild>
					<DialogTitle>Подтвердите действие</DialogTitle>
				</VisuallyHidden>
				<ContentBox {...props} title="Подтвердите действие" className={className}>
					<div>{children}</div>
					<div className={styles['buttons']}>
						<Button type="button" onClick={callback}>
							Подтвердить
						</Button>
						<Close asChild>
							<Button type="button" appearance="ghost">
								Отменить
							</Button>
						</Close>
					</div>
				</ContentBox>
			</Content>
		</Portal>
	);
};
