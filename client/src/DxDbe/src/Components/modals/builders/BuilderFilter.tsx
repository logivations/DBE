/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import FilterBuilder, {CustomOperation, Field} from 'devextreme-react/filter-builder';
import {ColumnModel, FilterGroup} from '../../../models/Classes';
import EditorComponentCustomOperations from './CustomOperations/EditorComponentCustomOperations';
import TableInstance from '../../../services/TableInstanceManager/TableInstance';
import TFunction from '../../../models/Types/Types';
import {DxOperations} from '../../../constants/FilterBuilderConstants';
import SearchInText from './CustomOperations/SearchInText';
import AbstractColumnModel from '../../../models/Classes/AbstractColumnModel';
import StartsWith from './CustomOperations/StartsWith';

interface IBuilderFilterProps {
    tableInstance: TableInstance;
    defaultValue: FilterGroup;
	getSettingChanges: TFunction;
}

const BuilderFilter = ({ tableInstance, defaultValue, getSettingChanges }: IBuilderFilterProps) => {
	const filterBuilderRef = useRef<FilterBuilder>();
	const [selectedFilter, setSelectedFilter] = useState(() => {
		return defaultValue && FilterGroup.parseFilterGroupToDxFilter(defaultValue);
	});
	const fields: AbstractColumnModel[] = useMemo(() =>  tableInstance.getTableDataModel().getSortedColumn(), []);

	const getColumnByFieldName = useCallback(
		(fieldName: string) => {
			return fields.find((field) => field.getName() === fieldName);
		},
		[fields],
	);

	useEffect(() => {
		selectedFilter && getSettingChanges(FilterGroup.createFilterGroup(selectedFilter))
	}, [selectedFilter]);

	return (
		<>
			<FilterBuilder
				ref={filterBuilderRef}
				value={selectedFilter}
				onValueChanged={(e) => {
					setSelectedFilter(e.value);
				}}
			>
				{fields.map((column: ColumnModel) => {
					return <Field {...column.getColumnParametersForFilterSetting()} />;
				})}

				<CustomOperation
					name={'anyof'}
					caption={'Is any of'}
					icon={'check'}
					editorRender={(data) => {
						const column = getColumnByFieldName(data.field.dataField);
						return <EditorComponentCustomOperations data={data} column={column} />;
					}}
				/>
				<CustomOperation
					name={'noneof'}
					caption={'Is none of'}
					icon={'close'}
					editorRender={(data) => {
						const column = getColumnByFieldName(data.field.dataField);
						return <EditorComponentCustomOperations data={data} column={column} />;
					}}
				/>
				<CustomOperation
					name={'searchintext'}
					caption={'Search in text'}
					icon={'search'}
					editorRender={(data) => {
						return <SearchInText data={data} />;
					}}
				/>
				<CustomOperation
					name={'startswith'}
					caption={'Starts with'}
					icon={'startswith'}
					editorRender={(data) => {
						const column = getColumnByFieldName(data.field.dataField);
						return <StartsWith data={data} column={column}/>
					}}
				/>
				<CustomOperation
					name={'endswith'}
					caption={'Ends with'}
					icon={'endswith'}
					editorRender={(data) => {
						const column = getColumnByFieldName(data.field.dataField);
						return <StartsWith data={data} column={column}/>
					}}
				/>
				<CustomOperation
					name={'contains'}
					caption={'Contains'}
					icon={'contains'}
					editorRender={(data) => {
						const column = getColumnByFieldName(data.field.dataField);
						return <StartsWith data={data} column={column}/>
					}}
				/>
				<CustomOperation
					name={'notcontains'}
					caption={'Is not like'}
					icon={'doesnotcontain'}
					editorRender={(data) => {
						return <SearchInText data={data} />;
					}}
				/>
			</FilterBuilder>
		</>
	);
};

export default BuilderFilter;
