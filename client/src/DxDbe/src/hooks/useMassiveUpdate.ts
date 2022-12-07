/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import {useCallback, useEffect, useMemo, useState} from "react";
import {ColumnModel} from "../models/Classes";
import MassUpdateRange, {getConfirmationMessageByRange} from "../models/Enums/MassUpdateRange";
import MassUpdateOperation from "../models/Classes/MassUpdateOperation";
import {confirm} from "devextreme/ui/dialog";
import {parseBoolean} from "../utils/utils";
import communicator from "../api/Communicator";

const useMassiveUpdate = ({executeMassiveUpdate, tableInstance, dbeDxGridInstance, closeModal}) => {
    const [selectedColumn, selectColumn] = useState<ColumnModel>(null);
    const [massUpdateRange, setMassUpdateRange] = useState<MassUpdateRange[]>([MassUpdateRange.ENTIRE_TABLE]);
    const [radioButtonsValue, setRadioButtonsValue] = useState<MassUpdateOperation>(null);
    const [foreignKeyParams, setForeignKeyParamsValue] = useState({});
    const [inputValue, setInputValue] = useState(selectedColumn?.getDefaultValue());
    const tableName = useMemo(() => tableInstance.getTableName(), []);

    useEffect(() => {
        selectedColumn && setRadioButtonsValue(selectedColumn.getMassiveUpdateOperations()[0]);
        selectedColumn && setInputValue(selectedColumn?.getDefaultValue());
    }, [selectedColumn]);
    useEffect(() => {
        (async () => {
            const selectedRowKeys = await dbeDxGridInstance.getSelectedRowKeys();
            const allAppliedFilters = tableInstance.getTableDataModel().getAllAppliedFilters();
            const isSelected = selectedRowKeys.length > 0;
            await communicator.getMassiveDataUpdateRanges(isSelected, allAppliedFilters, tableName).then((ranges) => {
                setMassUpdateRange(ranges);
            });
        })();
    }, []);

    const onInputChange = useCallback(({event}) => {
        const value = event?.target?.value;
        setInputValue(value);
    }, [radioButtonsValue]);
    const handleSubmit = useCallback(
        (e, range) => {
            const confirmed = confirm(getConfirmationMessageByRange(range), 'W2MO');
            confirmed.then((isConfirmed) => {
                if (isConfirmed) {
                    const form = document.forms.namedItem('massiveUpdateForm');
                    const formData = new FormData(form);
                    const parameters = [...formData.entries()].reduce((result, [paramName, value]) => {
                        return { ...result, [paramName]: parseBoolean(value) };
                    }, foreignKeyParams);
                    const updatedRow = radioButtonsValue.toNullOrZeroOperation()
                        ? [{
                            columnName: selectedColumn.getName(),
                            value: radioButtonsValue.toNullOperation() ? null : radioButtonsValue.toZeroOperation() ? 0 : ''
                        }]
                        : Object.entries(parameters).map(([columnName, value]) => ({ columnName, value }));
                    executeMassiveUpdate(radioButtonsValue.getIndexKey(), updatedRow, range, closeModal);
                }
            });
        },
        [selectedColumn, radioButtonsValue, foreignKeyParams],
    );
    const setParameters = useCallback((row, colName, value) => {
        setForeignKeyParamsValue({ ...row, [colName]: value });
    }, []);

    const dbeColumn = useMemo(() => selectedColumn, [selectedColumn]);
    const isInputValid = useMemo<boolean>(() => {
        const parsedValue = parseInt(inputValue, 10);
        if (radioButtonsValue?.isDevideBy()) {
            return !isNaN(parsedValue) && parsedValue !== 0;
        }
        return true;
    }, [inputValue, radioButtonsValue]);
    const isMassiveUpdatePossible = useMemo<boolean>(() => {
        return !(!tableInstance.getTableDataModel().getUniqColumns().length && !!dbeDxGridInstance.getSelectedRowKeys().length);
    }, []);
    const isDisabledApplyButton = useMemo<boolean>(() => {
        return !selectedColumn || !radioButtonsValue || !isMassiveUpdatePossible || !isInputValid;
    }, [selectedColumn, radioButtonsValue, isMassiveUpdatePossible, isInputValid]);

    return {
        selectColumn,
        selectedColumn,
        dbeColumn,
        foreignKeyParams,
        radioButtonsValue,
        setParameters,
        onInputChange,
        setRadioButtonsValue,
        isMassiveUpdatePossible,
        massUpdateRange,
        handleSubmit,
        isDisabledApplyButton
    };
};

export default useMassiveUpdate;