/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Form, { ButtonItem, SimpleItem } from 'devextreme-react/form';
import { IEditorComponentProps } from '../../../../models/Interfaces/ComponentInterfaces';
import { isDefined } from '../../../../utils/utils';
import ValidationError from '../../../../models/Classes/ValidationError';

import './style.css';

const EditorComponentCustomOperations = ({ data, column }: IEditorComponentProps) => {
	const formRef = useRef<Form>();
	const [values, setValues] = useState(() => {
		return data.value ? (typeof data.value === 'string' ? [data.value] : data.value) : [column.getDefaultValue()];
	});

	useEffect(() => {
		data.setValue(values);
	}, []);

	const validateForm = useCallback(() => {
		return formRef?.current?.instance.validate();
	}, []);

	const saveValues = useCallback((index: number, value) => {
		setValues((prev) => {
			const values = [...prev.slice(0, index), value || column.getDefaultValue(), ...prev.slice(index + 1)];
			data.setValue(values);
			data.closeEditor();
			return values;
		});
	}, []);

	const deleteValues = useCallback((index: number) => {
		setValues((prev) => {
			const values = [...prev.slice(0, index), ...prev.slice(index + 1)];
			data.setValue(values);
			data.closeEditor();
			return values;
		});
	}, []);

	return (
		<div className={'editor-component-filter-builder'}>
			<Form ref={formRef}>
				{values.reduce((acc, value, index) => {
					return [
						...acc,
						<SimpleItem
							key={`${value}-${index}-item`}
							editorType={column.getViewModel().getInputType()}
							component={column.getCellRenderForFilterBuilder(value?.foreignButtonId)}
							editorOptions={{
								...column.getEditorOptionsForFilterBuilder(value || column.getDefaultValue(), (e) => {
									const validation = validateForm();
									if (!validation.isValid) {
										validation.brokenRules.forEach(({ message }) => {
											throw new ValidationError(message);
										});
									} else {
										saveValues(index, e.value);
									}
								}),
								setValueToBuilder: (value) => saveValues(index, value),
								columnName: column.getName(),
							}}
						>
							{column.getChildren()}
						</SimpleItem>,
						values.length !== 1 ? (
							<ButtonItem
								key={`${value}-${index}-button`}
								buttonOptions={{
									icon: 'remove',
									useSubmitBehavior: false,
									onClick: () => deleteValues(index),
								}}
							/>
						) : null,
					];
				}, [])}

				<ButtonItem
					cssClass={'add-button'}
					buttonOptions={{
						icon: 'add',
						useSubmitBehavior: false,
						onClick: () => {
							setValues((prevValues) => {
								const values = [...prevValues, column.getDefaultValue()];
								data.setValue(values);
								return values;
							});
						},
						disabled: values.some((value) => !isDefined(value) || value === ''),
					}}
				/>
			</Form>
		</div>
	);
};

export default EditorComponentCustomOperations;
