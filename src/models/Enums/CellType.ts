/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

enum CellType {
	BLOB_CELL = 'BLOB_CELL',
	CHECK_BOX_CELL = 'CHECK_BOX_CELL',
	COLOR_BOX_CELL = 'COLOR_BOX_CELL',
	DATE_CELL = 'DATE_CELL',
	DROP_DOWN_CELL = 'DROP_DOWN_CELL',
	FOREIGN_KEY_CELL = 'FOREIGN_KEY_CELL',
	MULTI_FOREIGN_KEY_CELL = 'MULTI_FOREIGN_KEY_CELL',
	LARGE_TEXT_CELL = 'LARGE_TEXT_CELL',
	NUMBER_CELL = 'NUMBER_CELL',
	PSEUDO_LIKE_CELL = 'PSEUDO_LIKE_CELL',
	TEXT_CELL = 'TEXT_CELL',
	TIME_CELL = 'TIME_CELL',
	URI_CELL = 'URI_CELL',
	URL_CELL = 'URL_CELL',
}

export default CellType;
