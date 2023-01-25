/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import { Metadata } from '../models/Classes';
import { UserActions } from '../constants/useActions';
import TableDataModel from '../services/TableDataModel/TableDataModel';

class RightsHelper {
	protected metadata: Metadata;

	constructor(metadata: Metadata) {
		this.metadata = metadata;
	}

	public getTableDataModel(): TableDataModel {
		return TableDataModel.zeroModel();
	}

	public isActionAllowed(action) {
		const tableName = this.metadata.getTable().getTableName();
		return this.metadata.isActionAllowed(tableName, action);
	}

	public hasPrimaryKeys(): boolean {
		return !this.getTableDataModel().getPrimaryKeysAsArray().isEmpty();
	}

	public hasUniqueFields(): boolean {
		return !this.metadata.getTable().getParsedUniqueFields().isEmpty();
	}

	public hasPrimaryUniqueFields(): boolean {
		return this.hasPrimaryKeys() || this.hasUniqueFields();
	}

	public canDelete() {
		return (
			this.metadata.getTable().isDeletable() &&
			this.isActionAllowed(UserActions.DELETE) &&
			this.hasPrimaryUniqueFields() &&
			this.hasWritePrivilege()
		);
	}

	public hasWritePrivilege() {
		return this.metadata.getHasGeneralObjectWritePrivilege() || this.metadata.getIsInfrastructureLocked();
	}

	public canAddRecords() {
		return (
			this.metadata.getTable().isAddable() &&
			this.isActionAllowed(UserActions.ADD) &&
			this.hasPrimaryUniqueFields() &&
			this.hasWritePrivilege()
		);
	}

	public canMassUpdate(): boolean {
		return (
			this.metadata.getTable().isEditable() &&
			this.isActionAllowed(UserActions.MASSIVE_UPDATE) &&
			this.hasWritePrivilege()
		);
	}

	public canExecuteUpdateTable(): boolean {
		return this.metadata.canExecuteUpdate();
	}

	public canExecuteTableAction(): boolean {
		return (
			this.isActionAllowed(UserActions.EXECUTE_ACTION) &&
			!this.metadata.tableRelatedUserParameters.getActions().isEmpty()
		);
	}

	public canExport(): boolean {
		return this.isActionAllowed(UserActions.EXPORT);
	}

	public canImport() {
		return this.isActionAllowed(UserActions.IMPORT) && this.metadata.getWarehouseIdHolder().hasWarehouseId();
	}

	public canCompareTable(): boolean {
		return this.metadata.getCanBeCompared();
	}

	public canMergeRows(): boolean {
		return !this.metadata.isInfrastructureLocked && this.metadata.getTable().isMergeable();
	}

	public hasHelpButton(): boolean {
		return !!this.metadata.getTable().getHelpLink();
	}
}

export default RightsHelper;
