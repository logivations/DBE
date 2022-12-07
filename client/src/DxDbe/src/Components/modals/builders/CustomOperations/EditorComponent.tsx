/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import React, {useCallback, useRef} from 'react';
import Form, {SimpleItem} from 'devextreme-react/form';
import {useDxPointerDownEvent} from '../../../../hooks';
import {IAbstractColumnModel} from '../../../../models/Interfaces';
import {CellType} from "../../../../models/Enums";
import {getRequiredRule} from "../../../common/DbeColumnChildrens";

interface IEditorComponentProps {
	data: { [key: string]: any };
	column: IAbstractColumnModel;
}

const EditorComponent = ({ data, column }: IEditorComponentProps) => {
	const formRef = useRef<Form>();
	useDxPointerDownEvent(formRef);

	const setValue = useCallback((value) => {
		if (column.getCellType() === CellType.FOREIGN_KEY_CELL) {
			return column.setForeignKeyData().then(() => {
				data.setValue(value);
				data.closeEditor();
			});
		}
		data.setValue(value || column.getDefaultValue());
		data.closeEditor();
	}, []);

	return (
		<div className={'editor-component-filter-builder'}>
			<Form ref={formRef}>
				<SimpleItem
					editorType={column.getViewModel().getInputType()}
					component={column.getCellRenderForFilterBuilder(data.value)}
					editorOptions={{
						...column.getEditorOptionsForFilterBuilder(data.value, (e) =>
							data.setValue(e.value),
						),
						setValueToBuilder: setValue,
					}}
				>
					{...column.getChildren()}
					{!column.getIsRequired() && getRequiredRule(column.getName())}
				</SimpleItem>
			</Form>
		</div>
	);
};

export default EditorComponent;
