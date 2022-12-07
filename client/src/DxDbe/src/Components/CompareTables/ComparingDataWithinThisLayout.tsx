/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import FilterBuilder, { CustomOperation, Field } from 'devextreme-react/filter-builder';
import EditorComponentCustomOperations from '../modals/builders/CustomOperations/EditorComponentCustomOperations';
import SearchInText from '../modals/builders/CustomOperations/SearchInText';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import CompareTableDto from '../../services/CompareTableManager/CompareTableDto';
import {ColumnModel, FilterGroup} from '../../models/Classes';
import { useComparingFilter } from '../../hooks';
import SqlSpecificOperator, { GroupOperators } from '../../models/Enums/SqlSpecificOperator';

const ComparingDataWithinThisLayout = ({ tableInstance }) => {
	const filterBuilderRef = useRef();
	const compareTableDto = useMemo(() => CompareTableDto.getCompareTableDto(), []);
	const primaryKeys = useMemo(() => tableInstance.getTableDataModel().getPrimaryKeys(), []);

	const columnsByPrimaryKeys = useMemo(() => {
		return tableInstance.getTableDataModel().columns.filter(({ columnName }) => primaryKeys.includes(columnName));
	}, []);

	const getColumnByFieldName = useCallback(
		(fieldName: string) => {
			return columnsByPrimaryKeys.find(({ columnName }) => columnName === fieldName);
		},
		[columnsByPrimaryKeys],
	);

	const createDefaultFilter = useCallback(() => {
		const firstPrimaryKey = primaryKeys[0];
		compareTableDto.setSelectedCompareCriteriaValue(firstPrimaryKey);
		return [
			[firstPrimaryKey, SqlSpecificOperator['='], ''],
			GroupOperators.AND,
			[firstPrimaryKey, SqlSpecificOperator['='], ''],
		];
	}, []);

	const [selectedFilter, setSelectedFilter] = useState(() => createDefaultFilter());
	useEffect(() => {
		const [targetFilter, operator, sourceFilter] = selectedFilter;
		if (operator === GroupOperators.AND && targetFilter[2] && sourceFilter[2]) {
			compareTableDto.setSourceAndTargetFilter(
				FilterGroup.createFilterGroup(targetFilter),
				FilterGroup.createFilterGroup(sourceFilter),
			);
			compareTableDto.setSelectedCompareCriteriaValue(targetFilter[0]);
		}
	}, [selectedFilter]);

	const [onValueChange, onContentReady] = useComparingFilter(setSelectedFilter);

	return (
		<div>
			<FilterBuilder
				ref={filterBuilderRef}
				value={selectedFilter}
				groupOperations={[]}
				onValueChanged={onValueChange}
				onContentReady={onContentReady}
				focusStateEnabled={true}
			>
				{columnsByPrimaryKeys.map((column: ColumnModel) => {
					return (
						<Field
							{...column.getColumnParametersForFilterSetting()}
							filterOperations={column.getFilterOperationForComparing()}
						/>
					);
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
					name={'searchintext'}
					caption={'Search in text'}
					icon={'search'}
					editorRender={(data) => {
						return <SearchInText data={data} />;
					}}
				/>
			</FilterBuilder>
		</div>
	);
};

export default ComparingDataWithinThisLayout;
