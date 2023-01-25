/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import React, { useCallback, useRef, useState } from 'react';
import translate from '../../i18n/localization';
import Builder from './builders/Builder';
import Form, { ButtonItem, SimpleItem } from 'devextreme-react/form';
import { getValidationForFilterName } from '../common/DbeColumnChildrens';
import InputType from '../../models/Enums/InputType';
import debounce from 'lodash/debounce';
import ButtonNames from '../../services/ToolbarPanelManager/ButtonNames';

const AddNewSetting = ({ props, closeModal }) => {
	const {
		buttonName,
		saveSetting,
		setDataSource,
		builderKey,
		createNewSetting,
		getTheBiggestObjectId,
		tableInstance,
		isNameExists,
		getNextSettingName,
	} = props;
	const formRef = useRef<Form>();

	const [name, setName] = useState<string>(`Filter (${getNextSettingName()})`);
	const [isPublic, setIsPublic] = useState(false);
	const [newSetting, setNewSetting] = useState(null);
	const getSettingChanges = useCallback((settingChanges) => setNewSetting(settingChanges), []);
	const getFormRefInstance = useCallback(() => {
		return formRef && formRef.current && formRef.current.instance;
	}, [formRef]);

	const toolbarPanelDispatch = useCallback(
		(...args) => {
			return tableInstance.toolbarPanelButtonManager.dispatchForToolbar(...args);
		},
		[tableInstance, tableInstance.toolbarPanelButtonManager],
	);

	return (
		<div>
			<Form ref={formRef}>
				<SimpleItem
					editorType={InputType.TextBox}
					label={{ text: translate('FILTER_NAME') }}
					editorOptions={{
						value: name,
						onValueChanged: debounce(
							(e) => {
								setName(e.value);
								formRef.current.instance.validate();
							},
							500,
							{ leading: true },
						),
					}}
				>
					{getValidationForFilterName(isNameExists)}
				</SimpleItem>
				<SimpleItem
					editorType={InputType.CheckBox}
					label={{ text: translate('PUBLIC') }}
					editorOptions={{
						value: isPublic,
						onValueChanged: (e) => {
							setIsPublic(e.value);
						},
					}}
				/>
			</Form>
			<div className={'builder-wrapper'}>
				<Builder
					builderKey={builderKey}
					tableInstance={tableInstance}
					defaultValue={null}
					getSettingChanges={getSettingChanges}
				/>
			</div>
			<Form>
				<ButtonItem
					colSpan={1}
					buttonOptions={{
						type: 'success',
						text: translate('SAVE'),
						stylingMode: 'contained',
						useSubmitBehavior: false,
						disabled: (getFormRefInstance() && !getFormRefInstance().validate().isValid) || !newSetting,
						onClick: async () => {
							const newFilter = createNewSetting(name, isPublic, getTheBiggestObjectId(), newSetting);
							await saveSetting(newFilter).then((res) => {
								setDataSource((prev) => [res, ...prev]);
							});

							toolbarPanelDispatch({
								type: 'UPDATE_ITEMS',
								payload: { items: [newFilter].map((filter) => ({ ...filter })), buttonName },
							});
							closeModal();
						},
					}}
				/>
			</Form>
		</div>
	);
};

export default AddNewSetting;
