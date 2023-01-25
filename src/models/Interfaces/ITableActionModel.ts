/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/
import { SelectedRowsNeeded, SystemParameter, TableActionOutputType } from '../Enums';

interface ITableActionModel {
	skipUpToDateCheck?: boolean;
	actionId?: number;
	sourceTableName?: string;
	procedureName?: string;
	selectedRowsNeeded?: SelectedRowsNeeded;
	countOfSelectedRows?: number;
	preScript?: string;
	postScript?: string;
	confirmationRequired?: boolean;
	headerPinned?: boolean;
	relatedActionModel?: ITableActionModel;
	relatedActionModelId?: number;
	systemParameters?: SystemParameter[];
	tableId?: number;
	tableName?: string;
	header?: string;
	link?: string;
	outputType?: TableActionOutputType;
}

export default ITableActionModel;
