/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import React from 'react';
import { SimpleItem, GroupItem } from 'devextreme-react/form';
import ComparingDataWithinThisLayout from '../../Components/CompareTables/ComparingDataWithinThisLayout';
import CompareTableDto from './CompareTableDto';
import { RequiredRule } from 'devextreme-react/validator';
import { WarehouseShort } from '../../models/Classes/Metadata';
import TableInstance from '../TableInstanceManager/TableInstance';

export const getListOfLayout = (list: WarehouseShort[]) => {
	return (
		<SimpleItem
			dataField={'targetWarehouseId'}
			editorType={'dxSelectBox'}
			editorOptions={{
				items: list,
				displayExpr: 'name',
				valueExpr: 'warehouseId',
				required: true,
				onValueChanged: ({ value }) =>
					CompareTableDto.getCompareTableDto().setTargetWarehouseId(parseInt(value, 10)),
			}}
		>
			<RequiredRule />
		</SimpleItem>
	);
};

export const getFilterBuilderForComparing = (tableInstance: TableInstance) => {
	return <ComparingDataWithinThisLayout tableInstance={tableInstance} />;
};

export const getCompareDataByCampaignComponent = (currentCampaignId: number, campaigns: { [key: string]: any }) => {
	return (
		<GroupItem>
			<SimpleItem
				editorType={'dxSelectBox'}
				editorOptions={{
					items: campaigns,
					value: currentCampaignId,
					disabled: true,
					displayExpr: 'name',
					valueExpr: 'campaignId',
				}}
			/>
			<SimpleItem
				editorType={'dxSelectBox'}
				editorOptions={{
					items: campaigns,
					displayExpr: 'name',
					valueExpr: 'campaignId',
					onValueChanged: ({ value }) =>
						CompareTableDto.getCompareTableDto().setSourceAndTargetCampaignId(value, currentCampaignId),
				}}
			>
				<RequiredRule />
			</SimpleItem>
		</GroupItem>
	);
};
