/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import React, { Fragment, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import communicator from '../../api/Communicator';
import { InputParameterModel } from '../../models/Classes';
import Form, { ButtonItem, GroupItem, SimpleItem } from 'devextreme-react/form';
import translate from '../../i18n/localization';
import DbeTypesFactory from '../../services/TableDataModel/DbeColumn/DbeColumnFactory';
import { useHelpLink } from '../../hooks';
import { HelpIcon } from '../../assets/icons';
import { confirm } from 'devextreme/ui/dialog';
import cellType from '../../models/Enums/CellType';
import { isDefined } from '../../utils/utils';

import 'devextreme-react/color-box';
import 'devextreme-react/select-box';
import 'devextreme-react/date-box';
import 'devextreme-react/text-area';
import 'devextreme-react/number-box';

import './styles.css';

const TableActionModal = ({ props, closeModal, setLoading, isLoading }) => {
	const { tableId, actionId, selectedRows, executeTableAction, link, tableInstance, confirmationRequired } = props;

	const [helpLink] = useHelpLink(tableInstance, link);

	const inputModels = useRef<InputParameterModel[]>([]);
	const paramNames = useRef<string[]>([]);

	const [initialDisabledInputs, setDisabledInputs] = useState<string[]>([]);
	const [foreignKeysObjects, setForeignKeysObject] = useState(null);

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
				const finalParams = paramNames.current.reduce((params, paramName) => {
					return { ...params, [paramName]: allParamsForRow[paramName] };
				}, {});
				executeTableAction(finalParams, closeModal);
			}
		},
		[actionParameters],
	);

	const isExecuteBtnDisabled = useMemo(() => {
		return inputModels.current.every((model) => {
			if (model.getIsRequired()) {
				const name = model.getName();
				if (model.getCellType() === cellType.FOREIGN_KEY_CELL) {
					if (foreignKeysObjects && Object.hasOwn(foreignKeysObjects, name)) {
						const foreignObj = foreignKeysObjects[name];
						return !(foreignObj && Object.values(foreignObj).every((obj) => isDefined(obj)));
					}
				}
				return true;
			}
			return false;
		});
	}, [inputModels, inputModels.current, foreignKeysObjects, actionParameters]);

	const setParameters = useCallback(
		(propName, finalValue, dataField, value) => {
			setActionParameters((prevParams) => ({ ...prevParams, [propName]: value }));
			setForeignKeysObject((prevParams) => ({ ...prevParams, [propName]: finalValue }));
		},
		[actionParameters],
	);

	useEffect(() => {
		communicator.getTableActionParameterModels(tableId, actionId).then((res) => {
			const inputParametersModels = InputParameterModel.createInputParametersModels(res, () =>
				tableInstance.getMetadata(),
			).map((input) => {
				input.setActionId(actionId);
				return DbeTypesFactory(input, InputParameterModel) as InputParameterModel;
			});
			inputParametersModels.map((paramModel) => {
				paramModel.getDependsOnParamsList().map(([input, value]) => {
					const disabled = value ? !paramModel.getDefaultValue() : paramModel.getDefaultValue();
					disabled && setDisabledInputs((prev) => [...prev, input]);
				});
			});

			paramNames.current = inputParametersModels.map((input) => input.getName());
			inputModels.current = inputParametersModels;
			setLoading(true);
		});
	}, [tableId, actionId]);

	const formData = useMemo(() => {
		return inputModels.current.reduce((models, model) => {
			return { ...models, [model.parameterName]: model };
		}, {});
	}, [inputModels]);

	const disableFieldsByDependsOnParamsList = useCallback((e, inputModel) => {
		inputModel.getDependsOnParamsList().map(([input, value]) => {
			formRef?.current?.instance?.getEditor(input)?.option('disabled', value ? !e.value : e.value);
		});
	}, []);

	if (!isLoading) {
		return null;
	}

	return (
		<Fragment>
			<form
				action="src/Components/modals/index"
				onSubmit={(e) => {
					if (confirmationRequired) {
						const confirmed = confirm(translate('_CHECK_EXECUTION_ACTION'), 'W2MO');
						confirmed.then((isConfirmed) => {
							isConfirmed && handleSubmit(e);
						});
					} else {
						handleSubmit(e);
					}
				}}
				id={'tableActionForm'}
			>
				<Form colCount={1} formData={formData} ref={formRef}>
					{inputModels.current.map((inputModel) => {
						const defaultValue =
							actionParameters && Object.hasOwn(actionParameters, inputModel.getName())
								? actionParameters[inputModel.getName()]
								: inputModel.getDefaultValue();
						if (inputModel.getCellType() === cellType.FOREIGN_KEY_CELL) {
							return (
								<SimpleItem
									{...inputModel.getInputParameters()}
									component={inputModel.getFormCellRender(
										Object.assign(
											foreignKeysObjects ? foreignKeysObjects[inputModel.getName()] || {} : {},
											actionParameters,
										),
									)}
									editorOptions={{
										setParameters: (finalValue, dataField, value) =>
											setParameters(inputModel.getName(), finalValue, dataField, value),
										...inputModel.getEditorOptionsForInputParameters(),
										value: defaultValue,
									}}
								/>
							);
						}
						return (
							<SimpleItem
								name={inputModel.getName()}
								dataField={inputModel.getName()}
								editorType={inputModel.getViewModel().getInputType()}
								key={inputModel.getName()}
								label={{ text: inputModel.getCaption() }}
								editorOptions={{
									...inputModel.getEditorOptionsForInputParameters(),
									value: defaultValue,
									onValueChanged: (e) => {
										setActionParameters((prev) => {
											return { ...prev, [inputModel.getName()]: e.value };
										});
										disableFieldsByDependsOnParamsList(e, inputModel);
									},
									disabled: initialDisabledInputs.includes(inputModel.getName()),
								}}
							>
								{inputModel.getChildren()}
							</SimpleItem>
						);
					})}
					<GroupItem colCount={helpLink ? 2 : 1}>
						{helpLink && (
							<ButtonItem
								cssClass={'help-button'}
								buttonOptions={{
									icon: HelpIcon,
									useSubmitBehavior: false,
									onClick: () => window.open(helpLink, '_blank'),
									stylingMode: 'text',
								}}
							/>
						)}
						<ButtonItem
							buttonOptions={{
								type: 'success',
								text: translate('_EXECUTE_BUTTON'),
								useSubmitBehavior: true,
								disabled: isExecuteBtnDisabled,
							}}
						/>
					</GroupItem>
				</Form>
			</form>
		</Fragment>
	);
};

export default TableActionModal;
