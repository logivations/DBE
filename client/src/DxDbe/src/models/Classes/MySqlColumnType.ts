/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/
import {MySqlDataType} from '../Enums';

class MySqlColumnType {
	constructor(
		public type?: MySqlDataType,
		public fraction?: number,
		public maxLength?: number,
		public isNullable?: boolean,
		public isUnsigned?: boolean,
	) {}

	public get isBoolean() {
		switch (this.type) {
			case MySqlDataType.TINYINT:
			case MySqlDataType.SMALLINT:
			case MySqlDataType.MEDIUMINT:
			case MySqlDataType.BIGINT:
				return this.fraction == 1;
			case MySqlDataType.BIT:
			case MySqlDataType.BOOLEAN:
				return true;
			default:
				return false;
		}
	}

	public get isBlob(): boolean {
		switch (this.type) {
			case MySqlDataType.BLOB:
			case MySqlDataType.TINYBLOB:
			case MySqlDataType.MEDIUMBLOB:
			case MySqlDataType.LONGBLOB:
			case MySqlDataType.TEXT:
			case MySqlDataType.TINYTEXT:
			case MySqlDataType.MEDIUMTEXT:
			case MySqlDataType.LONGTEXT:
				return true;
			default:
				return false;
		}
	}

	public get isFloat(): boolean {
		switch (this.type) {
			case MySqlDataType.FLOAT:
			case MySqlDataType.DECIMAL:
			case MySqlDataType.DOUBLE:
				return true;
			default:
				return false;
		}
	}

	public get isImage(): boolean {
		switch (this.type) {
			case MySqlDataType.BLOB:
			case MySqlDataType.TINYBLOB:
			case MySqlDataType.MEDIUMBLOB:
			case MySqlDataType.LONGBLOB:
				return true;
			default:
				return false;
		}
	}

	public static create(mySqlColumnType: { [key: string]: any } = {}): MySqlColumnType {
		return new MySqlColumnType(
			mySqlColumnType.type,
			mySqlColumnType.fraction,
			mySqlColumnType.maxLength,
			mySqlColumnType.isNullable,
			mySqlColumnType.isUnsigned,
		);
	}
}

export default MySqlColumnType;
