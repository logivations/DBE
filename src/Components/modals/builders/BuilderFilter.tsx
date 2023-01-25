/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import FilterBuilder, { CustomOperation, Field } from 'devextreme-react/filter-builder';
import { ColumnModel, FilterGroup } from '../../../models/Classes';
import EditorComponentCustomOperations from './CustomOperations/EditorComponentCustomOperations';
import { DxOperations } from '../../../constants/FilterBuilderConstants';
import SearchInText from './CustomOperations/SearchInText';
import AbstractColumnModel from '../../../models/Classes/AbstractColumnModel';
import StartsWith from './CustomOperations/StartsWith';
import translate from '../../../i18n/localization';

const BuilderFilter = ({ tableInstance, defaultValue, getSettingChanges }) => {
	const filterBuilderRef = useRef<FilterBuilder>();
	const [selectedFilter, setSelectedFilter] = useState(() => {
		return defaultValue && FilterGroup.parseFilterGroupToDxFilter(defaultValue);
	});
	const fields: AbstractColumnModel[] = useMemo(() => tableInstance.getTableDataModel().getSortedColumn(), []);

	const getColumnByFieldName = useCallback(
		(fieldName: string) => {
			return fields.find((field) => field.getName() === fieldName);
		},
		[fields],
	);

	const getParsedFilter = useCallback(() => {
		const dxFilter = filterBuilderRef?.current?.instance.getFilterExpression();
		return dxFilter && FilterGroup.createFilterGroup(dxFilter);
	}, []);

	useEffect(() => {
		if (selectedFilter && selectedFilter[1] === DxOperations.BETWEEN) {
			getSettingChanges(getParsedFilter());
		} else {
			if (selectedFilter) {
				getSettingChanges(
					FilterGroup.createFilterGroup(selectedFilter, null, (value) => {
						// this modifying needed for foreign buttons as we should have
						// object with text and value, but only value should be saved to filterGroup
						if (Array.isArray(value)) {
							return value?.map((val) => {
								const isForeignButtonId =
									val instanceof Object && Object.hasOwn(val, 'foreignButtonId');
								return isForeignButtonId ? val?.foreignButtonId : val;
							});
						}
						if (value instanceof Object && Object.hasOwn(value, 'foreignButtonId')) {
							return value?.foreignButtonId;
						}
						return value;
					}),
				);
			}
		}
	}, [selectedFilter, filterBuilderRef, getParsedFilter]);

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
					caption={translate('IS_ANY_OF')}
					icon={'check'}
					editorRender={(data) => {
						const column = getColumnByFieldName(data.field.dataField);
						return <EditorComponentCustomOperations data={data} column={column} />;
					}}
				/>
				<CustomOperation
					name={'noneof'}
					caption={translate('IS_NONE_OF')}
					icon={'close'}
					editorRender={(data) => {
						const column = getColumnByFieldName(data.field.dataField);
						return <EditorComponentCustomOperations data={data} column={column} />;
					}}
				/>
				<CustomOperation
					name={'searchintext'}
					caption={translate('SEARCH_IN_TEXT')}
					icon={'search'}
					editorRender={(data) => {
						return <SearchInText data={data} />;
					}}
				/>
				<CustomOperation
					name={'startswith'}
					caption={translate('STARTS_WITH')}
					icon={'startswith'}
					editorRender={(data) => {
						const column = getColumnByFieldName(data.field.dataField);
						return <StartsWith data={data} column={column} />;
					}}
				/>
				<CustomOperation
					name={'endswith'}
					caption={translate('ENDS_WITH')}
					icon={'endswith'}
					editorRender={(data) => {
						const column = getColumnByFieldName(data.field.dataField);
						return <StartsWith data={data} column={column} />;
					}}
				/>
				<CustomOperation
					name={'contains'}
					caption={translate('CONTAINS')}
					icon={'contains'}
					editorRender={(data) => {
						const column = getColumnByFieldName(data.field.dataField);
						return <StartsWith data={data} column={column} />;
					}}
				/>
				<CustomOperation
					name={'notcontains'}
					caption={translate('IS_NOT_LIKE')}
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
