/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import React, {useEffect, useMemo, useState} from 'react';
import {FilterGroup} from '../../models/Classes';
import translate from '../../i18n/localization';
import Form, {ButtonItem, GroupItem, SimpleItem} from "devextreme-react/form";
import InputType from "../../models/Enums/InputType";
import {HelpIcon} from "../../assets/icons";
import {useDbeActionsHelpLink} from "../../hooks/useHelpLink";
import {DbeActions} from "../../models/Enums/HelpLinks";

const LinkWithFilter = ({ props: { dbeDxGridInstance, tableInstance }, closeModal }) => {
	const [link, setLink] = useState<URL>(new URL(window.location.toString()));
	const primaryKeys = useMemo(() => tableInstance.getTableDataModel().getPrimaryKeys(), []);
	const [selectedRows, setSelectedRows] = useState([]);

	useEffect(() => {
		(async () => {
			const selectedRows = await dbeDxGridInstance.getSelectedRowsData();
			setSelectedRows(selectedRows);
		})();
	}, []);

	const valuesByPrimaryKey = useMemo(() => {
		return primaryKeys.reduce((acc, key) => {
			acc.push([key, selectedRows.map((row) => row[key])]);
			return acc;
		}, []);
	}, [primaryKeys, selectedRows]);

	useEffect(() => {
		const filterForLink = FilterGroup.createFilterForLink(valuesByPrimaryKey);
		setLink((prev) => {
			const newUrl = new URL(prev);
			newUrl.searchParams.delete('filter');
			newUrl.searchParams.append('filter', JSON.stringify(filterForLink));
			return newUrl;
		});
	}, [valuesByPrimaryKey]);

	const helpLink = useDbeActionsHelpLink(tableInstance.warehouseUiType, DbeActions.LINK_WITH_FILTER);

	return (
		<Form>
			<SimpleItem
				editorType={InputType.TextBox}
				editorOptions={{
					value: link.toString(),
					readOnly: true,
					onFocusIn: (e) => {
						e.element.getElementsByTagName('input')[0].select();
					}
				}}
			/>
			<GroupItem colSpan={2} colCount={2}>
				<ButtonItem
					cssClass={'help-button'}
					buttonOptions={{
						icon: HelpIcon,
						useSubmitBehavior: false,
						onClick: () => window.open(helpLink, '_blank'),
						stylingMode: 'text'
					}}
				/>
				<ButtonItem
					cssClass={'dx-button-success'}
					buttonOptions={{
						text: translate('COPY'),
						stylingMode: 'contained',
						useSubmitBehavior: false,
						onClick: async () => {
							await navigator.clipboard.writeText(link.toString());
							closeModal();
						},
					}}
				/>
			</GroupItem>
		</Form>
	);
};

export default LinkWithFilter;
