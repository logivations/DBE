/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import { ReferenceType } from '../Enums';
import BaseCommunicator from '../../api/BaseCommunicator';

class TableReference {
	static QUESTION_MARK = '?';
	static EQUALS_SEPARATOR = '=';
	static COMMA_SEPARATOR = ',';
	static SLASH_SEPARATOR = '/';

	constructor(
		public tableId?: number,
		public tableName?: string,
		public referenceId?: number,
		public name?: string,
		public reference?: string,
		public newReference?: string,
		public referenceType?: ReferenceType,
		public systemParameters?: string,
		public columnParameters?: string,
		public namePinned?: boolean,
	) {}

	private get referenceWithoutParams(): string {
		return this.newReference.split(TableReference.QUESTION_MARK)[0];
	}

	public static create(reference: TableReference): TableReference {
		return new TableReference(
			reference.tableId,
			reference.tableName,
			reference.referenceId,
			reference.name,
			reference.reference,
			reference.newReference,
			reference.referenceType,
			reference.systemParameters,
			reference.columnParameters,
			reference.namePinned,
		);
	}

	public createUrl(selectedRows?: any[]): string {
		if (this.referenceType === ReferenceType.EXTERNAL_REFERENCE) return this.createExternalUrl();
		if (this.referenceType === ReferenceType.INTERNAL_REFERENCE) return this.createInternalUrl(selectedRows);
		return '';
	}

	private createExternalUrl(): string {
		return this.reference;
	}

	private createInternalUrl(selectedRows?: any[]): string {
		const baseCommunicator = new BaseCommunicator();
		const columnParameters = this.getColumnParameters(selectedRows);
		const queryParams = baseCommunicator.createQueryString({ ...this.getExtraParams(), ...columnParameters });
		const baseUrl = `${baseCommunicator.contextPath}${TableReference.SLASH_SEPARATOR}${this.referenceWithoutParams}`;
		return queryParams ? `${baseUrl}${TableReference.QUESTION_MARK}${queryParams}` : baseUrl;
	}

	private getExtraParams() {
		const extraParams = {};
		const indexOfQuestionMark = this.newReference.indexOf(TableReference.QUESTION_MARK);
		if (indexOfQuestionMark >= 0) {
			const queryString = this.newReference.slice(indexOfQuestionMark + 1);
			const urlParams = new URLSearchParams(queryString);
			[...urlParams.entries()].forEach(([name, value]) => {
				Object.assign(extraParams, { [name]: value });
			});
		}
		return extraParams;
	}

	private getColumnParameters(selectedRows) {
		if (selectedRows && selectedRows.length) {
			const parameters = this.columnParameters.split(TableReference.COMMA_SEPARATOR);
			return parameters.reduce((acc, params) => {
				const [paramName, columnName] = params.split(TableReference.EQUALS_SEPARATOR);
				const valuesByColumnName = selectedRows.reduce((values, row) => [...values, row[columnName]], []);
				return { ...acc, [paramName]: valuesByColumnName.toString() };
			}, {});
		}
		return null;
	}
}

export default TableReference;
