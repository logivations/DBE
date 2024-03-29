/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import React, { lazy, Suspense } from 'react';
import './styles.css';

const ColorBox = lazy(() => import(/* webpackChunkName: "ColorBox" */ 'devextreme-react/color-box'));

const getParams = (data) => {
	if (data.data) {
		return {
			value: data.value,
			key: data.key,
			dataField: data.column?.dataField,
			component: data.component,
			rowIndex: data.rowIndex,
		};
	}
	return { value: '#000', key: 'no_key', dataField: 'no_field' };
};

export const getEditableColorBoxCell = (data) => {
	const { value, component, rowIndex, dataField } = getParams(data);

	return (
		<Suspense fallback={getColorBoxCell(data || '#fff')}>
			<ColorBox
				defaultValue={value}
				onValueChanged={async (changedValue) => {
					component.cellValue(rowIndex, dataField, changedValue.value);
					await component.saveEditData();
				}}
				stylingMode={'underlined'}
				className={'custom-color-box'}
			/>
		</Suspense>
	);
};

export const getColorBoxForFilterBuilder = (data) => {
	const { value, setValue } = data;
	return (
		<Suspense fallback={getColorBoxCell(data)}>
			<ColorBox
				defaultValue={value || '#fff'}
				onValueChanged={(changedValue) => {
					setValue(changedValue.value);
				}}
				stylingMode={'underlined'}
				className={'custom-color-box'}
			/>
		</Suspense>
	);
};

export const getColorBoxCell = (data) => {
	const { value, key, dataField } = getParams(data);
	const cellKey = `${dataField}-${JSON.stringify(key)}`;
	if (!value) {
		return;
	}
	return (
		<div className={'custom-color-box'} key={cellKey}>
			<span className={'color-value'} style={{ backgroundColor: value || '#fff' }} />
			{value}
		</div>
	);
};
