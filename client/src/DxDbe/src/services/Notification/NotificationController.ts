/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import Notification from './Notification';
import Notify from "devextreme/ui/notify";
import {toastTemplate} from "../../Components/Notifications/Notification";
import {getNotificationType} from "../../models/Enums/Notification";

class NotificationController {
    static instance;

    static createNotification(
        message: string,
        type: number,
        showModal?: boolean,
        showModalHandler?: Function,
        displayTime?: number,
        pinnedButton?: boolean,
        copyButton?: boolean
    ) {
        const notifier = new NotificationController();
        notifier.createNotification(message, type, showModal, showModalHandler, displayTime, pinnedButton, copyButton);
    }

    constructor() {
        if (!NotificationController.instance) {
            NotificationController.instance = this;
        }

        return NotificationController.instance;
    }

    public createNotification(
        message: string,
        type: number,
        showModal?: boolean,
        showModalHandler?: Function,
        displayTime?: number,
        pinnedButton?: boolean,
        copyButton?: boolean,
    ) {
        const notification = Notification.createNotification(
            message,
            getNotificationType(type),
            displayTime,
            pinnedButton,
            copyButton,
            showModal,
            showModalHandler
        );
        this.showNotification(notification);
    }

    public showNotification(notification: Notification) {
        Notify({
            message: notification.getMessage(),
            height: 55,
            width: 500,
            minWidth: 150,
            type: notification.getType(),
            displayTime: notification.getDisplayTime(),
            wrapperAttr: {class: 'notification'},
            onInitialized: function ({component}) {
                const close = () => component.hide();
                const option = (optionName, optionValue) => component.option(optionName, optionValue);
                notification.setCloseHandler(close);
                notification.setChangeOption(option);
            },
            onHiding: function (e) {
                e.cancel = notification.getIsPinned();
            },
            contentTemplate: (e) => toastTemplate(e, notification),
            animation: {
                show: {
                    type: 'fade', duration: 400, from: 0, to: 1,
                },
                hide: { type: 'fade', duration: 40, to: 0 },
            },
        }, {
            position: 'bottom right',
            direction: 'up-push'
        }
        );
    }

}

export default NotificationController;