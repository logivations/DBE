/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import DataGrid, { Column, Editing, MasterDetail, Selection } from 'devextreme-react/data-grid';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import ToolbarPanel from '../ToolbarPanel/ToolbarPanel';
import TableInstanceManager from '../../services/TableInstanceManager/TableInstanceManager';
import DetailRecordView from '../DetailView/DetailRecordView';
import Toolbar from 'devextreme-react/toolbar';

import './styles.css';

const CloneSelectedRowsModal = ({ props, closeModal, setLoading }) => {
	const { selectedRows, tableInstance } = props;
	const dataTableRef = useRef<DataGrid>(null);
	const toolbarRef = useRef<Toolbar>(null);
	const [tableData, setTableData] = useState<any[]>([]);

	useEffect(() => {
		const data = selectedRows.map((row) => {
			return Object.entries(row).reduce((configuredRow: object, [name, value]) => {
				const columnModel = tableInstance.getTableDataModel().getColumnModelByName(name);
				if (columnModel) {
					if (columnModel.getViewModel().isHideOnCLone) {
						return configuredRow;
					}
					if (columnModel.getViewModel().isClearOnClone) {
						return { ...configuredRow, [name]: columnModel.getViewModel().getDefaultValue() };
					}
					return { ...configuredRow, [name]: value };
				}
				return configuredRow;
			}, {});
		});
		setTableData(data);
		setLoading(true);
	}, [selectedRows]);

	return (
		<Fragment>
			<ToolbarPanel
				tableType={TableInstanceManager.CLONE_ROW_IN_ORIGINAL_TABLE}
				tableInstance={tableInstance}
				dbeDxGridRef={dataTableRef}
				toolbarRef={toolbarRef}
				closeModal={closeModal}
				saveButtonVisibility={false}
			/>
			<DataGrid
				key={`cloneTable-dataGrid`}
				ref={dataTableRef}
				dataSource={tableData}
				allowColumnReordering={false}
				allowColumnResizing={false}
				cellHintEnabled={true}
				showColumnHeaders={true}
				remoteOperations={true}
				cacheEnabled={false}
				rowAlternationEnabled={true}
				showRowLines={true}
				showBorders={true}
			>
				<Editing mode="cell" allowUpdating={true} refreshMode={'repaint'} startEditAction={'dblClick'} />
				<Selection mode={'multiple'} showCheckBoxesMode={'none'} />
				{tableInstance.getTableDataModel().columns.map((column) => {
					if (!column.getViewModel().isHideOnCLone) {
						return <Column {...column.getColumnParameters()}>{column.getChildren()}</Column>;
					}
					return null;
				})}
				<MasterDetail
					enabled={true}
					component={({ data }) => (
						<DetailRecordView
							{...data}
							dbeDxGridRef={dataTableRef}
							tableInstance={tableInstance}
							id={'detail-row-view'}
						/>
					)}
				/>
			</DataGrid>
		</Fragment>
	);
};

export default CloneSelectedRowsModal;
