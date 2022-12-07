/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import React, {useCallback, useRef, useState} from 'react';
import Form, {ButtonItem, SimpleItem} from 'devextreme-react/form';
import useDxPointerDownEvent from '../../../../hooks/useDxPointerDownEvent';
import './style.less';
import {IAbstractColumnModel} from '../../../../models/Interfaces';

interface IEditorComponentProps {
	data: any;
	column: IAbstractColumnModel;
}

const EditorComponentCustomOperations = ({ data, column }: IEditorComponentProps) => {
	const formRef = useRef<Form>();
	const [values, setValues] = useState(() => {
        return data.value ? (typeof data.value === 'string' ? [data.value] : data.value) : [column.getDefaultValue()];
	});

	const saveValues = useCallback((index: number, value) => {
		setValues((prev) => {
			const newValues = [...prev.slice(0, index), value, ...prev.slice(index + 1)];
			data.setValue(newValues);
			return newValues;
		});
	}, []);

	const deleteValues = useCallback((index: number) => {
		setValues((prev) => {
			const newValues = [...prev.slice(0, index), ...prev.slice(index + 1)];
			data.setValue(newValues);
			return newValues;
		});
	}, []);

	useDxPointerDownEvent(formRef);

	return (
		<div className={'editor-component-filter-builder'}>
			<Form ref={formRef}>
				{values.reduce((acc, value, index) => {
					return [
						...acc,
						<SimpleItem
							key={`${value}-${index}-item`}
							editorType={column.getViewModel().getInputType()}
							component={column.getCellRenderForFilterBuilder(value)}
							editorOptions={{
								...column.getEditorOptionsForFilterBuilder(value || column.getDefaultValue(), (e) =>
									saveValues(index, e.value),
								),
								setValueToBuilder: (value) => saveValues(index, value),
							}}
						>
							{...column.getChildren()}
						</SimpleItem>,
						values.length !== 1
							? <ButtonItem
								key={`${value}-${index}-button`}
								buttonOptions={{
									icon: 'remove',
									useSubmitBehavior: false,
									onClick: () => deleteValues(index),
								}} />
							: null,
					];
				}, [])}

				<ButtonItem
					cssClass={'add-button'}
					buttonOptions={{
						icon: 'add',
						useSubmitBehavior: false,
						onClick: () => {
							setValues((prevValues) => [...prevValues, null]);
						},
						disabled: values.some((value) => value === null || value === undefined),
					}}
				/>
			</Form>
		</div>
	);
};

export default EditorComponentCustomOperations;
