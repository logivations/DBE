/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

enum SelectedRowsNeeded {
	NO_NEED_FOR_SELECTION,
	SELECTED_ACTION_COLUMN_NEEDED,
	SELECTED_ROWS_NEEDED,
	SELECTED_ACTION_COLUMN_WITHOUT_DESELECT_NEEDED,
}

export default SelectedRowsNeeded;
