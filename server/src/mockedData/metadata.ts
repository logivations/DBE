const metadata = {
    "columnModels": [
        {
            "columnName": "ID_station",
            "columnType": {
                "type": "SMALLINT",
                "maxLength": 0,
                "fraction": 0,
                "isUnsigned": true,
                "isNullable": false
            },
            "primaryKeyOrdinalPosition": 1,
            "isRequired": true,
            "columnViewModel": {
                "isClearOnClone": false,
                "isHideOnCLone": true,
                "isEditable": false,
                "isZeroAsAny": false,
                "width": 30,
                "header": "ID",
                "cellType": "NUMBER_CELL",
                "usedFoAggregation": false,
                "usedForGroupAction": false
            },
            "columnRestriction": {
                "unsigned": true
            },
            "validators": [],
            "position": 0
        },
        {
            "columnName": "text",
            "columnType": {
                "type": "VARCHAR",
                "maxLength": 64,
                "fraction": 0,
                "isUnsigned": false,
                "isNullable": true
            },
            "isRequired": true,
            "columnViewModel": {
                "isClearOnClone": false,
                "isHideOnCLone": false,
                "isEditable": true,
                "isZeroAsAny": false,
                "width": 100,
                "defaultValue": "",
                "header": "Name",
                "cellType": "TEXT_CELL",
                "usedFoAggregation": false,
                "usedForGroupAction": false
            },
            "columnRestriction": {
                "unsigned": false
            },
            "validators": [],
            "position": 0
        },
        {
            "columnName": "description",
            "columnType": {
                "type": "VARCHAR",
                "maxLength": 256,
                "fraction": 0,
                "isUnsigned": false,
                "isNullable": true
            },
            "isRequired": false,
            "columnViewModel": {
                "isClearOnClone": false,
                "isHideOnCLone": false,
                "isEditable": true,
                "isZeroAsAny": false,
                "width": 100,
                "defaultValue": "",
                "header": "Description",
                "cellType": "LARGE_TEXT_CELL",
                "usedFoAggregation": false,
                "usedForGroupAction": false
            },
            "columnRestriction": {
                "unsigned": false
            },
            "validators": [],
            "position": 0
        },
        {
            "columnName": "pos_x",
            "columnType": {
                "type": "FLOAT",
                "maxLength": 0,
                "fraction": 4,
                "isUnsigned": false,
                "isNullable": false
            },
            "isRequired": true,
            "columnViewModel": {
                "isClearOnClone": false,
                "isHideOnCLone": false,
                "isEditable": false,
                "isZeroAsAny": false,
                "width": 60,
                "defaultValue": "0",
                "unit": {
                    "unit": "LG",
                    "measurementAcronym": "m",
                    "abstractParameters": {}
                },
                "header": "Position X",
                "cellType": "NUMBER_CELL",
                "usedFoAggregation": false,
                "usedForGroupAction": false
            },
            "columnRestriction": {
                "unsigned": false
            },
            "validators": [],
            "position": 0
        },
        {
            "columnName": "pos_y",
            "columnType": {
                "type": "FLOAT",
                "maxLength": 0,
                "fraction": 4,
                "isUnsigned": false,
                "isNullable": false
            },
            "isRequired": true,
            "columnViewModel": {
                "isClearOnClone": false,
                "isHideOnCLone": false,
                "isEditable": false,
                "isZeroAsAny": false,
                "width": 60,
                "defaultValue": "0",
                "unit": {
                    "unit": "LG",
                    "measurementAcronym": "m",
                    "abstractParameters": {}
                },
                "header": "Position Y",
                "cellType": "NUMBER_CELL",
                "usedFoAggregation": false,
                "usedForGroupAction": false
            },
            "columnRestriction": {
                "unsigned": false
            },
            "validators": [],
            "position": 0
        },
        {
            "columnName": "size_x",
            "columnType": {
                "type": "FLOAT",
                "maxLength": 0,
                "fraction": 4,
                "isUnsigned": true,
                "isNullable": false
            },
            "isRequired": true,
            "columnViewModel": {
                "isClearOnClone": false,
                "isHideOnCLone": false,
                "isEditable": true,
                "isZeroAsAny": false,
                "width": 40,
                "unit": {
                    "unit": "LG",
                    "measurementAcronym": "m",
                    "abstractParameters": {}
                },
                "header": "Size X",
                "cellType": "NUMBER_CELL",
                "usedFoAggregation": false,
                "usedForGroupAction": false
            },
            "columnRestriction": {
                "unsigned": true
            },
            "validators": [
                {
                    "customValidatorType": "positiveNumber"
                }
            ],
            "position": 0
        },
        {
            "columnName": "size_y",
            "columnType": {
                "type": "FLOAT",
                "maxLength": 0,
                "fraction": 4,
                "isUnsigned": true,
                "isNullable": false
            },
            "isRequired": true,
            "columnViewModel": {
                "isClearOnClone": false,
                "isHideOnCLone": false,
                "isEditable": true,
                "isZeroAsAny": false,
                "width": 40,
                "unit": {
                    "unit": "LG",
                    "measurementAcronym": "m",
                    "abstractParameters": {}
                },
                "header": "Size Y",
                "cellType": "NUMBER_CELL",
                "usedFoAggregation": false,
                "usedForGroupAction": false
            },
            "columnRestriction": {
                "unsigned": true
            },
            "validators": [
                {
                    "customValidatorType": "positiveNumber"
                }
            ],
            "position": 0
        },
        {
            "columnName": "size_z",
            "columnType": {
                "type": "FLOAT",
                "maxLength": 0,
                "fraction": 4,
                "isUnsigned": true,
                "isNullable": false
            },
            "isRequired": true,
            "columnViewModel": {
                "isClearOnClone": false,
                "isHideOnCLone": false,
                "isEditable": true,
                "isZeroAsAny": false,
                "width": 40,
                "unit": {
                    "unit": "LG",
                    "measurementAcronym": "m",
                    "abstractParameters": {}
                },
                "header": "Size Z",
                "cellType": "NUMBER_CELL",
                "usedFoAggregation": false,
                "usedForGroupAction": false
            },
            "columnRestriction": {
                "unsigned": true
            },
            "validators": [
                {
                    "customValidatorType": "positiveNumber"
                }
            ],
            "position": 0
        },
        {
            "columnName": "back_color",
            "columnType": {
                "type": "VARCHAR",
                "maxLength": 64,
                "fraction": 0,
                "isUnsigned": false,
                "isNullable": true
            },
            "isRequired": false,
            "columnViewModel": {
                "isClearOnClone": false,
                "isHideOnCLone": false,
                "isEditable": true,
                "isZeroAsAny": false,
                "width": 40,
                "defaultValue": "#FFF",
                "unit": {
                    "unit": "CLR",
                    "abstractParameters": {}
                },
                "header": "Fill color",
                "cellType": "COLOR_BOX_CELL",
                "usedFoAggregation": false,
                "usedForGroupAction": false
            },
            "columnRestriction": {
                "unsigned": false
            },
            "validators": [],
            "position": 0
        },
        {
            "columnName": "border_color",
            "columnType": {
                "type": "VARCHAR",
                "maxLength": 64,
                "fraction": 0,
                "isUnsigned": false,
                "isNullable": true
            },
            "isRequired": false,
            "columnViewModel": {
                "isClearOnClone": false,
                "isHideOnCLone": false,
                "isEditable": true,
                "isZeroAsAny": false,
                "width": 40,
                "defaultValue": "#000",
                "unit": {
                    "unit": "CLR",
                    "abstractParameters": {}
                },
                "header": "Frame color",
                "cellType": "COLOR_BOX_CELL",
                "usedFoAggregation": false,
                "usedForGroupAction": false
            },
            "columnRestriction": {
                "unsigned": false
            },
            "validators": [],
            "position": 0
        },
        {
            "columnName": "solid",
            "columnType": {
                "type": "BIT",
                "maxLength": 1,
                "fraction": 0,
                "isUnsigned": false,
                "isNullable": false
            },
            "isRequired": true,
            "columnViewModel": {
                "isClearOnClone": false,
                "isHideOnCLone": false,
                "isEditable": true,
                "isZeroAsAny": false,
                "width": 30,
                "defaultValue": "FALSE",
                "unit": {
                    "unit": "BOOL",
                    "abstractParameters": {}
                },
                "header": "Is solid?",
                "hint": "If checked station will be painted in fill color",
                "cellType": "CHECK_BOX_CELL",
                "usedFoAggregation": false,
                "usedForGroupAction": false
            },
            "columnRestriction": {
                "unsigned": false
            },
            "validators": [],
            "position": 0
        },
        {
            "columnName": "express_station",
            "columnType": {
                "type": "TINYINT",
                "maxLength": 0,
                "fraction": 0,
                "isUnsigned": true,
                "isNullable": false
            },
            "isRequired": true,
            "columnViewModel": {
                "isClearOnClone": false,
                "isHideOnCLone": false,
                "isEditable": true,
                "isZeroAsAny": false,
                "width": 100,
                "defaultValue": "0",
                "unit": {
                    "unit": "ENUM",
                    "abstractParameters": {
                        "options": [
                            {
                                "name": "express-station",
                                "key": 0,
                                "alias": "_NONE",
                                "translatedAlias": "(none)",
                                "namePinned": false
                            },
                            {
                                "name": "express-station",
                                "key": 1,
                                "alias": "UNIQUE_ASSIGNMENT",
                                "translatedAlias": "Unique assignment",
                                "namePinned": false
                            },
                            {
                                "name": "express-station",
                                "key": 2,
                                "alias": "DUPLICATE_ASSIGNMENT",
                                "translatedAlias": "Duplicate assignment",
                                "namePinned": false
                            },
                            {
                                "name": "express-station",
                                "key": 3,
                                "alias": "_NUMBER_SINGLE_POSITION_ORDERS",
                                "translatedAlias": "No Single Position Orders",
                                "namePinned": false
                            }
                        ],
                        "format": "express-station"
                    }
                },
                "header": "Express station",
                "hint": "Station for express assignment which will fulfill maximum number of orders to make fast operations",
                "cellType": "DROP_DOWN_CELL",
                "usedFoAggregation": false,
                "usedForGroupAction": false
            },
            "columnRestriction": {
                "unsigned": true
            },
            "validators": [],
            "position": 0
        },
        {
            "columnName": "ID_io_creation",
            "columnType": {
                "type": "SMALLINT",
                "maxLength": 0,
                "fraction": 0,
                "isUnsigned": true,
                "isNullable": true
            },
            "isRequired": false,
            "foreignKeyInfo": {
                "parentTable": "lv_io_creation_defaults",
                "decoratedParentTable": "lv_io_creation_defaults",
                "joinedKeyColumnNames": {
                    "ID_io_creation": "ID_io_creation"
                },
                "parentKeyColumnText": "name",
                "parentTableVisible": true,
                "combineTextAndId": false,
                "zeroAsAny": false
            },
            "columnViewModel": {
                "isClearOnClone": false,
                "isHideOnCLone": false,
                "isEditable": true,
                "isZeroAsAny": false,
                "width": 120,
                "header": "Internal orders creation defaults",
                "hint": "Internal orders creation parameters used in create all internal orders for campaign algorithm",
                "cellType": "FOREIGN_KEY_CELL",
                "usedFoAggregation": false,
                "usedForGroupAction": false
            },
            "columnRestriction": {
                "unsigned": true
            },
            "validators": [],
            "position": 0
        },
        {
            "columnName": "ID_mtm",
            "columnType": {
                "type": "SMALLINT",
                "maxLength": 0,
                "fraction": 0,
                "isUnsigned": true,
                "isNullable": true
            },
            "isRequired": false,
            "foreignKeyInfo": {
                "parentTable": "lv_mtm_defaults",
                "decoratedParentTable": "lv_mtm_defaults",
                "joinedKeyColumnNames": {
                    "ID_mtm": "ID_mtm"
                },
                "parentKeyColumnText": "name",
                "parentTableVisible": true,
                "combineTextAndId": false,
                "zeroAsAny": false
            },
            "columnViewModel": {
                "isClearOnClone": false,
                "isHideOnCLone": false,
                "isEditable": true,
                "isZeroAsAny": false,
                "width": 120,
                "header": "Default motion speeds and times",
                "hint": "Default motion speeds and times parameters used in calculate process times algorithm",
                "cellType": "FOREIGN_KEY_CELL",
                "usedFoAggregation": false,
                "usedForGroupAction": false
            },
            "columnRestriction": {
                "unsigned": true
            },
            "validators": [],
            "position": 0
        },
        {
            "columnName": "on_top",
            "columnType": {
                "type": "SMALLINT",
                "maxLength": 0,
                "fraction": 0,
                "isUnsigned": true,
                "isNullable": true
            },
            "isRequired": false,
            "foreignKeyInfo": {
                "parentTable": "lv_wh_station",
                "decoratedParentTable": "lv_wh_station",
                "joinedKeyColumnNames": {
                    "on_top": "ID_station"
                },
                "parentKeyColumnText": "text",
                "parentTableVisible": true,
                "combineTextAndId": false,
                "zeroAsAny": false
            },
            "columnViewModel": {
                "isClearOnClone": false,
                "isHideOnCLone": false,
                "isEditable": true,
                "isZeroAsAny": false,
                "width": 80,
                "header": "On top",
                "hint": "Station on top of which the current station should be put for further visualization in staple stations function in 3D view",
                "cellType": "FOREIGN_KEY_CELL",
                "usedFoAggregation": false,
                "usedForGroupAction": false
            },
            "columnRestriction": {
                "unsigned": true
            },
            "validators": [
                {
                    "customValidatorType": "onTopTheSameStation"
                }
            ],
            "position": 0
        },
        {
            "columnName": "on_empty_remove_assignment",
            "columnType": {
                "type": "BIT",
                "maxLength": 1,
                "fraction": 0,
                "isUnsigned": false,
                "isNullable": false
            },
            "isRequired": true,
            "columnViewModel": {
                "isClearOnClone": false,
                "isHideOnCLone": false,
                "isEditable": true,
                "isZeroAsAny": false,
                "width": 120,
                "defaultValue": "FALSE",
                "unit": {
                    "unit": "BOOL",
                    "abstractParameters": {}
                },
                "header": "On empty remove assignment",
                "hint": "Removes assignment when no stock is left over after picking in WMS mode",
                "cellType": "CHECK_BOX_CELL",
                "usedFoAggregation": false,
                "usedForGroupAction": false
            },
            "columnRestriction": {
                "unsigned": false
            },
            "validators": [],
            "position": 0
        },
        {
            "columnName": "area",
            "columnType": {
                "type": "VARCHAR",
                "maxLength": 64,
                "fraction": 0,
                "isUnsigned": false,
                "isNullable": true
            },
            "isRequired": false,
            "columnViewModel": {
                "isClearOnClone": false,
                "isHideOnCLone": false,
                "isEditable": true,
                "isZeroAsAny": false,
                "width": 80,
                "header": "Area",
                "hint": "Custom area in the station",
                "cellType": "TEXT_CELL",
                "usedFoAggregation": false,
                "usedForGroupAction": false
            },
            "columnRestriction": {
                "unsigned": false
            },
            "validators": [],
            "position": 0
        },
        {
            "columnName": "keep_size",
            "columnType": {
                "type": "BIT",
                "maxLength": 1,
                "fraction": 0,
                "isUnsigned": false,
                "isNullable": false
            },
            "isRequired": true,
            "columnViewModel": {
                "isClearOnClone": false,
                "isHideOnCLone": false,
                "isEditable": true,
                "isZeroAsAny": false,
                "width": 80,
                "defaultValue": "FALSE",
                "unit": {
                    "unit": "BOOL",
                    "abstractParameters": {}
                },
                "header": "Keep size",
                "hint": "If checked keeps the original station area while resizing the station on the canvas",
                "cellType": "CHECK_BOX_CELL",
                "usedFoAggregation": false,
                "usedForGroupAction": false
            },
            "columnRestriction": {
                "unsigned": false
            },
            "validators": [],
            "position": 0
        },
        {
            "columnName": "ID_station_blob",
            "columnType": {
                "type": "SMALLINT",
                "maxLength": 0,
                "fraction": 0,
                "isUnsigned": true,
                "isNullable": true
            },
            "isRequired": false,
            "foreignKeyInfo": {
                "parentTable": "lv_station_pictures",
                "decoratedParentTable": "lv_station_pictures",
                "joinedKeyColumnNames": {
                    "ID_station_blob": "ID_station_picture"
                },
                "parentKeyColumnText": "ID_station_picture",
                "parentTableVisible": true,
                "combineTextAndId": false,
                "zeroAsAny": false
            },
            "columnViewModel": {
                "isClearOnClone": false,
                "isHideOnCLone": false,
                "isEditable": true,
                "isZeroAsAny": false,
                "width": 80,
                "header": "Station blob",
                "cellType": "FOREIGN_KEY_CELL",
                "usedFoAggregation": false,
                "usedForGroupAction": false
            },
            "columnRestriction": {
                "unsigned": true
            },
            "validators": [],
            "position": 0
        },
        {
            "columnName": "enable_background_image",
            "columnType": {
                "type": "BIT",
                "maxLength": 1,
                "fraction": 0,
                "isUnsigned": false,
                "isNullable": false
            },
            "isRequired": true,
            "columnViewModel": {
                "isClearOnClone": false,
                "isHideOnCLone": false,
                "isEditable": true,
                "isZeroAsAny": false,
                "width": 100,
                "defaultValue": "FALSE",
                "header": "Enable background image",
                "cellType": "CHECK_BOX_CELL",
                "usedFoAggregation": false,
                "usedForGroupAction": false
            },
            "columnRestriction": {
                "unsigned": false
            },
            "validators": [],
            "position": 0
        },
        {
            "columnName": "visualization_type",
            "columnType": {
                "type": "TINYINT",
                "maxLength": 0,
                "fraction": 0,
                "isUnsigned": true,
                "isNullable": false
            },
            "isRequired": true,
            "columnViewModel": {
                "isClearOnClone": false,
                "isHideOnCLone": false,
                "isEditable": true,
                "isZeroAsAny": false,
                "width": 100,
                "defaultValue": "0",
                "unit": {
                    "unit": "ENUM",
                    "abstractParameters": {
                        "options": [
                            {
                                "name": "visualization-type",
                                "key": 0,
                                "alias": "NONE",
                                "translatedAlias": "None",
                                "namePinned": false
                            },
                            {
                                "name": "visualization-type",
                                "key": 1,
                                "alias": "SEMI_TRANSPARENT",
                                "translatedAlias": "Semi-transparent",
                                "namePinned": false
                            },
                            {
                                "name": "visualization-type",
                                "key": 2,
                                "alias": "FILL",
                                "translatedAlias": "Fill",
                                "namePinned": false
                            }
                        ],
                        "format": "visualization-type"
                    }
                },
                "header": "Visualization type",
                "cellType": "DROP_DOWN_CELL",
                "usedFoAggregation": false,
                "usedForGroupAction": false
            },
            "columnRestriction": {
                "unsigned": true
            },
            "validators": [],
            "position": 0
        },
        {
            "columnName": "pos_x_on_top",
            "columnType": {
                "type": "FLOAT",
                "maxLength": 0,
                "fraction": 4,
                "isUnsigned": false,
                "isNullable": false
            },
            "isRequired": true,
            "columnViewModel": {
                "isClearOnClone": false,
                "isHideOnCLone": false,
                "isEditable": true,
                "isZeroAsAny": false,
                "width": 100,
                "defaultValue": "0",
                "header": "Position X on top",
                "cellType": "NUMBER_CELL",
                "usedFoAggregation": false,
                "usedForGroupAction": false
            },
            "columnRestriction": {
                "unsigned": false
            },
            "validators": [],
            "position": 0
        },
        {
            "columnName": "pos_y_on_top",
            "columnType": {
                "type": "FLOAT",
                "maxLength": 0,
                "fraction": 4,
                "isUnsigned": false,
                "isNullable": false
            },
            "isRequired": true,
            "columnViewModel": {
                "isClearOnClone": false,
                "isHideOnCLone": false,
                "isEditable": true,
                "isZeroAsAny": false,
                "width": 100,
                "defaultValue": "0",
                "header": "Position Y on top",
                "cellType": "NUMBER_CELL",
                "usedFoAggregation": false,
                "usedForGroupAction": false
            },
            "columnRestriction": {
                "unsigned": false
            },
            "validators": [],
            "position": 0
        },
        {
            "columnName": "changed",
            "columnType": {
                "type": "TIMESTAMP",
                "maxLength": 0,
                "fraction": 0,
                "isUnsigned": false,
                "isNullable": true
            },
            "isRequired": false,
            "columnViewModel": {
                "isClearOnClone": false,
                "isHideOnCLone": false,
                "isEditable": false,
                "isZeroAsAny": false,
                "width": 110,
                "header": "Changed on",
                "cellType": "DATE_CELL",
                "usedFoAggregation": false,
                "usedForGroupAction": false
            },
            "columnRestriction": {
                "unsigned": false
            },
            "validators": [],
            "position": 0
        },
        {
            "columnName": "ID_user_change",
            "columnType": {
                "type": "SMALLINT",
                "maxLength": 0,
                "fraction": 0,
                "isUnsigned": true,
                "isNullable": true
            },
            "isRequired": false,
            "foreignKeyInfo": {
                "parentTable": "lv_view_user_wh_short",
                "decoratedParentTable": "lv_view_user_wh_short",
                "joinedKeyColumnNames": {
                    "ID_user_change": "ID_user"
                },
                "parentKeyColumnText": "login",
                "parentTableVisible": true,
                "combineTextAndId": false,
                "zeroAsAny": false
            },
            "columnViewModel": {
                "isClearOnClone": false,
                "isHideOnCLone": false,
                "isEditable": false,
                "isZeroAsAny": false,
                "width": 80,
                "header": "By",
                "cellType": "FOREIGN_KEY_CELL",
                "usedFoAggregation": false,
                "usedForGroupAction": false
            },
            "columnRestriction": {
                "unsigned": true
            },
            "validators": [],
            "position": 0
        }
    ],
    "visibleColumnModels": [
        {
            "columnName": "ID_station",
            "columnType": {
                "type": "SMALLINT",
                "maxLength": 0,
                "fraction": 0,
                "isUnsigned": true,
                "isNullable": false
            },
            "primaryKeyOrdinalPosition": 1,
            "isRequired": true,
            "columnViewModel": {
                "isClearOnClone": false,
                "isHideOnCLone": true,
                "isEditable": false,
                "isZeroAsAny": false,
                "width": 30,
                "header": "ID",
                "cellType": "NUMBER_CELL",
                "usedFoAggregation": false,
                "usedForGroupAction": false
            },
            "columnRestriction": {
                "unsigned": true
            },
            "validators": [],
            "position": 0
        },
        {
            "columnName": "text",
            "columnType": {
                "type": "VARCHAR",
                "maxLength": 64,
                "fraction": 0,
                "isUnsigned": false,
                "isNullable": true
            },
            "isRequired": true,
            "columnViewModel": {
                "isClearOnClone": false,
                "isHideOnCLone": false,
                "isEditable": true,
                "isZeroAsAny": false,
                "width": 100,
                "defaultValue": "",
                "header": "Name",
                "cellType": "TEXT_CELL",
                "usedFoAggregation": false,
                "usedForGroupAction": false
            },
            "columnRestriction": {
                "unsigned": false
            },
            "validators": [],
            "position": 0
        },
        {
            "columnName": "description",
            "columnType": {
                "type": "VARCHAR",
                "maxLength": 256,
                "fraction": 0,
                "isUnsigned": false,
                "isNullable": true
            },
            "isRequired": false,
            "columnViewModel": {
                "isClearOnClone": false,
                "isHideOnCLone": false,
                "isEditable": true,
                "isZeroAsAny": false,
                "width": 100,
                "defaultValue": "",
                "header": "Description",
                "cellType": "LARGE_TEXT_CELL",
                "usedFoAggregation": false,
                "usedForGroupAction": false
            },
            "columnRestriction": {
                "unsigned": false
            },
            "validators": [],
            "position": 0
        },
        {
            "columnName": "pos_x",
            "columnType": {
                "type": "FLOAT",
                "maxLength": 0,
                "fraction": 4,
                "isUnsigned": false,
                "isNullable": false
            },
            "isRequired": true,
            "columnViewModel": {
                "isClearOnClone": false,
                "isHideOnCLone": false,
                "isEditable": false,
                "isZeroAsAny": false,
                "width": 60,
                "defaultValue": "0",
                "unit": {
                    "unit": "LG",
                    "measurementAcronym": "m",
                    "abstractParameters": {}
                },
                "header": "Position X",
                "cellType": "NUMBER_CELL",
                "usedFoAggregation": false,
                "usedForGroupAction": false
            },
            "columnRestriction": {
                "unsigned": false
            },
            "validators": [],
            "position": 0
        },
        {
            "columnName": "pos_y",
            "columnType": {
                "type": "FLOAT",
                "maxLength": 0,
                "fraction": 4,
                "isUnsigned": false,
                "isNullable": false
            },
            "isRequired": true,
            "columnViewModel": {
                "isClearOnClone": false,
                "isHideOnCLone": false,
                "isEditable": false,
                "isZeroAsAny": false,
                "width": 60,
                "defaultValue": "0",
                "unit": {
                    "unit": "LG",
                    "measurementAcronym": "m",
                    "abstractParameters": {}
                },
                "header": "Position Y",
                "cellType": "NUMBER_CELL",
                "usedFoAggregation": false,
                "usedForGroupAction": false
            },
            "columnRestriction": {
                "unsigned": false
            },
            "validators": [],
            "position": 0
        },
        {
            "columnName": "size_x",
            "columnType": {
                "type": "FLOAT",
                "maxLength": 0,
                "fraction": 4,
                "isUnsigned": true,
                "isNullable": false
            },
            "isRequired": true,
            "columnViewModel": {
                "isClearOnClone": false,
                "isHideOnCLone": false,
                "isEditable": true,
                "isZeroAsAny": false,
                "width": 40,
                "unit": {
                    "unit": "LG",
                    "measurementAcronym": "m",
                    "abstractParameters": {}
                },
                "header": "Size X",
                "cellType": "NUMBER_CELL",
                "usedFoAggregation": false,
                "usedForGroupAction": false
            },
            "columnRestriction": {
                "unsigned": true
            },
            "validators": [
                {
                    "customValidatorType": "positiveNumber"
                }
            ],
            "position": 0
        },
        {
            "columnName": "size_y",
            "columnType": {
                "type": "FLOAT",
                "maxLength": 0,
                "fraction": 4,
                "isUnsigned": true,
                "isNullable": false
            },
            "isRequired": true,
            "columnViewModel": {
                "isClearOnClone": false,
                "isHideOnCLone": false,
                "isEditable": true,
                "isZeroAsAny": false,
                "width": 40,
                "unit": {
                    "unit": "LG",
                    "measurementAcronym": "m",
                    "abstractParameters": {}
                },
                "header": "Size Y",
                "cellType": "NUMBER_CELL",
                "usedFoAggregation": false,
                "usedForGroupAction": false
            },
            "columnRestriction": {
                "unsigned": true
            },
            "validators": [
                {
                    "customValidatorType": "positiveNumber"
                }
            ],
            "position": 0
        },
        {
            "columnName": "size_z",
            "columnType": {
                "type": "FLOAT",
                "maxLength": 0,
                "fraction": 4,
                "isUnsigned": true,
                "isNullable": false
            },
            "isRequired": true,
            "columnViewModel": {
                "isClearOnClone": false,
                "isHideOnCLone": false,
                "isEditable": true,
                "isZeroAsAny": false,
                "width": 40,
                "unit": {
                    "unit": "LG",
                    "measurementAcronym": "m",
                    "abstractParameters": {}
                },
                "header": "Size Z",
                "cellType": "NUMBER_CELL",
                "usedFoAggregation": false,
                "usedForGroupAction": false
            },
            "columnRestriction": {
                "unsigned": true
            },
            "validators": [
                {
                    "customValidatorType": "positiveNumber"
                }
            ],
            "position": 0
        },
        {
            "columnName": "back_color",
            "columnType": {
                "type": "VARCHAR",
                "maxLength": 64,
                "fraction": 0,
                "isUnsigned": false,
                "isNullable": true
            },
            "isRequired": false,
            "columnViewModel": {
                "isClearOnClone": false,
                "isHideOnCLone": false,
                "isEditable": true,
                "isZeroAsAny": false,
                "width": 40,
                "defaultValue": "#FFF",
                "unit": {
                    "unit": "CLR",
                    "abstractParameters": {}
                },
                "header": "Fill color",
                "cellType": "COLOR_BOX_CELL",
                "usedFoAggregation": false,
                "usedForGroupAction": false
            },
            "columnRestriction": {
                "unsigned": false
            },
            "validators": [],
            "position": 0
        },
        {
            "columnName": "border_color",
            "columnType": {
                "type": "VARCHAR",
                "maxLength": 64,
                "fraction": 0,
                "isUnsigned": false,
                "isNullable": true
            },
            "isRequired": false,
            "columnViewModel": {
                "isClearOnClone": false,
                "isHideOnCLone": false,
                "isEditable": true,
                "isZeroAsAny": false,
                "width": 40,
                "defaultValue": "#000",
                "unit": {
                    "unit": "CLR",
                    "abstractParameters": {}
                },
                "header": "Frame color",
                "cellType": "COLOR_BOX_CELL",
                "usedFoAggregation": false,
                "usedForGroupAction": false
            },
            "columnRestriction": {
                "unsigned": false
            },
            "validators": [],
            "position": 0
        },
        {
            "columnName": "solid",
            "columnType": {
                "type": "BIT",
                "maxLength": 1,
                "fraction": 0,
                "isUnsigned": false,
                "isNullable": false
            },
            "isRequired": true,
            "columnViewModel": {
                "isClearOnClone": false,
                "isHideOnCLone": false,
                "isEditable": true,
                "isZeroAsAny": false,
                "width": 30,
                "defaultValue": "FALSE",
                "unit": {
                    "unit": "BOOL",
                    "abstractParameters": {}
                },
                "header": "Is solid?",
                "hint": "If checked station will be painted in fill color",
                "cellType": "CHECK_BOX_CELL",
                "usedFoAggregation": false,
                "usedForGroupAction": false
            },
            "columnRestriction": {
                "unsigned": false
            },
            "validators": [],
            "position": 0
        },
        {
            "columnName": "express_station",
            "columnType": {
                "type": "TINYINT",
                "maxLength": 0,
                "fraction": 0,
                "isUnsigned": true,
                "isNullable": false
            },
            "isRequired": true,
            "columnViewModel": {
                "isClearOnClone": false,
                "isHideOnCLone": false,
                "isEditable": true,
                "isZeroAsAny": false,
                "width": 100,
                "defaultValue": "0",
                "unit": {
                    "unit": "ENUM",
                    "abstractParameters": {
                        "options": [
                            {
                                "name": "express-station",
                                "key": 0,
                                "alias": "_NONE",
                                "translatedAlias": "(none)",
                                "namePinned": false
                            },
                            {
                                "name": "express-station",
                                "key": 1,
                                "alias": "UNIQUE_ASSIGNMENT",
                                "translatedAlias": "Unique assignment",
                                "namePinned": false
                            },
                            {
                                "name": "express-station",
                                "key": 2,
                                "alias": "DUPLICATE_ASSIGNMENT",
                                "translatedAlias": "Duplicate assignment",
                                "namePinned": false
                            },
                            {
                                "name": "express-station",
                                "key": 3,
                                "alias": "_NUMBER_SINGLE_POSITION_ORDERS",
                                "translatedAlias": "No Single Position Orders",
                                "namePinned": false
                            }
                        ],
                        "format": "express-station"
                    }
                },
                "header": "Express station",
                "hint": "Station for express assignment which will fulfill maximum number of orders to make fast operations",
                "cellType": "DROP_DOWN_CELL",
                "usedFoAggregation": false,
                "usedForGroupAction": false
            },
            "columnRestriction": {
                "unsigned": true
            },
            "validators": [],
            "position": 0
        },
        {
            "columnName": "ID_io_creation",
            "columnType": {
                "type": "SMALLINT",
                "maxLength": 0,
                "fraction": 0,
                "isUnsigned": true,
                "isNullable": true
            },
            "isRequired": false,
            "foreignKeyInfo": {
                "parentTable": "lv_io_creation_defaults",
                "decoratedParentTable": "lv_io_creation_defaults",
                "joinedKeyColumnNames": {
                    "ID_io_creation": "ID_io_creation"
                },
                "parentKeyColumnText": "name",
                "parentTableVisible": true,
                "combineTextAndId": false,
                "zeroAsAny": false
            },
            "columnViewModel": {
                "isClearOnClone": false,
                "isHideOnCLone": false,
                "isEditable": true,
                "isZeroAsAny": false,
                "width": 120,
                "header": "Internal orders creation defaults",
                "hint": "Internal orders creation parameters used in create all internal orders for campaign algorithm",
                "cellType": "FOREIGN_KEY_CELL",
                "usedFoAggregation": false,
                "usedForGroupAction": false
            },
            "columnRestriction": {
                "unsigned": true
            },
            "validators": [],
            "position": 0
        },
        {
            "columnName": "ID_mtm",
            "columnType": {
                "type": "SMALLINT",
                "maxLength": 0,
                "fraction": 0,
                "isUnsigned": true,
                "isNullable": true
            },
            "isRequired": false,
            "foreignKeyInfo": {
                "parentTable": "lv_mtm_defaults",
                "decoratedParentTable": "lv_mtm_defaults",
                "joinedKeyColumnNames": {
                    "ID_mtm": "ID_mtm"
                },
                "parentKeyColumnText": "name",
                "parentTableVisible": true,
                "combineTextAndId": false,
                "zeroAsAny": false
            },
            "columnViewModel": {
                "isClearOnClone": false,
                "isHideOnCLone": false,
                "isEditable": true,
                "isZeroAsAny": false,
                "width": 120,
                "header": "Default motion speeds and times",
                "hint": "Default motion speeds and times parameters used in calculate process times algorithm",
                "cellType": "FOREIGN_KEY_CELL",
                "usedFoAggregation": false,
                "usedForGroupAction": false
            },
            "columnRestriction": {
                "unsigned": true
            },
            "validators": [],
            "position": 0
        },
        {
            "columnName": "on_top",
            "columnType": {
                "type": "SMALLINT",
                "maxLength": 0,
                "fraction": 0,
                "isUnsigned": true,
                "isNullable": true
            },
            "isRequired": false,
            "foreignKeyInfo": {
                "parentTable": "lv_wh_station",
                "decoratedParentTable": "lv_wh_station",
                "joinedKeyColumnNames": {
                    "on_top": "ID_station"
                },
                "parentKeyColumnText": "text",
                "parentTableVisible": true,
                "combineTextAndId": false,
                "zeroAsAny": false
            },
            "columnViewModel": {
                "isClearOnClone": false,
                "isHideOnCLone": false,
                "isEditable": true,
                "isZeroAsAny": false,
                "width": 80,
                "header": "On top",
                "hint": "Station on top of which the current station should be put for further visualization in staple stations function in 3D view",
                "cellType": "FOREIGN_KEY_CELL",
                "usedFoAggregation": false,
                "usedForGroupAction": false
            },
            "columnRestriction": {
                "unsigned": true
            },
            "validators": [
                {
                    "customValidatorType": "onTopTheSameStation"
                }
            ],
            "position": 0
        },
        {
            "columnName": "on_empty_remove_assignment",
            "columnType": {
                "type": "BIT",
                "maxLength": 1,
                "fraction": 0,
                "isUnsigned": false,
                "isNullable": false
            },
            "isRequired": true,
            "columnViewModel": {
                "isClearOnClone": false,
                "isHideOnCLone": false,
                "isEditable": true,
                "isZeroAsAny": false,
                "width": 120,
                "defaultValue": "FALSE",
                "unit": {
                    "unit": "BOOL",
                    "abstractParameters": {}
                },
                "header": "On empty remove assignment",
                "hint": "Removes assignment when no stock is left over after picking in WMS mode",
                "cellType": "CHECK_BOX_CELL",
                "usedFoAggregation": false,
                "usedForGroupAction": false
            },
            "columnRestriction": {
                "unsigned": false
            },
            "validators": [],
            "position": 0
        },
        {
            "columnName": "area",
            "columnType": {
                "type": "VARCHAR",
                "maxLength": 64,
                "fraction": 0,
                "isUnsigned": false,
                "isNullable": true
            },
            "isRequired": false,
            "columnViewModel": {
                "isClearOnClone": false,
                "isHideOnCLone": false,
                "isEditable": true,
                "isZeroAsAny": false,
                "width": 80,
                "header": "Area",
                "hint": "Custom area in the station",
                "cellType": "TEXT_CELL",
                "usedFoAggregation": false,
                "usedForGroupAction": false
            },
            "columnRestriction": {
                "unsigned": false
            },
            "validators": [],
            "position": 0
        },
        {
            "columnName": "keep_size",
            "columnType": {
                "type": "BIT",
                "maxLength": 1,
                "fraction": 0,
                "isUnsigned": false,
                "isNullable": false
            },
            "isRequired": true,
            "columnViewModel": {
                "isClearOnClone": false,
                "isHideOnCLone": false,
                "isEditable": true,
                "isZeroAsAny": false,
                "width": 80,
                "defaultValue": "FALSE",
                "unit": {
                    "unit": "BOOL",
                    "abstractParameters": {}
                },
                "header": "Keep size",
                "hint": "If checked keeps the original station area while resizing the station on the canvas",
                "cellType": "CHECK_BOX_CELL",
                "usedFoAggregation": false,
                "usedForGroupAction": false
            },
            "columnRestriction": {
                "unsigned": false
            },
            "validators": [],
            "position": 0
        },
        {
            "columnName": "ID_station_blob",
            "columnType": {
                "type": "SMALLINT",
                "maxLength": 0,
                "fraction": 0,
                "isUnsigned": true,
                "isNullable": true
            },
            "isRequired": false,
            "foreignKeyInfo": {
                "parentTable": "lv_station_pictures",
                "decoratedParentTable": "lv_station_pictures",
                "joinedKeyColumnNames": {
                    "ID_station_blob": "ID_station_picture"
                },
                "parentKeyColumnText": "ID_station_picture",
                "parentTableVisible": true,
                "combineTextAndId": false,
                "zeroAsAny": false
            },
            "columnViewModel": {
                "isClearOnClone": false,
                "isHideOnCLone": false,
                "isEditable": true,
                "isZeroAsAny": false,
                "width": 80,
                "header": "Station blob",
                "cellType": "FOREIGN_KEY_CELL",
                "usedFoAggregation": false,
                "usedForGroupAction": false
            },
            "columnRestriction": {
                "unsigned": true
            },
            "validators": [],
            "position": 0
        },
        {
            "columnName": "enable_background_image",
            "columnType": {
                "type": "BIT",
                "maxLength": 1,
                "fraction": 0,
                "isUnsigned": false,
                "isNullable": false
            },
            "isRequired": true,
            "columnViewModel": {
                "isClearOnClone": false,
                "isHideOnCLone": false,
                "isEditable": true,
                "isZeroAsAny": false,
                "width": 100,
                "defaultValue": "FALSE",
                "header": "Enable background image",
                "cellType": "CHECK_BOX_CELL",
                "usedFoAggregation": false,
                "usedForGroupAction": false
            },
            "columnRestriction": {
                "unsigned": false
            },
            "validators": [],
            "position": 0
        },
        {
            "columnName": "visualization_type",
            "columnType": {
                "type": "TINYINT",
                "maxLength": 0,
                "fraction": 0,
                "isUnsigned": true,
                "isNullable": false
            },
            "isRequired": true,
            "columnViewModel": {
                "isClearOnClone": false,
                "isHideOnCLone": false,
                "isEditable": true,
                "isZeroAsAny": false,
                "width": 100,
                "defaultValue": "0",
                "unit": {
                    "unit": "ENUM",
                    "abstractParameters": {
                        "options": [
                            {
                                "name": "visualization-type",
                                "key": 0,
                                "alias": "NONE",
                                "translatedAlias": "None",
                                "namePinned": false
                            },
                            {
                                "name": "visualization-type",
                                "key": 1,
                                "alias": "SEMI_TRANSPARENT",
                                "translatedAlias": "Semi-transparent",
                                "namePinned": false
                            },
                            {
                                "name": "visualization-type",
                                "key": 2,
                                "alias": "FILL",
                                "translatedAlias": "Fill",
                                "namePinned": false
                            }
                        ],
                        "format": "visualization-type"
                    }
                },
                "header": "Visualization type",
                "cellType": "DROP_DOWN_CELL",
                "usedFoAggregation": false,
                "usedForGroupAction": false
            },
            "columnRestriction": {
                "unsigned": true
            },
            "validators": [],
            "position": 0
        },
        {
            "columnName": "pos_x_on_top",
            "columnType": {
                "type": "FLOAT",
                "maxLength": 0,
                "fraction": 4,
                "isUnsigned": false,
                "isNullable": false
            },
            "isRequired": true,
            "columnViewModel": {
                "isClearOnClone": false,
                "isHideOnCLone": false,
                "isEditable": true,
                "isZeroAsAny": false,
                "width": 100,
                "defaultValue": "0",
                "header": "Position X on top",
                "cellType": "NUMBER_CELL",
                "usedFoAggregation": false,
                "usedForGroupAction": false
            },
            "columnRestriction": {
                "unsigned": false
            },
            "validators": [],
            "position": 0
        },
        {
            "columnName": "pos_y_on_top",
            "columnType": {
                "type": "FLOAT",
                "maxLength": 0,
                "fraction": 4,
                "isUnsigned": false,
                "isNullable": false
            },
            "isRequired": true,
            "columnViewModel": {
                "isClearOnClone": false,
                "isHideOnCLone": false,
                "isEditable": true,
                "isZeroAsAny": false,
                "width": 100,
                "defaultValue": "0",
                "header": "Position Y on top",
                "cellType": "NUMBER_CELL",
                "usedFoAggregation": false,
                "usedForGroupAction": false
            },
            "columnRestriction": {
                "unsigned": false
            },
            "validators": [],
            "position": 0
        },
        {
            "columnName": "changed",
            "columnType": {
                "type": "TIMESTAMP",
                "maxLength": 0,
                "fraction": 0,
                "isUnsigned": false,
                "isNullable": true
            },
            "isRequired": false,
            "columnViewModel": {
                "isClearOnClone": false,
                "isHideOnCLone": false,
                "isEditable": false,
                "isZeroAsAny": false,
                "width": 110,
                "header": "Changed on",
                "cellType": "DATE_CELL",
                "usedFoAggregation": false,
                "usedForGroupAction": false
            },
            "columnRestriction": {
                "unsigned": false
            },
            "validators": [],
            "position": 0
        },
        {
            "columnName": "ID_user_change",
            "columnType": {
                "type": "SMALLINT",
                "maxLength": 0,
                "fraction": 0,
                "isUnsigned": true,
                "isNullable": true
            },
            "isRequired": false,
            "foreignKeyInfo": {
                "parentTable": "lv_view_user_wh_short",
                "decoratedParentTable": "lv_view_user_wh_short",
                "joinedKeyColumnNames": {
                    "ID_user_change": "ID_user"
                },
                "parentKeyColumnText": "login",
                "parentTableVisible": true,
                "combineTextAndId": false,
                "zeroAsAny": false
            },
            "columnViewModel": {
                "isClearOnClone": false,
                "isHideOnCLone": false,
                "isEditable": false,
                "isZeroAsAny": false,
                "width": 80,
                "header": "By",
                "cellType": "FOREIGN_KEY_CELL",
                "usedFoAggregation": false,
                "usedForGroupAction": false
            },
            "columnRestriction": {
                "unsigned": true
            },
            "validators": [],
            "position": 0
        }
    ],
    "reportInputParameters": [],
    "srsConfiguration": [],
    "colorScaling": [],
    "hasGeneralObjectWritePrivilege": true,
    "hasUpdateReportPrivilege": true,
    "canBeCompared": true,
    "isInfrastructureLocked": false,
    "hasPrimaryKey": true,
    "table": {
        "tableId": 504,
        "tableName": "lv_wh_station",
        "tableSuffix": 0,
        "tableGroupId": 500,
        "name": "STATIONS",
        "namePinned": false,
        "checkViewOutdated": true,
        "visible": true,
        "editable": true,
        "mergeable": false,
        "deletable": true,
        "addable": true,
        "sortingData": [
            {
                "column": "text",
                "orderingType": "ASCENDING"
            }
        ],
        "idStrategy": [
            "create_ID_station"
        ],
        "systemParameters": "ID_user, ID_campaign",
        "parsedUniqueFields": [],
        "concurrent": true,
        "viewMode": "TABLE_BY_DEFAULT",
        "defaultSrs": 0,
        "logsEnabled": false,
        "layoutType": 1,
        "viewRowsByUserId": false,
        "updateOnOpen": false,
        "hidden": false,
        "maxPageSize": 5000,
        "tableGroupRoot": "direct-edit"
    },
    "campaignId": 29033,
    "userActionPrivilegesByTableName": {
        "lv_view_wh_dock": {
            "VIEW": true
        },
        "rep_layout_design_optimization": {
            "VIEW": true
        },
        "rep_initial_bin_fill_level_per_product": {
            "VIEW": true
        },
        "rep_assignment_stations": {
            "VIEW": true
        },
        "rep_load_balancing": {
            "VIEW": true
        },
        "lv_view_user_wh_short": {
            "VIEW": true
        },
        "lv_change_bin_status": {
            "VIEW": true
        },
        "lv_station_pictures": {
            "VIEW": true
        },
        "rep_product_workloads_product_per_bin": {
            "VIEW": true
        },
        "rep_bins": {
            "VIEW": true
        },
        "lv_process_point": {
            "VIEW": true
        },
        "rep_changeover_cycles": {
            "VIEW": true
        },
        "lv_open_handling_unit": {
            "VIEW": true
        },
        "lv_wh_rack": {
            "VIEW": true
        },
        "lv_io_creation_defaults": {
            "VIEW": true
        },
        "lv_changeover": {
            "VIEW": true
        },
        "rep_loadinfo": {
            "VIEW": true
        },
        "lv_mtm_defaults": {
            "VIEW": true
        },
        "rep_assignment_empty_bins": {
            "VIEW": true
        },
        "rep_number_of_bins_stock_coverage": {
            "VIEW": true
        },
        "rep_station_area": {
            "VIEW": true
        },
        "lv_wh_station": {
            "DELETE": true,
            "EXPORT": true,
            "IMPORT": true,
            "EDIT": true,
            "EXECUTE_ACTION": true,
            "VIEW": true,
            "ADD": true,
            "MASSIVE_UPDATE": true
        },
        "lv_view_bins_with_general_bin_type": {
            "VIEW": true
        },
        "rep_assignment_bins": {
            "VIEW": true
        },
        "rep_assignment_racks": {
            "VIEW": true
        },
        "lv_manual_replenish": {
            "VIEW": true
        },
        "rep_initial_bin_fill_level": {
            "VIEW": true
        },
        "lv_receive_buffer_for_station": {
            "VIEW": true
        },
        "lv_view_bins_without_substitute": {
            "VIEW": true
        },
        "lv_view_racks_with_general_bin_type": {
            "VIEW": true
        },
        "lv_wh_bin": {
            "VIEW": true
        }
    },
    "sourceWarehouseName": "Demo 001",
    "tableRelatedUserParameters": {
        "actions": [
            {
                "tableId": 504,
                "actionId": 151,
                "tableName": "lv_wh_station",
                "procedureName": "lv_update_station_positions",
                "systemParameters": [
                    "ID_wh",
                    "ID_user"
                ],
                "selectedRowsNeeded": 0,
                "outputType": 0,
                "confirmationRequired": false,
                "header": "Edit positions",
                "link": "direct-edit/layout/edit-positions",
                "headerPinned": false,
                "isSkipUpToDateCheck": false
            }
        ],
        "filters": [
            {
                "selectedInteractive": false,
                "settingName": "Filter (2)",
                "setting": {
                    "condition": "AND",
                    "criteria": [
                        {
                            "column": "description",
                            "operator": "LIKE",
                            "values": [
                                "%qwe%"
                            ],
                            "interactive": false
                        }
                    ],
                    "sub": []
                },
                "objectId": 1,
                "ownerUserId": 999,
                "isPublic": true,
                "isEditable": true
            },
            {
                "selectedInteractive": false,
                "settingName": "Filter (3)",
                "setting": {
                    "condition": "AND",
                    "criteria": [
                        {
                            "column": "description",
                            "operator": "LIKE",
                            "values": [
                                "%fffff%"
                            ],
                            "interactive": false
                        }
                    ],
                    "sub": []
                },
                "objectId": 2,
                "ownerUserId": 999,
                "isPublic": true,
                "isEditable": true
            },
            {
                "selectedInteractive": false,
                "settingName": "Filter (4)",
                "setting": {
                    "condition": "AND",
                    "criteria": [
                        {
                            "column": "description",
                            "operator": "LIKE",
                            "values": [
                                "%fff%"
                            ],
                            "interactive": false
                        }
                    ],
                    "sub": []
                },
                "objectId": 3,
                "ownerUserId": 999,
                "isPublic": true,
                "isEditable": true
            }
        ],
        "hiddenColumnSettings": [],
        "groupingSettings": [],
        "sortOrderSettings": [],
        "charts": [],
        "tableReference": [],
        "childParentTables": [
            {
                "isChild": true,
                "childTableName": "lv_change_bin_status",
                "localizedChildTableName": "Change bin status",
                "joinedColumnGroups": [
                    {
                        "ID_station": "ID_station"
                    }
                ]
            },
            {
                "isChild": true,
                "childTableName": "lv_changeover",
                "localizedChildTableName": "Create changeover internal orders{ID_station_source}",
                "joinedColumnGroups": [
                    {
                        "ID_station_source": "ID_station"
                    }
                ]
            },
            {
                "isChild": true,
                "childTableName": "lv_changeover",
                "localizedChildTableName": "Create changeover internal orders{ID_station_target}",
                "joinedColumnGroups": [
                    {
                        "ID_station_target": "ID_station"
                    }
                ]
            },
            {
                "isChild": true,
                "childTableName": "lv_manual_replenish",
                "localizedChildTableName": "Manual replenishment",
                "joinedColumnGroups": [
                    {
                        "ID_station": "ID_station"
                    }
                ]
            },
            {
                "isChild": true,
                "childTableName": "lv_open_handling_unit",
                "localizedChildTableName": "Open handling units and make stock available",
                "joinedColumnGroups": [
                    {
                        "ID_station": "ID_station"
                    }
                ]
            },
            {
                "isChild": true,
                "childTableName": "lv_process_point",
                "localizedChildTableName": "Process points",
                "joinedColumnGroups": [
                    {
                        "ID_station": "ID_station"
                    }
                ]
            },
            {
                "isChild": true,
                "childTableName": "lv_receive_buffer_for_station",
                "localizedChildTableName": "Receive buffer for station",
                "joinedColumnGroups": [
                    {
                        "ID_station": "ID_station"
                    }
                ]
            },
            {
                "isChild": true,
                "childTableName": "lv_view_bins_with_general_bin_type",
                "localizedChildTableName": "View bins with general bin type",
                "joinedColumnGroups": [
                    {
                        "ID_station": "ID_station"
                    }
                ]
            },
            {
                "isChild": true,
                "childTableName": "lv_view_bins_without_substitute",
                "localizedChildTableName": "View bin without substitute",
                "joinedColumnGroups": [
                    {
                        "ID_station": "ID_station"
                    }
                ]
            },
            {
                "isChild": true,
                "childTableName": "lv_view_racks_with_general_bin_type",
                "localizedChildTableName": "View racks with general bin type",
                "joinedColumnGroups": [
                    {
                        "ID_station": "ID_station"
                    }
                ]
            },
            {
                "isChild": true,
                "childTableName": "lv_view_wh_dock",
                "localizedChildTableName": "Docks",
                "joinedColumnGroups": [
                    {
                        "ID_station": "ID_station"
                    }
                ]
            },
            {
                "isChild": true,
                "childTableName": "lv_wh_bin",
                "localizedChildTableName": "Bins",
                "joinedColumnGroups": [
                    {
                        "ID_station": "ID_station"
                    }
                ]
            },
            {
                "isChild": true,
                "childTableName": "lv_wh_rack",
                "localizedChildTableName": "Racks",
                "joinedColumnGroups": [
                    {
                        "ID_station": "ID_station"
                    }
                ]
            },
            {
                "isChild": true,
                "childTableName": "lv_wh_station",
                "localizedChildTableName": "Stations",
                "joinedColumnGroups": [
                    {
                        "on_top": "ID_station"
                    }
                ]
            },
            {
                "isChild": true,
                "childTableName": "rep_assignment_bins",
                "localizedChildTableName": "Bins assignment",
                "joinedColumnGroups": [
                    {
                        "ID_station": "ID_station"
                    }
                ]
            },
            {
                "isChild": true,
                "childTableName": "rep_assignment_empty_bins",
                "localizedChildTableName": "Empty bins",
                "joinedColumnGroups": [
                    {
                        "ID_station": "ID_station"
                    }
                ]
            },
            {
                "isChild": true,
                "childTableName": "rep_assignment_racks",
                "localizedChildTableName": "Racks report",
                "joinedColumnGroups": [
                    {
                        "ID_station": "ID_station"
                    }
                ]
            },
            {
                "isChild": true,
                "childTableName": "rep_assignment_stations",
                "localizedChildTableName": "Load by station",
                "joinedColumnGroups": [
                    {
                        "ID_station": "ID_station"
                    }
                ]
            },
            {
                "isChild": true,
                "childTableName": "rep_bins",
                "localizedChildTableName": "Bins / default motion speeds and times",
                "joinedColumnGroups": [
                    {
                        "ID_station": "ID_station"
                    }
                ]
            },
            {
                "isChild": true,
                "childTableName": "rep_changeover_cycles",
                "localizedChildTableName": "Changeover cycles report{source_station}",
                "joinedColumnGroups": [
                    {
                        "source_station": "ID_station"
                    }
                ]
            },
            {
                "isChild": true,
                "childTableName": "rep_changeover_cycles",
                "localizedChildTableName": "Changeover cycles report{target_station}",
                "joinedColumnGroups": [
                    {
                        "target_station": "ID_station"
                    }
                ]
            },
            {
                "isChild": true,
                "childTableName": "rep_initial_bin_fill_level",
                "localizedChildTableName": "Initial bin fill level",
                "joinedColumnGroups": [
                    {
                        "ID_station": "ID_station"
                    }
                ]
            },
            {
                "isChild": true,
                "childTableName": "rep_initial_bin_fill_level_per_product",
                "localizedChildTableName": "Initial bin fill level per product",
                "joinedColumnGroups": [
                    {
                        "ID_station": "ID_station"
                    }
                ]
            },
            {
                "isChild": true,
                "childTableName": "rep_layout_design_optimization",
                "localizedChildTableName": "Layout design optimization{ID_station_pick}",
                "joinedColumnGroups": [
                    {
                        "ID_station_pick": "ID_station"
                    }
                ]
            },
            {
                "isChild": true,
                "childTableName": "rep_layout_design_optimization",
                "localizedChildTableName": "Layout design optimization{ID_station_replenishment}",
                "joinedColumnGroups": [
                    {
                        "ID_station_replenishment": "ID_station"
                    }
                ]
            },
            {
                "isChild": true,
                "childTableName": "rep_load_balancing",
                "localizedChildTableName": "Load balancing",
                "joinedColumnGroups": [
                    {
                        "ID_station": "ID_station"
                    }
                ]
            },
            {
                "isChild": true,
                "childTableName": "rep_loadinfo",
                "localizedChildTableName": "Load info",
                "joinedColumnGroups": [
                    {
                        "ID_station": "ID_station"
                    }
                ]
            },
            {
                "isChild": true,
                "childTableName": "rep_number_of_bins_stock_coverage",
                "localizedChildTableName": "Number of bins by stock coverage",
                "joinedColumnGroups": [
                    {
                        "ID_station": "ID_station"
                    }
                ]
            },
            {
                "isChild": true,
                "childTableName": "rep_product_workloads_product_per_bin",
                "localizedChildTableName": "Detailed workload per product per bin",
                "joinedColumnGroups": [
                    {
                        "ID_station": "ID_station"
                    }
                ]
            },
            {
                "isChild": true,
                "childTableName": "rep_station_area",
                "localizedChildTableName": "Station area",
                "joinedColumnGroups": [
                    {
                        "ID_station": "ID_station"
                    }
                ]
            },
            {
                "isChild": false,
                "childTableName": "lv_io_creation_defaults",
                "localizedChildTableName": "Internal orders creation defaults",
                "joinedColumnGroups": [
                    {
                        "ID_io_creation": "ID_io_creation"
                    }
                ]
            },
            {
                "isChild": false,
                "childTableName": "lv_mtm_defaults",
                "localizedChildTableName": "Default motion speeds and times",
                "joinedColumnGroups": [
                    {
                        "ID_mtm": "ID_mtm"
                    }
                ]
            },
            {
                "isChild": false,
                "childTableName": "lv_wh_station",
                "localizedChildTableName": "Stations",
                "joinedColumnGroups": [
                    {
                        "on_top": "ID_station"
                    }
                ]
            },
            {
                "isChild": false,
                "childTableName": "lv_station_pictures",
                "localizedChildTableName": "Station pictures",
                "joinedColumnGroups": [
                    {
                        "ID_station_blob": "ID_station_picture"
                    }
                ]
            },
            {
                "isChild": false,
                "childTableName": "lv_view_user_wh_short",
                "localizedChildTableName": "W2MO users",
                "joinedColumnGroups": [
                    {
                        "ID_user_change": "ID_user"
                    }
                ]
            }
        ],
        "tabTitle": "LAYOUT_NAME_TABLE_NAME",
        "pageSize": 100,
        "advancedFilterPageSize": 10000,
        "intervalInSeconds": 0,
        "isAutoRefresh": false,
        "isFlexibleToolbarPanel": false,
        "lastSelectionMode": false,
        "allVisibleTables": [
            {
                "name": "ABC_CLASSES",
                "ID_table": 935,
                "table_name": "lv_abc_classes"
            },
            {
                "name": "ABC_CLASSIFICATION",
                "ID_table": 900,
                "table_name": "rep_abc_classification"
            },
            {
                "name": "ABSENCE_REASONS",
                "ID_table": 611,
                "table_name": "lv_person_not_assigned_reason"
            },
            {
                "name": "ACCOUNTS",
                "ID_table": 757,
                "table_name": "lv_crm_accounts"
            },
            {
                "name": "ACS_HOURS_PER_DAY_AND_PERSON",
                "ID_table": 896,
                "table_name": "rep_acs_hours_per_person"
            },
            {
                "name": "ACS_HOURS_PER_MONTH",
                "ID_table": 895,
                "table_name": "rep_compare_acs_hours_per_month"
            },
            {
                "name": "ACTIVITY_BASED_COSTING_OVERVIEW",
                "ID_table": 304,
                "table_name": "rep_abc_overview"
            },
            {
                "name": "ADDITIONAL_EFFORTS_PER_PRODUCT",
                "ID_table": 246,
                "table_name": "rep_additional_efforts_per_product"
            },
            {
                "name": "ADDITIONAL_PROCESSES_STUDY",
                "ID_table": 787,
                "table_name": "lv_additional_times_study"
            },
            {
                "name": "ADDITIONAL_PROCESSES_STUDY_RESULTS",
                "ID_table": 788,
                "table_name": "lv_add_time_study_result"
            },
            {
                "name": "AMR_GOALS",
                "ID_table": 903,
                "table_name": "lv_agv_goals"
            },
            {
                "name": "AMR_NOTIFICATIONS",
                "ID_table": 902,
                "table_name": "lv_agv_errors"
            },
            {
                "name": "AMR_TO_ORDER_PROCESS_COMPATIBILITY",
                "ID_table": 990,
                "table_name": "lv_amr_to_order_process_compatibility"
            },
            {
                "name": "AMR_WAITING_AREA",
                "ID_table": 981,
                "table_name": "lv_amr_waiting_area"
            },
            {
                "name": "APPLICATION_PARAMETERS",
                "ID_table": 558,
                "table_name": "lv_app_params"
            },
            {
                "name": "ARCHIVED_DOCUMENTS",
                "ID_table": 851,
                "table_name": "lv_printed_doc_archive"
            },
            {
                "name": "AREA_AND_BINS_PER_PRODUCT",
                "ID_table": 25,
                "table_name": "rep_bins_per_product"
            },
            {
                "name": "ASSIGNMENTS",
                "ID_table": 501,
                "table_name": "lv_assignment"
            },
            {
                "name": "ASSIGNMENT_DEFAULTS",
                "ID_table": 559,
                "table_name": "lv_assignment_defaults"
            },
            {
                "name": "ASSIGNMENT_OVERVIEW",
                "ID_table": 11,
                "table_name": "rep_assignment_overview"
            },
            {
                "name": "AUTOMATED_MOBILE_ROBOTS",
                "ID_table": 986,
                "table_name": "lv_amr"
            },
            {
                "name": "BANK_INFORMATION",
                "ID_table": 916,
                "table_name": "lv_bank_information"
            },
            {
                "name": "BEST_LINE_FEEDING_STRATEGY",
                "ID_table": 248,
                "table_name": "rep_best_line_feeding_strategy"
            },
            {
                "name": "BILL_OF_MATERIALS",
                "ID_table": 532,
                "table_name": "lv_bom"
            },
            {
                "name": "BILL_OF_MATERIALS_TO_BILL_OF_MATERIALS",
                "ID_table": 533,
                "table_name": "lv_bom_bom"
            },
            {
                "name": "BILL_OF_MATERIALS_WITH_SUBSTITUTES",
                "ID_table": 83,
                "table_name": "rep_bill_of_material"
            },
            {
                "name": "BINS",
                "ID_table": 536,
                "table_name": "lv_wh_bin"
            },
            {
                "name": "BINS_ASSIGNMENT",
                "ID_table": 12,
                "table_name": "rep_assignment_bins"
            },
            {
                "name": "BINS_DEFAULT_MOTION_SPEEDS_AND_TIMES",
                "ID_table": 4,
                "table_name": "rep_bins"
            },
            {
                "name": "BINS_DEMAND",
                "ID_table": 26,
                "table_name": "rep_bins_demand"
            },
            {
                "name": "BIN_CALCULATION",
                "ID_table": 217,
                "table_name": "rep_ldo_bin_calculation"
            },
            {
                "name": "BIN_CLOSEST_COMPONENT",
                "ID_table": 930,
                "table_name": "rep_bin_closest_component"
            },
            {
                "name": "BIN_SIZES_INFORMATION",
                "ID_table": 305,
                "table_name": "rep_bin_sizes_info"
            },
            {
                "name": "BIN_SUBSTITUTES",
                "ID_table": 727,
                "table_name": "lv_wh_bin_substitute"
            },
            {
                "name": "BIN_TYPES",
                "ID_table": 537,
                "table_name": "lv_bin_type"
            },
            {
                "name": "BIN_TYPES_INFORMATION",
                "ID_table": 6,
                "table_name": "rep_bin_types_info"
            },
            {
                "name": "BRAND_LOGOS",
                "ID_table": 849,
                "table_name": "lv_brand_logos"
            },
            {
                "name": "BUFFER_SIZE",
                "ID_table": 245,
                "table_name": "rep_buffer_size"
            },
            {
                "name": "BULK_AREA_RACKS",
                "ID_table": 213,
                "table_name": "rep_bulk_area_racks"
            },
            {
                "name": "CAMERA_COVERAGE_BY_OBJECT_AND_TIME_SLICE",
                "ID_table": 904,
                "table_name": "rep_camera_coverage"
            },
            {
                "name": "CAMERA_COVERAGE_BY_TIME_SLICE",
                "ID_table": 905,
                "table_name": "rep_camera_coverage_by_time_slice"
            },
            {
                "name": "CAMERA_COVERAGE_OVERVIEW",
                "ID_table": 906,
                "table_name": "rep_camera_coverage_overview"
            },
            {
                "name": "CAMPAIGNS",
                "ID_table": 567,
                "table_name": "lv_campaign"
            },
            {
                "name": "CAMPAIGNS_FINANCIALS",
                "ID_table": 60,
                "table_name": "rep_financials"
            },
            {
                "name": "CAMPAIGNS_ORDER_PROFILES",
                "ID_table": 50,
                "table_name": "rep_order_profile"
            },
            {
                "name": "CAMPAIGN_ABC_CLASS",
                "ID_table": 44,
                "table_name": "rep_abc"
            },
            {
                "name": "CAMPAIGN_PRODUCT_ESTIMATES",
                "ID_table": 43,
                "table_name": "rep_prodestim"
            },
            {
                "name": "CAMPAIGN_PRODUCT_TYPES_ESTIMATES",
                "ID_table": 42,
                "table_name": "rep_products"
            },
            {
                "name": "CAPACITY_GROUPS",
                "ID_table": 520,
                "table_name": "lv_cap_group"
            },
            {
                "name": "CAPACITY_GROUP_BREAKS",
                "ID_table": 523,
                "table_name": "lv_break"
            },
            {
                "name": "CAPACITY_GROUP_UNITS",
                "ID_table": 521,
                "table_name": "lv_cap_group_unit"
            },
            {
                "name": "CARRIER",
                "ID_table": 589,
                "table_name": "lv_carrier"
            },
            {
                "name": "CASES_FROM_CUSTOMER_ORDERS",
                "ID_table": 47,
                "table_name": "rep_cartons_by_volume"
            },
            {
                "name": "CASES_FROM_INTERNAL_ORDERS",
                "ID_table": 48,
                "table_name": "rep_cartons_int_ord"
            },
            {
                "name": "CASE_TYPES",
                "ID_table": 505,
                "table_name": "lv_carton_types"
            },
            {
                "name": "CASE_TYPES_FIXED_PRODUCTS",
                "ID_table": 1205,
                "table_name": "lv_case_types_fixed_products"
            },
            {
                "name": "CASE_TYPE_CASE_TYPE_SET_COMPATIBILITY",
                "ID_table": 507,
                "table_name": "lv_carton_type_carton_type_set"
            },
            {
                "name": "CASE_TYPE_SETS",
                "ID_table": 506,
                "table_name": "lv_carton_type_sets"
            },
            {
                "name": "CHANGEOVER_CYCLES_REPORT",
                "ID_table": 16,
                "table_name": "rep_changeover_cycles"
            },
            {
                "name": "CHANGEOVER_GROUP",
                "ID_table": 580,
                "table_name": "lv_co_group"
            },
            {
                "name": "CHANGEOVER_GROUPS_COMPATIBILITY",
                "ID_table": 581,
                "table_name": "lv_co_groups_compatibility"
            },
            {
                "name": "CHANGEOVER_GROUPS_CREATED_INTERNAL_ORDERS",
                "ID_table": 941,
                "table_name": "rep_io_changeover_groups_created_orders"
            },
            {
                "name": "CHANGE_BIN_STATUS",
                "ID_table": 610,
                "table_name": "lv_change_bin_status"
            },
            {
                "name": "CHARGING_STATIONS",
                "ID_table": 961,
                "table_name": "lv_agv_charging_station"
            },
            {
                "name": "CHECK_CASES_FOR_SET_CODE_AND_STABILITY",
                "ID_table": 29,
                "table_name": "rep_case_property_and_stability"
            },
            {
                "name": "CLIENT_INFORMATION",
                "ID_table": 937,
                "table_name": "lv_client_information"
            },
            {
                "name": "COLUMNS_FOR_COMPARE",
                "ID_table": 890,
                "table_name": "lv_view_compare_layout_columns"
            },
            {
                "name": "COMPARE_DATA",
                "ID_table": 792,
                "table_name": "lv_wh_data_compare"
            },
            {
                "name": "CONTACTS",
                "ID_table": 758,
                "table_name": "lv_crm_contacts"
            },
            {
                "name": "CREATE_CHANGEOVER_INTERNAL_ORDERS",
                "ID_table": 607,
                "table_name": "lv_changeover"
            },
            {
                "name": "CREATE_MIXED_BINS",
                "ID_table": 609,
                "table_name": "lv_mixed_bin_relocation"
            },
            {
                "name": "CUSTOM_OBJECT",
                "ID_table": 877,
                "table_name": "lv_custom_object"
            },
            {
                "name": "DEFAULT_BREAKS",
                "ID_table": 524,
                "table_name": "lv_default_break"
            },
            {
                "name": "DEFAULT_MOTION_SPEEDS_AND_TIMES",
                "ID_table": 586,
                "table_name": "lv_mtm_defaults"
            },
            {
                "name": "DELIVERY_NOTE",
                "ID_table": 947,
                "table_name": "lv_delivery_note"
            },
            {
                "name": "DELIVERY_NOTE_ITEMS",
                "ID_table": 948,
                "table_name": "lv_delivery_note_items"
            },
            {
                "name": "DEMAND_FORECASTS",
                "ID_table": 518,
                "table_name": "lv_demand_forecast"
            },
            {
                "name": "DETAILED_COST_PER_ACCOUNT",
                "ID_table": 106,
                "table_name": "rep_detailed_cost_per_account"
            },
            {
                "name": "DETAILED_EFFORTS_PER_INTERNAL_ORDER",
                "ID_table": 17,
                "table_name": "rep_internal_order_efforts"
            },
            {
                "name": "DETAILED_PICK_DISTANCE",
                "ID_table": 927,
                "table_name": "rep_detailed_pick_distance"
            },
            {
                "name": "DETAILED_TRACKED_OBJECT_STATISTICS",
                "ID_table": 929,
                "table_name": "rep_detailed_tracked_object_statistics"
            },
            {
                "name": "DETAILED_WORKLOAD_PER_PRODUCT",
                "ID_table": 23,
                "table_name": "rep_product_workloads"
            },
            {
                "name": "DETAILED_WORKLOAD_PER_PRODUCT_PER_BIN",
                "ID_table": 27,
                "table_name": "rep_product_workloads_product_per_bin"
            },
            {
                "name": "DETAILED_WORKLOAD_PER_PRODUCT_PER_STAGE",
                "ID_table": 24,
                "table_name": "rep_product_workloads_per_stage"
            },
            {
                "name": "DETAILS_VACATION",
                "ID_table": 120,
                "table_name": "rep_vacation_details"
            },
            {
                "name": "DIMENSIONS_MEASUREMENT_HISTORY",
                "ID_table": 955,
                "table_name": "lv_dimensions_measurement_history"
            },
            {
                "name": "DOCKS",
                "ID_table": 113,
                "table_name": "lv_view_wh_dock"
            },
            {
                "name": "DOCUMENT_TYPES",
                "ID_table": 885,
                "table_name": "lv_doc_type_to_doc"
            },
            {
                "name": "DYNAMIC_OBJECT_POSITIONS",
                "ID_table": 569,
                "table_name": "lv_dynamic_obj_pos"
            },
            {
                "name": "DYNAMIC_OBJECT_POSITIONS_ARCHIVE",
                "ID_table": 570,
                "table_name": "lv_dynamic_obj_pos_archive"
            },
            {
                "name": "EMAIL_CONFIGURATIONS",
                "ID_table": 775,
                "table_name": "lv_email_config"
            },
            {
                "name": "EMAIL_EXECUTION_HISTORY",
                "ID_table": 804,
                "table_name": "lv_email_execution_history"
            },
            {
                "name": "EMAIL_QUEUE",
                "ID_table": 776,
                "table_name": "lv_email_queue"
            },
            {
                "name": "EMAIL_TEMPLATES",
                "ID_table": 777,
                "table_name": "lv_email_template"
            },
            {
                "name": "EMPTY_BINS",
                "ID_table": 13,
                "table_name": "rep_assignment_empty_bins"
            },
            {
                "name": "EQUIPMENT",
                "ID_table": 5,
                "table_name": "rep_layout"
            },
            {
                "name": "EQUIPMENT_COST",
                "ID_table": 22,
                "table_name": "rep_equipment_cost"
            },
            {
                "name": "EQUIPMENT_COST_PER_PRODUCT",
                "ID_table": 86,
                "table_name": "rep_equipment_cost_per_product"
            },
            {
                "name": "ESTIMATE",
                "ID_table": 1,
                "table_name": "rep_estimates"
            },
            {
                "name": "ESTIMATES_NO_EXPRESS",
                "ID_table": 101,
                "table_name": "rep_estimates_no_express"
            },
            {
                "name": "ESTIMATES_NO_EXPRESS_NO_MAS",
                "ID_table": 103,
                "table_name": "rep_estimates_no_express_no_mas"
            },
            {
                "name": "EWM_AVAILABLE_QUANTITY_SCWM_AQUA",
                "ID_table": 646,
                "table_name": "lv_sap_stock_level"
            },
            {
                "name": "EWM_BIN_ACCESS_TYPE_SCWM_TBIN_ATT",
                "ID_table": 630,
                "table_name": "lv_sap_bin_access_type"
            },
            {
                "name": "EWM_FIXED_BINS_SCWM_BINMAT",
                "ID_table": 645,
                "table_name": "lv_sap_fixed_bins"
            },
            {
                "name": "EWM_LOCATION_PRODUCT_FOR_LOCATION_WAREHOUSE_SAPAPO_MATLWH",
                "ID_table": 641,
                "table_name": "lv_sap_product_to_warehouse"
            },
            {
                "name": "EWM_PRODUCT_DATA_SAPAPO_MATKEY",
                "ID_table": 637,
                "table_name": "lv_sap_product_data"
            },
            {
                "name": "EWM_PRODUCT_DESCRIPTION_SAPAPO_MATTXT",
                "ID_table": 638,
                "table_name": "lv_sap_product_text"
            },
            {
                "name": "EWM_PRODUCT_UNIT_OF_MEASURE_SAPAPO_MARM",
                "ID_table": 639,
                "table_name": "lv_sap_product_data_units_of_measure"
            },
            {
                "name": "EWM_STORAGE_BINS_SCWM_LAGP",
                "ID_table": 636,
                "table_name": "lv_sap_storage_bins"
            },
            {
                "name": "EWM_STORAGE_BIN_TYPE_SCWM_T303",
                "ID_table": 631,
                "table_name": "lv_sap_storage_bin_type"
            },
            {
                "name": "EWM_STORAGE_SECTION_SCWM_T302",
                "ID_table": 633,
                "table_name": "lv_sap_storage_section"
            },
            {
                "name": "EWM_STORAGE_TYPE_SCWM_T301",
                "ID_table": 632,
                "table_name": "lv_sap_storage_type"
            },
            {
                "name": "EWM_WAREHOUSE_ORDER_SCWM_WHO",
                "ID_table": 642,
                "table_name": "lv_sap_warehouse_order"
            },
            {
                "name": "EWM_WAREHOUSE_TASK_CONFIRMED_SCWM_ORDIM_C",
                "ID_table": 643,
                "table_name": "lv_sap_warehouse_task"
            },
            {
                "name": "EWM_WAREHOUSE_TASK_OPEN_SCWM_ORDIM_O",
                "ID_table": 644,
                "table_name": "lv_sap_warehouse_task_open"
            },
            {
                "name": "EXPORT_LAYOUT",
                "ID_table": 452,
                "table_name": "rep_export_layout_info"
            },
            {
                "name": "FILL_LEVEL_ESTIMATION",
                "ID_table": 962,
                "table_name": "lv_bin_fill_level_estimation"
            },
            {
                "name": "FILL_LEVEL_ESTIMATION_ARCHIVE",
                "ID_table": 963,
                "table_name": "lv_bin_fill_level_estimation_archive"
            },
            {
                "name": "FORECAST_GROUP",
                "ID_table": 593,
                "table_name": "lv_forecast_group"
            },
            {
                "name": "FORKLIFT_USERS",
                "ID_table": 794,
                "table_name": "lv_view_forklift_users"
            },
            {
                "name": "FULFILLED_ORDERS",
                "ID_table": 872,
                "table_name": "lv_wmr_fulfilled_order"
            },
            {
                "name": "FULFILLED_ORDERS_DETECTION",
                "ID_table": 873,
                "table_name": "lv_wmr_fulfilled_order_detection"
            },
            {
                "name": "FULFILLMENT",
                "ID_table": 249,
                "table_name": "rep_fulfillment"
            },
            {
                "name": "FULL_TIME_EQUIVALENT",
                "ID_table": 122,
                "table_name": "rep_full_time_equivalent"
            },
            {
                "name": "FULL_TIME_EQUIVALENT_EXTENDED",
                "ID_table": 123,
                "table_name": "rep_full_time_equivalent_extended"
            },
            {
                "name": "GENERAL_BINS_COMPATIBILITY",
                "ID_table": 979,
                "table_name": "lv_general_bins_compatibility"
            },
            {
                "name": "GENERAL_BREAKS",
                "ID_table": 525,
                "table_name": "lv_general_break"
            },
            {
                "name": "GENERATED_CASES_PER_ORDER",
                "ID_table": 272,
                "table_name": "rep_generated_cases_per_order"
            },
            {
                "name": "GOALS_PROCESSING",
                "ID_table": 980,
                "table_name": "rep_goals_processing_overview"
            },
            {
                "name": "HANDLING_UNITS",
                "ID_table": 514,
                "table_name": "lv_handling_unit"
            },
            {
                "name": "IMAGES",
                "ID_table": 973,
                "table_name": "lv_image"
            },
            {
                "name": "INBOUND_LOCATION_SEARCH",
                "ID_table": 573,
                "table_name": "lv_inbound_location_search"
            },
            {
                "name": "INBOUND_ORDERS_INFO_DAY",
                "ID_table": 53,
                "table_name": "rep_inbound_orderinfo"
            },
            {
                "name": "INCONSISTENCY_SAP_DATA_MESSAGES",
                "ID_table": 82,
                "table_name": "rep_sap_data_check_messages"
            },
            {
                "name": "INITIAL_BIN_FILL_LEVEL",
                "ID_table": 943,
                "table_name": "rep_initial_bin_fill_level"
            },
            {
                "name": "INITIAL_BIN_FILL_LEVEL_PER_PRODUCT",
                "ID_table": 942,
                "table_name": "rep_initial_bin_fill_level_per_product"
            },
            {
                "name": "INITIAL_STOCK_LEVELS",
                "ID_table": 583,
                "table_name": "lv_current_stock_level"
            },
            {
                "name": "INTERNAL_ORDERLINES",
                "ID_table": 513,
                "table_name": "lv_internal_orderline"
            },
            {
                "name": "INTERNAL_ORDERLINES_IN_PROCESS",
                "ID_table": 562,
                "table_name": "lv_internal_orderline_in_process"
            },
            {
                "name": "INTERNAL_ORDERLINES_TOUR",
                "ID_table": 893,
                "table_name": "lv_internal_orderline_all"
            },
            {
                "name": "INTERNAL_ORDERLINES_VIEW",
                "ID_table": 850,
                "table_name": "lv_internal_orderline_virt"
            },
            {
                "name": "INTERNAL_ORDERS",
                "ID_table": 512,
                "table_name": "lv_internal_order"
            },
            {
                "name": "INTERNAL_ORDERS_BY_PICK_HEIGHT",
                "ID_table": 87,
                "table_name": "rep_internal_orders_per_pick_height"
            },
            {
                "name": "INTERNAL_ORDERS_BY_ZONES",
                "ID_table": 940,
                "table_name": "rep_io_by_changeover_group"
            },
            {
                "name": "INTERNAL_ORDERS_CREATION_DEFAULTS",
                "ID_table": 550,
                "table_name": "lv_io_creation_defaults"
            },
            {
                "name": "INTERNAL_ORDERS_EXTRA_INFO",
                "ID_table": 515,
                "table_name": "lv_internalorder_extra_info"
            },
            {
                "name": "INTERNAL_ORDERS_INFO_PER_DAY",
                "ID_table": 59,
                "table_name": "rep_internal_orderinfo"
            },
            {
                "name": "INTERNAL_ORDERS_REFERENCE_GROUP",
                "ID_table": 400,
                "table_name": "rep_internal_orders_reference_group"
            },
            {
                "name": "INTERNAL_ORDERS_TOUR",
                "ID_table": 591,
                "table_name": "lv_view_internal_orders"
            },
            {
                "name": "INTERNAL_ORDERS_WAITING_FOR_STOCK",
                "ID_table": 698,
                "table_name": "lv_view_stock_results"
            },
            {
                "name": "INTERNAL_ORDER_OVERVIEW",
                "ID_table": 73,
                "table_name": "rep_internal_orderoverview"
            },
            {
                "name": "INTERNAL_ORDER_OVERVIEW_BY_TRANSPORT_PROCESS_AND_RACK",
                "ID_table": 938,
                "table_name": "rep_internal_orderoverview_tp_and_rack"
            },
            {
                "name": "INTERNAL_ORDER_OVERVIEW_CONSIDERING_PACKERS",
                "ID_table": 74,
                "table_name": "rep_internal_orderoverview_wo_pallets"
            },
            {
                "name": "INTERNAL_ORDER_REFERENCES",
                "ID_table": 565,
                "table_name": "lv_internal_order_references"
            },
            {
                "name": "INTERNAL_ORDER_SORTING_PARAMETERS",
                "ID_table": 945,
                "table_name": "lv_internalorder_sorting_user_parameters"
            },
            {
                "name": "INTERNAL_ORDER_STATUSES",
                "ID_table": 566,
                "table_name": "lv_internal_order_status_definitions"
            },
            {
                "name": "INTERNAL_ORDER_TOURS",
                "ID_table": 560,
                "table_name": "lv_internal_order_tour"
            },
            {
                "name": "INVOICE",
                "ID_table": 920,
                "table_name": "lv_invoice"
            },
            {
                "name": "INVOICE_CALCULATION",
                "ID_table": 919,
                "table_name": "lv_invoice_calculation"
            },
            {
                "name": "INVOICE_CALCULATION_DEFAULTS",
                "ID_table": 918,
                "table_name": "lv_invoice_calculation_defaults"
            },
            {
                "name": "JOINT_PRODUCT",
                "ID_table": 540,
                "table_name": "lv_joint_products"
            },
            {
                "name": "KEYPOINT_ANNOTATIONS",
                "ID_table": 972,
                "table_name": "lv_keypoint_annotations"
            },
            {
                "name": "LABOR_COSTS",
                "ID_table": 18,
                "table_name": "rep_labor_costs"
            },
            {
                "name": "LABOR_COSTS_HISTORY",
                "ID_table": 564,
                "table_name": "lv_eval_history"
            },
            {
                "name": "LABOR_COSTS_HISTORY_REPORT",
                "ID_table": 3,
                "table_name": "rep_labor_time"
            },
            {
                "name": "LABOR_COSTS_PER_PROCESS_FLOW",
                "ID_table": 109,
                "table_name": "rep_detailed_labor_cost"
            },
            {
                "name": "LANGUAGES",
                "ID_table": 770,
                "table_name": "lv_languages"
            },
            {
                "name": "LAYOUT_DESIGN_OPTIMIZATION",
                "ID_table": 215,
                "table_name": "rep_layout_design_optimization"
            },
            {
                "name": "LAYOUT_DESIGN_SUMMARY",
                "ID_table": 867,
                "table_name": "rep_layout_design_summary"
            },
            {
                "name": "LAYOUT_OWNERSHIP",
                "ID_table": 663,
                "table_name": "lv_wh_ownership"
            },
            {
                "name": "LAYOUT_REPAIR_MESSAGES",
                "ID_table": 141,
                "table_name": "rep_layout_repair_messages"
            },
            {
                "name": "LAYOUT_USER_ACTIVITY",
                "ID_table": 700,
                "table_name": "rep_layout_user_actions"
            },
            {
                "name": "LEVEL_OF_EFFICIENCY",
                "ID_table": 791,
                "table_name": "lv_level_of_efficiency"
            },
            {
                "name": "LINEFEEDING_TIMES",
                "ID_table": 588,
                "table_name": "lv_linefeeding_times"
            },
            {
                "name": "LOAD_BALANCING",
                "ID_table": 19,
                "table_name": "rep_load_balancing"
            },
            {
                "name": "LOAD_BALANCING_FOR_CART_FORKLIFT",
                "ID_table": 21,
                "table_name": "rep_load_balancing_forklift"
            },
            {
                "name": "LOAD_BALANCING_PER_CAPACITY_GROUP",
                "ID_table": 936,
                "table_name": "rep_load_balancing_per_capacity"
            },
            {
                "name": "LOAD_BALANCING_RESULTS",
                "ID_table": 599,
                "table_name": "lv_load_balancing_results"
            },
            {
                "name": "LOAD_BALANCING_SKIPPED_INTERNAL_ORDERLINES",
                "ID_table": 949,
                "table_name": "rep_lb_skipped_internal_orderlines"
            },
            {
                "name": "LOAD_BY_STATION",
                "ID_table": 15,
                "table_name": "rep_assignment_stations"
            },
            {
                "name": "LOAD_INFO",
                "ID_table": 10,
                "table_name": "rep_loadinfo"
            },
            {
                "name": "LOCATION_CANDIDATE_PICTURE",
                "ID_table": 547,
                "table_name": "lv_lno_location_candidate_picture"
            },
            {
                "name": "MANUALLY_CHANGE_STOCK",
                "ID_table": 605,
                "table_name": "lv_manual_change_stock"
            },
            {
                "name": "MANUAL_REPLENISHMENT",
                "ID_table": 603,
                "table_name": "lv_manual_replenish"
            },
            {
                "name": "MARKER_BIN_COMPATIBILITY_FOR_EVENT_CREATION",
                "ID_table": 995,
                "table_name": "lv_marker_bin_compatibility_for_event_creation"
            },
            {
                "name": "MARKER_RACKS",
                "ID_table": 214,
                "table_name": "rep_marker_racks"
            },
            {
                "name": "MAS_PRODUCTS",
                "ID_table": 102,
                "table_name": "rep_mas"
            },
            {
                "name": "ML_MODELS",
                "ID_table": 997,
                "table_name": "lv_ml_model"
            },
            {
                "name": "MONEY_TRANSFER",
                "ID_table": 921,
                "table_name": "rep_money_transfer"
            },
            {
                "name": "MOTION_SPEEDS_AND_TIMES_STUDY",
                "ID_table": 785,
                "table_name": "lv_time_observations"
            },
            {
                "name": "NETWORKS",
                "ID_table": 85,
                "table_name": "rep_sap_networks"
            },
            {
                "name": "NOTIFICATION_CONFIGURATION",
                "ID_table": 996,
                "table_name": "lv_notification_configuration"
            },
            {
                "name": "NOTIFICATION_TYPES",
                "ID_table": 461,
                "table_name": "lv_error_type"
            },
            {
                "name": "NUMBER_OF_BINS_BY_STOCK_COVERAGE",
                "ID_table": 866,
                "table_name": "rep_number_of_bins_stock_coverage"
            },
            {
                "name": "OBJECTS_IN_SECURITY_AREA",
                "ID_table": 993,
                "table_name": "lv_objects_security_area"
            },
            {
                "name": "OBJECT_DRIVEN_DISTANCE",
                "ID_table": 883,
                "table_name": "rep_forklift_driven_distance"
            },
            {
                "name": "OBJECT_IDLE_TIME",
                "ID_table": 898,
                "table_name": "rep_forklift_idle_time"
            },
            {
                "name": "OBJECT_LOST_TRACKS",
                "ID_table": 907,
                "table_name": "rep_forklift_lost_tracks"
            },
            {
                "name": "OBJECT_LOST_TRACKS_HOURLY",
                "ID_table": 908,
                "table_name": "rep_forklift_lost_tracks_hourly"
            },
            {
                "name": "OBJECT_MOVEMENTS_BY_BULK_AREA",
                "ID_table": 882,
                "table_name": "rep_forklift_movements_by_bulk_area"
            },
            {
                "name": "OBSERVED_EVENTS",
                "ID_table": 964,
                "table_name": "lv_or_observed_events"
            },
            {
                "name": "OBSERVED_EVENTS_ARCHIVE",
                "ID_table": 965,
                "table_name": "lv_or_observed_events_archive"
            },
            {
                "name": "OBSERVER_ERRORS",
                "ID_table": 983,
                "table_name": "lv_tracked_object_observer_errors"
            },
            {
                "name": "OPEN_HANDLING_UNITS_AND_MAKE_STOCK_AVAILABLE",
                "ID_table": 606,
                "table_name": "lv_open_handling_unit"
            },
            {
                "name": "ORDERED_PIECES_CASES_PALLETS_PER_PRODUCT",
                "ID_table": 105,
                "table_name": "rep_ordered_quantities_per_product"
            },
            {
                "name": "ORDERLINES",
                "ID_table": 509,
                "table_name": "lv_orderline"
            },
            {
                "name": "ORDERS",
                "ID_table": 508,
                "table_name": "lv_order"
            },
            {
                "name": "ORDERS_WORKLOAD_CALCULATION",
                "ID_table": 876,
                "table_name": "rep_orders_workload_calculation"
            },
            {
                "name": "ORDER_CODES",
                "ID_table": 510,
                "table_name": "lv_order_codes"
            },
            {
                "name": "ORDER_CODE_LINKS",
                "ID_table": 511,
                "table_name": "lv_order_code_links"
            },
            {
                "name": "ORDER_COMPARISON_PER_DAY",
                "ID_table": 924,
                "table_name": "rep_order_comparison_per_day"
            },
            {
                "name": "ORDER_COMPLETION",
                "ID_table": 70,
                "table_name": "rep_ordercompletion"
            },
            {
                "name": "ORDER_COMPLETION_WITHOUT_SINGLE_ORDERS",
                "ID_table": 71,
                "table_name": "rep_ordercompletion_wo_single_orders"
            },
            {
                "name": "ORDER_OVERVIEW",
                "ID_table": 72,
                "table_name": "rep_orderoverview"
            },
            {
                "name": "ORDER_PROCESSES",
                "ID_table": 585,
                "table_name": "lv_order_process"
            },
            {
                "name": "OUTBOUND_ORDERS_INFO_DAY",
                "ID_table": 52,
                "table_name": "rep_orderinfo"
            },
            {
                "name": "OUTLIER_ORDERLINES",
                "ID_table": 75,
                "table_name": "rep_outlier_orderlines"
            },
            {
                "name": "OVERALL_PRODUCTIVITY",
                "ID_table": 92,
                "table_name": "rep_overall_productivity"
            },
            {
                "name": "OVERVIEW_SHIFTS",
                "ID_table": 121,
                "table_name": "rep_overview_shifts"
            },
            {
                "name": "PACKAGE_HIERARCHY",
                "ID_table": 901,
                "table_name": "rep_package_hierarchy"
            },
            {
                "name": "PACKING_STATISTICS_CARRIER_CASE_TYPES",
                "ID_table": 41,
                "table_name": "rep_cost_overview"
            },
            {
                "name": "PACK_SCHEMAS",
                "ID_table": 571,
                "table_name": "lv_cartons_loading"
            },
            {
                "name": "PALLET_TARGETS",
                "ID_table": 999,
                "table_name": "lv_pallet_target"
            },
            {
                "name": "PATHS",
                "ID_table": 535,
                "table_name": "lv_path"
            },
            {
                "name": "PERFORMANCE_REVIEW",
                "ID_table": 664,
                "table_name": "lv_performance_review"
            },
            {
                "name": "PERSONAL_ALLOWANCE",
                "ID_table": 790,
                "table_name": "lv_personal_allowance"
            },
            {
                "name": "PERSONAL_BILLING_DATA",
                "ID_table": 917,
                "table_name": "lv_personal_billing_data"
            },
            {
                "name": "PERSONAL_TIME_OFF",
                "ID_table": 899,
                "table_name": "lv_working_hours_pto"
            },
            {
                "name": "PERSON_RELOCATIONS",
                "ID_table": 526,
                "table_name": "lv_relocate_person"
            },
            {
                "name": "PRICES",
                "ID_table": 587,
                "table_name": "lv_wm_prices"
            },
            {
                "name": "PRINTED_DOCUMENTS",
                "ID_table": 553,
                "table_name": "lv_printed_doc"
            },
            {
                "name": "PRINTED_DOCUMENTS_VIEW",
                "ID_table": 985,
                "table_name": "lv_view_printed_doc"
            },
            {
                "name": "PRINTED_DOCUMENT_ELEMENTS",
                "ID_table": 554,
                "table_name": "lv_printed_doc_element"
            },
            {
                "name": "PROCESS_POINTS",
                "ID_table": 534,
                "table_name": "lv_process_point"
            },
            {
                "name": "PROCESS_STUDY_RESULTS",
                "ID_table": 786,
                "table_name": "lv_observation_result"
            },
            {
                "name": "PROCESS_STUDY_VIDEO",
                "ID_table": 789,
                "table_name": "lv_time_study_videos"
            },
            {
                "name": "PRODUCTION_PROGRAM",
                "ID_table": 874,
                "table_name": "lv_production_program"
            },
            {
                "name": "PRODUCTS",
                "ID_table": 502,
                "table_name": "lv_product"
            },
            {
                "name": "PRODUCTS_BY_LOOK_ALIKE",
                "ID_table": 88,
                "table_name": "rep_products_by_lookalike"
            },
            {
                "name": "PRODUCTS_BY_SET_CODE",
                "ID_table": 89,
                "table_name": "rep_products_by_set_code"
            },
            {
                "name": "PRODUCTS_TO_ADD_TO_INTERNAL_ORDERS",
                "ID_table": 516,
                "table_name": "lv_internal_orders_add_lines"
            },
            {
                "name": "PRODUCT_ASSIGNMENT_CONSTRAINTS",
                "ID_table": 527,
                "table_name": "lv_product_assignment_constraints"
            },
            {
                "name": "PRODUCT_COLUMN_ALIAS",
                "ID_table": 928,
                "table_name": "lv_product_column_alias"
            },
            {
                "name": "PRODUCT_PICTURES",
                "ID_table": 551,
                "table_name": "lv_product_pictures"
            },
            {
                "name": "PRODUCT_PROFILES",
                "ID_table": 51,
                "table_name": "rep_product_profile"
            },
            {
                "name": "PRODUCT_SET_CODE_GROUPS",
                "ID_table": 954,
                "table_name": "lv_product_set_code_group"
            },
            {
                "name": "PRODUCT_SUBSTITUTES",
                "ID_table": 528,
                "table_name": "lv_product_substitute"
            },
            {
                "name": "PRODUCT_TO_BIN_TYPES_COMPATIBILITY",
                "ID_table": 538,
                "table_name": "lv_prod_type_bin_type"
            },
            {
                "name": "PRODUCT_TYPES",
                "ID_table": 529,
                "table_name": "lv_prod_type"
            },
            {
                "name": "PRODUCT_TYPES_PER_ORDER",
                "ID_table": 926,
                "table_name": "rep_prod_types_per_order"
            },
            {
                "name": "PRODUCT_WAVE_MONITOR",
                "ID_table": 495,
                "table_name": "rep_product_wave"
            },
            {
                "name": "PRODUCT_WEIGHT_TOLERANCE_GROUP",
                "ID_table": 530,
                "table_name": "lv_tolerance"
            },
            {
                "name": "PUBLIC_HOLIDAYS",
                "ID_table": 592,
                "table_name": "lv_public_holidays"
            },
            {
                "name": "PUSH_REPLENISHMENT",
                "ID_table": 608,
                "table_name": "lv_push_replenishment"
            },
            {
                "name": "QUERY_TO_MAIL_NOTIFICATION",
                "ID_table": 805,
                "table_name": "lv_query_to_email_notification"
            },
            {
                "name": "QUEUED_DOCUMENTS",
                "ID_table": 886,
                "table_name": "lv_printed_doc_queue"
            },
            {
                "name": "RACKS",
                "ID_table": 531,
                "table_name": "lv_wh_rack"
            },
            {
                "name": "RACKS_REPORT",
                "ID_table": 14,
                "table_name": "rep_assignment_racks"
            },
            {
                "name": "RACK_PICTURES",
                "ID_table": 110,
                "table_name": "lv_rack_pictures"
            },
            {
                "name": "RECEIVE_BUFFER_FOR_STATION",
                "ID_table": 582,
                "table_name": "lv_receive_buffer_for_station"
            },
            {
                "name": "RECOGNITION_HISTORY",
                "ID_table": 992,
                "table_name": "lv_recognition_history"
            },
            {
                "name": "RECOGNITION_ISSUES",
                "ID_table": 959,
                "table_name": "lv_recognition_issues"
            },
            {
                "name": "REFERENCED_INTERNAL_ORDERLINES_PER_CUSTOMER_ORDER",
                "ID_table": 77,
                "table_name": "rep_referenced_iol_per_customer_order"
            },
            {
                "name": "REJECTED_EMAIL_QUEUE",
                "ID_table": 778,
                "table_name": "lv_email_rejected"
            },
            {
                "name": "REJECTED_INTERNAL_ORDER_REASON",
                "ID_table": 944,
                "table_name": "lv_rejected_internalorder_reason"
            },
            {
                "name": "RELEASE_WAVES",
                "ID_table": 604,
                "table_name": "lv_release_waves"
            },
            {
                "name": "REPLENISHMENT",
                "ID_table": 2,
                "table_name": "rep_replenishments"
            },
            {
                "name": "REPLENISHMENT_ORDERS",
                "ID_table": 539,
                "table_name": "lv_view_replenish_internal_order"
            },
            {
                "name": "RIGHTS",
                "ID_table": 662,
                "table_name": "lv_rights"
            },
            {
                "name": "ROLES",
                "ID_table": 660,
                "table_name": "lv_roles"
            },
            {
                "name": "ROLES_AND_RIGHTS",
                "ID_table": 661,
                "table_name": "lv_roles_rights"
            },
            {
                "name": "RUNNING_PROCESSES",
                "ID_table": 303,
                "table_name": "rep_running_mysql_processes"
            },
            {
                "name": "SAP_ASSIGNMENTS",
                "ID_table": 81,
                "table_name": "rep_sap_assignment"
            },
            {
                "name": "SAP_BINS",
                "ID_table": 80,
                "table_name": "rep_sap_bins"
            },
            {
                "name": "SAP_DELIVERY_HEADER_DATA_LIKP",
                "ID_table": 634,
                "table_name": "lv_sap_deliveries_headers"
            },
            {
                "name": "SAP_DELIVERY_ITEM_DATA_LIPS",
                "ID_table": 635,
                "table_name": "lv_sap_deliveries_items"
            },
            {
                "name": "SAP_GENERAL_MATERIAL_MARA",
                "ID_table": 618,
                "table_name": "lv_sap_materials"
            },
            {
                "name": "SAP_MATERIAL_DATA_MARA_MARM_MLGN_MLGT",
                "ID_table": 718,
                "table_name": "lv_sap_material_extended"
            },
            {
                "name": "SAP_MATERIAL_DESCRIPTIONS_MAKT",
                "ID_table": 621,
                "table_name": "lv_sap_materials_description"
            },
            {
                "name": "SAP_PRODUCT_GROUP_MEMBER_ALLOCATIONS_PGMI",
                "ID_table": 649,
                "table_name": "lv_sap_prod_group_member_allocation"
            },
            {
                "name": "SAP_UNITS_OF_MEASURE_FOR_MATERIAL_MARM",
                "ID_table": 619,
                "table_name": "lv_sap_materials_measureunits"
            },
            {
                "name": "SAP_WM_MATERIALS_TO_STORAGE_TYPE_MLGT",
                "ID_table": 720,
                "table_name": "lv_sap_materials_to_storage_type"
            },
            {
                "name": "SAP_WM_MATERIALS_TO_WAREHOUSE_MLGN",
                "ID_table": 719,
                "table_name": "lv_sap_materials_to_warehouse"
            },
            {
                "name": "SAP_WM_QUANTS_LQUA",
                "ID_table": 721,
                "table_name": "lv_sap_quants"
            },
            {
                "name": "SAP_WM_TRANSFER_ORDER_HEADERS_LTAK",
                "ID_table": 722,
                "table_name": "lv_sap_transfer_order_header"
            },
            {
                "name": "SAP_WM_TRANSFER_ORDER_ITEMS_LTAP",
                "ID_table": 723,
                "table_name": "lv_sap_transfer_order_item"
            },
            {
                "name": "SENT_EMAILS",
                "ID_table": 772,
                "table_name": "lv_email_sent"
            },
            {
                "name": "SHIFTS",
                "ID_table": 522,
                "table_name": "lv_shift"
            },
            {
                "name": "SHIPMENT",
                "ID_table": 575,
                "table_name": "lv_shipment"
            },
            {
                "name": "SHIPPING_ADDRESSES",
                "ID_table": 574,
                "table_name": "lv_shipping_address"
            },
            {
                "name": "SHORTEST_PATHS_DISTANCES",
                "ID_table": 934,
                "table_name": "rep_paths_distances"
            },
            {
                "name": "SHOW_PACK_LIST",
                "ID_table": 45,
                "table_name": "rep_show_pack_list"
            },
            {
                "name": "SHOW_PACK_LIST_CASCADED",
                "ID_table": 939,
                "table_name": "rep_io_structure_references_after_cascade_packing"
            },
            {
                "name": "SIMULATED_STOCK_CHANGES",
                "ID_table": 596,
                "table_name": "lv_simulated_stock_changes"
            },
            {
                "name": "SIMULATED_STOCK_PER_BIN",
                "ID_table": 600,
                "table_name": "lv_simulated_stock_per_bin"
            },
            {
                "name": "SIMULATED_STOCK_PER_PRODUCT_PER_BIN",
                "ID_table": 598,
                "table_name": "lv_simulated_stock_per_prod_per_bin"
            },
            {
                "name": "SKIPPED_INTERNAL_ORDERS",
                "ID_table": 49,
                "table_name": "rep_skipped_orders"
            },
            {
                "name": "SKIPPED_PRODUCTS",
                "ID_table": 884,
                "table_name": "rep_ldo_skipped_products"
            },
            {
                "name": "SKIPPED_WAREHOUSE_INTERNAL_ORDERS",
                "ID_table": 125,
                "table_name": "rep_wh_skipped_orders"
            },
            {
                "name": "STACKED_RACKS",
                "ID_table": 91,
                "table_name": "rep_stacked_rack"
            },
            {
                "name": "STAFF",
                "ID_table": 517,
                "table_name": "lv_staff"
            },
            {
                "name": "STAFF_ASSIGNMENT",
                "ID_table": 90,
                "table_name": "rep_staff_assignment"
            },
            {
                "name": "STAFF_PICTURES",
                "ID_table": 601,
                "table_name": "lv_staff_pictures"
            },
            {
                "name": "STATIONS",
                "ID_table": 504,
                "table_name": "lv_wh_station"
            },
            {
                "name": "STATION_AREA",
                "ID_table": 216,
                "table_name": "rep_station_area"
            },
            {
                "name": "STATION_PICTURES",
                "ID_table": 894,
                "table_name": "lv_station_pictures"
            },
            {
                "name": "STOCK_DYNAMICS",
                "ID_table": 584,
                "table_name": "lv_change_in_stock_level"
            },
            {
                "name": "STOCK_LEVELS_PER_PRODUCT_PER_BIN_AT_CAMPAIGN_END",
                "ID_table": 597,
                "table_name": "lv_view_newest_sim_stock_per_prod_per_bin"
            },
            {
                "name": "STOCK_WITHOUT_ASSIGNMENT",
                "ID_table": 112,
                "table_name": "rep_stock_without_assignment"
            },
            {
                "name": "SUMMARY_INVOICE",
                "ID_table": 922,
                "table_name": "rep_summary_invoice"
            },
            {
                "name": "TABLES_FOR_COMPARE",
                "ID_table": 891,
                "table_name": "lv_view_compare_layout_tables"
            },
            {
                "name": "TARGET_BINS_FOR_ORDER_CREATION",
                "ID_table": 994,
                "table_name": "lv_target_bins_for_order_creation"
            },
            {
                "name": "TENANTS",
                "ID_table": 503,
                "table_name": "lv_tenant"
            },
            {
                "name": "TEST_SUITE",
                "ID_table": 451,
                "table_name": "rep_test_suite_extended"
            },
            {
                "name": "TOTAL_COST",
                "ID_table": 306,
                "table_name": "rep_total_cost"
            },
            {
                "name": "TOTAL_MONEY_TRANSFER",
                "ID_table": 923,
                "table_name": "rep_total_money_transfer"
            },
            {
                "name": "TOURS_OVERVIEW",
                "ID_table": 8,
                "table_name": "rep_tours_overview"
            },
            {
                "name": "TRACKED_MARKERS",
                "ID_table": 960,
                "table_name": "lv_tracked_marker"
            },
            {
                "name": "TRACKED_OBJECTS",
                "ID_table": 801,
                "table_name": "lv_tracked_objects"
            },
            {
                "name": "TRACKED_OBJECT_ORDERS",
                "ID_table": 802,
                "table_name": "lv_agv_vehicle_orders"
            },
            {
                "name": "TRACKED_OBJECT_STATE_HISTORY",
                "ID_table": 911,
                "table_name": "rep_tracked_object_state_history"
            },
            {
                "name": "TRACKED_OBJECT_STATISTICS",
                "ID_table": 909,
                "table_name": "rep_tracked_object_statistics"
            },
            {
                "name": "TRACKING_MONITOR",
                "ID_table": 966,
                "table_name": "lv_or_events_tracking_monitor"
            },
            {
                "name": "TRACKING_MONITOR_ARCHIVE",
                "ID_table": 967,
                "table_name": "lv_or_events_tracking_monitor_archive"
            },
            {
                "name": "TRACKING_MONITOR_MESSAGES",
                "ID_table": 969,
                "table_name": "lv_or_tracking_monitor_messages"
            },
            {
                "name": "TRANSPORTERS",
                "ID_table": 542,
                "table_name": "lv_transporter"
            },
            {
                "name": "TRANSPORTER_APPEARANCES",
                "ID_table": 543,
                "table_name": "lv_3d_model_appearance"
            },
            {
                "name": "TRANSPORTER_STATES",
                "ID_table": 925,
                "table_name": "lv_transporter_states"
            },
            {
                "name": "TRANSPORT_PROCESSES",
                "ID_table": 544,
                "table_name": "lv_transport_process"
            },
            {
                "name": "UNASSIGNED_PRODUCTS",
                "ID_table": 20,
                "table_name": "rep_unassigned_prod"
            },
            {
                "name": "UNASSIGNED_STAFF",
                "ID_table": 519,
                "table_name": "lv_person_not_assigned"
            },
            {
                "name": "USER_LOGINS",
                "ID_table": 302,
                "table_name": "rep_user_login_history"
            },
            {
                "name": "USER_NOTES",
                "ID_table": 975,
                "table_name": "lv_wh_notes"
            },
            {
                "name": "USER_TRACKED_OBJECT_COMPATIBILITY",
                "ID_table": 970,
                "table_name": "lv_user_tracked_object_compatibility"
            },
            {
                "name": "USER_TRACKED_OBJECT_TRANSPORT_PROCESS_COMPATIBILITY",
                "ID_table": 971,
                "table_name": "lv_tracked_object_transport_process_compatibility"
            },
            {
                "name": "VACATION",
                "ID_table": 7,
                "table_name": "rep_staff_vacation"
            },
            {
                "name": "VACATION_WISH",
                "ID_table": 594,
                "table_name": "lv_vacation_wish"
            },
            {
                "name": "VEHICLES",
                "ID_table": 576,
                "table_name": "lv_vehicle"
            },
            {
                "name": "VEHICLE_POSITIONS",
                "ID_table": 577,
                "table_name": "lv_vehicle_position"
            },
            {
                "name": "VIEW_BINS_WITH_GENERAL_BIN_TYPE",
                "ID_table": 987,
                "table_name": "lv_view_bins_with_general_bin_type"
            },
            {
                "name": "VIEW_BIN_WITHOUT_SUBSTITUTE",
                "ID_table": 984,
                "table_name": "lv_view_bins_without_substitute"
            },
            {
                "name": "VIEW_RACKS_WITH_GENERAL_BIN_TYPE",
                "ID_table": 988,
                "table_name": "lv_view_racks_with_general_bin_type"
            },
            {
                "name": "VIRTUAL_CASE_BUILDING_TYPES_EXCLUSIONS",
                "ID_table": 548,
                "table_name": "lv_virtual_cartons_disjoint"
            },
            {
                "name": "VIRTUAL_PRODUCTS",
                "ID_table": 500,
                "table_name": "lv_view_product_virt"
            },
            {
                "name": "VIRTUAL_RECOGNITION_UNITS",
                "ID_table": 680,
                "table_name": "lv_wmr_virtual_recognition_units"
            },
            {
                "name": "VIRTUAL_RECOGNITION_UNITS_CONFIGURATIONS",
                "ID_table": 681,
                "table_name": "lv_wmr_virtual_recognition_units_configuration"
            },
            {
                "name": "W2MO_USERS_EXTENDED",
                "ID_table": 769,
                "table_name": "lv_view_user_wh"
            },
            {
                "name": "WAITING_TIMES",
                "ID_table": 244,
                "table_name": "rep_waiting_times"
            },
            {
                "name": "WAREHOUSE",
                "ID_table": 991,
                "table_name": "lv_view_wh"
            },
            {
                "name": "WAREHOUSE_MONITOR_CAMERA",
                "ID_table": 677,
                "table_name": "lv_wmr_camera"
            },
            {
                "name": "WAREHOUSE_MONITOR_CAMERA_MATCHING_POINTS",
                "ID_table": 678,
                "table_name": "lv_wmr_camera_matching_points"
            },
            {
                "name": "WAREHOUSE_MONITOR_VIRTUAL_CAMERA",
                "ID_table": 679,
                "table_name": "lv_wmr_virtual_camera"
            },
            {
                "name": "WM_MASTER_DATA_PLANT_DATA_FOR_MATERIAL_MARC",
                "ID_table": 622,
                "table_name": "lv_sap_plant_materials"
            },
            {
                "name": "WORKDAY_RECORDED",
                "ID_table": 931,
                "table_name": "lv_workday_recorded"
            },
            {
                "name": "WORKFORCE_ASSIGNMENT",
                "ID_table": 54,
                "table_name": "rep_workforce_assignment"
            },
            {
                "name": "WORKING_HOURS",
                "ID_table": 880,
                "table_name": "lv_working_hours"
            },
            {
                "name": "WORKLOAD_PER_VIRTUAL_PRODUCT",
                "ID_table": 104,
                "table_name": "rep_workload_per_virtual_product"
            },
            {
                "name": "WORK_PROCESSES",
                "ID_table": 578,
                "table_name": "lv_work_process"
            },
            {
                "name": "_3D_MODELS",
                "ID_table": 552,
                "table_name": "lv_3d_model"
            },
            {
                "name": "_BIN_TO_EVENT_ACTION",
                "ID_table": 968,
                "table_name": "lv_or_bin_to_event_action"
            },
            {
                "name": "_EFFORTS_PER_INTERNAL_ORDER_CONDENSED",
                "ID_table": 28,
                "table_name": "rep_internal_order_efforts_condensed"
            },
            {
                "name": "_GOALS_PROCESSING_STATISTICS",
                "ID_table": 982,
                "table_name": "rep_goals_processing_statistics"
            },
            {
                "name": "_IMPORT_CASE_TYPES_AND_CASE_TYPE_SETS",
                "ID_table": 854,
                "table_name": "lv_import_case_types_case_sets"
            },
            {
                "name": "_IMPORT_ORDERS_AND_ORDERLINES_COMPLETE",
                "ID_table": 853,
                "table_name": "lv_import_order_lines_prod_comp"
            },
            {
                "name": "_IMPORT_ORDERS_AND_ORDERLINES_SHORT",
                "ID_table": 852,
                "table_name": "lv_import_order_lines_prod_short"
            },
            {
                "name": "_INTERNAL_ORDERS_SKIPPED_ORDERLINES",
                "ID_table": 933,
                "table_name": "rep_io_skipped_internal_orderlines"
            },
            {
                "name": "_INTERNAL_ORDERS_SKIPPED_PRODUCTS",
                "ID_table": 932,
                "table_name": "rep_io_skipped_products"
            },
            {
                "name": "_OBJECT_REP_PARAMS",
                "ID_table": 910,
                "table_name": "lv_forklift_tracking_rep_params"
            },
            {
                "name": "_PACKING_STATISTICS_INTERNAL_ORDERS",
                "ID_table": 40,
                "table_name": "rep_generated_cases"
            },
            {
                "name": "_PRODUCTS_SET",
                "ID_table": 546,
                "table_name": "lv_view_product_set_code"
            },
            {
                "name": "_W2MO_USERS_SHORT",
                "ID_table": 793,
                "table_name": "lv_view_user_wh_short"
            }
        ],
        "dxGridCommonSettings": {
            "columns": {
                "pos_x": {
                    "columnIndex": 3,
                    "selectedFilterOperation": ">",
                    "filterType": "include"
                },
                "pos_y": {
                    "columnIndex": 4,
                    "selectedFilterOperation": "<>"
                },
                "description": {
                    "columnIndex": 2
                }
            },
            "focusedRowIndex": 1,
            "focusedColumnIndex": 0
        }
    },
    "warehouseIdHolder": {
        "warehouseId": 18655
    },
    "userAccessibleWarehouses": [
        {
            "warehouseId": 55585,
            "name": "dbe_massive_update_numeric_units",
            "isOwnWarehouse": true
        },
        {
            "warehouseId": 47394,
            "name": "dbe_trig_update_staff_table",
            "isOwnWarehouse": true
        },
        {
            "warehouseId": 49466,
            "name": "dbe_set_values_to_null",
            "isOwnWarehouse": true
        },
        {
            "warehouseId": 10540,
            "name": "Test",
            "isOwnWarehouse": true
        },
        {
            "warehouseId": 11581,
            "name": "dbe_massive_update_numeric_units",
            "isOwnWarehouse": true
        },
        {
            "warehouseId": 62190,
            "name": "Detailed tracked object statistics",
            "isOwnWarehouse": true
        },
        {
            "warehouseId": 5375,
            "name": "dbe_massive_update_numeric_units",
            "isOwnWarehouse": true
        },
        {
            "warehouseId": 18655,
            "name": "Demo 001",
            "isOwnWarehouse": true
        }
    ],
    "warehouseUiType": 0,
    "childParentTableInfo": []
};

export default JSON.stringify(metadata);