/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import React, { useRef, useState} from 'react';
import translate from '../../i18n/localization';
import DataGrid, {Column, Editing, Pager, Paging, RequiredRule, Selection} from 'devextreme-react/data-grid';
import {useProxiedFiltersForSaving, useSettingHooks} from '../../hooks';
import ModalsTypes from '../../constants/ModalsTypes';
import {filtersSplit} from "../../constants/FiltersConstants";
import {useDbeActionsHelpLink} from "../../hooks/useHelpLink";
import Form, {ButtonItem, SimpleItem} from 'devextreme-react/form';
import {HelpIcon} from "../../assets/icons";
import InputType from "../../models/Enums/InputType";

import './styles.less';

const UserParamsSettingsModal = ({ openModal, closeModal, props }) => {
	const { applySetting, type, repaintDropDown, unfilter, tableInstance, helpKey, dbeDxGridRef } = props;
	const [ownerUserFilters, setOwnerUserFilters] = useState(filtersSplit[0].value);

	const dataGridRef = useRef<DataGrid>();
	const [selectedSettingRow, setSelectedSettingRow] = useState(null);

	const {
		settingElements,
		addSetting,
		editSetting,
		deleteSetting,
		builderKey,
		setSelectedSetting,
		shareUnshareSetting,
		checkSelectedSetting,
		createNewSetting,
		title,
		getTheBiggestObjectId,
		isNameExists,
		getNextSettingName
	} = useSettingHooks(type)(tableInstance, dbeDxGridRef, ownerUserFilters !== filtersSplit[1].value);

	const [dataSource, setProxiedSettings] = useProxiedFiltersForSaving(tableInstance, settingElements, editSetting, shareUnshareSetting)
	const helpLink = useDbeActionsHelpLink(tableInstance.warehouseUiType, helpKey);

	return (
		<div>
			<Form colCount={5}>
				<SimpleItem
					colSpan={4}
					editorType={InputType.RadioGroup}
					editorOptions={{
						layout: "horizontal",
						value: ownerUserFilters,
						valueExpr: "value",
						items: filtersSplit,
						onValueChanged: (e) => {
							setOwnerUserFilters(e.value);
						},
					}}
				/>
				<ButtonItem
					colSpan={1}
					buttonOptions={{
						text: translate('ADD'),
						type: 'normal',
						stylingMode: 'contained',
						useSubmitBehavior: false,
						disabled: ownerUserFilters === filtersSplit[1].value,
						icon: 'add',
						onClick: () => {
							openModal(ModalsTypes.ADD_NEW_SETTINGS_MODAL, {
								width: 700,
								closeOnOutsideClick: false,
								saveSetting: addSetting,
								dataGridRefSettings: dataGridRef,
								setDataSource: setProxiedSettings,
								builderKey,
								modalTitle: title,
								createNewSetting,
								getTheBiggestObjectId,
								repaintDropDown,
								tableInstance,
								isNameExists,
								getNextSettingName
							});
						},
					}}
				/>
			</Form>
			<DataGrid
				className={'settings-list'}
				ref={dataGridRef}
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				dataSource={dataSource}
				showRowLines={true}
				allowColumnResizing={true}
				onSelectionChanged={(data) => {
					setSelectedSettingRow(data.selectedRowsData[0]);
				}}
				onRowRemoved={({ data }) => {
					deleteSetting(data);
					repaintDropDown(settingElements);
					if (checkSelectedSetting(data.settingId)) {
						unfilter();
					}
				}}
				onRowInserted={() => repaintDropDown()}
			>
				<Editing
					allowUpdating={ownerUserFilters}
					allowAdding={false}
					allowDeleting={ownerUserFilters}
					mode="cell"
					refreshMode={'repaint'}
					startEditAction={'dblClick'}
				/>
				<Selection mode="single" showCheckBoxesMode={'none'} />
				<Paging defaultPageSize={10} />
				<Pager
					visible={true}
					displayMode={true}
					showInfo={true}
					showNavigationButtons={true}
				/>
				<Column
					allowEditing={ownerUserFilters}
					dataField={'settingName'}
					dataType={'string'}
					caption={translate('NAME')}
				>
					<RequiredRule />
				</Column>
				<Column
					allowEditing={ownerUserFilters}
					dataField={'isPublic'}
					dataType={'boolean'}
					caption={translate('PUBLIC')}
				></Column>
				<Column
					allowEditing={ownerUserFilters}
					dataField={'isShared'}
					dataType={'boolean'}
					caption={translate('SHARED')}
				></Column>
				<Column
					allowEditing={false}
					dataField={'description'}
					dataType={'string'}
					caption={translate('DESCRIPTION')}
				></Column>
				<Column
					dataField={'setting'}
					allowEditing={false}
					cellRender={(data) => {
						return (
							<div
								className={'foreign-key-btn'}
								onClick={() => {
									if (ownerUserFilters) {
										openModal(ModalsTypes.EDIT_SETTING_MODAL, {
											width: 700,
											closeOnOutsideClick: false,
											builderKey,
											modalTitle: data.data.settingName,
											tableInstance,
											...data,
										});
									}
								}}
							>
								<span>{translate('EDIT_FILTER')}</span>
							</div>
						);
					}}
				></Column>
			</DataGrid>
			<Form colCount={2}>
				<ButtonItem
					colSpan={1}
					cssClass={'help-button'}
					buttonOptions={{
						icon: HelpIcon,
						useSubmitBehavior: false,
						onClick: () => window.open(helpLink, '_blank'),
						stylingMode: 'text'
					}}
				/>
				<ButtonItem
					colSpan={1}
					cssClass={'dx-button-success'}
					buttonOptions={{
						text: translate('APPLY'),
						useSubmitBehavior: false,
						stylingMode: 'contained',
						type: 'normal',
						disabled: !selectedSettingRow,
						onClick: () => {
							closeModal();
							setSelectedSetting(selectedSettingRow);
							applySetting(selectedSettingRow);
						},
					}}
				/>
			</Form>
		</div>
	);
};

export default UserParamsSettingsModal;
