/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import { ReactElement } from 'react';
import TFunction from '../../models/Types/Types';

class Notification {
	public isPinned: boolean;
	public closeNotification: TFunction;
	public changeOption: TFunction;
	public clickHandler: TFunction;

	constructor(
		public message: string,
		public type: string,
		public displayTime: number,
		public pinnedButton: boolean,
		public copyButton: boolean,
		clickHandler,
		public Content: JSX.Element,
	) {
		this.isPinned = false;
		this.clickHandler = clickHandler || null;
	}

	static createNotification(
		message,
		type = 'info',
		displayTime = 4500,
		pinnedButton = true,
		copyButton = true,
		clickHandler,
		Content,
	) {
		return new Notification(message, type, displayTime, pinnedButton, copyButton, clickHandler, Content);
	}

	public getMessage(): string {
		return this.message || '';
	}

	public getType(): string {
		return this.type || 'info';
	}

	public getDisplayTime(): number {
		return this.displayTime || 5000;
	}
	public getIsPinnedButtonShown(): boolean {
		return this.pinnedButton || true;
	}

	public getIsCopyButtonShow(): boolean {
		return this.copyButton;
	}

	public getIsPinned(): boolean {
		return this.isPinned || false;
	}

	public getContent(): JSX.Element | null {
		return this.Content || null;
	}

	public getClickHandler(): TFunction {
		return this.clickHandler ? this.clickHandler() : false;
	}

	public setIsPinned(pinned: boolean): Notification {
		this.isPinned = pinned;
		this.changeOption('onHiding', (e) => {
			e.cancel = pinned;
		});
		return this;
	}

	public setCloseHandler(close): Notification {
		this.closeNotification = close;
		return this;
	}

	public setChangeOption(option): Notification {
		this.changeOption = option;
		return this;
	}
}

export default Notification;
