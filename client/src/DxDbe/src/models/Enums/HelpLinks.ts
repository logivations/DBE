/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

export enum DbeActions {
    EXPORT = 'export',
    IMPORT = 'import',
    CHILD_RECORDS = 'show-child-records',
    PARENT_RECORDS = 'show-parent-records',
    MASSIVE_UPDATE = 'massive_update',
    SETTINGS = 'settings',
    COMPARE_DATA_FROM_OTHER_LAYOUT = 'compare-data-from-other-layout',
    COMPARE_DATA_WITHIN_THIS_LAYOUT = 'compare-data-within-this-layout',
    COMPARE_DATA_BY_CAMPAIGN = 'compare-data-by-campaign',
    HIDDEN_COLUMN_FILTER = 'hidden-columns-filter',
    TABLE_SORTING = 'table-sorting',
    FILTERS = 'filters',
    LINK_WITH_FILTER = 'get-link-filtered-by-selected-rows'
}