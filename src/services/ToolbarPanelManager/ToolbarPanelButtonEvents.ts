/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import ModalsTypes from '../../constants/ModalsTypes';
import translate from '../../i18n/localization';
import {FilterActions, HiddenColumnActions, SortingActions} from '../../constants/FiltersConstants';
import {TypeOfUserParamSettings} from '../../constants/userParamsSettingsConstants';
import {ChartDescription, FilterGroup, SortSetting, TableReference} from '../../models/Classes';
import communicator from '../../api/Communicator';
import isEmpty from 'lodash/isEmpty';
import TableInstance from '../TableInstanceManager/TableInstance';
import TFunction from '../../models/Types/Types';
import TableInstanceManager from '../TableInstanceManager/TableInstanceManager';
import MassUpdateOperationType, {MassUpdateValueStrategy} from '../../models/Enums/MassUpdateOperationType';
import MassUpdateRange from '../../models/Enums/MassUpdateRange';
import CompareTableDto from '../CompareTableManager/CompareTableDto';
import NotificationController from '../Notification/NotificationController';
import {Severity} from '../../models/Enums/Notification';
import {WarehouseTypeForHelp, WarehouseUiType} from '../../models/Enums/Table';
import {generateQueryParams} from '../../utils/urlUtils';
import {confirm} from 'devextreme/ui/dialog';
import {DbeActions} from '../../models/Enums/HelpLinks';
import ForeignButtonUpdater from '../ForeignButtonManager/ForeignButtonUpdater';
import ForeignButtonProxy from '../ForeignButtonManager/ForeignButtonProxy';

class ToolbarPanelButtonEvents {
	public dbeDxGridRef: any;
	public actions: { [key: string]: TFunction } = {};
	public tableInstance: TableInstance;
	public tableInstanceManager: TableInstanceManager;
	public notificationController: NotificationController;
	private readonly warehouseId: number;

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

	public asyncGridRepaint() {
		setTimeout(() => {
			this.getDbeDxGridInstance().repaint();
		}, 1000);
	}

	public exportButtonClickHandler() {
		return () => {
			this.actions.openModal(ModalsTypes.EXPORT_MODAL, {
				width: 1000,
				modalTitle: translate('EXPORT_TO_CSV'),
				tableInstance: this.tableInstance,
			});
		};
	}

	public addRowButtonClickHandler() {
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
			this.actions.openModal(ModalsTypes.ADD_NEW_ROW_MODAL, {
				width: 1000,
				modalTitle: translate('ADD_NEW_ROW'),
				tableInstance: this.tableInstance,
				handleSubmitEvent,
			});
		};
	}

	public cloneRowButtonClickHandler() {
		return async () => {
			const dxGridInstance = this.getDbeDxGridInstance();
			const selectedRowsKeys = await dxGridInstance.getSelectedRowKeys();

			if (selectedRowsKeys.length === 0) {
				this.notificationController.createNotification({
					message: translate('PLEASE_SELECT_ROWS_FOR_CLONING'),
					type: Severity.WARNING,
					displayTime: 5000,
				});
			} else {
				this.actions.openModal(ModalsTypes.CLONE_SELECTED_ROWS_MODAL, {
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
			const confirmed = confirm(
				translate('_SELECTED_ROW_$_REMOVAL_CONFIRMATION', selectedRowsKeys.length),
				'W2MO',
			);
			confirmed.then(async (isConfirmed) => {
				if (isConfirmed) {
					await communicator
						.deleteTableRows(this.tableInstance.getTableName(), params)
						.then(({ recordsDeleted, message, parameter }) => {
							this.notificationController.createNotification({
								message: translate(message, parameter),
								type: recordsDeleted ? Severity.SUCCESS : Severity.ERROR,
							});
							dxGridInstance.clearSelection();
						});
					await dxGridInstance.refresh(true);
				} else {
					return;
				}
			});
		};
	}

	public toggleSelectionButtonClickHandler(toggleSelectionButton) {
		return async (event) => {
			if (toggleSelectionButton.isDown) {
				await this.getDbeDxGridInstance().clearSelection();
				toggleSelectionButton.setTitle(translate('SELECT_ALL_ROWS'));
				event.element.classList.remove('deselect-all-icon');
				event.element.classList.add('select-all-icon');
			} else {
				await this.getDbeDxGridInstance().selectAll();
				toggleSelectionButton.setTitle(translate('UNSELECT_ALL_ROWS'));
				event.element.classList.add('deselect-all-icon');
				event.element.classList.remove('select-all-icon');
			}
			toggleSelectionButton.isDown = !toggleSelectionButton.isDown;
		};
	}

	public tableActionsClickHandler() {
		const getDbeDxGridInstance = this.getDbeDxGridInstance;
		const tableInstance = this.tableInstance;
		return async ({ itemData: actionDetail }) => {
			actionDetail.getTableActionParameters(tableInstance).then(async (tableActionParametersModel) => {
				const selectedRows = await getDbeDxGridInstance().getSelectedRowsData();

				const executeTableAction = (inputParams?: object, successCallback?: () => void) => {
					const params = {
						primaryKeys: this.tableInstance.getTableDataModel().getPrimaryKeys(),
						inputParams: inputParams || {},
						selectedRows,
					};
					actionDetail
						.runTableActionByOutputType(params, this.tableInstance.getTableName())
						.then(async (res) => {
							if (res && res.length) {
								res.forEach(({ alias, severity, parameters }) => {
									this.notificationController.createNotification({
										message: translate(alias, parameters),
										type: severity,
									});
								});
							} else {
								this.notificationController.createNotification({
									message: translate('_SUCCESSFUL_ACTION'),
									type: Severity.SUCCESS,
								});
								getDbeDxGridInstance().clearSelection();
							}
							await getDbeDxGridInstance().refresh(true);
							successCallback && successCallback();
							getDbeDxGridInstance().endCustomLoading();
						})
						.catch((error) => {
							this.notificationController.createNotification({
								message: error.errorMessage || error,
								type: Severity.ERROR,
							});
						});
				};
				if (!isEmpty(tableActionParametersModel)) {
					actionDetail.checkBeforeExecuteAction(selectedRows, this.tableInstance.getTableName(), () => {
						this.actions.openModal(ModalsTypes.TABLE_ACTION_MODAL, {
							modalTitle: actionDetail.header,
							...actionDetail,
							selectedRows: selectedRows.length ? { ...selectedRows[0] } : {},
							executeTableAction,
							tableInstance,
							asyncRender: true,
							dbeDxGridInstance: getDbeDxGridInstance(),
						});
					});
				} else {
					if (actionDetail.confirmationRequired) {
						const confirmed = confirm(translate('_CHECK_EXECUTION_ACTION'), 'W2MO');
						confirmed.then((isConfirmed) => {
							isConfirmed && executeTableAction();
						});
					} else {
						executeTableAction();
					}
				}
			});
		};
	}

	public importButtonClickHandler() {
		const getDbeDxGridInstance = this.getDbeDxGridInstance;
		const tableInstance = this.tableInstance;
		return () => {
			this.actions.openModal(ModalsTypes.IMPORT_MODAL, {
				width: 1000,
				getDbeDxGridInstance,
				modalTitle: translate('IMPORT'),
				hideOnOutsideClick: false,
				tableInstance,
			});
		};
	}

	public settingsButtonClickHandler() {
		const getDbeDxGridInstance = this.getDbeDxGridInstance;
		const tableInstance = this.tableInstance;
		return () => {
			this.actions.openModal(ModalsTypes.SETTINGS_MODAL, {
				modalTitle: translate('SETTINGS'),
				dbeDxGridInstance: getDbeDxGridInstance(),
				tableInstance: tableInstance,
			});
		};
	}

	public reloadButtonClickHandler() {
		return async () => {
			try {
				SortSetting.applySortingSetting(this.tableInstance.selectedSortOrder, this.getDbeDxGridInstance());
				if (this.tableInstance.selectedHiddenColumnFilter) {
					this.getDbeDxGridInstance().option('customizeColumns', (columns) => {
						columns.forEach((column) => {
							column.visible = !this.tableInstance.selectedHiddenColumnFilter.setting.includes(
								column.dataField,
							);
						});
					});
				}
				new ForeignButtonProxy().clearCache();
				await this.getDbeDxGridInstance().refresh(true);
				this.asyncGridRepaint();
			} catch (e) {
				this.notificationController.createNotification({
					message: e,
					type: Severity.ERROR,
				});
			}
		};
	}

	public compareButtonClickHandler() {
		const getDbeDxGridInstance = this.getDbeDxGridInstance;
		const compareTableDto = new CompareTableDto();
		const handleCompareTable = (compareTableDto, setCompareTableData, tableName) => {
			communicator
				.compareTables(compareTableDto, tableName)
				.then((res) => {
					getDbeDxGridInstance().endCustomLoading();
					const [table, isComparable] = res;
					if (!isComparable) {
						this.notificationController.createNotification({
							message: translate('TABLES_ARE_EQUAL'),
							type: Severity.INFO,
						});
					} else {
						setCompareTableData({ tableName: table });
					}
				})
				.catch((error) => {
					this.notificationController.createNotification({
						message: error.errorMessage,
						type: Severity.ERROR,
					});
				});
		};

		return async () => {
			compareTableDto.resetToDefaultParams();
			this.actions.openModal(ModalsTypes.COMPARE_TABLES_PARAMETERS_MODAL, {
				modalTitle: translate('COMPARE_TABLE'),
				dbeDxGridInstance: getDbeDxGridInstance(),
				tableInstance: this.tableInstance,
				width: 800,
				handleCompareTable,
			});
		};
	}

	public filterSettingButtonItemClick(filtersActions) {
		const getDbeDxGridInstance = this.getDbeDxGridInstance;
		const tableInstance = this.tableInstance;

		return ({ itemData, component }) => {
			switch (itemData.key) {
				case FilterActions.ADD_EDIT_FILTER: {
					this.actions.openModal(ModalsTypes.USER_PARAMS_SETTINGS_MODAL, {
						width: 750,
						tableInstance,
						type: TypeOfUserParamSettings.FILTER_SETTINGS,
						hideOnOutsideClick: false,
						helpKey: DbeActions.FILTERS,
						modalTitle: translate('FILTER'),
						dbeDxGridRef: getDbeDxGridInstance(),
						applySetting: async (filter) => {
							tableInstance.tableRelatedUserParameters.setSelectedFilter(filter);
							await getDbeDxGridInstance().filter(filter);
							component.instance().option('selectedItemKey', filter.settingId);
							this.asyncGridRepaint();
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
							this.asyncGridRepaint();
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
					this.asyncGridRepaint();
					break;
				}
				default: {
					tableInstance.tableRelatedUserParameters.setSelectedFilter(itemData);
					if (itemData.setting) {
						getDbeDxGridInstance().filter(itemData);
						component.instance().option('selectedItemKey', itemData.settingId);
					}
					this.asyncGridRepaint();
				}
			}
		};
	}

	public tableSortButtonItemClick(sortSettingsActions) {
		const getDbeDxGridInstance = this.getDbeDxGridInstance;
		const tableInstance = this.tableInstance;

		return ({ itemData, component }) => {
			switch (itemData.key) {
				case SortingActions.ADD_EDIT_FILTER: {
					this.actions.openModal(ModalsTypes.USER_PARAMS_SETTINGS_MODAL, {
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
						unfilter: async () => {
							component.instance().option('selectedItemKey', null);
							tableInstance.tableRelatedUserParameters.setSelectedSortOrder(null);
							getDbeDxGridInstance().clearSorting(null);
							getDbeDxGridInstance().refresh(true);
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
					this.asyncGridRepaint();
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
		const getDbeDxGridInstance = this.getDbeDxGridInstance;
		const tableInstance = this.tableInstance;
		const showAllHiddenColumns = () => {
			getDbeDxGridInstance().option('customizeColumns', (columns) => {
				columns.forEach((column) => {
					column.visible = true;
				});
			});
		};
		return ({ itemData, component }) => {
			switch (itemData.key) {
				case HiddenColumnActions.ADD_EDIT_FILTER: {
					this.actions.openModal(ModalsTypes.USER_PARAMS_SETTINGS_MODAL, {
						width: 750,
						type: TypeOfUserParamSettings.HIDDEN_COLUMNS_SETTING,
						tableInstance,
						hideOnOutsideClick: false,
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
							);
						},
						unfilter: () => {
							showAllHiddenColumns();
						},
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
					this.asyncGridRepaint();
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
					this.asyncGridRepaint();
				}
			}
		};
	}

	public getLinkButtonClickHandler() {
		const getDbeDxGridInstance = this.getDbeDxGridInstance;
		const tableInstance = this.tableInstance;
		return async () => {
			const selectedRows = await getDbeDxGridInstance().getSelectedRowsData();

			if (selectedRows.length !== 0) {
				const primaryKeys = tableInstance.getTableDataModel().getPrimaryKeysAsArray();
				const valuesByPrimaryKey = primaryKeys.reduce((acc, key) => {
					acc.push([key, [...new Set(selectedRows.map((row) => row[key]))]]);
					return acc;
				}, []);
				const filterForLink = FilterGroup.createFilterForLink(valuesByPrimaryKey);
				const filterString = JSON.stringify(filterForLink);
				if (filterString.length <= FilterGroup.MAX_LENGTH_URL_FILTER) {
					this.actions.openModal(ModalsTypes.LINK_WITH_FILTER, {
						hideOnOutsideClick: true,
						modalTitle: translate('LINK_WITH_FILTER'),
						tableInstance: tableInstance,
						filterString,
					});
				} else {
					NotificationController.createNotification({
						message: translate('DATA_IS_TOO_LONG_FOR_URL_FILTER'),
						type: Severity.ERROR,
					});
				}
			} else {
				this.notificationController.createNotification({
					message: translate('THERE_ARE_NO_SELECTED_ROWS'),
					type: Severity.WARNING,
				});
			}
		};
	}

	public openChildParentTable(modalTitle: string, isChildOrParentTable) {
		const getDbeDxGridInstance = this.getDbeDxGridInstance;
		const tableInstance = this.tableInstance;

		return async () => {
			this.actions.openModal(ModalsTypes.CHILD_PARENT_TABLE_MODAL, {
				width: 600,
				hideOnOutsideClick: true,
				modalTitle: modalTitle,
				dbeDxGridInstance: getDbeDxGridInstance(),
				tableInstance: tableInstance,
				isChildOrParentTable,
			});
		};
	}

	public massUpdateButtonClickHandler(tableType) {
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
				const bodyParams = {
					allAppliedFilters,
					selectedRows,
					primaryKeys,
					operation,
					updatedRow,
					massUpdateRange,
				};
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

			this.actions.openModal(ModalsTypes.MASSIVE_UPDATE_MODAL, {
				width: 700,
				hideOnOutsideClick: true,
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
				this.actions.closeModal();
				this.getDbeDxGridInstance().refresh(true);
				this.asyncGridRepaint();
			});
		};
	}

	public saveForeignKeyButtonClickHandler() {
		const getDbeDxGridInstance = this.getDbeDxGridInstance;
		const originalTableInstance = this.tableInstanceManager.tableInstanceStorage.get(
			TableInstanceManager.ORIGINAL_TABLE,
		);
		return async () => {
			const selectedRows = await getDbeDxGridInstance().getSelectedRowsData();
			const foreignButtonUpdater = new ForeignButtonUpdater(
				selectedRows,
				this.tableInstance,
				originalTableInstance.getTableDataModel(),
				getDbeDxGridInstance(),
			);

			await foreignButtonUpdater.update();
		};
	}

	public screenBuilderButtonClickHandler() {
		const tableInstance = this.tableInstance;

		return () => {
			this.actions.openModal(ModalsTypes.SCREEN_BUILDER_CONFIG, {
				hideOnOutsideClick: false,
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
			const uniqKeysData = this.tableInstance
				.getTableDataModel()
				.prepareUniqueKeysData(selectedRows.notEmpty() ? selectedRows : allRows);
			this.tableInstance.selectedRowsDexieDB.addRecord(itemData.id, uniqKeysData);
			const url = new URL(window.location.toString());
			url.searchParams.delete('tableId');
			url.searchParams.append('chartId', itemData.id.toString());
			url.pathname = `${window['CONTEXT_PATH']}/view/api/showDbeChart`;
			window.open(url, '_blank');
		};
	}

	public closeScreenBuilderTableButtonClickHandler(tableKey: { [index: string]: string } = {}, tableName: string) {
		const { updateSplitElements, destroyChildParentTable } = this.actions;
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
						this.notificationController.createNotification({
							message: translate(alias, ...parameters),
							type: severity,
							displayTime: 10000,
						});
					});
				}
			})
			.catch((error) => {
				this.notificationController.createNotification({
					message: error.errorMessage || translate('UPDATE_FAILED'),
					type: Severity.ERROR,
				});
			});
	}

	public recalculateReportDataClickHandler() {
		const tableInstance = this.tableInstance;
		return () => {
			tableInstance.getReportInputParameters().length
				? this.actions.openModal(ModalsTypes.RECALCULATE_REPORT_DATA, {
						hideOnOutsideClick: false,
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
			const layoutTypeTopic = WarehouseTypeForHelp[WarehouseUiType[this.tableInstance.warehouseUiType]];
			const queryParams = generateQueryParams({ warehouseId: this.tableInstance.warehouseId });
			helpUrl = new URL(
				`${window.location.origin}${global.CONTEXT_PATH}/view/help/${layoutTypeTopic}/${topic || ''}/${
					section || ''
				}?${queryParams}`,
			);
			subSection && (helpUrl.hash = subSection);
		}
		return () => {
			window.open(helpUrl, '_blank');
		};
	}

	public mergeRowsButtonClickHandler() {
		return async () => {
			const dxGridInstance = this.getDbeDxGridInstance();
			const selectedRowsKeys = await dxGridInstance.getSelectedRowKeys();

			const handleMergeRows = async (tableData, finalRow, closeModal) => {
				const primaryKeys = this.tableInstance
					.getTableDataModel()
					.getPrimaryKeys()
					.reduce((acc, key) => ({ ...acc, [key]: null }), {});
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

				await communicator.mergeRows(
					{ selectedRows: selectedRows, resultRow: [resultRow] },
					this.tableInstance.getTableName(),
				);
				await this.getDbeDxGridInstance().refresh(true);
				closeModal && closeModal();
			};

			if (selectedRowsKeys.length < 2) {
				this.notificationController.createNotification({
					message: translate('PLEASE_SELECT_TWO_RECORDS'),
					type: Severity.WARNING,
					displayTime: 5000,
				});
			} else {
				const selectedRowsData = await dxGridInstance.getSelectedRowsData();

				this.actions.openModal(ModalsTypes.MERGE_ROWS_MODAL, {
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
