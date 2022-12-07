/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import React from 'react';
import { BuildersTypes } from '../../../constants/ModalsTypes';
import BuilderFilter from './BuilderFilter';
import BuilderSorting from './BuilderSorting';
import BuilderHiddenColumn from './BuilderHiddenColumn';

const Builder = ({ builderKey, tableInstance, defaultValue, getSettingChanges }) => {
	switch (builderKey) {
		case BuildersTypes.FILTER_BUILDER:
			return (
				<BuilderFilter
					tableInstance={tableInstance}
					defaultValue={defaultValue}
					getSettingChanges={getSettingChanges}
				/>
			);
		case BuildersTypes.HIDDEN_COLUMNS_BUILDER:
			return (
				<BuilderHiddenColumn
					tableInstance={tableInstance}
					defaultValue={defaultValue}
					getSettingChanges={getSettingChanges}
				/>
			);
		case BuildersTypes.SORTING_BUILDER:
			return (
				<BuilderSorting
					tableInstance={tableInstance}
					defaultValue={defaultValue}
					getSettingChanges={getSettingChanges}
				/>
			);
		default:
			return null;
	}
};

export default Builder;
