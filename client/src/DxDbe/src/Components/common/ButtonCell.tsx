/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import React, {useCallback, useMemo} from 'react';
import debounce from 'lodash/debounce';
import useParentTablePopupContext from '../../context/ParentTablePopupContext';
import translate from '../../i18n/localization';
import classNames from 'classnames';

import './styles.less';

const Button = ({ foreignKeyInfo, button, disabled, data }) => {
	const { setData } = useParentTablePopupContext();
	const isRequired = useMemo(() => button.getIsRequired(), []);
	const value = useMemo(() => foreignKeyInfo.value, [foreignKeyInfo]);

	const repaintForeignCells = useCallback(() => {
		button.setForeignKeyData().then(async () => {
			data.component && (await data.component.repaint());
		});
	}, [button]);

	const debouncedClick = useMemo(
		() =>
			debounce(
				() => { setData(foreignKeyInfo, repaintForeignCells); },
				5000,
				{ leading: true, trailing: false },
			),
		[foreignKeyInfo],
	);
	
	const isInvalid = useMemo<boolean>(() => {
		return !value && value !== 0;
	}, [value]);
	return (
		<>
			<div
				className={classNames('foreign-key-btn', {invalid: isRequired && !value, disabled: disabled})}
				onClick={(e) => {
					e.stopPropagation();
					e.preventDefault();
					!disabled && debouncedClick();
				}}
				onBlur={(e) => {
					e.stopPropagation();
					e.preventDefault();
				}}
			>
				<span>{foreignKeyInfo.cellText}</span>
			</div>
			{isRequired && isInvalid && (
				<span className={'foreign-btn-invalid-message'}>
					{translate(`Field ${button.getCaption()} is required`)}
				</span>
			)}
		</>
	);
};

const getButtonCell = (foreignKeyInfo: object, button, disabled, data: any) => {
    return <Button foreignKeyInfo={foreignKeyInfo} button={button} disabled={disabled} data={data}/>;
};

export default getButtonCell;
