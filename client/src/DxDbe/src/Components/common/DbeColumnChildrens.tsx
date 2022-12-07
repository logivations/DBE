/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import {Lookup, NumericRule} from 'devextreme-react/data-grid';
import {AsyncRule, CustomRule, PatternRule, RequiredRule, StringLengthRule} from 'devextreme-react/validator';
import React from 'react';
import translate from '../../i18n/localization';
import Communicator from '../../api/Communicator';
import Validators from '../../models/Enums/Validators';
import {toSqlDateTimeDDMMYYYYHHMMSS} from '../../utils/sqlDateUtils';
import EditorComponent from '../modals/builders/CustomOperations/EditorComponent';
import NotificationController from "../../services/Notification/NotificationController";
import {Severity} from "../../models/Enums/Notification";

export const getLookupChildrenForColumn = (dataSource, columnName) => {
    return (
		<Lookup
			dataSource={dataSource}
			valueExpr="key"
			displayExpr="translatedAlias"
			key={`lookup-${columnName}`}
			allowClearing={true}
		/>
	);
};

export const getRequiredRule = (columnName) => {
	return <RequiredRule key={`required-${columnName}`} />;
};

export const getNumericRule = (columnName) => {
	return <NumericRule key={`numeric-${columnName}`} />;
};

export const getCustomRule = (maxValue, minValue, isRequired, columnName) => {
	return (
		<CustomRule
			message={translate('VALUE_SHOULD_BE_IN_RANGE_$_$', minValue, maxValue)}
			key={`custom-${columnName}`}
			validationCallback={({ value }) => {
				if (!value && !isRequired) {
					return true;
				} else {
					return value <= parseInt(maxValue) && value >= parseInt(minValue);
				}
			}}
		/>
	);
};

export const getIntegerRule = (columnName) => {
    return (
        <PatternRule
            message={translate('VALUE_SHOULD_BE_INTEGER')}
            key={`pattern-integer-${columnName}`}
            pattern={'^\\d+$'}
        />
    );
};

export const getPatternRuleForFloats = (maxLength, fraction, columnName) => {
	const maxLengthInteger = maxLength - fraction;
	const pattern = `^[\\d+]{0,${maxLengthInteger}}\\.?\\d{0,${fraction}}$`;
	return <PatternRule key={`pattern-${columnName}`} pattern={pattern} message={translate('Data to long')} />;
};

export const getStringLengthRule = (maxLength, columnName) => {
	return (
		<StringLengthRule
			key={`stringLength-${columnName}`}
			max={maxLength}
			message={translate('DATA_IS_TOO_LONG_FOR_COLUMN_$', columnName)}
		/>
	);
};

export function asyncValidationColumn(columnName, validationOption, tableName) {
	return Communicator.validateValueByCustomValidator(columnName, validationOption, tableName);
}

export function asyncValidationInput(paramName, value, actionId, tableName) {
	return Communicator.inputParameterValidation(paramName, value, actionId, tableName);
}

export const getAsyncRuleForInput = (inputName, actionId, getTableName) => {
	const notificationController = new NotificationController();
	return (
		<AsyncRule
			key={`async-${inputName}`}
			reevaluate={false}
			validationCallback={(event) => {
				return new Promise((resolve, reject) => {
					const tableName = getTableName()
					const value = event.value instanceof Date ? toSqlDateTimeDDMMYYYYHHMMSS(event.value) : event.value;
                    asyncValidationInput(inputName, value, actionId, tableName)
                        .then(({success, reason, parameters}) => {
                            !success && (event.rule.message = translate(reason, ...[parameters ? parameters : []]));
                            resolve(success);
                        })
                        .catch(({errorMessage}) => {
							notificationController.createNotification(translate(errorMessage), Severity.ERROR)
                            reject();
                        });
				});
			}}
		/>
	);
};

export const getAsyncRule = (columnName, validationOptionsToActionParams, validator, type, getTableName, rowData = null, ) => {
	return (
		<AsyncRule
			key={`async-${columnName}`}
			reevaluate={false}
			message={translate(Validators[validator])}
			validationCallback={(event) => {
				const { data, value } = event;
				const validationOption = validationOptionsToActionParams(value, columnName, rowData || data);
				return asyncValidationColumn(columnName, validationOption, getTableName());
			}}
		/>
	);
};

export const getEditorComponent = (data, column) => {
	return <EditorComponent data={data} column={column} />;
};


export const getValidationForFilterName = (isNameExists) => {
	return [
		<RequiredRule message={translate('_NONEMPTY_INPUT')} key={'required-filterName'}/>,
		<StringLengthRule max={60} message={translate('FILTER_NAME_SHOULD_CONTAIN_LESS_THAN_60_SYMBOLS')} key={'stringLengthRule-filterName'}/>,
		<CustomRule
			validationCallback={({value}) => {
				const regexp = /((?<![\\])['"])/;
				return !regexp.test(value);
			}}
			message={translate('FILTER_NAME_SHOULD_NOT_CONTAINS_QUOTES')}
			key={'customRule-quotes-filterName'}
		/>,
		<CustomRule
			validationCallback={({value}) => {
				return !isNameExists(value.trim());
			}}
			message={translate('FILTER_NAME_DUPLICATES_ARE_DENIED')}
			key={'customRule-duplicates-filterName'}
		/>
	];
};