/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import React, { useCallback, useMemo, useRef } from 'react';
import Form, { SimpleItem } from 'devextreme-react/form';
import { ColumnModel } from '../../models/Classes';

import 'devextreme-react/color-box';
import 'devextreme-react/select-box';
import 'devextreme-react/date-box';
import 'devextreme-react/text-area';

import './styles.css';

const DetailRecordView = ({ data, id, tableInstance, component, rowIndex, colCount }) => {
	const formRef = useRef<Form>(null);
	const getFormRefInstance = useCallback(() => {
		return formRef?.current?.instance;
	}, [formRef]);

	const saveValueToDataGrid = useCallback(
		async (name, value) => {
			component.cellValue(rowIndex, name, value);
			await component.saveEditData();
		},
		[rowIndex, component],
	);

	const column = useMemo<ColumnModel[]>(() => tableInstance.getTableDataModel().columns, []);
	return (
		<Form
			id={id}
			formData={data}
			readOnly={false}
			showColonAfterLabel={true}
			labelLocation={'top'}
			validationGroup={'customerData'}
			minColWidth={300}
			colCount={colCount || 4}
			ref={formRef}
		>
			{column.map((column) => {
				const edOption = {
					...column.getColumnEditorOptions(),
					disabled: !column.getIsEditable(),
					onValueChanged: async (e) => {
						if (column.getValidators()) {
							column.getValidatorForAsyncRule(e.value, data).then(async (isValid) => {
								if (isValid) {
									await saveValueToDataGrid(column.getName(), e.value);
								}
							});
						} else {
							if (getFormRefInstance && getFormRefInstance().validate().isValid) {
								await saveValueToDataGrid(column.getName(), e.value);
							}
						}
					},
					setParameters: async (selectedRow, dataField, value) => {
						if (getFormRefInstance && getFormRefInstance().validate().isValid) {
							if ((column.getIsRequired() && !!value) || !column.getIsRequired()) {
								await saveValueToDataGrid(column.getName(), value);
								await component.repaint();
							}
						}
					},
				};
				return (
					<SimpleItem
						key={column.getName()}
						dataField={column.getName()}
						name={column.getName()}
						component={column.getFormCellRender(data)}
						label={{ text: column.getCaption() }}
						editorOptions={edOption}
						editorType={column.getViewModel().getInputType()}
					>
						{column.getValidationRules()}
					</SimpleItem>
				);
			})}
		</Form>
	);
};

export default React.memo(DetailRecordView);
