/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import React, { lazy, Suspense } from 'react';
import './styles.less';

const ColorBox = lazy(() => import(/* webpackChunkName: "ColorBox" */ 'devextreme-react/color-box'));

const getParams = (data) => {
	if (data.value && data.key) {
		return {
			value: data.value,
			key: data.key,
			dataField: data.column?.dataField,
			component: data.component,
			rowIndex: data.rowIndex,
		};
	} else if (data.data) {
		return {
			value: data.data?.editorOptions?.value,
			key: data.data?.editorOptions?.key,
			dataField: data.data?.dataField,
		};
	}
	return { value: '#000', key: 'no_key', dataField: 'no_field' };
};

export const getEditableColorBoxCell = (data) => {
	const { value, component, rowIndex, dataField } = getParams(data);

	return (
		<Suspense fallback={getColorBoxCell(data)}>
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
	return (
		<div className={'custom-color-box'} key={cellKey}>
			<span className={'color-value'} style={{ backgroundColor: value }} />
			{value}
		</div>
	);
};
