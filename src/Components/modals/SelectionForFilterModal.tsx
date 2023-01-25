/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import React, { useCallback, useRef, useState } from 'react';
import translate from '../../i18n/localization';
import Form, { ButtonItem, SimpleItem } from 'devextreme-react/form';
import InputType from '../../models/Enums/InputType';
import debounce from 'lodash/debounce';
import { getValidationForFilterName } from '../common/DbeColumnChildrens';
import { useSettingHooks } from '../../hooks';

const SelectionForFilterModal = ({ props: { tableInstance, setting, dataGrid, type }, closeModal }) => {
	const formRef = useRef<Form>();

	const {
		addSetting,
		setSelectedSetting,
		createNewSetting,
		getTheBiggestObjectId,
		isNameExists,
		getNextSettingName,
		updateToolbarButton,
		applySettingToDataGrid,
	} = useSettingHooks(type)(tableInstance, dataGrid);

	const [filterName, setFilterName] = useState<string>(`Filter (${getNextSettingName()})`);
	const toolbarPanelDispatch = useCallback(
		(...args) => {
			return tableInstance.toolbarPanelButtonManager.dispatchForToolbar(...args);
		},
		[tableInstance, tableInstance.toolbarPanelButtonManager],
	);
	const getFormRefInstance = useCallback(() => {
		return formRef && formRef.current && formRef.current.instance;
	}, [formRef]);

	const onSaveHandler = useCallback(() => {
		const newFilter = createNewSetting(filterName, false, getTheBiggestObjectId(), setting);
		addSetting(newFilter);
		setSelectedSetting(newFilter);
		updateToolbarButton(toolbarPanelDispatch, newFilter);
		applySettingToDataGrid(newFilter);
	}, [filterName, setting, dataGrid]);

	return (
		<div>
			<Form ref={formRef}>
				<SimpleItem
					editorType={InputType.TextBox}
					editorOptions={{
						value: filterName,
						onValueChanged: debounce(
							({ value }) => {
								setFilterName(value);
							},
							500,
							{ leading: true },
						),
					}}
				>
					{getValidationForFilterName(isNameExists)}
				</SimpleItem>
				<ButtonItem
					verticalAlignment={'center'}
					colSpan={1}
					buttonOptions={{
						type: 'success',
						text: translate('SAVE'),
						useSubmitBehavior: false,
						onClick: () => {
							if (getFormRefInstance() && getFormRefInstance().validate().isValid) {
								onSaveHandler();
								closeModal();
								dataGrid.clearSelection();
							}
						},
					}}
				/>
			</Form>
		</div>
	);
};

export default SelectionForFilterModal;
