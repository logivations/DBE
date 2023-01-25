/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import React, { Fragment, useCallback, useState } from 'react';
import { tabTitleConstants } from '../../constants/SettingsConstants';
import translate from '../../i18n/localization';
import { useFilters, useHiddenColumns, useSettings, useSorting } from '../../hooks';
import Form, { ButtonItem, GroupItem, SimpleItem } from 'devextreme-react/form';
import { parseBoolean } from '../../utils/utils';
import InputType from '../../models/Enums/InputType';
import { RangeRule } from 'devextreme-react/validator';
import communicator from '../../api/Communicator';
import { useDbeActionsHelpLink } from '../../hooks/useHelpLink';
import { DbeActions } from '../../models/Enums/HelpLinks';
import { HelpIcon } from '../../assets/icons';
import { NO_FILTER } from '../../constants/FiltersConstants';
import { confirm } from 'devextreme/ui/dialog';

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
		const parameters: { [key: string]: any } = [...formData.entries()].reduce((result, [paramName, value]) => {
			return { ...result, [paramName]: parseBoolean(value) };
		}, {});

		const parsedParams = {
			...parameters,
			defaultFilter: tableInstance.getFilters().find((filter) => filter.settingId === parameters.defaultFilter),
			defaultHiddenColumnFilter: tableInstance
				.getHiddenColumns()
				.find((filter) => filter.settingId === parameters.defaultHiddenColumnFilter),
			defaultSortOrder: tableInstance
				.getSortOrderSettings()
				.find((filter) => filter.settingId === parameters.defaultSortOrder),
		};
		tableInstance.tableRelatedUserParameters.saveSettings(parsedParams);
		applyFilter(parsedParams);

		await communicator.updateDxDbeTableSettings(tableInstance.table.getTableId(), parsedParams);
		closeModal();
	}, []);

	const helpLink = useDbeActionsHelpLink(tableInstance.warehouseUiType, DbeActions.SETTINGS);

	const resetSettingsToDefault = useCallback(() => {
		confirm(translate('Are you sure you want to reset all table settings?'), 'W2MO').then((isConfirmed) => {
			isConfirmed &&
				tableInstance
					.getDxGridCommonSettings()
					.resetSettingsToDefault()
					.then(() => {
						confirm(
							translate('For applying changes you need to reload the page. <br> Reload page now?'),
							'W2MO',
						).then((reload) => {
							reload && window.location.reload();
						});
					});
		});
	}, []);

	return (
		<Fragment>
			<form action="src/Components/modals/index" onSubmit={handleSubmit} id={'tableSettingsForm'}>
				<Form>
					<SimpleItem
						dataField={'tabTitle'}
						editorType={InputType.SelectBox}
						label={{
							text: translate('TAB_TITLE'),
						}}
						editorOptions={{
							items: tabTitleConstants,
							displayExpr: 'name',
							valueExpr: 'id',
							value: tableInstance.tabTitle,
						}}
					/>
					<SimpleItem
						dataField={'defaultFilter'}
						editorType={InputType.SelectBox}
						label={{
							text: translate('DEFAULT_FILTER'),
						}}
						editorOptions={{
							dataSource: groupedFilters,
							grouped: true,
							displayExpr: 'settingName',
							valueExpr: 'settingId',
							value: tableInstance.defaultFilter ? tableInstance.defaultFilter.settingId : NO_FILTER,
						}}
					/>
					<SimpleItem
						dataField={'defaultHiddenColumnFilter'}
						editorType={InputType.SelectBox}
						label={{
							text: translate('DEFAULT_HIDDEN_COLUMNS'),
						}}
						editorOptions={{
							dataSource: groupedHiddenColumns,
							grouped: true,
							displayExpr: 'settingName',
							valueExpr: 'settingId',
							value: tableInstance.defaultHiddenColumn
								? tableInstance.defaultHiddenColumn.settingId
								: NO_FILTER,
						}}
					/>
					<SimpleItem
						dataField={'defaultSortOrder'}
						editorType={InputType.SelectBox}
						label={{
							text: translate('DEFAULT_SORTING'),
						}}
						editorOptions={{
							dataSource: groupedSorting,
							grouped: true,
							displayExpr: 'settingName',
							valueExpr: 'settingId',
							value: tableInstance.defaultSortOrder
								? tableInstance.defaultSortOrder.settingId
								: NO_FILTER,
						}}
					/>
					<SimpleItem
						dataField={'pageSize'}
						editorType={InputType.NumberBox}
						label={{
							text: translate('DEFAULT_PAGE_SIZE'),
						}}
						editorOptions={{
							value: tableInstance.pageSize,
						}}
					>
						<RangeRule
							max={tableInstance.table.getMaxPageSize()}
							min={1}
							message={translate(
								translate(
									'VALUE_SHOULD_BE_NUMERIC_AND_NOT_BIGGER_THAN_$',
									tableInstance.table.getMaxPageSize(),
								),
							)}
						/>
					</SimpleItem>

					<SimpleItem
						dataField={'isAutoRefresh'}
						editorType={InputType.CheckBox}
						label={{
							text: translate('AUTO_REFRESH'),
						}}
						editorOptions={{
							value: isAutoRefresh,
							onValueChanged: (e) => {
								setIsAutoRefresh(e.value);
							},
						}}
					/>
					{isAutoRefresh && (
						<SimpleItem
							dataField={'intervalInSeconds'}
							editorType={InputType.NumberBox}
							label={{
								text: translate('INTERVAL_IN_SECONDS'),
							}}
							editorOptions={{
								value: tableInstance.intervalInSeconds,
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
						label={{
							text: translate('LAST_SELECTION_MODE'),
						}}
						editorOptions={{
							value: tableInstance.lastSelectionMode,
						}}
					/>
					<ButtonItem
						colSpan={2}
						horizontalAlignment={'right'}
						buttonOptions={{
							type: 'success',
							text: translate('RESET_TABLE_DYNAMICAL_SETTINGS_TO_DEFAULT'),
							useSubmitBehavior: false,
							onClick: () => resetSettingsToDefault(),
							stylingMode: 'outlined',
						}}
					/>
					<GroupItem colCount={2}>
						<ButtonItem
							colSpan={1}
							cssClass={'help-button'}
							horizontalAlignment={'left'}
							buttonOptions={{
								icon: HelpIcon,
								useSubmitBehavior: false,
								onClick: () => window.open(helpLink, '_blank'),
								stylingMode: 'text',
							}}
						/>
						<ButtonItem
							verticalAlignment={'center'}
							colSpan={1}
							horizontalAlignment={'right'}
							buttonOptions={{
								type: 'success',
								text: translate('APPLY'),
								useSubmitBehavior: true,
							}}
						/>
					</GroupItem>
				</Form>
			</form>
		</Fragment>
	);
};

export default SettingModal;
