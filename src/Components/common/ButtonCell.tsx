/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import React, {useEffect, useMemo, useState} from 'react';
import debounce from 'lodash/debounce';
import translate from '../../i18n/localization';
import classNames from 'classnames';
import useParentTablePopupContext from '../../context/ParentTablePopupContext';
import ForeignButtonProxy from '../../services/ForeignButtonManager/ForeignButtonProxy';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import InvalidButton from '../../assets/icons/invalid-foreign-icon.svg';

import './styles.css';
import {isDefined} from "../../utils/utils";

const Button = ({ foreignKeyInfo, button, disabled, data }) => {
	const { setData } = useParentTablePopupContext();
	const isRequired = useMemo(() => button.getIsRequired(), []);
	const [buttonValue, setButtonValue] = useState(data.value);
	const foreignButtonProxy = useMemo(() => new ForeignButtonProxy(), []);
	const foreignData = useMemo(() => foreignKeyInfo.extraData || foreignKeyInfo.cellData.data, [foreignKeyInfo]);

	const [isValueExistInParentTable, setIsValueExistInParentTable] = useState<boolean>(null);

	const isInvalid = useMemo(() => {
		if (isValueExistInParentTable === null) {
			return false;
		}
		if (isRequired) {
			return !(isDefined(buttonValue) && isValueExistInParentTable);
		}
		if (!isRequired) {
			return false;
		}
		return !isValueExistInParentTable;
	}, [isRequired, buttonValue, isValueExistInParentTable]);


	const debouncedClick = useMemo(
		() =>
			debounce(
				() => {
					const data = Object.entries(foreignKeyInfo.joinedKeyColumnNames).reduce((acc, [childName, parentName]) => {
						return Object.hasOwn(foreignData, childName)
							? {...acc, [parentName as string]: foreignData[childName]}
							: acc;
					}, {});
					setData(foreignKeyInfo, data, button);
				},
				1000,
				{ leading: true, trailing: false },
			),
		[foreignKeyInfo, foreignData],
	);

	return (
		<>
			<div
				className={classNames('foreign-key-btn', { invalid: isInvalid, disabled: disabled })}
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
				<span>{buttonValue ? buttonValue : '\u2014' }</span>
				{isInvalid && <img className={'invalid-icon'} src={InvalidButton}  alt={'Invalid Icon'}/>}
			</div>
		</>
	);
};

const getButtonCell = (foreignKeyInfo: object, button, disabled, data: any) => {
	return <Button foreignKeyInfo={foreignKeyInfo} button={button} disabled={disabled} data={data} />;
};

export default getButtonCell;
