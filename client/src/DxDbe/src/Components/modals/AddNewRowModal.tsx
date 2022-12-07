/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import React, {useCallback, useState} from 'react';
import Form, {ButtonItem, SimpleItem} from 'devextreme-react/form';
import translate from '../../i18n/localization';
import {parseValue} from '../../utils/utils';

import 'devextreme-react/color-box';
import 'devextreme-react/select-box';

import './styles.less';

const AddNewRowModal = ({ props, closeModal }) => {
	const { tableInstance, handleSubmitEvent } = props;
	const [newRow, updateNewRow] = useState(() => tableInstance.getTableDataModel().getRowDefaultValues());

	const handleSubmit = useCallback(
		(e) => {
			e.preventDefault();
			const form = document.forms.namedItem('addNewRowForm');
			const formData = new FormData(form);
			const parameters: object = [...formData.entries()].reduce((result, [paramName, value]) => {
				return { ...result, [paramName]: parseValue(value) };
			}, {ID_user_change: window['USER_ID']});
			handleSubmitEvent(parameters, closeModal);
		},
		[handleSubmitEvent],
	);

	return (
		<>
			<form onSubmit={handleSubmit} id="addNewRowForm" action={''}>
				<Form formData={newRow} readOnly={false} showColonAfterLabel={true} labelLocation={'left'} colCount={2}>
					{tableInstance.getTableDataModel().getColumnsForAddingCloning().map((column) => {
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
								component={column.getFormCellRender(newRow, column.foreignKeyInfo.foreignKeyData)}
								label={{ text: column.getCaption() }}
								editorOptions={edOption}
								editorType={column.getViewModel().getInputType()}
							>
								{column.getChildren()}
							</SimpleItem>
						);
					})}
					<ButtonItem cssClass={'dx-button-success' } colSpan={2} buttonOptions={{text: translate('ADD_ROW'), useSubmitBehavior: true }} />
				</Form>
			</form>
		</>
	);
};

export default AddNewRowModal;
