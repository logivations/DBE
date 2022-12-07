/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import React, {useCallback, useEffect, useMemo, useState} from 'react';
import Form, {ButtonItem, GroupItem, SimpleItem} from 'devextreme-react/form';
import RadioGroup from 'devextreme-react/radio-group';
import translate from '../../i18n/localization';
import {fieldSeparator, floatingPointSeparator, nullValueEscape, recordSeparator,} from '../../constants/separators.item';
import communicator from '../../api/Communicator';
import downloadFile from '../../utils/fileDownload';
import {useDbeActionsHelpLink} from "../../hooks/useHelpLink";
import {DbeActions} from "../../models/Enums/HelpLinks";
import {HelpIcon} from "../../assets/icons";
import {ColumnModel, FilterGroup} from "../../models/Classes";
import NotificationController from "../../services/Notification/NotificationController";
import {Severity} from "../../models/Enums/Notification";
import {COLUMN_SIZE_LIMIT, PRIMARY_KEY_SIZE_LIMIT, ROW_QUANTITY_LIMIT} from "../../constants/ExportModalConstants";

const ExportModal = ({ closeModal, props: {tableInstance} }) => {
	const tableName = useMemo(() => tableInstance.getTableName(), []);

	const [exportParams, setExportParams] = useState({
		fieldSeparator: fieldSeparator[0],
		floatingPointSeparator: floatingPointSeparator[0],
		nullValueEscape: nullValueEscape[0],
		recordSeparator: recordSeparator[0],
		exportIdsCheckBox: false,
		notExportHiddenColumns: false,
		sortByPrimaryKey: true,
	});

	const setExportParameters = useCallback((paramName, value) => {
		setExportParams((prevParams) => ({ ...prevParams, [paramName]: value }));
	}, []);

	const submitHandler = useCallback(() => {
		const columnsForHiding = (() => {
			if (exportParams.notExportHiddenColumns) {
				const {hiddenColumns, exportedHiddenColumns} = tableInstance.getTableDataModel().columns.reduce((acc, columnModel: ColumnModel) => {
					if (!tableInstance.tableRelatedUserParameters.dxGridCommonSettings.getHiddenColumns().includes(columnModel.columnName))  {
						return acc;
					}
					const defaultValue = columnModel.columnViewModel.defaultValue;
					if (!columnModel.isRequired || (defaultValue !== undefined && defaultValue !== null)) {
						acc.hiddenColumns.push(columnModel.columnName);
					} else {
						acc.exportedHiddenColumns.push(columnModel.columnName);
					}
					return acc;
				}, {hiddenColumns: [], exportedHiddenColumns: []});
				if (hiddenColumns.length) {
					NotificationController.createNotification(
						translate("NOT_EXPORTED_COLUMNS_$", hiddenColumns.join(', ')),
						Severity.SUCCESS
					);
				}
				if (exportedHiddenColumns.length) {
					NotificationController.createNotification(
						translate("REQUIRED_COLUMNS_WERE_EXPORTED_$", exportedHiddenColumns.join(', ')),
						Severity.WARNING
					);
				}
				return hiddenColumns.join(', ');
			}
			return '';
		})();

		const rowsCount = tableInstance.getTableDataModel().getTotalRowCount();
		const columnCount = tableInstance.getTableDataModel().columns.length;
		const primaryColCount = tableInstance.getTableDataModel().getPrimaryKeys().length;
		if (rowsCount > ROW_QUANTITY_LIMIT && columnCount > COLUMN_SIZE_LIMIT && primaryColCount > PRIMARY_KEY_SIZE_LIMIT) {
			NotificationController.createNotification(
				translate("EXPORT_MAY_TAKE_LONG_TIME"),
				Severity.WARNING
			);
		}

		const csvExportSettings = {
			fieldSeparator: exportParams.fieldSeparator.value,
			recordSeparator: exportParams.recordSeparator.value,
			floatingPointSeparator: exportParams.floatingPointSeparator.value,
			nullValueEscape: exportParams.nullValueEscape.value,
		};
		const parameters = {
			csvExportSettings,
			referencesAsIds: exportParams.exportIdsCheckBox,
			sortByPrimaryKey: exportParams.sortByPrimaryKey,
			hiddenColumns: columnsForHiding
		};

		const formData = new FormData();
		formData.append('parameters', JSON.stringify(parameters));
		formData.append('filter', JSON.stringify(tableInstance.getTableDataModel().getAllAppliedFilters() || FilterGroup.create(null)));
		formData.append('childParentTableInfos', JSON.stringify([]));

		communicator
			.exportTableData(formData, tableName)
			.then(async (res) => {
				if (res) {
					downloadFile(await res.blob(), tableInstance.getExportedDataSuggestedName());
				}
			})
			.finally(() => closeModal());
	}, [exportParams]);

	useEffect(() => {
		communicator.retrieveUserSettings('csvExport', tableName).then((exportSettings) => {
			const storedParams = {
				fieldSeparator: fieldSeparator.find((item) => item.value === exportSettings.fieldSeparator),
				floatingPointSeparator: floatingPointSeparator.find(
					(item) => item.value === exportSettings.floatingPointSeparator,
				),
				nullValueEscape: nullValueEscape.find((item) => item.value === exportSettings.nullValueEscape),
				recordSeparator: recordSeparator.find((item) => item.value === exportSettings.recordSeparator),
			};
			setExportParams((prevParams) => ({ ...prevParams, ...storedParams }));
		});
	}, []);

	const helpLink = useDbeActionsHelpLink(tableInstance.warehouseUiType, DbeActions.EXPORT);

	useEffect(() => {
		const params = {
			fieldSeparator: exportParams.fieldSeparator.value,
			floatingPointSeparator: exportParams.floatingPointSeparator.value,
			nullValueEscape: exportParams.nullValueEscape.value,
			recordSeparator: exportParams.recordSeparator.value,
		};

		communicator.storeUserSettings('csvExport', JSON.stringify(params), tableName);
	}, [exportParams]);

	return (
		<div>
			<Form colCount={1} id="form">
				<SimpleItem template={translate('_USE_UTF_8_ENCODING')} />
				<GroupItem colCount={4}>
					<GroupItem caption={translate('FIELD_SEPARATOR')}>
						<RadioGroup
							items={fieldSeparator}
							defaultValue={exportParams.fieldSeparator}
							value={exportParams.fieldSeparator}
							layout="vertical"
							onValueChanged={({ value }) => setExportParameters('fieldSeparator', value)}
						/>
					</GroupItem>
					<GroupItem caption={translate('FLOATING_POINT_SEPARATOR')}>
						<RadioGroup
							items={floatingPointSeparator}
							defaultValue={exportParams.floatingPointSeparator}
							value={exportParams.floatingPointSeparator}
							layout="vertical"
							onValueChanged={({ value }) => setExportParameters('floatingPointSeparator', value)}
						/>
					</GroupItem>
					<GroupItem caption={translate('_NULL_VALUE_ESCAPE')}>
						<RadioGroup
							items={nullValueEscape}
							defaultValue={exportParams.nullValueEscape}
							value={exportParams.nullValueEscape}
							layout="vertical"
							onValueChanged={({ value }) => setExportParameters('nullValueEscape', value)}
						/>
					</GroupItem>
					<GroupItem caption={translate('RECORD_SEPARATOR')}>
						<RadioGroup
							items={recordSeparator}
							defaultValue={exportParams.recordSeparator}
							value={exportParams.recordSeparator}
							layout="vertical"
							onValueChanged={({ value }) => setExportParameters('recordSeparator', value)}
						/>
					</GroupItem>
				</GroupItem>
				<GroupItem colCount={3}>
					<SimpleItem
						editorType={'dxCheckBox'}
						editorOptions={{
							text: translate('REFERENCES_ARE_REPRESENTED_AS_IDS'),
							defaultValue: exportParams.exportIdsCheckBox,
							value: exportParams.exportIdsCheckBox,
							onValueChanged: ({ value }) => setExportParameters('exportIdsCheckBox', value),
						}}
					/>
					<SimpleItem
						editorType={'dxCheckBox'}
						editorOptions={{
							text: translate('DO_NOT_EXPORT_HIDDEN_COLUMNS'),
							defaultValue: exportParams.notExportHiddenColumns,
							value: exportParams.notExportHiddenColumns,
							onValueChanged: ({ value }) => setExportParameters('notExportHiddenColumns', value),
						}}
					/>
					<SimpleItem
						editorType={'dxCheckBox'}
						editorOptions={{
							text: translate('SORT_BY_PRIMARY_KEY'),
							defaultValue: exportParams.sortByPrimaryKey,
							value: exportParams.sortByPrimaryKey,
							onValueChanged: ({ value }) => setExportParameters('sortByPrimaryKey', value),
						}}
					/>
				</GroupItem>
				<GroupItem colCount={2}>
					 <ButtonItem
						 cssClass={'help-button'}
						 buttonOptions={{
							icon: HelpIcon,
							useSubmitBehavior: false,
							onClick: () => window.open(helpLink, '_blank'),
							stylingMode: 'text'
						}}
					 />

					<ButtonItem
						buttonOptions={{
							text: translate('DOWNLOAD'),
							useSubmitBehavior: false,
							onClick: submitHandler,
						}}
					/>
				</GroupItem>
			</Form>
		</div>
	);
};

export default ExportModal;
