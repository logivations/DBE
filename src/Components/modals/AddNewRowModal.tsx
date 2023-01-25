/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import React, { useCallback, useRef, useState } from 'react';
import Form, { GroupItem, SimpleItem } from 'devextreme-react/form';
import translate from '../../i18n/localization';
import { Button } from 'devextreme-react/button';
import { parseValue } from '../../utils/utils';
import { ScrollView } from 'devextreme-react';

import 'devextreme-react/color-box';
import 'devextreme-react/select-box';

import './styles.css';

const AddNewRowModal = ({ props, closeModal }) => {
	const { tableInstance, handleSubmitEvent } = props;
	const [newRow, updateNewRow] = useState(() => tableInstance.getTableDataModel().getRowDefaultValues());
	const formRef = useRef<Form>();
	const getFormRefInstance = useCallback(() => {
		return formRef && formRef.current && formRef.current.instance;
	}, [formRef]);
	const handleSubmit = useCallback(
		(e) => {
			e.preventDefault();
			if (getFormRefInstance().validate().isValid) {
				const form = document.forms.namedItem('addNewRowForm');
				const formData = new FormData(form);
				const parameters: object = [...formData.entries()].reduce(
					(result, [paramName, value]) => {
						return { ...result, [paramName]: parseValue(value) };
					},
					{ ID_user_change: window['USER_ID'] },
				);
				handleSubmitEvent(parameters, closeModal);
			}
		},
		[handleSubmitEvent],
	);

	return (
		<>
			<form onSubmit={handleSubmit} id="addNewRowForm" action={''}>
				<ScrollView id="scrollview" height={'75vh'}>
					<Form
						formData={newRow}
						readOnly={false}
						showColonAfterLabel={true}
						labelLocation={'left'}
						scrollingEnabled={true}
						ref={formRef}
						style={{ maxHeight: 700 }}
					>
						<GroupItem colCount={2}>
							{tableInstance
								.getTableDataModel()
								.getColumnsForAddingCloning()
								.map((column) => {
									const edOption = {
										...column.getColumnEditorOptions(),
										disabled: !column.getIsEditable(),
										setParameters: (selectedRow, dataField, value) => {
											updateNewRow((prevRow) => ({ ...prevRow, [column.getName()]: value }));
										},
									};
									return (
										<SimpleItem
											key={column.getName()}
											dataField={column.getName()}
											name={column.getName()}
											component={column.getFormCellRender(newRow)}
											label={{ text: column.getCaption() }}
											editorOptions={edOption}
											editorType={column.getViewModel().getInputType()}
										>
											{column.getChildren()}
										</SimpleItem>
									);
								})}
						</GroupItem>
					</Form>
				</ScrollView>
				<div className={'dx-field'}>
					<div className={'dx-field-value'}>
						<Button
							width={70}
							type={'success'}
							text={translate('ADD_ROW')}
							stylingMode={'contained'}
							useSubmitBehavior={true}
						/>
					</div>
				</div>
			</form>
		</>
	);
};

export default AddNewRowModal;
