/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import React, {useCallback, useMemo, useState} from 'react';
import {Button} from 'devextreme-react/button';
import { createRoot } from 'react-dom/client';
import translate from "../../i18n/localization";
import {CloseNotify, CopyNotify, PinNotify, Success, Warning, Info, Error, UnpinNotify} from "../../assets/icons";

import './styles.less';

const iconsNotify = {
    "warning": Warning,
    'info': Info,
    'error': Error,
    'success': Success
};

const textNotify = {
    "warning": translate('WARNING'),
    'info': translate('INFO'),
    'error': translate('ERROR'),
    'success': translate('SUCCESS')
}

const Notification = ({notification}) => {
    const pinnedButton = useMemo<boolean>(() => notification.getIsPinnedButtonShown(), []);
    const copyButton = useMemo<boolean>(() => notification.getIsCopyButtonShow(), []);
    const type = useMemo<string>(() => notification.getType(), []);

    const [isPinned, setIsPinned] = useState(() => notification.getIsPinned());

    const onCopy = useCallback(async () => {
        await navigator.clipboard.writeText(notification.getMessage());
    }, []);

    const setPinned = useCallback((pinned) => {
        notification.setIsPinned(pinned);
        setIsPinned(pinned);
    }, []);

    return <div className={'notification-content-wrapper'}>
        <div className={'notify-header'}>
            <div className={'type-notify'}>
                <img src={iconsNotify[type]}/>
                <span>{textNotify[type]}</span>
            </div>
            <div className={'control-notify-buttons'}>
                {
                    pinnedButton && (
                        isPinned
                            ? <Button
                                icon={PinNotify}
                                stylingMode={'text'}
                                onClick={() => setPinned(false)}
                            />
                            :
                            <Button
                                icon={UnpinNotify}
                                stylingMode={'text'}
                                onClick={() => setPinned(true)}
                            />
                    )
                }
                {
                    copyButton
                    && <Button
                            icon={CopyNotify}
                            stylingMode="text"
                            onClick={onCopy}
                        />
                }
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
        {
            notification.getShowModal()
                ? <a className={'notify-message'} onClick={() => notification.getShowModalHandler()}>{notification.getMessage()}</a>
                : <span className={'notify-message'}>{notification.getMessage()}</span>
        }

    </div>;
};

export const toastTemplate = (element, notification) => {
    const root = createRoot(element);
    root.render(<Notification notification={notification}/>);
};
