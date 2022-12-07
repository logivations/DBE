/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

enum ColumnDataType {
	STRING = 'string',
	NUMBER = 'number',
	DATA = 'date',
	BOOLEAN = 'boolean',
	ENUM = 'enum',
	OBJECT = 'object',
	DATETIME = 'datetime',
	FOREIGN_KEY = 'FOREIGN_KEY',
}

export enum CustomColumnDataTypes {
	COLOR_PICKER = 'color',
}

export enum DataType {
	TIME = 'time',
    DATE = 'date',
    TIMESTAMP = 'datetime',
    DATETIME = 'datetime',
}

export default ColumnDataType;
