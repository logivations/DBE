/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import ModalsTypes from '../../constants/ModalsTypes';
import translate from '../../i18n/localization';
import {FilterActions, HiddenColumnActions, SortingActions} from '../../constants/FiltersConstants';
import {TypeOfUserParamSettings} from '../../constants/userParamsSettingsConstants';
import {ChartDescription, SortSetting, TableReference} from '../../models/Classes';
import communicator from '../../api/Communicator';
import isEmpty from 'lodash/isEmpty';
import TableInstance from '../TableInstanceManager/TableInstance';
import TFunction from '../../models/Types/Types';
import Validators from '../../models/Enums/Validators';
import TableInstanceManager from '../TableInstanceManager/TableInstanceManager';
import MassUpdateOperationType, {MassUpdateValueStrategy} from '../../models/Enums/MassUpdateOperationType';
import MassUpdateRange from '../../models/Enums/MassUpdateRange';
import CompareTableDto from '../CompareTableManager/CompareTableDto';
import NotificationController from "../Notification/NotificationController";
import {Severity} from "../../models/Enums/Notification";
import {WarehouseTypeForHelp, WarehouseUiType} from "../../models/Enums/Table";
import {generateQueryParams} from "../../utils/urlUtils";
import {confirm} from "devextreme/ui/dialog";
import {DbeActions} from "../../models/Enums/HelpLinks";

class ToolbarPanelButtonEvents {
	public dbeDxGridRef: any;
	public actions: { [key: string]: TFunction } = {};
	public tableInstance: TableInstance;
	private readonly warehouseId: number;
	public tableInstanceManager: TableInstanceManager;
	public notificationController: NotificationController;

	constructor(dbeDxGridRef: any, actions: any, tableInstance: TableInstance) {
		this.warehouseId = tableInstance.warehouseId;
		this.dbeDxGridRef = dbeDxGridRef;
		this.actions = actions;
		this.tableInstance = tableInstance;
		this.tableInstanceManager = new TableInstanceManager();
		this.notificationController = new NotificationController();
		this.getDbeDxGridInstance = this.getDbeDxGridInstance.bind(this);
	}

	public getDbeDxGridInstance() {
		return this.dbeDxGridRef.current && this.dbeDxGridRef.current.instance;
	}

	public exportButtonClickHandler() {
		const { openModal } = this.actions;
		return () => {
			openModal(ModalsTypes.EXPORT_MODAL, {
				width: 1000,
				modalTitle: translate('EXPORT_TO_CSV'),
				tableInstance: this.tableInstance
			});
		};
	}

	public addRowButtonClickHandler() {
		const { openModal } = this.actions;

		return () => {
			const dxGridInstance = this.getDbeDxGridInstance();

			const handleSubmitEvent = (parameters, successCallback?: () => void) => {
				const params = this.tableInstance.getTableDataModel().updateOptionsToActionParams(
					this.tableInstance
						.getTableDataModel()
						.getPrimaryKeys()
						.reduce((acc, key) => ({ ...acc, [key]: null }), {}),
					{},
					Object.assign(this.tableInstance.getTableDataModel().getRowDefaultValues(), parameters, {
						ID_wh: this.warehouseId,
					}),
				);
				communicator.addNewRows(this.tableInstance.getTableName(), [params]).then(() => {
					dxGridInstance.refresh(true);
					successCallback && successCallback();
				});
			};
			openModal(ModalsTypes.ADD_NEW_ROW_MODAL, {
				width: 1000,
				modalTitle: translate('ADD_NEW_ROW'),
				tableInstance: this.tableInstance,
				handleSubmitEvent,
			});
		};
	}

	public cloneRowButtonClickHandler() {
		const { openModal } = this.actions;

		return async () => {
			const dxGridInstance = this.getDbeDxGridInstance();
			const selectedRowsKeys = await dxGridInstance.getSelectedRowKeys();

			if (selectedRowsKeys.length === 0) {
				this.notificationController.createNotification(
					translate('PLEASE_SELECT_ROWS_FOR_CLONING'),
					Severity.WARNING,
					false,
					() => true,
					5000
				);
			} else {
				openModal(ModalsTypes.CLONE_SELECTED_ROWS_MODAL, {
					modalTitle: translate('CLONE_ROWS'),
					tableInstance: this.tableInstance,
					width: '88vw',
					asyncRender: true,
					selectedRows: await dxGridInstance.getSelectedRowsData(),
				});
			}
		};
	}

	public deleteRowsButtonClickHandler() {
		return async () => {
			const dxGridInstance = this.getDbeDxGridInstance();
			const selectedRowsKeys = await dxGridInstance.getSelectedRowKeys();
			const params = selectedRowsKeys.map((key) =>
				this.tableInstance.getTableDataModel().updateOptionsToActionParams(key),
			);
			await communicator
				.deleteTableRows(this.tableInstance.getTableName(), params)
				.then(({ recordsDeleted, message, parameter }) => {
					this.notificationController.createNotification(
						translate(message, parameter),
						recordsDeleted ? Severity.SUCCESS : Severity.ERROR,
					);
				});
			await dxGridInstance.refresh(true);
		};
	}

	public toggleSelectionButtonClickHandler(toggleSelectionButton) {
		return async (event) => {
			if (toggleSelectionButton.isDown) {
				await this.getDbeDxGridInstance().deselectAll();
				toggleSelectionButton.setTitle(translate('SELECT_ALL_ROWS'));
				event.itemElement.classList.remove('deselect-all-icon');
				event.itemElement.classList.add('select-all-icon');

			} else {
				await this.getDbeDxGridInstance().selectAll();
				toggleSelectionButton.setTitle(translate('UNSELECT_ALL_ROWS'));
				event.itemElement.classList.add('deselect-all-icon');
				event.itemElement.classList.remove('select-all-icon');
			}
			toggleSelectionButton.isDown = !toggleSelectionButton.isDown;
		};
	}

	public tableActionsClickHandler() {
		const { openModal } = this.actions;
		const getDbeDxGridInstance = this.getDbeDxGridInstance;
		const tableInstance = this.tableInstance;
		return async ({ itemData: actionDetail }) => {
			actionDetail.getTableActionParameters(tableInstance).then(async (tableActionParametersModel) => {
				const selectedRows = await getDbeDxGridInstance().getSelectedRowsData();

				const  executeTableAction = (inputParams?: object, successCallback?: () => void) => {
					actionDetail.checkBeforeExecuteAction(selectedRows, () => {
						const params = {
							primaryKeys: this.tableInstance.getTableDataModel().getPrimaryKeys(),
							inputParams: inputParams || {},
							selectedRows,
						};
						communicator.executeTableAction(actionDetail.actionId, params, this.tableInstance.getTableName()).then(async () => {
							await getDbeDxGridInstance().refresh(true);
							successCallback && successCallback();
						});
					});
				};
				if (!isEmpty(tableActionParametersModel)) {
					openModal(ModalsTypes.TABLE_ACTION_MODAL, {
						modalTitle: actionDetail.header,
						...actionDetail,
						selectedRows: selectedRows.length ? { ...selectedRows[0] } : {},
						executeTableAction,
						tableInstance,
						asyncRender: true,
					});
				} else {
					if (actionDetail.confirmationRequired) {
						const confirmed = confirm(translate('_CHECK_EXECUTION_ACTION'), 'W2MO');
						confirmed.then((isConfirmed) => {
							isConfirmed && executeTableAction();
						})
					} else {
						executeTableAction();
					}
				}
			});
		};
	}

	public importButtonClickHandler() {
		const { openModal } = this.actions;
		const getDbeDxGridInstance = this.getDbeDxGridInstance;
		const tableInstance = this.tableInstance;
		return () => {
			openModal(ModalsTypes.IMPORT_MODAL, {
				width: 1000,
				getDbeDxGridInstance,
				modalTitle: translate('IMPORT'),
				closeOnOutsideClick: false,
				tableInstance
			});
		};
	}

	public settingsButtonClickHandler() {
		const { openModal } = this.actions;
		const getDbeDxGridInstance = this.getDbeDxGridInstance;
		const tableInstance = this.tableInstance;
		return () => {
			openModal(ModalsTypes.SETTINGS_MODAL, {
				modalTitle: translate('SETTINGS'),
				dbeDxGridInstance: getDbeDxGridInstance(),
				tableInstance: tableInstance,
			});
		};
	}

	public reloadButtonClickHandler() {
		return async () => {
			try {
				await this.getDbeDxGridInstance().refresh(true);
			} catch (e) {
				console.log(e);
			}
		};
	}

	public compareButtonClickHandler() {
		const { openModal } = this.actions;
		const getDbeDxGridInstance = this.getDbeDxGridInstance;
		const compareTableDto = new CompareTableDto();
		const handleCompareTable = (compareTableDto, setCompareTableData, tableName) => {
			communicator
				.compareTables(compareTableDto, tableName)
				.then((res) => {
					getDbeDxGridInstance().endCustomLoading();
					const [table, isComparable] = res;
					if (!isComparable) {
						this.notificationController.createNotification(
							translate('TABLES_ARE_EQUAL'),
							Severity.INFO
						);
					} else {
						setCompareTableData({ tableName: table });
					}
				})
				.catch((error) => {
					this.notificationController.createNotification(
						error.errorMessage,
						Severity.ERROR
					);
				});
		};

		return async () => {
			compareTableDto.resetToDefaultParams();
			openModal(ModalsTypes.COMPARE_TABLES_PARAMETERS_MODAL, {
				modalTitle: translate('COMPARE_TABLE'),
				dbeDxGridInstance: getDbeDxGridInstance(),
				tableInstance: this.tableInstance,
				width: 800,
				handleCompareTable,
			});
		};
	}

	public filterSettingButtonItemClick(filtersActions) {
		const { openModal } = this.actions;
		const getDbeDxGridInstance = this.getDbeDxGridInstance;
		const tableInstance = this.tableInstance;

		return ({ itemData, component }) => {
			switch (itemData.key) {
				case FilterActions.ADD_EDIT_FILTER: {
					openModal(ModalsTypes.USER_PARAMS_SETTINGS_MODAL, {
						width: 750,
						tableInstance,
						type: TypeOfUserParamSettings.FILTER_SETTINGS,
						closeOnOutsideClick: false,
						helpKey: DbeActions.FILTERS,
						modalTitle: translate('FILTER'),
						dbeDxGridRef: getDbeDxGridInstance(),
						applySetting: async (filter) => {
							tableInstance.tableRelatedUserParameters.setSelectedFilter(filter);
							getDbeDxGridInstance().filter(filter);
							component.instance().option('selectedItemKey', filter.settingId);
							getDbeDxGridInstance().refresh(true);
						},
						repaintDropDown: () =>
							component.instance().option(
								'items',
								[...filtersActions, ...tableInstance.filters].map((filter) => ({ ...filter })),
							),
						unfilter: async () => {
							component.instance().option('selectedItemKey', null);
							tableInstance.tableRelatedUserParameters.setSelectedFilter(null);
							getDbeDxGridInstance().filter(null);
							getDbeDxGridInstance().refresh(true);
						},
					});
					const selectedFilter = getDbeDxGridInstance().filter();
					component.instance().option('selectedItemKey', selectedFilter ? selectedFilter.settingId : null);

					break;
				}
				case FilterActions.UNFILTER: {
					tableInstance.tableRelatedUserParameters.setSelectedFilter(null);
					getDbeDxGridInstance().filter(null);
					component.instance().option('selectedItemKey', null);
					break;
				}
				default: {
					tableInstance.tableRelatedUserParameters.setSelectedFilter(itemData);
					(async () => {
						if (itemData.setting) {
							getDbeDxGridInstance().filter(itemData);
							component.instance().option('selectedItemKey', itemData.settingId);
						}
					})();
				}
			}
		};
	}

	public tableSortButtonItemClick(sortSettingsActions) {
		const { openModal } = this.actions;
		const getDbeDxGridInstance = this.getDbeDxGridInstance;
		const tableInstance = this.tableInstance;

		return ({ itemData, component }) => {
			switch (itemData.key) {
				case SortingActions.ADD_EDIT_FILTER: {
					openModal(ModalsTypes.USER_PARAMS_SETTINGS_MODAL, {
						width: 750,
						type: TypeOfUserParamSettings.SORTING_SETTING,
						tableInstance,
						modalTitle: translate('TABLE_SORTING'),
						helpKey: DbeActions.TABLE_SORTING,
						dbeDxGridRef: getDbeDxGridInstance(),
						applySetting: (sortingSetting) => {
							tableInstance.tableRelatedUserParameters.setSelectedSortOrder(sortingSetting);
							SortSetting.applySortingSetting(sortingSetting, getDbeDxGridInstance());
							component.instance().option('selectedItemKey', sortingSetting.settingId);
						},
						repaintDropDown: () =>
							component.instance().option(
								'items',
								[...sortSettingsActions, ...tableInstance.sortOrderSettings].map((sortSetting) => ({
									...sortSetting,
								})),
							),
					});
					const selectedSortSetting = tableInstance.tableRelatedUserParameters.selectedSortOrder;
					component
						.instance()
						.option('selectedItemKey', selectedSortSetting ? selectedSortSetting.settingId : null);
					break;
				}
				case SortingActions.REMOVE_SORTING: {
					component.instance().option('selectedItemKey', null);
					tableInstance.tableRelatedUserParameters.setSelectedSortOrder(null);
					getDbeDxGridInstance().clearSorting();
					break;
				}
				default: {
					tableInstance.tableRelatedUserParameters.setSelectedSortOrder(itemData);
					SortSetting.applySortingSetting(itemData, getDbeDxGridInstance());
					component.instance().option('selectedItemKey', itemData.settingId);
				}
			}
		};
	}

	public hiddenColumnSettingSplitMenuButtonItemClick(hiddenColumnActions) {
		const { openModal } = this.actions;
		const getDbeDxGridInstance = this.getDbeDxGridInstance;
		const tableInstance = this.tableInstance;
		const showAllHiddenColumns = () => {
			getDbeDxGridInstance().option('customizeColumns', (columns) => {
				columns.forEach((column) => {
					column.visible = true;
				});
			});
		}
		return ({ itemData, component }) => {
			switch (itemData.key) {
				case HiddenColumnActions.ADD_EDIT_FILTER: {
					openModal(ModalsTypes.USER_PARAMS_SETTINGS_MODAL, {
						width: 750,
						type: TypeOfUserParamSettings.HIDDEN_COLUMNS_SETTING,
						tableInstance,
						closeOnOutsideClick: false,
						modalTitle: translate('HIDDEN_COLUMNS_FILTER'),
						helpKey: DbeActions.HIDDEN_COLUMN_FILTER,
						dbeDxGridRef: getDbeDxGridInstance(),
						applySetting: (filter) => {
							tableInstance.tableRelatedUserParameters.setSelectedHiddenColumnFilter(filter);
							getDbeDxGridInstance().option('customizeColumns', (columns) => {
								columns.forEach((column) => {
									column.visible = !filter.setting.includes(column.dataField);
								});
							});
							component.instance().option('selectedItemKey', filter.settingId);
						},
						repaintDropDown: () => {
							component.instance().option(
								'items',
								[...hiddenColumnActions, ...tableInstance.hiddenColumnSettings].map((filter) => ({
									...filter,
								})),
							)
						},
						unfilter: () => {
							showAllHiddenColumns();
						}

					});
					const selectedHiddenColumnFilter =
						tableInstance.tableRelatedUserParameters.selectedHiddenColumnFilter;
					component
						.instance()
						.option(
							'selectedItemKey',
							selectedHiddenColumnFilter ? selectedHiddenColumnFilter.settingId : null,
						);

					break;
				}
				case HiddenColumnActions.SHOW_HIDDEN_COLUMNS: {
					tableInstance.tableRelatedUserParameters.setSelectedHiddenColumnFilter(null);
					component.instance().option('selectedItemKey', null);
					showAllHiddenColumns();
					break;
				}
				default: {
					tableInstance.tableRelatedUserParameters.setSelectedHiddenColumnFilter(itemData);
					getDbeDxGridInstance().option('customizeColumns', (columns) => {
						columns.forEach((column) => {
							column.visible = !itemData.setting.includes(column.dataField);
						});
					});
					component.instance().option('selectedItemKey', itemData.settingId);
				}
			}
		};
	}

	public getLinkButtonClickHandler() {
		const { openModal } = this.actions;
		const getDbeDxGridInstance = this.getDbeDxGridInstance;
		const tableInstance = this.tableInstance;
		return async () => {
			const isRowSelected = await (async () => {
				const selectedRows = await getDbeDxGridInstance().getSelectedRowsData();
				return !!selectedRows.length;
			})();
			if (isRowSelected) {
				openModal(ModalsTypes.LINK_WITH_FILTER, {
					closeOnOutsideClick: true,
					modalTitle: translate('LINK_WITH_FILTER'),
					dbeDxGridInstance: getDbeDxGridInstance(),
					tableInstance: tableInstance,
				});
			} else {
				this.notificationController.createNotification(
					translate('THERE_ARE_NO_SELECTED_ROWS'),
					Severity.WARNING
				);
			}
		};
	}

	public openChildParentTable(modalTitle: string, isChildOrParentTable) {
		const { openModal } = this.actions;
		const getDbeDxGridInstance = this.getDbeDxGridInstance;
		const tableInstance = this.tableInstance;

		return async () => {
			openModal(ModalsTypes.CHILD_PARENT_TABLE_MODAL, {
				width: 600,
				closeOnOutsideClick: true,
				modalTitle: modalTitle,
				dbeDxGridInstance: getDbeDxGridInstance(),
				tableInstance: tableInstance,
				isChildOrParentTable,
			});
		};
	}

	public massUpdateButtonClickHandler(tableType) {
		const { openModal } = this.actions;
		return async () => {
			const executeMassiveUpdate = async (
				operation: MassUpdateOperationType,
				updatedRow,
				massUpdateRange: MassUpdateRange,
				successCallback?: () => void,
			) => {
				const selectedRows = await this.getDbeDxGridInstance().getSelectedRowsData();
				const allAppliedFilters = this.tableInstance.getTableDataModel().getAllAppliedFilters();
				const primaryKeys = this.tableInstance.getTableDataModel().getPrimaryKeys();
				const bodyParams = { allAppliedFilters, selectedRows, primaryKeys, operation, updatedRow, massUpdateRange };
				await communicator.massiveDataUpdate(bodyParams, this.tableInstance.getTableName()).then(() => {
					this.getDbeDxGridInstance().refresh(true);
					successCallback && successCallback();
				});
			};

			const executeMassiveUpdateForCloningRows = async (
				operation: MassUpdateOperationType,
				updatedRows,
				massUpdateRange: MassUpdateRange,
				successCallback?: () => void,
			) => {
				const dxGridInstance = this.getDbeDxGridInstance();
				const updatedRow = updatedRows[0];
				const store = dxGridInstance.getDataSource().store();
				const rowsForUpdate = await (async () => {
					if (massUpdateRange === MassUpdateRange.SELECTED_ROWS) return dxGridInstance.getSelectedRowKeys();
					return dxGridInstance.getDataSource().items();
				})();

				const updateValueStrategy = MassUpdateValueStrategy[operation];
				Promise.all(
					rowsForUpdate.map((row) => {
						const updatedValue = updateValueStrategy(row[updatedRow.columnName], updatedRow.value);
						return store.update(row, { [updatedRow.columnName]: updatedValue });
					}),
				).then(() => {
					dxGridInstance.refresh(true);
					successCallback && successCallback();
				});
			};

			openModal(ModalsTypes.MASSIVE_UPDATE_MODAL, {
				width: 700,
				closeOnOutsideClick: true,
				dbeDxGridInstance: this.getDbeDxGridInstance(),
				tableInstance: this.tableInstance,
				executeMassiveUpdate:
					tableType === TableInstanceManager.CLONE_ROW_IN_ORIGINAL_TABLE
						? executeMassiveUpdateForCloningRows
						: executeMassiveUpdate,
				asyncRender: true,
				modalTitle: translate('_MASS_UPDATE'),
			});
		};
	}

	public saveRowsButtonClickHandler() {
		const { closeModal } = this.actions;
		return () => {
			const newRows = this.getDbeDxGridInstance().getDataSource().items();

			const primaryKeys = this.tableInstance
				.getTableDataModel()
				.getPrimaryKeys()
				.reduce((acc, key) => ({ ...acc, [key]: null }), {});
			const rows = newRows.map((row) => {
				return this.tableInstance.getTableDataModel().updateOptionsToActionParams(
					primaryKeys,
					{},
					Object.assign(this.tableInstance.getTableDataModel().getRowDefaultValues(), row, {
						ID_wh: this.warehouseId,
					}),
				);
			});

			communicator.addNewRows(this.tableInstance.getTableName(), rows).then(() => {
				this.getDbeDxGridInstance().refresh(true);
				closeModal();
			});
		};
	}

	public saveForeignKeyButtonClickHandler() {
		const getDbeDxGridInstance = this.getDbeDxGridInstance;
		const originalTableInstance = this.tableInstanceManager.tableInstanceStorage.get(
			TableInstanceManager.ORIGINAL_TABLE,
		);
		return async () => {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			const { cellData, joinedKeyColumnNames, columnName } = this.tableInstance.parentTableInfo;
			const selectedRows = await getDbeDxGridInstance().getSelectedRowsData();
			const selectedRow = selectedRows[0];

			const data = cellData.data;
			try {
				if (cellData.data.editorOptions && cellData.data.editorOptions.setValueToBuilder) {
					this.tableInstance.close();
					cellData.data.editorOptions.setValueToBuilder(selectedRow[joinedKeyColumnNames[columnName]]);
					await cellData.data.component.repaint();
				} else if (cellData?.data?.dataField) {
					const {
						data: {
							editorOptions: { setParameters },
							dataField,
							component,
						},
					} = cellData;

					const finalValue = Object.entries(joinedKeyColumnNames).reduce(
						(result, [_, columnName]: [string, string]) => {
							return { ...result, [columnName]: selectedRow ? selectedRow[columnName] : 0 };
						},
						selectedRow,
					);
					setParameters(finalValue, dataField, selectedRow ? finalValue[joinedKeyColumnNames[dataField]] : 0);
					this.tableInstance.close();
					await component.repaint();
				} else {
					const {
						component,
						column: { dataField },
						rowIndex,
					} = cellData;

					const column = originalTableInstance.getTableDataModel().getColumnByName(cellData.column.dataField);
					const validator = column.getValidatorName();

					const newValue = selectedRow ? selectedRow[joinedKeyColumnNames[dataField]] : 0;
					column.setForeignKeyData().then(() => {
						column
							.getValidatorForAsyncRule(newValue, { ...data, [dataField]: newValue })
							.then(async (isValid) => {
								if (isValid) {
									component.cellValue(rowIndex, dataField, newValue);
									await component.saveEditData();
									await component.repaint();
									this.tableInstance.close();
								} else {
									this.notificationController.createNotification(
										translate(Validators[validator]),
										Severity.ERROR
									);
								}
							});
					});
				}
			} catch (e) {
				throw e;
			}
		};
	}

	public screenBuilderButtonClickHandler() {
		const { openModal } = this.actions;
		const tableInstance = this.tableInstance;

		return () => {
			openModal(ModalsTypes.SCREEN_BUILDER_CONFIG, {
				closeOnOutsideClick: false,
				width: 600,
				modalTitle: translate('SCREEN_BUILDER'),
				tableInstance,
			});
		};
	}

	public columnChooserButtonClickHandler() {
		const getDbeDxGridInstance = this.getDbeDxGridInstance;
		return () => {
			getDbeDxGridInstance().showColumnChooser();
		};
	}

	public linkReferenceTableButtonClickHandler() {
		const getDbeDxGridInstance = this.getDbeDxGridInstance;
		return async ({ itemData }: { itemData: TableReference }) => {
			const url = itemData.createUrl(await getDbeDxGridInstance().getSelectedRowsData());
			window.open(url, '_blank');
		};
	}

	public tableRelatedChartsButtonClickHandler() {
		const getDbeDxGridInstance = this.getDbeDxGridInstance;
		return async ({ itemData }: { itemData: ChartDescription }) => {
			const allRows = this.tableInstance.getTableDataModel().getTemporaryTableData();
			const selectedRows = await getDbeDxGridInstance().getSelectedRowsData();
			const uniqKeysData = this.tableInstance.getTableDataModel().prepareUniqueKeysData(
				selectedRows.notEmpty() ? selectedRows : allRows,
			);
			this.tableInstance.selectedRowsDexieDB.addRecord(itemData.id, uniqKeysData);
			const url = new URL(window.location.toString());
			url.searchParams.delete('tableId');
			url.searchParams.append('chartId', itemData.id.toString());
			url.pathname = `${window['CONTEXT_PATH']}/view/api/showDbeChart`;
			window.open(url, '_blank');
		};
	}

	public closeScreenBuilderTableButtonClickHandler(tableKey: { [index: string]: string } = {}, tableName: string) {
		const { updateSplitElements,  destroyChildParentTable} = this.actions;
		return () => {
			tableKey.screenBuilderTableKey
				? updateSplitElements(tableKey.screenBuilderTableKey, tableName)
				: destroyChildParentTable();
		};
	}

	public executeRecalculateReportData(params) {
		const getDbeDxGridInstance = this.getDbeDxGridInstance;
		communicator
			.recalculateReportData(this.tableInstance.getMetadata().getTable().getTableName(), params)
			.then((result) => {
				if (!result.length) {
					getDbeDxGridInstance().refresh(true);
				} else {
					result.forEach(({ alias, parameters, severity, namePinned }) => {
						this.notificationController.createNotification(
							translate(alias, ...parameters),
							severity,
							false,
							() => true,
							10000
						);
					});
				}
			})
			.catch((error) => {
				this.notificationController.createNotification(
					error.errorMessage || translate('UPDATE_FAILED'),
					Severity.ERROR
				);
			});
	}

	public recalculateReportDataClickHandler() {
		const { openModal } = this.actions;
		const tableInstance = this.tableInstance;
		return () => {
			tableInstance.getReportInputParameters().length
				? openModal(ModalsTypes.RECALCULATE_REPORT_DATA, {
						closeOnOutsideClick: false,
						width: 600,
						modalTitle: translate('REPORT_INPUT_PARAMETERS'),
						tableInstance,
						executeRecalculateReportData: this.executeRecalculateReportData.bind(this),
						asyncRender: true,
				  })
				: this.executeRecalculateReportData([]);
		};
	}

	public helpButtonClickHandler() {
		const tableInstance = this.tableInstance;
		let helpUrl;
		const link = tableInstance.table.getHelpLink();
		if (link) {
			const [topic, section, subSection] = link && link.split('/');
			const layoutTypeTopic =  WarehouseTypeForHelp[WarehouseUiType[this.tableInstance.warehouseUiType]];
			const queryParams = generateQueryParams({warehouseId: this.tableInstance.warehouseId});
			helpUrl = new URL(`${location.origin}${global.CONTEXT_PATH}/view/help/${layoutTypeTopic}/${topic || ''}/${section || ''}?${queryParams}`);
			subSection && (helpUrl.hash = subSection);
		}
		return () => {
			window.open(helpUrl, '_blank');
		};
	}

	public mergeRowsButtonClickHandler() {
		const { openModal } = this.actions;

		return async () => {
			const dxGridInstance = this.getDbeDxGridInstance();
			const selectedRowsKeys = await dxGridInstance.getSelectedRowKeys();

			const handleMergeRows = async (tableData, finalRow, closeModal) => {
                const primaryKeys = this.tableInstance
                    .getTableDataModel()
                    .getPrimaryKeys()
                    .reduce((acc, key) => ({...acc, [key]: null}), {});
                const selectedRows = tableData.map((row) => {
                    return this.tableInstance.getTableDataModel().updateOptionsToActionParams(
                        primaryKeys,
                        {},
                        Object.assign(this.tableInstance.getTableDataModel().getRowDefaultValues(), row, {
                            ID_wh: this.warehouseId,
                        }),
                    );
                });
                const resultRow = this.tableInstance.getTableDataModel().updateOptionsToActionParams(
					primaryKeys,
					{},
					Object.assign(this.tableInstance.getTableDataModel().getRowDefaultValues(), finalRow, {
						ID_wh: this.warehouseId,
					}),
				);

                await communicator.mergeRows({selectedRows: selectedRows, resultRow: [resultRow]}, this.tableInstance.getTableName());
                await this.getDbeDxGridInstance().refresh(true);
				closeModal && closeModal();
			};

			if (selectedRowsKeys.length < 2) {
				this.notificationController.createNotification(
					translate('PLEASE_SELECT_TWO_RECORDS'),
					Severity.WARNING,
					false,
					() => true,
					5000
				);
			} else {
				const selectedRowsData = await dxGridInstance.getSelectedRowsData();

				openModal(ModalsTypes.MERGE_ROWS_MODAL, {
                    modalTitle: translate('MERGE_ROWS'),
                    tableInstance: this.tableInstance,
                    width: '88vw',
                    asyncRender: true,
                    selectedRows: selectedRowsData,
                    handleMergeRows,
                });
			}
		};
	}

	public goToOldDBEClickHandler() {
		return () => {
			const url = new URL(window.location.toString());
			url.pathname = `${window['CONTEXT_PATH']}/dbe`;
			window.open(url, '_blank');
		};
	}
}

export default ToolbarPanelButtonEvents;
