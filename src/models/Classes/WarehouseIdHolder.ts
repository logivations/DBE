/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

class WarehouseIdHolder {
	constructor(public warehouseId?: number) {}

	public getWarehouseId(): number {
		return this.warehouseId;
	}

	public hasWarehouseId() {
		return this.warehouseId != null;
	}
}

export default WarehouseIdHolder;
