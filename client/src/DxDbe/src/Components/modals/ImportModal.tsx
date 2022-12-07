/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import React, {useCallback, useEffect, useMemo, useState} from 'react';
import Form, {ButtonItem, GroupItem, SimpleItem} from 'devextreme-react/form';
import translate from '../../i18n/localization';
import RadioGroup from 'devextreme-react/radio-group';
import FileUploader from 'devextreme-react/file-uploader';

import {fieldSeparator, floatingPointSeparator, nullValueEscape, thousandSeparator,} from '../../constants/separators.item';
import communicator from '../../api/Communicator';
import ImportExportResultHelpers from '../../helpers/ImportExportResultUtils';
import {LoadPanel} from 'devextreme-react/load-panel';
import {useDbeActionsHelpLink} from "../../hooks/useHelpLink";
import {DbeActions} from "../../models/Enums/HelpLinks";
import {HelpIcon} from "../../assets/icons";

const ImportModal = ({ closeModal, props: { getDbeDxGridInstance, tableInstance } }) => {
	const tableName = useMemo(() => tableInstance.getTableName(), []);
	const [isLoading, setLoading] = useState<boolean>(false);
	const [dateFormatTooltipVisibility, setDateFormatTooltipVisibility] = useState<boolean>(false);
	const [importParams, setImportParams] = useState({
		fieldSeparator: fieldSeparator[0],
		floatingPointSeparator: floatingPointSeparator[0],
		nullValueEscape: nullValueEscape[0],
		thousandSeparator: thousandSeparator[0],
		importDataFile: null,
		customDateFormat: 'yyyy-MM-dd HH:mm:ss',
		useCustomDateFormat: false,
		exportIdsCheckBox: false,
		updateIfExistCheckBox: false,
		oldImportTypeCheckBox: false,
	});

	useEffect(() => {
		communicator.retrieveUserSettings('csvImport', tableName).then((importSettings) => {
			const storedParams = {
				fieldSeparator: fieldSeparator.find((item) => item.value === importSettings.fieldSeparator),
				floatingPointSeparator: floatingPointSeparator.find(
					(item) => item.value === importSettings.floatingPointSeparator,
				),
				nullValueEscape: nullValueEscape.find((item) => item.value === importSettings.nullValueEscape),
				thousandSeparator: thousandSeparator.find((item) => item.value === importSettings.thousandSeparator),
			};
			setImportParams((prevParams) => ({ ...prevParams, ...storedParams }));
		});
	}, []);

	useEffect(() => {
		const newParams = {
			fieldSeparator: importParams.fieldSeparator?.value,
			thousandSeparator: importParams.thousandSeparator?.value,
			floatingPointSeparator: importParams.floatingPointSeparator?.value,
			nullValueEscape: importParams.nullValueEscape?.value,
		};
		communicator.storeUserSettings('csvImport', JSON.stringify(newParams), tableName);
	}, [importParams]);

	const submitHandler = useCallback(() => {
		setLoading(true);
		const csvImportSettings = {
			fieldSeparator: importParams.fieldSeparator?.value,
			thousandSeparator: importParams.thousandSeparator?.value,
			floatingPointSeparator: importParams.floatingPointSeparator?.value,
			nullValueEscape: importParams.nullValueEscape?.value,
		};
		const parameters = {
			csvImportSettings,
			referencesAsIds: importParams.exportIdsCheckBox,
			updateIfExist: importParams.updateIfExistCheckBox,
			oldImportType: importParams.oldImportTypeCheckBox,
			dateFormatPattern: importParams.customDateFormat,
		};

		const formData = new FormData();
		formData.append('parameters', JSON.stringify(parameters));
		formData.append('uploadFile', importParams.importDataFile[0]);

		communicator
			.importTableData(formData, tableName)
			.then(ImportExportResultHelpers.parseImportResult)
			.finally(async () => {
				setLoading(false);
				await getDbeDxGridInstance().refresh(false);
				closeModal();
			});
	}, [importParams]);

	const setImportParameters = useCallback((paramName, value) => {
		setImportParams((prevParams) => ({ ...prevParams, [paramName]: value }));
	}, []);

	const helpLink = useDbeActionsHelpLink(tableInstance.warehouseUiType, DbeActions.IMPORT);

	return (
		<>
			<LoadPanel
				position={{ my: 'center', at: 'center', of: '.dx-popup-normal' }}
				visible={isLoading}
				indicatorSrc={'../../assets/images/progress-bar.gif'}
				showIndicator={true}
				shading={true}
				showPane={true}
			/>
			{ImportExportResultHelpers.getDataFormatsTooltip('.dateFormat', dateFormatTooltipVisibility)}
			<Form colCount={1} id="form">
				<SimpleItem template={translate('_USE_UTF_8_ENCODING')} />
				<GroupItem colCount={4}>
					<GroupItem caption={translate('FIELD_SEPARATOR')}>
						<RadioGroup
							items={fieldSeparator}
							defaultValue={importParams.fieldSeparator}
							value={importParams.fieldSeparator}
							layout="vertical"
							onValueChanged={({ value }) => setImportParameters('fieldSeparator', value)}
						/>
					</GroupItem>
					<GroupItem caption={translate('THOUSANDS_SEPARATOR')}>
						<RadioGroup
							items={thousandSeparator}
							defaultValue={importParams.thousandSeparator}
							value={importParams.thousandSeparator}
							layout="vertical"
							onValueChanged={({ value }) => setImportParameters('thousandSeparator', value)}
						/>
					</GroupItem>
					<GroupItem caption={translate('FLOATING_POINT_SEPARATOR')}>
						<RadioGroup
							items={floatingPointSeparator}
							defaultValue={importParams.floatingPointSeparator}
							value={importParams.floatingPointSeparator}
							layout="vertical"
							onValueChanged={({ value }) => setImportParameters('floatingPointSeparator', value)}
						/>
					</GroupItem>
					<GroupItem caption={translate('_NULL_VALUE_ESCAPE')}>
						<RadioGroup
							items={nullValueEscape}
							defaultValue={importParams.nullValueEscape}
							value={importParams.nullValueEscape}
							layout="vertical"
							onValueChanged={({ value }) => setImportParameters('nullValueEscape', value)}
						/>
					</GroupItem>
				</GroupItem>
				<GroupItem>
					<FileUploader
						selectButtonText="Select file"
						labelText="or Drop file here"
						accept="text/csv"
						uploadMode="useForm"
						onValueChanged={({ value }) => setImportParameters('importDataFile', value)}
					/>
				</GroupItem>
				<GroupItem colCount={4}>
					<SimpleItem
						editorType={'dxCheckBox'}
						editorOptions={{
							text: translate('_CUSTOM_DATE_FORMAT'),
							defaultValue: importParams.useCustomDateFormat,
							value: importParams.useCustomDateFormat,
							onValueChanged: ({ value }) => setImportParameters('useCustomDateFormat', value),
						}}
					/>
					<SimpleItem
						editorType={'dxTextBox'}
						cssClass={'dateFormat'}
						editorOptions={{
							defaultValue: importParams.customDateFormat,
							value: importParams.customDateFormat,
							readOnly: !importParams.useCustomDateFormat,
							disabled: !importParams.useCustomDateFormat,
							onFocusIn: () => setDateFormatTooltipVisibility(true),
							onFocusOut: () => setDateFormatTooltipVisibility(false),
						}}
					/>
				</GroupItem>
				<GroupItem colCount={3}>
					<SimpleItem
						editorType={'dxCheckBox'}
						editorOptions={{
							text: translate('REFERENCES_ARE_REPRESENTED_AS_IDS'),
							defaultValue: importParams.exportIdsCheckBox,
							value: importParams.exportIdsCheckBox,
							onValueChanged: ({ value }) => setImportParameters('exportIdsCheckBox', value),
						}}
					/>
					<SimpleItem
						editorType={'dxCheckBox'}
						editorOptions={{
							text: translate('UPDATE_IF_EXIST'),
							defaultValue: importParams.updateIfExistCheckBox,
							value: importParams.updateIfExistCheckBox,
							onValueChanged: ({ value }) => setImportParameters('updateIfExistCheckBox', value),
						}}
					/>
					<SimpleItem
						editorType={'dxCheckBox'}
						editorOptions={{
							text: translate('USE_IMPORT_DATA_TEMPLATE'),
							defaultValue: importParams.oldImportTypeCheckBox,
							value: importParams.oldImportTypeCheckBox,
							onValueChanged: ({ value }) => setImportParameters('oldImportTypeCheckBox', value),
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
							text: translate('UPLOAD'),
							useSubmitBehavior: true,
							onClick: submitHandler,
							disabled: !importParams.importDataFile,
						}}
					/>
				</GroupItem>
			</Form>
		</>
	);
};

export default ImportModal;
