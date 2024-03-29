/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import Toolbar, { Item } from 'devextreme-react/toolbar';
import translate from '../../i18n/localization';
import React from 'react';
import useDbeFooter from './useDbeFooter';

import './style.css';

const DxDbeFooter = ({ tableInstance, dbeDxGridRef }) => {
	const {
		allRowsCount,
		selectedRowsCount,
		selectionFilter,
		createSelectionFilter,
		createRowAndHeaderFilter,
		isHeaderAndRowFilterButtonVisible,
		createHiddenColumnFilter,
		hiddenColumnFilter,
	} = useDbeFooter(tableInstance, dbeDxGridRef);

	return (
		<>
			<Toolbar className={'footer-holder'}>
				<Item
					key={'selectionFilter'}
					visible={!selectionFilter.isZeroFilter()}
					widget={'dxButton'}
					options={{
						type: 'success',
						text: translate('_SAVE_SELECTION_FOR_FILTER_AS'),
						onClick: createSelectionFilter,
					}}
					location={'before'}
					locateInMenu={'auto'}
				/>
				<Item
					key={'rowAndHeaderFilter'}
					visible={isHeaderAndRowFilterButtonVisible}
					widget={'dxButton'}
					options={{
						type: 'success',
						text: translate('_SAVE_QUICK_FILTER_AS'),
						onClick: createRowAndHeaderFilter,
					}}
					location={'before'}
					locateInMenu={'auto'}
				/>
				<Item
					key={'hiddenColumnFilter'}
					visible={hiddenColumnFilter.length}
					widget={'dxButton'}
					options={{
						type: 'success',
						text: translate('_SAVE_HIDDEN_COLUMNS_FILTER_AS'),
						onClick: createHiddenColumnFilter,
					}}
					location={'before'}
					locateInMenu={'auto'}
				/>
				<Item
					key={'selectedRows'}
					location={'after'}
					locateInMenu="auto"
					html={`<div>
                    <span>${translate('SELECTED_ROWS')}:</span>
                    <span><b>${selectedRowsCount}</b></span>
                </div>`}
				/>
				<Item
					key={'allRows'}
					location={'after'}
					locateInMenu="auto"
					html={`<div>
                    <span>${translate('ALL_ROWS')}:</span>
                    <span><b>${allRowsCount}</b></span>
                </div>`}
				/>
			</Toolbar>
		</>
	);
};

export default DxDbeFooter;
