/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import React, {useCallback, useMemo, useRef} from 'react';
import Form, {SimpleItem} from 'devextreme-react/form';
import {ColumnModel} from "../../models/Classes";

import 'devextreme-react/color-box';
import 'devextreme-react/select-box';
import 'devextreme-react/date-box';
import 'devextreme-react/text-area';

import './styles.less';

const DetailRecordView = ({ data, id, tableInstance, component, rowIndex, minColWidth, colCount }) => {
	const formRef = useRef<Form>(null);
	const getFormRefInstance = useCallback(() => {
		return formRef && formRef.current && formRef.current.instance;
	}, [formRef]);

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
									component.cellValue(rowIndex, column.getName(), e.value);
									await component.saveEditData();
								}
							});
						} else {
							if (getFormRefInstance && getFormRefInstance().validate().isValid) {
								component.cellValue(rowIndex, column.getName(), e.value);
								await component.saveEditData();
							}
						}
					},
					setParameters: async (selectedRow, dataField, value) => {
						if (getFormRefInstance && getFormRefInstance().validate().isValid) {
							column.setForeignKeyData().then(async () => {
								if (column.getIsRequired() && !!value) {
									component.cellValue(rowIndex, column.getName(), value);
									await component.saveEditData();
									await component.repaint();
								} else if (!column.getIsRequired()) {
									component.cellValue(rowIndex, column.getName(), value);
									await component.saveEditData();
									await component.repaint();
								}
							});
						}
					},
				};
				return (
					<SimpleItem
						key={column.getName()}
						dataField={column.getName()}
						name={column.getName()}
						component={column.getFormCellRender(data, column.foreignKeyInfo.foreignKeyData)}
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

export default DetailRecordView;
