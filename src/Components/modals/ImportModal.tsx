/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Form, { ButtonItem, GroupItem, SimpleItem } from 'devextreme-react/form';
import translate from '../../i18n/localization';
import RadioGroup from 'devextreme-react/radio-group';
import FileUploader from 'devextreme-react/file-uploader';

import {
	fieldSeparator,
	floatingPointSeparator,
	nullValueEscape,
	thousandSeparator,
} from '../../constants/separators.item';
import communicator from '../../api/Communicator';
import ImportExportResultHelpers from '../../helpers/ImportExportResultUtils';
import { useDbeActionsHelpLink } from '../../hooks/useHelpLink';
import { DbeActions } from '../../models/Enums/HelpLinks';
import { HelpIcon } from '../../assets/icons';
import { Severity } from '../../models/Enums/Notification';
import NotificationController from '../../services/Notification/NotificationController';
import debounce from 'lodash/debounce';
import { custom } from 'devextreme/ui/dialog';

const notifySeparatorWrong = debounce(() => {
	const notificationController = new NotificationController();
	notificationController.createNotification({
		message: translate('SEPARATORS_CAN_NOT_BE_THE_SAME'),
		type: Severity.WARNING,
	});
}, 300);

const showLoadingBox = (cancelImportTable = null) => {
	const buttons = cancelImportTable
		? [
				{
					text: translate('CLOSE'),
					onClick: (e) => {
						cancelImportTable && cancelImportTable(e);
					},
				},
		  ]
		: [];
	return custom({
		messageHtml: `<img src="" alt="progress bar"/>`,
		showTitle: false,
		buttons: buttons,
	});
};

const ImportModal = ({ closeModal, props: { getDbeDxGridInstance, tableInstance } }) => {
	const tableName = useMemo(() => tableInstance.getTableName(), []);
	const [dateFormatTooltipVisibility, setDateFormatTooltipVisibility] = useState<boolean>(false);
	const [importParams, setImportParams] = useState(() => ({
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
	}));

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

	const isSeparatorsWrong = useMemo(() => {
		const allSeparators = [
			importParams.fieldSeparator.value,
			importParams.floatingPointSeparator.value,
			importParams.thousandSeparator.value,
		];
		const uniqSeparators = new Set(allSeparators);
		return uniqSeparators.size !== allSeparators.length;
	}, [importParams]);

	useEffect(() => {
		const newParams = {
			fieldSeparator: importParams.fieldSeparator?.value,
			thousandSeparator: importParams.thousandSeparator?.value,
			floatingPointSeparator: importParams.floatingPointSeparator?.value,
			nullValueEscape: importParams.nullValueEscape?.value,
		};

		communicator.storeUserSettings('csvImport', JSON.stringify(newParams), tableName);
	}, [importParams, isSeparatorsWrong]);

	const submitHandler = useCallback(async () => {
		closeModal();
		getDbeDxGridInstance().beginCustomLoading(translate('DATA_IMPORTING') + '...');

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
		const longTermId = await communicator.importTableData(formData, tableName);
		getDbeDxGridInstance().endCustomLoading(translate('DATA_IMPORTING') + '...');
		const loadingBox = showLoadingBox(() => communicator.cancelLongTermAction(longTermId));
		loadingBox.show();
		communicator
			.startLongTerm(longTermId)
			.then(ImportExportResultHelpers.parseImportResult)
			.finally(async () => {
				loadingBox.hide();
				await getDbeDxGridInstance().refresh(false);
			});
	}, [importParams]);

	const setImportParameters = useCallback(
		(paramName, value) => {
			if (!importParams[paramName]?.isEqual(value)) {
				setImportParams((prevParams) => {
					const result = { ...prevParams, [paramName]: value };
					isSeparatorsWrong && notifySeparatorWrong();
					return result;
				});
			}
		},
		[importParams, isSeparatorsWrong],
	);

	const helpLink = useDbeActionsHelpLink(tableInstance.warehouseUiType, DbeActions.IMPORT);

	return (
		<div id={'import-modal-wrapper'}>
			{ImportExportResultHelpers.getDataFormatsTooltip('.dateFormat', dateFormatTooltipVisibility)}
			<Form colCount={1} id="import-data-form">
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
				<GroupItem colCount={1}>
					<div style={{ display: importParams.useCustomDateFormat ? 'block' : 'none' }}>
						<div className={'custom-date-notifier'}>{translate('_CUSTOM_DATE_FORMAT_HINT')}</div>
					</div>
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
							stylingMode: 'text',
						}}
					/>
					<ButtonItem
						buttonOptions={{
							type: 'success',
							text: translate('UPLOAD'),
							useSubmitBehavior: false,
							onClick: submitHandler,
							disabled: !importParams.importDataFile || isSeparatorsWrong,
						}}
					/>
				</GroupItem>
			</Form>
		</div>
	);
};

export default ImportModal;
