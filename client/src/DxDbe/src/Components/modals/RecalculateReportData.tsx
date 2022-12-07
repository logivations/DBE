/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import React, {Fragment, useCallback, useEffect, useRef, useState} from 'react';
import Form, {ButtonItem, GroupItem, SimpleItem} from 'devextreme-react/form';
import {InputParameterModel} from '../../models/Classes';
import translate from '../../i18n/localization';
import {CellType} from '../../models/Enums';
import DbeTypesFactory from '../../services/TableDataModel/DbeColumn/DbeColumnFactory';
import {IAbstractColumnModel} from '../../models/Interfaces';
import {useHelpLink} from "../../hooks";
import {HelpIcon} from "../../assets/icons";

const RecalculateReportData = ({props, closeModal, setLoading}) => {
    const {tableInstance, executeRecalculateReportData} = props;
    const [inputParams, setInputParams] = useState<IAbstractColumnModel[]>([]);
    const [foreignParams, setForeignParams] = useState({});
    const formRef = useRef<Form>();

	const [helpLink] = useHelpLink(tableInstance.warehouseUiType, tableInstance.table.getSpLink());

    const isValidForeignKeys = useCallback(() => {
        return Object.values(foreignParams).some(({value, isRequired}) => {
            return isRequired && !value;
        });
	}, [foreignParams]);
	const handleSubmit = useCallback(
		(e) => {
			e.preventDefault();
			if (formRef.current.instance.validate().isValid && !isValidForeignKeys()) {
				const formData = new FormData(e.target);
				const parameters = [...formData.entries()].reduce((result, [paramName, value]) => {
					return { ...result, [paramName]: value };
				}, {});

				const res = [];
                [
                    ...Object.entries({...parameters}),
                    ...Object.entries(foreignParams).map(([name, value]: [string, any]) => [name, value?.value]),
                ].forEach((item: [string, string]) => {
					const [key, value] = item;
					const paramIndex = inputParams.findIndex((input) => input.getName() === key);
					res[paramIndex] = value;
				});
				executeRecalculateReportData(res);
				closeModal();
			}
		},
		[foreignParams, inputParams],
	);

	const setForeignParameters = useCallback(
		(value, input) => {
            const foreignKeyValue = value[input.foreignKeyInfo.joinedKeyColumnNames[input.parameterName]];
            setForeignParams((prevParams) => ({
                ...prevParams,
                [input.parameterName]: {value: foreignKeyValue, isRequired: input.getIsRequired()},
            }));
        },
		[foreignParams],
	);

	useEffect(() => {
        const inputParams = tableInstance.getReportInputParameters().map((input) => {
            return DbeTypesFactory(input, InputParameterModel);
        });

        Promise.all(
            inputParams.map((paramModel) => {
                return paramModel.setForeignKeyData();
            }),
        ).then(() => {
            setInputParams(inputParams);
            inputParams.forEach((input) => {
                if (input.getCellType() === CellType.FOREIGN_KEY_CELL) {
                    setForeignParams((prevParams) => ({
                        ...prevParams,
                        [input.getName()]: {value: input.getDefaultValue(), isRequired: input.getIsRequired()},
                    }));
                }
            });
            setLoading(true);
		});
	}, []);

	return (
		<Fragment>
			<form onSubmit={handleSubmit} id={"recalculateReportDataForm"}>
				<Form ref={formRef}>
					{inputParams.map((input) => {
						input.setTableDataModel(tableInstance.getTableDataModel());
						return (
							<SimpleItem
								{...input.getInputParameters()}
								component={input.getFormCellRender(
                                    input.getForeignDataForInputParam(
                                        foreignParams[input.getName()]?.value,
                                        input.getName(),
                                    ),
                                    input.foreignKeyInfo.foreignKeyData,
                                )}
								editorOptions={{
                                    setParameters: (value) => setForeignParameters(value, input),
                                    ...input.getEditorOptionsForInputParameters(),
                                }}
								editorType={input.getViewModel().getInputType()}
							>
								{input.getChildren()}
							</SimpleItem>
						);
					})}
					<GroupItem colCount={2}>
						{
							helpLink && <ButtonItem
								cssClass={'help-button'}
								buttonOptions={{
									icon: HelpIcon,
									useSubmitBehavior: false,
									onClick: () => window.open(helpLink, '_blank'),
									stylingMode: 'text'
								}}
							/>
						}
						<ButtonItem
							cssClass={'dx-button-success'}
							buttonOptions={{ text: translate('_EXECUTE_BUTTON'), useSubmitBehavior: true }} />
					</GroupItem>

				</Form>
			</form>
		</Fragment>
	);
};

export default RecalculateReportData;
