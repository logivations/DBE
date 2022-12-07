/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import {Severity} from '../../models/Enums/Notification';

class Notification {
    public isPinned: boolean;
    public closeNotification: Function;
    public changeOption: Function;
    public showModalHandler: Function;

    constructor(
        public message: string,
        public type: number,
        public displayTime: number,
        public pinnedButton: boolean,
        public copyButton: boolean,
        public showModal: boolean,
        showModalHandler
    ) {
        this.isPinned = false;
        this.showModalHandler = showModalHandler;

    }

    static createNotification(message, type, displayTime, pinnedButton, copyButton, showModal, showModalHandler) {
        return new Notification(message, type, displayTime, pinnedButton, copyButton, showModal, showModalHandler);
    }

    public getMessage(): string {
        return this.message || '';
    }

    public getType(): number {
        return this.type || Severity.INFO;
    }

    public getDisplayTime(): number {
        return this.displayTime || 3000;

    }
    public getIsPinnedButtonShown(): boolean {
        return this.pinnedButton || true;
    }

    public getIsCopyButtonShow(): boolean {
        return this.copyButton || true;
    }

    public getIsPinned(): boolean {
        return this.isPinned || false;
    }

    public getShowModal(): boolean {
        return this.showModal || false;
    }

    public getShowModalHandler(): Function {
        return this.showModalHandler();
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