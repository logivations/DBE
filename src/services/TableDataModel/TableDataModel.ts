/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import ITableDataModel from './ITableDataModel';
import { ColumnModel, FilterGroup, FilterItem, Metadata } from '../../models/Classes';
import DbeColumnFactory from './DbeColumn/DbeColumnFactory';
import AbstractColumnModel from '../../models/Classes/AbstractColumnModel';
import isCommonColumn from '../../utils/commonColumnsUtils';
import { isDefined } from '../../utils/utils';
import uniq from 'lodash/uniq';
import TFunction from '../../models/Types/Types';
import CompareTableManager from '../CompareTableManager/CompareTableManager';

class TableDataModel implements ITableDataModel {
	public columns: AbstractColumnModel[] = [];
	public mappedColumnModelsByName: Map<string, AbstractColumnModel> = new Map();

	private temporaryTableData: object[] = [];
	private totalRowCount = 0;
	private selectionFilter: FilterGroup = null;
	private allAppliedFilters: FilterGroup = null;
	private rowAndHeaderFilter: FilterGroup = null;

	constructor(private readonly metadata: Metadata) {}

	public static create(metadata: Metadata): TableDataModel {
		const metadataInstance = Metadata.create(metadata);
		return new TableDataModel(metadataInstance);
	}

	public static zeroModel() {
		return TableDataModel.create(new Metadata());
	}

	public getMetadata(): Metadata {
		return this.metadata;
	}

	public getColumns(): AbstractColumnModel[] {
		return this.columns;
	}

	public getSortedColumn(): AbstractColumnModel[] {
		return [...this.getColumns()]
			.sort((a, b) => {
				return a.getCaption().localeCompare(b.getCaption());
			})
			.sort((a, b) => {
				return this.getPrimaryKeys().indexOf(b.getName()) - this.getPrimaryKeys().indexOf(a.getName());
			});
	}

	public getColumnModelByName(name: string): AbstractColumnModel {
		return this.mappedColumnModelsByName.get(name);
	}

	public getCompareTableManager(): Promise<CompareTableManager> {
		return import('../CompareTableManager/CompareTableManager').then(({ default: CompareTableManager }) => {
			return new CompareTableManager(this);
		});
	}

	public getCompareTableResultColorCell(loadRowIndex: number, dataField: string) {
		return null;
	}

	public getColumnsForAddingCloning() {
		return this.getColumns().filter((columnModel) => {
			return !columnModel.getViewModel().isHideOnCloneOrAdding() && !isCommonColumn(columnModel.getName());
		});
	}

	public createDbeColumns(): TableDataModel {
		const { columns, mappedColumnModelsByName } = this.metadata.getVisibleColumnsModel().reduce(
			(
				acc: { columns: AbstractColumnModel[]; mappedColumnModelsByName: Map<string, AbstractColumnModel> },
				model,
			) => {
				const adaptedColumnModel = DbeColumnFactory(model, ColumnModel) as AbstractColumnModel;
				adaptedColumnModel.setTableDataModel(this);
				acc.columns.push(adaptedColumnModel);
				acc.mappedColumnModelsByName.set(model.getName(), adaptedColumnModel);
				return acc;
			},
			{ columns: [], mappedColumnModelsByName: new Map() },
		);
		this.columns = columns;
		this.mappedColumnModelsByName = mappedColumnModelsByName;
		return this;
	}

	public getPrimaryKeysAsArray(): string[] {
		return this.columns.reduce((acc: string[], column: ColumnModel) => {
			const key = column.getPrimaryKeyColumnName();
			return key ? [...acc, key] : acc;
		}, []);
	}

	public getPrimaryKeys(): string[] {
		const primaryKeys = this.getPrimaryKeysAsArray();
		const uniqueFields = primaryKeys.length ? primaryKeys : this.metadata.table.parsedUniqueFields;
		if (!uniqueFields.length) {
			return ['uniqId'];
		}
		return ['ID_wh', ...uniqueFields];
	}

	public setTotalRowCount(rowCount) {
		this.totalRowCount = rowCount;
		return this;
	}

	public getTotalRowCount() {
		return this.totalRowCount;
	}

	public setTemporaryTableData(originalTableRows) {
		this.temporaryTableData = originalTableRows;
		return this;
	}

	public setRefreshCounter(refreshCounter: TFunction) {
		this.refreshCounter = refreshCounter;
		return this;
	}

	public getTemporaryTableData() {
		return this.temporaryTableData;
	}

	public getTableRowRecord(primary) {
		return this.getTemporaryTableData().find((row: object) => {
			return Object.entries(primary).every(([primaryKey, primaryValue]) => {
				return row[primaryKey] === primaryValue;
			});
		});
	}

	public updateOptionsToActionParams(key, values = null, row: object = {}) {
		const cellFormatter = (obj) => Object.entries(obj).map(([columnName, value]) => ({ columnName, value }));
		return {
			key: cellFormatter(key),
			values: cellFormatter(values || key),
			row: this.getTableRowRecord(key) || row,
		};
	}

	public validationOptionsToActionParams(value, columnName, row) {
		const rowFilter = this.createFilterGroupFromUniqueKeys([row], null, 'NOT IN');
		return {
			key: [this.getPrimaryKeys().reduce((acc, key) => ({ ...acc, [key]: null }), {})],
			values: [{ columnName, value }],
			row: row,
			rowFilter: rowFilter || null,
		};
	}

	public getRowDefaultValues() {
		return this.columns.reduce((acc, column: ColumnModel) => {
			const columnViewModel = column.getViewModel();
			const columnName = column.getName();
			return { ...acc, [columnName]: columnViewModel.getDefaultValue() };
		}, {});
	}

	public getColumnByName(columnName: string): AbstractColumnModel {
		return this.mappedColumnModelsByName.get(columnName);
	}

	public setSelectionFilter(selectionFilter: FilterGroup): TableDataModel {
		this.selectionFilter = selectionFilter;
		return this;
	}

	public getSelectionFilter(): FilterGroup {
		return this.selectionFilter;
	}

	public setAllAppliedFilters(allAppliedFilters: FilterGroup) {
		this.allAppliedFilters = allAppliedFilters;
		return this;
	}

	public getAllAppliedFilters(): FilterGroup {
		return this.allAppliedFilters;
	}

	public setRowAndHeaderFilter(rowAndHeaderFilter: FilterGroup) {
		this.rowAndHeaderFilter = rowAndHeaderFilter;
		return this;
	}

	public getRowAndHeaderFilter(): FilterGroup {
		return this.rowAndHeaderFilter;
	}

	public hasSummary() {
		return this.columns.some((col) => !!col.getFooterAction());
	}

	public getUniqColumns() {
		return this.metadata.columnModels.reduce((acc: string[], column: ColumnModel) => {
			if (isDefined(column.primaryKeyOrdinalPosition)) {
				return [...acc, column.getName()];
			}
			return acc;
		}, this.metadata.table.parsedUniqueFields);
	}

	public getUniqueColumnsNames() {
		const uniqueColumnNames = this.getUniqColumns();
		if (!uniqueColumnNames.length) {
			return ['uniqId'];
		}
		return uniqueColumnNames;
	}

	public prepareUniqueKeysData(rows: { [key: string]: any }[]) {
		const uniqColumns = this.getUniqueColumnsNames();
		return (rows || []).reduce((acc, row) => {
			row &&
				Object.entries(row).forEach(([name, value]) => {
					if (uniqColumns.includes(name)) {
						Object.hasOwn(acc, name) ? acc[name].push(value) : (acc[name] = [value]);
					}
				});
			return acc;
		}, {});
	}

	public createFilterGroupFromUniqueKeys(
		rows: { [key: string]: any }[],
		uniqKeys?: { [key: string]: any },
		operator?: string,
	): FilterGroup {
		const parsedUniqKeys = uniqKeys || this.prepareUniqueKeysData(rows);
		return Object.entries(parsedUniqKeys).reduce((filterGroup: FilterGroup, [columnName, values]) => {
			filterGroup.addFilterCriteria(
				new FilterItem(columnName, operator || 'IN', uniq(Array.isArray(values) ? values : [values])),
			);
			return filterGroup;
		}, new FilterGroup());
	}

	private refreshCounter: TFunction = () => true;
}

export default TableDataModel;
