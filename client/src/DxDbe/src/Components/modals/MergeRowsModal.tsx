/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import DataGrid, {Column} from 'devextreme-react/data-grid';
import React, {Fragment, useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {Button} from 'devextreme-react/button';
import translate from '../../i18n/localization';

const MergeRowsModal = ({props, closeModal, setLoading}) => {
    const {selectedRows, tableInstance, handleMergeRows} = props;
    const dataTableRef = useRef<DataGrid>(null);
    const [tableData, setTableData] = useState<any[]>([]);

    const [finalRow, setFinalRow] = useState<any>({});

    const selectedCells = useMemo(() => ({}), []);

    useEffect(() => {
        setTableData(selectedRows);
        setFinalRow(selectedRows[0]);
        setLoading(true);
    }, [selectedRows]);

    const handleCellClick = useCallback((cellObj) => {
        if (cellObj.rowType === 'data') {
            const {
                column: {dataField},
                data,
                rowIndex,
            } = cellObj;
            selectedCells[dataField] = rowIndex;
            setFinalRow((row) => {
                return {...row, [dataField]: data[dataField]};
            });
        }
    }, []);

    const keyExpr = useMemo(() => {
        return tableInstance ? tableInstance.getTableDataModel().getPrimaryKeys() : [];
    }, [tableInstance]);

    return (
        <Fragment>
            <DataGrid
                key={`mergeRows-dataGrid`}
                ref={dataTableRef}
                dataSource={tableData}
                keyExpr={keyExpr}
                allowColumnReordering={false}
                allowColumnResizing={false}
                cellHintEnabled={true}
                showColumnHeaders={true}
                remoteOperations={true}
                cacheEnabled={false}
                rowAlternationEnabled={true}
                showRowLines={true}
                showBorders={true}
                onCellClick={handleCellClick}
                onCellPrepared={(cellData) => {
                    const {
                        column: {dataField},
                        cellElement,
                        rowType,
                        rowIndex,
                    } = cellData;
                    if (rowType === 'data') {
                        if (selectedCells[dataField] === rowIndex) {
                            cellElement.style.backgroundColor = '#E6F5D6';
                        } else if (selectedCells[dataField] === undefined && rowIndex === 0) {
                            cellElement.style.backgroundColor = '#E6F5D6';
                        }
                    }
                }}
            >
                {tableInstance.getTableDataModel().columns.map((column) => {
                    if (!column.getViewModel().isHideOnCLone) {
                        return <Column {...column.getColumnParameters()}>{column.getChildren()}</Column>;
                    }
                    return null;
                })}
            </DataGrid>
            <div className={'dx-field'}>
                <div className={'dx-field-value'}>
                    <Button
                        text={translate('MERGE_ROWS')}
                        type={'normal'}
                        onClick={(e) => handleMergeRows(tableData, finalRow, closeModal)}
                        useSubmitBehavior={false}
                        stylingMode={'contained'}
                    />
                </div>
            </div>
        </Fragment>
    );
};

export default MergeRowsModal;
