/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import { Metadata } from '../../models/Classes';
import TableDataModel from './TableDataModel';

class CompareTableDataModel extends TableDataModel {
	public compareTableResultTemporaryData = [];
	public compareTableColumns: string[] = [];

	constructor(data) {
		super(data);
	}

	public static create(metadata: Metadata): CompareTableDataModel {
		return new CompareTableDataModel(Metadata.create(metadata));
	}

	public setCompareTableResultTemporaryData(data) {
		this.compareTableResultTemporaryData = data;
	}

	public setCompareTableColumns(columns: string[]) {
		this.compareTableColumns = columns;
	}

	public getCompareTableResultColorCell(loadRowIndex: number, dataField: string): string {
		const columnIndex = this.compareTableColumns.findIndex((column) => column === dataField);
		const color = this.compareTableResultTemporaryData[loadRowIndex]?.colors[columnIndex];
		return color ? color + '33' : color;
	}

	public getPrimaryKeysForCompareTable(): string[] {
		return [...super.getPrimaryKeys(), 'compare_ID_row'];
	}

	public transformData(compareData) {
		const { data, columns, totalCount } = compareData;
		const transformedData = data.reduce((acc, { cells }) => {
			const obj = Object.fromEntries(columns.map((column, index) => [column, cells[index]]));
			return [...acc, obj];
		}, []);

		return {
			data: transformedData,
			totalCount: totalCount,
		};
	}
}

export default CompareTableDataModel;
