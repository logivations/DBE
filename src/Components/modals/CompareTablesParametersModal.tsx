/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import React, { useEffect, useMemo, useRef, useState } from 'react';
import Form, { ButtonItem, GroupItem, SimpleItem } from 'devextreme-react/form';
import RadioGroup from 'devextreme-react/radio-group';
import translate from '../../i18n/localization';
import ICompareDataButton from '../../services/CompareTableManager/ICompareDataButton';
import DxCompareTypeGroup from '../../models/Enums/DxCompareTypeGroup';
import { useFilters, useHiddenColumns } from '../../hooks';
import CompareTableDto from '../../services/CompareTableManager/CompareTableDto';
import Communicator from '../../api/Communicator';
import useParentTablePopupContext from '../../context/ParentTablePopupContext';
import { excludedColumns, resultSettings } from '../../constants/CompareTableConstants';
import { ColumnModel } from '../../models/Classes';
import { useDbeActionsHelpLink } from '../../hooks/useHelpLink';
import { DbeActions } from '../../models/Enums/HelpLinks';
import { HelpIcon } from '../../assets/icons';
import InputType from '../../models/Enums/InputType';
import { NO_FILTER } from '../../constants/FiltersConstants';

const CompareTablesParametersModal = ({
	props: { tableInstance, handleCompareTable, dbeDxGridInstance },
	closeModal,
}) => {
	const formRef = useRef<Form>();
	const { setCompareTableData } = useParentTablePopupContext();
	const [campaigns, setCampaigns] = useState<{ [key: string]: any }>([]);
	const primaryKeys = useMemo<string[]>(() => tableInstance.getTableDataModel().getPrimaryKeys(), []);
	const compareTableDto = useMemo<CompareTableDto>(() => CompareTableDto.getCompareTableDto(), []);
	const [compareType, setCompareType] = useState<ICompareDataButton>();
	const [compareButtons, setCompareButtons] = useState<ICompareDataButton[]>([]);

	useEffect(() => {
		tableInstance.tableDataModel.getCompareTableManager().then((compareManager) => {
			const compareButtons = compareManager.getVisibleCompareTableButtons();
			setCompareType(compareButtons[0]);
			setCompareButtons(compareButtons);
		});
	}, []);

	const columns = useMemo<ColumnModel[]>(() => {
		return tableInstance
			.getTableDataModel()
			.getMetadata()
			.getVisibleColumnsModel()
			.filter(({ columnName }) => !excludedColumns.includes(columnName));
	}, []);

	useEffect(() => {
		compareTableDto.setComparableColumnsModels(primaryKeys);
		Communicator.getAllCampaigns().then((data) => setCampaigns(data));
	}, []);

	const [groupedFilters] = useFilters(tableInstance);
	const [groupedHiddenColumns] = useHiddenColumns(tableInstance);
	const actionType = useMemo(() => DbeActions[compareType?.name], [compareType]);
	const helpLink = useDbeActionsHelpLink(tableInstance.warehouseUiType, actionType);
	return (
		<div className="compare-table-modal form-container">
			<Form colCount={2} ref={formRef}>
				<GroupItem caption={translate('SELECT_COMPARE_TYPE')}>
					<RadioGroup
						items={compareButtons}
						defaultValue={compareType}
						displayExpr={'localizedName'}
						onValueChange={(data: ICompareDataButton) => {
							setCompareType(data);
							compareTableDto.setCompareTablesType(data.getName(), primaryKeys);
						}}
					/>
				</GroupItem>
				<GroupItem caption={compareType?.getCaption()}>
					{compareType?.getComponent(tableInstance, campaigns)}
				</GroupItem>
				<GroupItem caption={translate('FILTER_SETTINGS')}>
					<SimpleItem
						label={{ text: translate('SELECT_FILTER') }}
						editorType={InputType.SelectBox}
						editorOptions={{
							dataSource: groupedFilters,
							grouped: true,
							displayExpr: 'settingName',
							value: NO_FILTER,
							onValueChanged: ({ value }) => {
								const filter = value.settingId !== NO_FILTER ? value.setting : null;
								compareTableDto.setCustomFilter(filter);
							},
						}}
					/>
					<SimpleItem
						label={{ text: translate('HIDDEN_COLUMNS') }}
						editorType={InputType.SelectBox}
						editorOptions={{
							dataSource: groupedHiddenColumns,
							grouped: true,
							displayExpr: 'settingName',
							value: NO_FILTER,
							onValueChanged: ({ value }) => {
								const hiddenColumns = value.settingId !== NO_FILTER ? value.setting : null;
								compareTableDto.setHiddenColumns(hiddenColumns);
							},
						}}
					/>
				</GroupItem>

				<GroupItem caption={translate('RESULT_SETTINGS')}>
					{resultSettings.map(({ text, id, key }) => {
						return (
							<SimpleItem
								dataField={key}
								label={{ text: text }}
								key={`${text}-${id}`}
								editorType={InputType.CheckBox}
								editorOptions={{
									value: compareTableDto[key],
									onValueChanged: (e) => compareTableDto.setValueByKey(key, e.value),
								}}
							/>
						);
					})}
				</GroupItem>

				{compareType?.name === DxCompareTypeGroup.COMPARE_DATA_FROM_OTHER_LAYOUT && (
					<GroupItem
						colSpan={2}
						colCount={4}
						itemType={'group'}
						caption={translate('COMPARE_COLUMN_SETTINGS')}
					>
						{columns.map((column, index) => {
							return (
								<SimpleItem
									key={`${column.columnName}-${index}`}
									editorType={InputType.CheckBox}
									editorOptions={{
										text: column.getCaption(),
										value: primaryKeys.includes(column.columnName),
										onValueChanged: () =>
											compareTableDto.addComparableColumnsModels(column.columnName),
									}}
								/>
							);
						})}
					</GroupItem>
				)}

				<GroupItem colSpan={2} colCount={2}>
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
							text: translate('COMPARE'),
							useSubmitBehavior: false,
							onClick: () => {
								if (
									compareTableDto.validate(primaryKeys) &&
									formRef?.current?.instance.validate().isValid
								) {
									handleCompareTable(
										compareTableDto,
										setCompareTableData,
										tableInstance.getTableName(),
									);
									closeModal();
									dbeDxGridInstance.beginCustomLoading(translate('_COMPARE_LOADING_TEXT'));
								}
							},
						}}
					/>
				</GroupItem>
			</Form>
		</div>
	);
};

export default CompareTablesParametersModal;
