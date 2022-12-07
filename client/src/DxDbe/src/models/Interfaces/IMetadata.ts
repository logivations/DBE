/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import {
	ColorScaling,
	ColumnModel,
	DbeTable,
	FilterGroup,
	InputParameterModel,
	MasterDetailsInfo,
	SrsConfiguration,
	TableRelatedUserParameters,
	WarehouseIdHolder,
} from '../Classes';
import { DbeCellFormat, WarehouseShort } from '../Classes/Metadata';
import {WarehouseUiType} from "../Enums/Table";

interface IMetadata {
	columnModels?: ColumnModel[];
	reportInputParameters?: InputParameterModel[];
	srsConfiguration?: SrsConfiguration[];
	colorScaling?: ColorScaling[];
	defaultSrsConfiguration?: SrsConfiguration;
	table?: DbeTable;
	urlFilter?: FilterGroup;
	campaignId?: number;
	sourceWarehouseName?: string;
	targetWarehouseName?: string;
	tableRelatedUserParameters?: TableRelatedUserParameters;
	warehouseIdHolder?: WarehouseIdHolder;
	userAccessibleWarehouses?: WarehouseShort[];
	childParentTables?: MasterDetailsInfo[];
	dbeCellFormat?: DbeCellFormat;
	infrastructureLocked?: boolean;
	visibleColumnModels?: ColumnModel[];
	canBeCompared?: boolean;
	hasGeneralObjectWritePrivilege?: boolean;
	isInfrastructureLocked?: boolean;
	userActionPrivilegesByTableName?: Map<string, Map<string, boolean>>;
	hasUpdateReportPrivilege?: boolean;
	warehouseUiType?: WarehouseUiType;
}

export default IMetadata;
