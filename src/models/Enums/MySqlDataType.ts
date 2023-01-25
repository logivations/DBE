/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

enum MySqlDataType {
	BIT = 'BIT',
	BOOLEAN = 'BOOLEAN',
	TINYINT = 'TINYINT',
	SMALLINT = 'SMALLINT',
	MEDIUMINT = 'MEDIUMINT',
	INTEGER = 'INTEGER',
	BIGINT = 'BIGINT',
	DECIMAL = 'DECIMAL',
	FLOAT = 'FLOAT',
	DOUBLE = 'DOUBLE',
	DATE = 'DATE',
	TIME = 'TIME',
	DATETIME = 'DATETIME',
	TIMESTAMP = 'TIMESTAMP',
	YEAR = 'YEAR',
	CHAR = 'CHAR',
	VARCHAR = 'VARCHAR',
	BINARY = 'BINARY',
	VARBINARY = 'VARBINARY',
	TINYTEXT = 'TINYTEXT',
	TEXT = 'TEXT',
	MEDIUMTEXT = 'MEDIUMTEXT',
	LONGTEXT = 'LONGTEXT',
	TINYBLOB = 'TINYBLOB',
	BLOB = 'BLOB',
	MEDIUMBLOB = 'MEDIUMBLOB',
	LONGBLOB = 'LONGBLOB',
	ENUM = 'ENUM',
	SET = 'SET',
}

export default MySqlDataType;
