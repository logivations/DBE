/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import SelectBox from 'devextreme-react/select-box';
import React, {useEffect, useMemo, useState} from 'react';
import communicator from '../../api/Communicator';
import {ColumnModel} from '../../models/Classes';
import MassUpdateOperation from '../../models/Classes/MassUpdateOperation';
import DbeTypesFactory from '../../services/TableDataModel/DbeColumn/DbeColumnFactory';

const SelectBoxMassiveUpdate = ({ selectColumn, setLoading, tableInstance }) => {
	const [columnsList, setColumnsList] = useState<ColumnModel[]>([]);
	const tableName = useMemo<string>(() => tableInstance.getTableName(), []);

	useEffect(() => {
		Promise.all([communicator.getUpdatableColumnModels(tableName), communicator.getMassUpdateOperations(tableName)]).then(
			async ([columnModels, massUpdateOperationByColumn]: [
				ColumnModel[],
				{ [key: string]: MassUpdateOperation[] },
			]) => {
				const colModels = ColumnModel.createColumnModels(columnModels, tableInstance);
				Promise.all(
					colModels.map(async (colModel) => {
						const model = DbeTypesFactory(colModel, ColumnModel) as ColumnModel;
						const massUpdateOperation = massUpdateOperationByColumn[model.getName()].map(
							MassUpdateOperation.create,
						);
						const operationByColumn = massUpdateOperation.filter((operation: MassUpdateOperation) => {
							return (operation.toZeroOperation() ? model.getViewModel().isZeroAsAny : true) &&
								   (operation.toNullOperation() ? !model.getColumnTypeObject().isNullable : true);
						});
						model.setMassiveUpdateOperations(operationByColumn);
						model.setIsMassiveUpdateField(true);
						model.setTableDataModel(tableInstance.getTableDataModel());
						await model.setForeignKeyData();
						return model;
					}),
				).then((colModels: ColumnModel[]) => {
					setColumnsList(colModels);
					setLoading(true);
				});
			},
		);
	}, []);

	return (
		<div className="dx-field-label">
			<SelectBox
				deferRendering={false}
				items={columnsList}
				displayExpr={(model) => model?.getCaption()}
				valueExpr={(model) => model}
				onValueChange={(value) => selectColumn(value)}
			/>
		</div>
	);
};

export default SelectBoxMassiveUpdate;
