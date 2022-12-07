/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import React, {Fragment, useCallback, useEffect, useMemo, useRef, useState} from 'react';
import communicator from '../../api/Communicator';
import {InputParameterModel} from '../../models/Classes';
import Form, {ButtonItem, GroupItem, SimpleItem} from 'devextreme-react/form';
import translate from '../../i18n/localization';
import DbeTypesFactory from '../../services/TableDataModel/DbeColumn/DbeColumnFactory';
import {useHelpLink} from "../../hooks";
import {HelpIcon} from "../../assets/icons";
import {confirm} from "devextreme/ui/dialog";

const TableActionModal = ({ props, closeModal, setLoading }) => {
	const { tableId, actionId, selectedRows, executeTableAction, link, tableInstance, confirmationRequired } = props;

	const [helpLink] = useHelpLink(tableInstance, link);

	const [inputModels, setInputModels] = useState<InputParameterModel[]>([]);
	const [paramNames, setParamNames] = useState<string[]>([]);

	const [initialDisabledInputs, setDisabledInputs] = useState<string[]>([]);
	const [foreignKeysObjects, setForeignKeysObject] = useState({});

	const formRef = useRef<Form>();

	const [actionParameters, setActionParameters] = useState(() => selectedRows || {});
	const handleSubmit = useCallback(
		(e) => {
			if (formRef.current.instance.validate().isValid) {
				e.preventDefault();
				const formData = new FormData(e.target);
				const parameters = [...formData.entries()].reduce((result, [paramName, value]) => {
					return { ...result, [paramName]: value };
				}, {});

				const allParamsForRow = Object.assign(actionParameters, parameters);
				const finalParams = paramNames.reduce((params, paramName) => {
					return { ...params, [paramName]: allParamsForRow[paramName] };
				}, {});
				executeTableAction(finalParams, closeModal);
			}
		},
		[actionParameters, paramNames],
	);

	useEffect(() => {
		setActionParameters(selectedRows);
	}, [selectedRows]);

	const setParameters = useCallback(
		(propName, value) => {
			setActionParameters((prevParams) => ({ ...prevParams, [propName]: value[propName] }));
			setForeignKeysObject((prevParams) => ({...prevParams, [propName]: value}));
		},
		[actionParameters],
	);

	useEffect(() => {
		communicator.getTableActionParameterModels(tableId, actionId).then((res) => {
            const inputParametersModels = InputParameterModel.createInputParametersModels(res, tableInstance.getMetadata()).map((input) => {
                input.setActionId(actionId);
                return DbeTypesFactory(input, InputParameterModel) as InputParameterModel;
            });
            Promise.all(
                inputParametersModels.map((paramModel) => {
                    paramModel.getDependsOnParamsList().map(([input, value]) => {
                        const disabled = value ? !paramModel.getDefaultValue() : paramModel.getDefaultValue();
                        disabled && setDisabledInputs((prev) => [...prev, input]);
                    });
                    return paramModel.setForeignKeyData();
                }),
            ).then(() => {
                setParamNames(inputParametersModels.map((input) => input.getName()));
                setInputModels(inputParametersModels);
                setLoading(true);
            });
        });
	}, [tableId, actionId]);

	const formData = useMemo(() => {
		return inputModels.reduce((models, model) => {
			return { ...models, [model.parameterName]: model };
		}, {});
	}, [inputModels]);

	return (
		<Fragment>
			<form
				action="src/DxDbe/src/Components/modals/TableActionModal"
				onSubmit={(e) => {
					if (confirmationRequired) {
						const confirmed = confirm(translate('_CHECK_EXECUTION_ACTION'), 'W2MO');
						confirmed.then((isConfirmed) => {
							isConfirmed && handleSubmit(e)
						})
					} else {
						handleSubmit(e);
					}
				}}
				id={'tableActionForm'}>
				<Form colCount={1} formData={formData} ref={formRef}>
					{inputModels.map((inputModel) => {
						const defaultValue = actionParameters && Object.hasOwn(actionParameters, inputModel.getName())
							? actionParameters[inputModel.getName()]
							: inputModel.getDefaultValue();
						return (
							<SimpleItem
								{...inputModel.getInputParameters()}
								component={inputModel.getFormCellRender(
									foreignKeysObjects[inputModel.getName()] || actionParameters,
									inputModel.foreignKeyInfo.foreignKeyData,
								)}
								label={{ text: inputModel.getCaption() }}
								editorOptions={{
									setParameters: (params) => setParameters(inputModel.getName(), params),
									...inputModel.getEditorOptionsForInputParameters(),
									value: defaultValue,
									onValueChanged: (e) => {
										setActionParameters((prevParams) => ({...prevParams, [inputModel.getName()]: e.value}));

										inputModel.getDependsOnParamsList().map(([input, value]) => {
											formRef?.current?.instance
												?.getEditor(input)
												?.option('disabled', value ? !e.value : e.value);
										});
									},
									disabled: initialDisabledInputs.includes(inputModel.getName()),
								}}
								editorType={inputModel.getViewModel().getInputType()}
							>
								{inputModel.getChildren()}
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
							buttonOptions={{ text: translate('_EXECUTE_BUTTON'), useSubmitBehavior: true }}
							cssClass={'dx-button-success'}
						/>
					</GroupItem>
				</Form>
			</form>
		</Fragment>
	);
};

export default TableActionModal;
