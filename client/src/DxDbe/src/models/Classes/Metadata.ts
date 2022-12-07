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
	SrsConfiguration,
	TableRelatedUserParameters,
	WarehouseIdHolder,
} from './index';
import {IListBoxCandidate, IMetadata} from '../Interfaces';
import {ISeparatorEvaluator} from '../Interfaces/IListBoxCandidate';
import {WarehouseUiType} from "../Enums/Table";

export class WarehouseShort implements IListBoxCandidate<boolean> {
	public warehouseId?: number;
	public name?: string;
	public evaluator?: ISeparatorEvaluator<boolean>;
}

export class ChildParentTableInfo {
	public tableId?: number;
	public filterGroup?: FilterGroup;
	public joinedColumnsName?: { [index: string]: string };
	public child?: boolean;
}

export class DbeCellFormat {
	public timeFormat?: string;
	public numberFormat?: string;
	public dateTimeFormat?: string;
}

class Metadata implements IMetadata {
	constructor(
        public columnModels?: ColumnModel[],
        public reportInputParameters?: InputParameterModel[],
        public srsConfiguration?: SrsConfiguration[],
        public colorScaling?: ColorScaling[],
        public defaultSrsConfiguration?: SrsConfiguration,
        public table?: DbeTable,
        public urlFilter?: FilterGroup,
        public campaignId?: number,
        public sourceWarehouseName?: string,
        public targetWarehouseName?: string,
        public tableRelatedUserParameters?: TableRelatedUserParameters,
        public warehouseIdHolder?: WarehouseIdHolder,
        public userAccessibleWarehouses?: WarehouseShort[],
        public dbeCellFormat?: DbeCellFormat,
        public infrastructureLocked?: boolean,
        public visibleColumnModels?: ColumnModel[],
        public canBeCompared?: boolean,
        public hasGeneralObjectWritePrivilege?: boolean,
        public isInfrastructureLocked?: boolean,
        public userActionPrivilegesByTableName?: Map<string, Map<string, boolean>>,
        public hasUpdateReportPrivilege?: boolean,
		public warehouseUiType?: WarehouseUiType
    ) {
		this.getMetadata = this.getMetadata.bind(this);
	}

	static create(context: IMetadata) {
		const metadata = new Metadata();
		metadata
			.setColumnModels(context.columnModels)
			.setReportInputParameters(context.reportInputParameters)
			.setSrcConfiguration(context.srsConfiguration)
			.setColorScaling(context.colorScaling)
			.setDefaultSrsConfiguration(context.defaultSrsConfiguration)
			.setTable(context.table)
			.setUrlFilter(context.urlFilter)
			.setCampaignId(context.campaignId)
			.setSourceWarehouseName(context.sourceWarehouseName)
			.setTargetWarehouseName(context.targetWarehouseName)
			.setTableRelatedUserParameters(context.tableRelatedUserParameters)
			.setWarehouseIdHolder(context.warehouseIdHolder)
			.setUserAccessibleWarehouses(context.userAccessibleWarehouses)
			.setDbeCellFormat(context.dbeCellFormat)
			.setInfrastructureLocked(context.infrastructureLocked)
			.setVisibleColumnModels(context.visibleColumnModels)
			.setCanBeCompared(context.canBeCompared)
			.setHasGeneralObjectWritePrivilege(context.hasGeneralObjectWritePrivilege)
			.setIsInfrastructureLocked(context.isInfrastructureLocked)
			.setUserActionPrivilegesByTableName(context.userActionPrivilegesByTableName)
			.setHasUpdateReportPrivilege(context.hasUpdateReportPrivilege)
			.setWarehouseUiType(context.warehouseUiType);
		return metadata;
	}

	public getMetadata(): Metadata {
		return this;
	}

	public getColumnModels(): ColumnModel[] {
		return this.columnModels || [];
	}

	public getVisibleColumnsModel(): ColumnModel[] {
		return this.visibleColumnModels || [];
	}

	public getVisibleColumnsModelSortedByAlphabet(primaryKeys): ColumnModel[] {
		return this.getVisibleColumnsModel()
			.sort((column1, column2) => {
				return column1.getCaption().localeCompare(column2.getCaption());
			})
			.sort((a, b) => {
				return primaryKeys.indexOf(b.getName()) - primaryKeys.indexOf(a.getName())
			});
	}

	public getTable(): DbeTable {
		return this.table;
	}

	public getUserAccessibleWarehouses(): WarehouseShort[] {
		return this.userAccessibleWarehouses;
	}

	public isActionAllowed(tableName, action): boolean {
		const userActionPrivileges = this.userActionPrivilegesByTableName.get(tableName);
		if (userActionPrivileges != null) {
			const isActionAllowed: boolean = userActionPrivileges.get(action);
			return isActionAllowed != null ? isActionAllowed : false;
		}
		return false;
	}

	public getHasGeneralObjectWritePrivilege(): boolean {
		return this.hasGeneralObjectWritePrivilege;
	}

	public getIsInfrastructureLocked(): boolean {
		return this.isInfrastructureLocked;
	}

	public getCanBeCompared(): boolean {
		return this.canBeCompared;
	}

	public canExecuteUpdate() {
		return this.hasUpdateReportPrivilege && this.getTable().getSpName() != null;
	}

	public getWarehouseIdHolder(): WarehouseIdHolder {
		return this.warehouseIdHolder;
	}

	private setColumnModels(columnModels: ColumnModel[] | undefined): Metadata {
		this.columnModels = ColumnModel.createColumnModels(columnModels, this.getMetadata);
		return this;
	}

	private setVisibleColumnModels(columnModels: ColumnModel[] | undefined): Metadata {
		this.visibleColumnModels = ColumnModel.createColumnModels(columnModels, this.getMetadata);
		return this;
	}

	private setReportInputParameters(reportInputParameters: InputParameterModel[] | undefined): Metadata {
		this.reportInputParameters = InputParameterModel.createInputParametersModels(reportInputParameters, this.getMetadata());
		return this;
	}

	private setSrcConfiguration(srsConfiguration: SrsConfiguration[] | undefined): Metadata {
		this.srsConfiguration = srsConfiguration;
		return this;
	}

	private setColorScaling(colorScaling: ColorScaling[] | undefined): Metadata {
		this.colorScaling = colorScaling;
		return this;
	}

	private setDefaultSrsConfiguration(defaultSrsConfiguration: SrsConfiguration | undefined): Metadata {
		this.defaultSrsConfiguration = defaultSrsConfiguration;
		return this;
	}

	private setTable(table: DbeTable | undefined): Metadata {
		this.table = DbeTable.create(table);
		return this;
	}

	private setUrlFilter(urlFilter: FilterGroup | undefined): Metadata {
		this.urlFilter = urlFilter;
		return this;
	}

	private setCampaignId(campaignId: number | undefined): Metadata {
		this.campaignId = campaignId;
		return this;
	}

	private setSourceWarehouseName(sourceWarehouseName: string | undefined): Metadata {
		this.sourceWarehouseName = sourceWarehouseName;
		return this;
	}

	private setTargetWarehouseName(targetWarehouseName: string | undefined): Metadata {
		this.targetWarehouseName = targetWarehouseName;
		return this;
	}

	private setTableRelatedUserParameters(
		tableRelatedUserParameters: TableRelatedUserParameters | undefined,
	): Metadata {
		this.tableRelatedUserParameters = TableRelatedUserParameters.create(tableRelatedUserParameters, this.table.getTableName());
		return this;
	}

	private setWarehouseIdHolder(warehouseIdHolder: WarehouseIdHolder | undefined): Metadata {
		this.warehouseIdHolder = new WarehouseIdHolder(
			warehouseIdHolder.warehouseId,
		);
		return this;
	}

	private setUserAccessibleWarehouses(userAccessibleWarehouses: WarehouseShort[] | undefined): Metadata {
		this.userAccessibleWarehouses = userAccessibleWarehouses;
		return this;
	}

	private setDbeCellFormat(dbeCellFormat: DbeCellFormat | undefined): Metadata {
		this.dbeCellFormat = dbeCellFormat;
		return this;
	}

	private setInfrastructureLocked(infrastructureLocked: boolean | undefined): Metadata {
		this.infrastructureLocked = infrastructureLocked;
		return this;
	}

    private setCanBeCompared(canBeCompared: boolean): Metadata {
        this.canBeCompared = canBeCompared;
        return this;
    }

    private setHasGeneralObjectWritePrivilege(hasGeneralObjectWritePrivilege): Metadata {
        this.hasGeneralObjectWritePrivilege = hasGeneralObjectWritePrivilege;
        return this;
    }

    private setUserActionPrivilegesByTableName(userActionPrivilegesByTableName: { [key: string]: any }): Metadata {
        const privileges: [string, Map<string, boolean>][] = Object.entries(userActionPrivilegesByTableName).map(
            (item) => {
                const [tableName, actions] = item;
                return [tableName, new Map(Object.entries(actions))];
            },
        );
        this.userActionPrivilegesByTableName = new Map(privileges);
        return this;
    }

    private setIsInfrastructureLocked(isInfrastructureLocked: boolean): Metadata {
        this.isInfrastructureLocked = isInfrastructureLocked;
        return this;
    }

    private setHasUpdateReportPrivilege(hasUpdateReportPrivilege): Metadata {
		this.hasUpdateReportPrivilege = hasUpdateReportPrivilege;
		return this;
	}

	private setWarehouseUiType(warehouseUiType): Metadata {
		this.warehouseUiType = warehouseUiType;
		return this;
	}
}

export default Metadata;
