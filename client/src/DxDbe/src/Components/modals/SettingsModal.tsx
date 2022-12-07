/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import React, {Fragment, useCallback, useMemo, useState} from 'react';
import {tabTitleConstants} from '../../constants/SettingsConstants';
import translate from '../../i18n/localization';
import {useFilters, useHiddenColumns, useSettings, useSorting} from '../../hooks';
import Form, {ButtonItem, GroupItem, SimpleItem} from "devextreme-react/form";
import {parseBoolean} from "../../utils/utils";
import InputType from "../../models/Enums/InputType";
import {RangeRule} from "devextreme-react/validator";
import communicator from "../../api/Communicator";
import {useDbeActionsHelpLink} from "../../hooks/useHelpLink";
import {DbeActions} from "../../models/Enums/HelpLinks";
import {HelpIcon} from "../../assets/icons";
import {NO_FILTER} from "../../constants/FiltersConstants";

const SettingModal = ({ closeModal, props: { dbeDxGridInstance, tableInstance } }) => {
	const [groupedFilters] = useFilters(tableInstance);
	const [groupedSorting] = useSorting(tableInstance);
	const [groupedHiddenColumns] = useHiddenColumns(tableInstance);

	const [isAutoRefresh, setIsAutoRefresh] = useState(() => tableInstance.isAutoRefresh);

	const applyFilter = useSettings(dbeDxGridInstance, tableInstance);

	const handleSubmit = useCallback(async (e) => {
		e.preventDefault();
		const form = document.forms.namedItem('tableSettingsForm');
		const formData = new FormData(form);
		const parameters: {[key: string]: any}= [...formData.entries()].reduce((result, [paramName, value]) => {
			return { ...result, [paramName]: parseBoolean(value) };
		}, {});

		console.log(parameters)
		const parsedParams = {
			...parameters,
			defaultFilter: tableInstance.getFilters().find((filter) => filter.settingId  === parameters.defaultFilter),
			defaultHiddenColumnFilter: tableInstance.getHiddenColumns().find((filter) => filter.settingId  === parameters.defaultHiddenColumnFilter),
			defaultSortOrder: tableInstance.getSortOrderSettings().find((filter) => filter.settingId  === parameters.defaultSortOrder)
		};

		applyFilter(parsedParams);
		tableInstance.tableRelatedUserParameters.saveSettings(parsedParams);
		await communicator.updateDxDbeTableSettings(
			tableInstance.table.getTableId(),
			parsedParams,
		);
		closeModal();
	}, []);

	const helpLink = useDbeActionsHelpLink(tableInstance.warehouseUiType, DbeActions.SETTINGS);

	return (
		<Fragment>
			<form action="src/DxDbe/src/Components/modals/SettingsModal" onSubmit={handleSubmit} id={"tableSettingsForm"}>
				<Form>
					<SimpleItem
						dataField={'tabTitle'}
						editorType={InputType.SelectBox}
						editorOptions={{
							label: translate('TAB_TITLE'),
							items: tabTitleConstants,
							displayExpr: "name",
							valueExpr: "id",
							value: tableInstance.tabTitle
						}}
					/>
					<SimpleItem
						dataField={'defaultFilter'}
						editorType={InputType.SelectBox}
						editorOptions={{
							label: translate('DEFAULT_FILTER'),
							dataSource: groupedFilters,
							grouped: true,
							displayExpr: 'settingName',
							valueExpr: 'settingId',
							value: tableInstance.defaultFilter ? tableInstance.defaultFilter.settingId : NO_FILTER
						}}
					/>
					<SimpleItem
						dataField={'defaultHiddenColumnFilter'}
						editorType={InputType.SelectBox}
						editorOptions={{
							label: translate('DEFAULT_HIDDEN_COLUMNS'),
							dataSource: groupedHiddenColumns,
							grouped: true,
							displayExpr: 'settingName',
							valueExpr: 'settingId',
							value: tableInstance.defaultHiddenColumn ? tableInstance.defaultHiddenColumn.settingId : NO_FILTER
						}}
					/>
					<SimpleItem
						dataField={'defaultSortOrder'}
						editorType={InputType.SelectBox}
						editorOptions={{
							label: translate('DEFAULT_SORTING'),
							dataSource: groupedSorting,
							grouped: true,
							displayExpr: 'settingName',
							valueExpr: 'settingId',
							value: tableInstance.defaultSortOrder ? tableInstance.defaultSortOrder.settingId : NO_FILTER
						}}
					/>
					<SimpleItem
						dataField={'pageSize'}
						editorType={InputType.NumberBox}
						editorOptions={{
							label: translate('DEFAULT_PAGE_SIZE'),
							value: tableInstance.pageSize
						}}
					>
						<RangeRule
							max={5000}
							min={1}
							message={translate(translate('VALUE_SHOULD_BE_NUMERIC_AND_NOT_BIGGER_THAN_$', 5000))}
						/>
					</SimpleItem>

					<SimpleItem
						dataField={'isAutoRefresh'}
						editorType={InputType.CheckBox}
						editorOptions={{
							label: translate('AUTO_REFRESH'),
							value: isAutoRefresh,
							onValueChanged: (e) => {
								setIsAutoRefresh(e.value);
							}
						}}
					/>
					{isAutoRefresh && (
						<SimpleItem
							dataField={'intervalInSeconds'}
							editorType={InputType.NumberBox}
							editorOptions={{
								label: translate('INTERVAL_IN_SECONDS'),
								value: tableInstance.intervalInSeconds
							}}
						>
							<RangeRule
								max={tableInstance.table.getMaxPageSize()}
								min={10}
								message={translate(translate('VALUE_SHOULD_BE_NUMERIC_AND_IN_RANGE_$_$', 10, 5000))}
							/>
						</SimpleItem>
					)}

					<SimpleItem
						dataField={'lastSelectionMode'}
						editorType={InputType.CheckBox}
						editorOptions={{
							label: translate('LAST_SELECTION_MODE'),
							value: tableInstance.lastSelectionMode
						}}
					/>
					<GroupItem colCount={2}>
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
							cssClass={'dx-button-success'}
							verticalAlignment={'center'}
							colSpan={1}
							buttonOptions={{
								text: translate('APPLY'),
								useSubmitBehavior: true
							}}
						/>
					</GroupItem>
				</Form>
			</form>
		</Fragment>
	);
};

export default SettingModal;
