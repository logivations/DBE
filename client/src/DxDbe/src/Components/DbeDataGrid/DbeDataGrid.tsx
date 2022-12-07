/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import React, {Fragment, lazy, Suspense, useRef} from 'react';
import DataGrid, {
	Column,
	Editing,
	FilterRow,
	HeaderFilter,
	MasterDetail,
	Pager,
	Paging,
	Scrolling,
	Selection,
	Sorting,
	Summary,
	TotalItem,
} from 'devextreme-react/data-grid';

import {useCellPreparing, useDefaultSettings, useTableInstance} from '../../hooks';
import translate from '../../i18n/localization';
import TableInstanceManager from '../../services/TableInstanceManager/TableInstanceManager';
import Loader from '../Loader/Loader';
import Toolbar from 'devextreme-react/toolbar';
import useDbeDataGrid from "./useDbeDataGrid";
import ToolbarPanel from "../ToolbarPanel/ToolbarPanel";
import DxDbeFooter from "../DxDbeFooter/DxDbeFooter";
import '../../styles/general.less';

const DetailRecordView = lazy(() => import(/* webpackChunkName: "DetailRecordView" */ '../DetailView/DetailRecordView'));

const DbeDataGrid = ({tableName, height, isScreenBuilderTable, tableType}) => {
	const dbeDxGridRef = useRef<DataGrid>();
	const toolbarRef = useRef<Toolbar>();

	const {tableInstance, tableInstanceManager} = useTableInstance(tableName);
	const [customizeColumns, onOptionChanged] = useDefaultSettings(tableInstance, dbeDxGridRef, tableName, tableType);
	const {debouncedRefresh, additionalProps} = useDbeDataGrid(tableInstance, dbeDxGridRef, tableInstanceManager, toolbarRef, height);
	const onCellPrepared = useCellPreparing(tableInstance);
	console.log('tableInstance', tableInstance);
	console.log('dbeDxGridRef', dbeDxGridRef);

	if (!tableInstance || height === null) {
		return <Loader message={`${translate('TABLE_LOADING')} ...`}/>;
	}

	return (
		<Fragment>
				<ToolbarPanel
					tableType={isScreenBuilderTable ? TableInstanceManager.SCREEN_BUILDER_TABLE : tableType}
					tableInstance={tableInstance}
					dbeDxGridRef={dbeDxGridRef}
					toolbarRef={toolbarRef}
				/>
				<DataGrid
					width={'100%'}
					key={`${tableName}-dataGrid`}
					ref={dbeDxGridRef}
					dataSource={tableInstance.getCustomStore()}
					hoverStateEnabled={true}
					allowColumnReordering={true}
					allowColumnResizing={true}
					columnResizingMode={'widget'}
					cellHintEnabled={true}
					showColumnHeaders={true}
					remoteOperations={true}
					highlightChanges={true}
					repaintChangesOnly={true}
					cacheEnabled={false}
					rowAlternationEnabled={true}
					showRowLines={true}
					showBorders={true}
					customizeColumns={customizeColumns}
					onInitialized={({component}) => {
						//TODO: remove this piece of shit
						setTimeout(() => {
							component.repaint();
						}, 2000);
					}}
					onOptionChanged={onOptionChanged}
					onSelectionChanged={(e) => debouncedRefresh(e)}
					onCellPrepared={onCellPrepared}
					{...additionalProps}
				>
					<Editing
						mode="cell"
						allowUpdating={tableInstance.isTableEditable}
						refreshMode={'repaint'}
						startEditAction={'dblClick'}
					/>
					<Selection
						mode={tableName === TableInstanceManager.ORIGINAL_TABLE ? 'multiple' : 'single'}
						deferred={false}
						showCheckBoxesMode={'none'}
					/>
					<FilterRow visible={true} />
					<HeaderFilter visible={true} />
					<Scrolling mode="virtual" columnRenderingMode="virtual" rowRenderingMode="virtual" preloadEnabled={true} />
					<Sorting mode="multiple" />
					<Paging defaultPageSize={tableInstance.pageSize || 300} />
					<Pager visible={true} displayMode={'full'} showPageSizeSelector={true} showInfo={false} showNavigationButtons={true} />

					{tableInstance.getTableDataModel().columns.map((column) => {
						return <Column {...column.getColumnParameters()}>{column.getChildren()}</Column>;
					})}

					<Summary>
						{tableInstance.getTableDataModel().columns.reduce((acc, column) => {
							column.getFooterAction() &&
								acc.push(
									<TotalItem
										key={column.getName()}
										column={column.getName()}
										summaryType={column.getFooterAction()}
										customizeText={({ value }) => Number(value).toFixed(3)}
									/>
								);
							return acc;
						}, [])}
					</Summary>
					<MasterDetail
						enabled={true}
						component={({data}) => (
							<Suspense fallback={<div><Loader/></div>}>
								<DetailRecordView {...data} dbeDxGridRef={dbeDxGridRef} tableInstance={tableInstance} id={'detail-row-view'}/>
							</Suspense>
						)}
					/>
				</DataGrid>
				<DxDbeFooter tableInstance={tableInstance} dbeDxGridRef={dbeDxGridRef}/>
		</Fragment>
	);
};

DbeDataGrid.defaultProps = {
	tableName: TableInstanceManager.ORIGINAL_TABLE,
	tableType: TableInstanceManager.ORIGINAL_TABLE,
	isScreenBuilderTable: false,
	height: undefined,
};

export default DbeDataGrid;
