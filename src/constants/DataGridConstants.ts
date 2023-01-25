/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

enum RowTypes {
	FILTER = 'filter',
	HEADER = 'header',
	DATA = 'data',
}

enum ValidationTypes {
	ASYNC = 'async',
	REQUIRED = 'required',
	NUMERIC = 'numeric',
	STRING_LENGTH = 'stringLength',
	CUSTOM = 'custom',
}

enum CssClasses {
	INVALID_CELL = 'dx-datagrid-invalid',
}

export { RowTypes, CssClasses, ValidationTypes };
