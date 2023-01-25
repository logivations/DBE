/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import React, { useCallback, useMemo, useState } from 'react';
import { Button } from 'devextreme-react/button';
import { CloseNotify, CopyNotify, PinNotify, UnpinNotify } from '../../assets/icons';
import { iconsNotify, textNotify } from '../../constants/NotificationConstants';
import { createRoot } from 'react-dom/client';
import { INotification } from '../../models/Interfaces/ComponentInterfaces';

import './styles.css';

const MessageContent = ({ notification }) => {
	const message = useMemo(() => `<span>${notification.getMessage()}</span>`, []);
	return notification.clickHandler ? (
		<a
			className={'notify-message'}
			onClick={() => notification.getClickHandler()}
			dangerouslySetInnerHTML={{ __html: message }}
		/>
	) : (
		<span className={'notify-message'} dangerouslySetInnerHTML={{ __html: message }} />
	);
};

const Notification = ({ notification }: INotification) => {
	const pinnedButton = useMemo<boolean>(() => notification.getIsPinnedButtonShown(), []);
	const copyButton = useMemo<boolean>(() => notification.getIsCopyButtonShow(), []);
	const type = useMemo<string>(() => notification.getType(), []);

	const [isPinned, setIsPinned] = useState<boolean>(() => notification.getIsPinned());

	const onCopy = useCallback(async () => {
		await navigator.clipboard.writeText(notification.getMessage());
	}, []);

	const setPinned = useCallback((pinned) => {
		notification.setIsPinned(pinned);
		setIsPinned(pinned);
	}, []);

	const Content = notification.getContent();

	return (
		<div className={'notification-content-wrapper'}>
			<div className={'notify-header'}>
				<div className={'type-notify'}>
					<img src={iconsNotify[type]} />
					<span>{textNotify[type]}</span>
				</div>
				<div className={'control-notify-buttons'}>
					{pinnedButton &&
						(isPinned ? (
							<Button icon={PinNotify} stylingMode={'text'} onClick={() => setPinned(false)} />
						) : (
							<Button icon={UnpinNotify} stylingMode={'text'} onClick={() => setPinned(true)} />
						))}
					{copyButton && <Button icon={CopyNotify} stylingMode="text" onClick={onCopy} />}
					<Button
						icon={CloseNotify}
						stylingMode="text"
						onClick={() => {
							notification.changeOption('onHiding', (e) => {
								e.cancel = false;
							});
							notification.closeNotification();
						}}
					/>
				</div>
			</div>
			{notification.getMessage() && <MessageContent notification={notification} />}
			{Content}
		</div>
	);
};

export const toastTemplate = (element, notification) => {
	const root = createRoot(element);
	root.render(<Notification notification={notification} />);
};
