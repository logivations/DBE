/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import translate from '../../../i18n/localization';
import List, { ItemDragging } from 'devextreme-react/list';
import Form, { ButtonItem, GroupItem } from 'devextreme-react/form';
import { ColumnModel } from '../../../models/Classes';

const BuilderHiddenColumn = ({ tableInstance, defaultValue = [], getSettingChanges }) => {
	const primaryKeys = useMemo(() => tableInstance.getTableDataModel().getPrimaryKeys(), []);
	const listRefVisible = useRef<List>();
	const listRefHidden = useRef<List>();
	const listOfColumn = useMemo<ColumnModel[]>(() => {
		return tableInstance.metadata.getVisibleColumnsModelSortedByAlphabet(primaryKeys);
	}, []);

	const [hiddenColumns, setHiddenColumns] = useState<ColumnModel[]>(() => {
		return listOfColumn.filter(({ columnName }) => (defaultValue || []).includes(columnName));
	});
	const [visibleColumns, setVisibleColumns] = useState<ColumnModel[]>(() => {
		return listOfColumn.filter(
			(column) => !hiddenColumns.find(({ columnName }) => columnName === column.columnName),
		);
	});

	const lastColumn = useMemo(() => visibleColumns[visibleColumns.length - 1], [visibleColumns]);

	const [selectedHiddenColumns, setSelectedHiddenColumns] = useState<ColumnModel[]>([]);
	const [selectedVisibleColumns, setSelectedVisibleColumns] = useState<ColumnModel[]>([]);

	useEffect(() => {
		getSettingChanges(hiddenColumns.map(({ columnName }) => columnName));
	}, [hiddenColumns]);

	const deselectAll = useCallback(() => {
		listRefVisible?.current?.instance.unselectAll();
		listRefHidden?.current?.instance.unselectAll();
	}, [listRefHidden, listRefVisible]);

	return (
		<div id={'hidden-column-wrapper'}>
			<Form>
				<GroupItem colCount={2} cssClass={'hidden-column-filter-wrapper'}>
					<GroupItem colSpan={1} colCount={2} alignItemLabels={true} caption={translate('VISIBLE_COLUMNS')}>
						<ButtonItem
							colSpan={1}
							buttonOptions={{
								icon: 'chevronright',
								useSubmitBehavior: false,
								stylingMode: 'text',
								onClick: () => {
									setHiddenColumns((prev) => {
										return [...selectedVisibleColumns, ...prev];
									});
									setVisibleColumns((prev) => {
										return [
											...prev.filter(
												(column) =>
													!selectedVisibleColumns.find(
														({ columnName }) => columnName === column.columnName,
													),
											),
										];
									});
									setSelectedVisibleColumns([]);
									setSelectedHiddenColumns([]);
									deselectAll();
								},
							}}
						/>
						<ButtonItem
							colSpan={1}
							buttonOptions={{
								icon: 'chevrondoubleright',
								useSubmitBehavior: false,
								stylingMode: 'text',
								onClick: () => {
									setHiddenColumns(
										listOfColumn.filter(({ columnName }) => columnName !== lastColumn.columnName),
									);
									setVisibleColumns([lastColumn]);
									deselectAll();
								},
							}}
						/>
					</GroupItem>
					<GroupItem
						colSpan={1}
						colCount={2}
						alignItemLabels={true}
						caption={translate('HIDDEN_COLUMNS')}
						cssClass={'hidden-column-control'}
					>
						<ButtonItem
							colSpan={1}
							buttonOptions={{
								icon: 'chevronleft',
								useSubmitBehavior: false,
								stylingMode: 'text',
								onClick: () => {
									setVisibleColumns((prev) => {
										return [...selectedHiddenColumns, ...prev];
									});
									setHiddenColumns((prev) => {
										return [
											...prev.filter(
												(column) =>
													!selectedHiddenColumns.find(
														({ columnName }) => columnName === column.columnName,
													),
											),
										];
									});
									setSelectedHiddenColumns([]);
									setSelectedVisibleColumns([]);
									deselectAll();
								},
							}}
						/>
						<ButtonItem
							colSpan={1}
							buttonOptions={{
								icon: 'chevrondoubleleft',
								useSubmitBehavior: false,
								stylingMode: 'text',
								onClick: () => {
									setHiddenColumns([]);
									setVisibleColumns([...visibleColumns, ...hiddenColumns]);
									setSelectedHiddenColumns([]);
									setSelectedVisibleColumns([]);
									deselectAll();
								},
							}}
						/>
					</GroupItem>
				</GroupItem>
			</Form>
			<div className="widget-container">
				<List
					height={'450px'}
					width={'50%'}
					dataSource={visibleColumns}
					repaintChangesOnly={true}
					selectionMode={'multiple'}
					displayExpr={(column: ColumnModel) => {
						return column.getHeader();
					}}
					ref={listRefVisible}
					onSelectionChanged={(e) => {
						setSelectedVisibleColumns((prev) => {
							const [addedItem] = e.addedItems;
							const [removedItem] = e.removedItems;
							if (addedItem) {
								return [...prev, addedItem];
							}
							if (removedItem) {
								return [...prev].filter(({ columnName }) => removedItem.columnName !== columnName);
							}
						});
					}}
				>
					<ItemDragging
						allowReordering={false}
						group={'columns'}
						data={'visibleColumns'}
						onAdd={(e) => {
							setVisibleColumns((prev) => {
								return [
									...prev.slice(0, e.toIndex),
									hiddenColumns[e.fromIndex],
									...prev.slice(e.toIndex),
								];
							});
						}}
						onRemove={(e) => {
							if (visibleColumns.length > 1) {
								setVisibleColumns((prev) => {
									return [...prev.slice(0, e.fromIndex), ...prev.slice(e.fromIndex + 1)];
								});
							}
						}}
					/>
				</List>
				<List
					height={'400px'}
					width={'50%'}
					dataSource={hiddenColumns}
					repaintChangesOnly={true}
					displayExpr={(column: ColumnModel) => {
						return column.getHeader();
					}}
					ref={listRefHidden}
					selectionMode={'multiple'}
					onSelectionChanged={(e) => {
						setSelectedHiddenColumns((prev) => {
							const [addedItem] = e.addedItems;
							const [removedItem] = e.removedItems;
							if (addedItem) {
								return [...prev, addedItem];
							}
							if (removedItem) {
								return [...prev].filter(({ columnName }) => removedItem.columnName !== columnName);
							}
						});
					}}
					pageLoadMode={'scrollBottom'}
				>
					<ItemDragging
						allowReordering={false}
						group={'columns'}
						data={'hiddenColumns'}
						onAdd={(e) => {
							setHiddenColumns((prev) => {
								return [
									...prev.slice(0, e.toIndex),
									visibleColumns[e.fromIndex],
									...prev.slice(e.toIndex),
								];
							});
						}}
						onRemove={(e) => {
							setHiddenColumns((prev) => {
								return [...prev.slice(0, e.fromIndex), ...prev.slice(e.fromIndex + 1)];
							});
						}}
					/>
				</List>
			</div>
		</div>
	);
};

export default BuilderHiddenColumn;
