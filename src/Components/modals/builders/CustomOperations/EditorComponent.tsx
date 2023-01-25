/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import React, { useCallback, useEffect, useRef } from 'react';
import Form, { SimpleItem } from 'devextreme-react/form';
import { getRequiredRule } from '../../../common/DbeColumnChildrens';
import ValidationError from '../../../../models/Classes/ValidationError';
import { IEditorComponentProps } from '../../../../models/Interfaces/ComponentInterfaces';

const EditorComponent = ({ data, column }: IEditorComponentProps) => {
	const formRef = useRef<Form>();
	useEffect(() => {
		data.setValue(data.value || column.getDefaultValue());
	}, []);

	const setValue = useCallback((value) => {
		data.setValue(value || column.getDefaultValue());
		data.closeEditor();
	}, []);

	return (
		<div className={'editor-component-filter-builder'}>
			<Form ref={formRef}>
				<SimpleItem
					editorType={column.getViewModel().getInputType()}
					component={column.getCellRenderForFilterBuilder(data.value?.foreignButtonId)}
					editorOptions={{
						...column.getEditorOptionsForFilterBuilder(data.value, (e) => {
							const validation = formRef.current.instance.validate();
							if (!validation.isValid) {
								validation.brokenRules.forEach(({ message }) => {
									throw new ValidationError(message);
								});
							} else {
								data.setValue(e.value);
								data.closeEditor();
							}
						}),
						setValueToBuilder: setValue,
					}}
				>
					{column.getChildren()}
					{!column.getIsRequired() && getRequiredRule(column.getName())}
				</SimpleItem>
			</Form>
		</div>
	);
};

export default EditorComponent;
