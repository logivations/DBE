/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import React, { useEffect, useState } from 'react';
import translate from '../../../i18n/localization';
import { OrderingType } from '../../../models/Enums';
import SortOrderInfo from './SortOrderInfo';
import Form, {ButtonItem, GroupItem} from "devextreme-react/form";
import {Add} from "../../../assets/icons";

const BuilderSorting = ({ tableInstance, defaultValue, getSettingChanges }) => {
	const [sortSetting, setSortSetting] = useState([]);
	const [columns, setColumns] = useState(() => tableInstance.getTableDataModel().getSortedColumn());

	useEffect(() => {
		setSortSetting(() => {
			if (!defaultValue) {
				return Object.entries({ [columns[0].columnName]: OrderingType.DESCENDING });
			}
			return Object.entries(defaultValue);
		});
	}, [defaultValue]);

	useEffect(() => {
		setColumns((prev) => {
			return prev.filter(({ columnName }) => {
				return !Object.keys(Object.fromEntries(sortSetting)).includes(columnName);
			});
		});
		getSettingChanges(Object.fromEntries(sortSetting));
	}, [sortSetting]);

	return (
		<Form>
			<ButtonItem
				cssClass={'add-sorting-button'}
				buttonOptions={{
					icon: Add,
					text: translate('SORT_BY'),
					useSubmitBehavior: false,
					onClick: () => {
						setSortSetting((prev) => {
							return [...prev, [columns[0].columnName, OrderingType.DESCENDING]];
						});
					}
				}}
			/>
			{
				sortSetting.map((item, index) => {
					return <SortOrderInfo
						key={`${item.columnName}-${index}`}
						item={item}
						tableInstance={tableInstance}
						setSortSettings={setSortSetting}
						sortSettingsKeys={Object.keys(Object.fromEntries(sortSetting))}
					/>;
				})
			}
		</Form>
	);
};

export default BuilderSorting;
