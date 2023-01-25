/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import React, { useMemo } from 'react';
import  translate from '../../../i18n/localization';
import { OrderingType } from '../../../models/Enums';
import Form, { ButtonItem, RequiredRule, SimpleItem } from 'devextreme-react/form';
import InputType from '../../../models/Enums/InputType';
import { Close } from '../../../assets/icons';

const SortOrderInfo = ({ item, setSortSettings, sortSettingsKeys, tableInstance }) => {
	const [columnName, decs] = item;

	const fields = useMemo(() => {
		return tableInstance
			.getTableDataModel()
			.getSortedColumn()
			.filter((column) => {
				return !sortSettingsKeys.includes(column.columnName) || columnName === column.columnName;
			});
	}, [columnName]);

	const sortingValues = useMemo(() => {
		return [
			{ sortOrderName: translate('_DESC'), key: OrderingType.DESCENDING },
			{ sortOrderName: translate('_ASC'), key: OrderingType.ASCENDING },
		];
	}, []);

	return (
		<Form colCount={11} style={{ marginTop: '10px' }}>
			<SimpleItem
				colSpan={5}
				editorType={InputType.SelectBox}
				editorOptions={{
					items: fields,
					searchMode: 'contains',
					searchEnabled: true,
					searchExpr: (col) => col.getCaption(),
					displayExpr: (col) => col?.getCaption(),
					valueExpr: 'columnName',
					value: columnName,
					onValueChanged: (event) => {
						const { previousValue, value } = event;
						setSortSettings((prev) => {
							const index = prev.findIndex((sort) => sort[0] === previousValue);
							return [...prev.slice(0, index), [value, decs], ...prev.slice(index + 1)];
						});
					},
				}}
			>
				<RequiredRule />
			</SimpleItem>
			<SimpleItem
				colSpan={5}
				editorType={InputType.SelectBox}
				editorOptions={{
					items: sortingValues,
					displayExpr: 'sortOrderName',
					valueExpr: 'key',
					value: decs,
					onValueChanged: (event) => {
						const { value } = event;
						setSortSettings((prev) => {
							const index = prev.findIndex((sort) => sort[0] === columnName);
							return [...prev.slice(0, index), [columnName, value], ...prev.slice(index + 1)];
						});
					},
				}}
			/>
			<ButtonItem
				colSpan={1}
				buttonOptions={{
					icon: Close,
					useSubmitBehavior: false,
					onClick: () => {
						setSortSettings((prev) => {
							return [...prev].filter(([colName]) => colName !== columnName);
						});
					},
					stylingMode: 'text',
				}}
			/>
		</Form>
	);
};

export default SortOrderInfo;
