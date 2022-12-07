/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import React, {Fragment} from 'react';
import Form, {SimpleItem} from 'devextreme-react/form';
import RadioGroup from 'devextreme-react/radio-group';
import translate from '../../i18n/localization';
import {Button} from 'devextreme-react/button';
import {getButtonNameByType} from '../../utils/utils';
import SelectBoxMassiveUpdate from './SelectBoxMassiveUpdate';
import useMassiveUpdate from "../../hooks/useMassiveUpdate";
import {useDbeActionsHelpLink} from "../../hooks/useHelpLink";
import {DbeActions} from "../../models/Enums/HelpLinks";
import {HelpIcon} from "../../assets/icons";

const MassiveUpdateModal = ({ props, closeModal, setLoading }) => {
	const {dbeDxGridInstance, executeMassiveUpdate, tableInstance} = props;
	const helpLink = useDbeActionsHelpLink(tableInstance.warehouseUiType, DbeActions.MASSIVE_UPDATE);

	const {
		selectColumn,
		selectedColumn,
		dbeColumn,
		foreignKeyParams,
		radioButtonsValue,
		setParameters,
		onInputChange,
		setRadioButtonsValue,
		isMassiveUpdatePossible,
		massUpdateRange,
		handleSubmit,
		isDisabledApplyButton
	} = useMassiveUpdate({executeMassiveUpdate, tableInstance, dbeDxGridInstance, closeModal});

	return (
		<div id={'massive-update-modal'}>
			<form action="src/DxDbe/src/Components/modals/MassiveUpdateModal" id="massiveUpdateForm">
				<div className="dx-fieldset">
					<div className="dx-field">
						<SelectBoxMassiveUpdate
							selectColumn={selectColumn}
							setLoading={setLoading}
							tableInstance={tableInstance}
						/>
						<div className="dx-field-value">
							{selectedColumn && (
								<Fragment>
									<Form colCount={1} labelMode={'hidden'}>
										<SimpleItem
											key={dbeColumn.getName()}
											dataField={dbeColumn.getName()}
											name={dbeColumn.getName()}
											component={dbeColumn.getFormCellRender(
												foreignKeyParams,
												dbeColumn.foreignKeyInfo.foreignKeyData,
												radioButtonsValue
											)}
											editorOptions={{
												...dbeColumn.getColumnEditorOptions(),
												name: dbeColumn.getName(),
												dataField: dbeColumn.getName(),
												setParameters: setParameters,
												width: 'auto',
												defaultValue: dbeColumn.getDefaultValue(),
												disabled: radioButtonsValue?.toNullOrZeroOperation(),
												onChange: onInputChange,
											}}
											editorType={dbeColumn.getViewModel().getInputType()}
										/>
									</Form>
									<RadioGroup
										items={selectedColumn.getMassiveUpdateOperations()}
										defaultValue={selectedColumn.getMassiveUpdateOperations()[0]}
										onValueChanged={({ value }) => setRadioButtonsValue(value)}
										valueExpr={(operation) => operation}
										displayExpr={(operation) => translate(operation.message)}
									/>
								</Fragment>
							)}
						</div>
					</div>
					{!isMassiveUpdatePossible &&
						<div className="dx-field" style={{display: 'flex', alignItems: 'flex-end', color: '#d9534f'}}>
							{translate('MASSIVE_UPDATE_FOR_SELECTED_ROWS_IS_NOT_POSSIBLE')}
						</div>
					}
					<div className={'dx-field'}>
						<Button
							type={'normal'}
							stylingMode={'text'}
							onClick={() => {
								window.open(helpLink, '_blank');
							}}
							icon={HelpIcon}
						/>
						<div className={'dx-field-value'}>
							{massUpdateRange.map((range) => {
								return (
									<Button
										elementAttr={{
											class: 'dx-button-success'
										}}
										key={range}
										text={getButtonNameByType(range)}
										type={'normal'}
										onClick={(e) => handleSubmit(e, range)}
										useSubmitBehavior={false}
										stylingMode={'contained'}
										disabled={isDisabledApplyButton}
									/>
								);
							})}
						</div>
					</div>
				</div>
			</form>
		</div>
	);
};

export default MassiveUpdateModal;
