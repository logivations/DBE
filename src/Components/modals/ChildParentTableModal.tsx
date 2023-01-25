/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import React, { useMemo, useRef, useState } from 'react';
import { childParentScreenTemplates } from '../../constants/TemplateSource';
import Templates from '../ScreenBuilder/Templates';
import translate from '../../i18n/localization';
import { useDbeActionsHelpLink } from '../../hooks/useHelpLink';
import { DbeActions } from '../../models/Enums/HelpLinks';
import Form, { ButtonItem, EmptyItem, GroupItem, RequiredRule, SimpleItem } from 'devextreme-react/form';
import InputType from '../../models/Enums/InputType';
import { HelpIcon } from '../../assets/icons';
import useScreenBuilderContext from '../../context/ScreenBuilderContext';

const ChildParentTableModal = ({ closeModal, props: { tableInstance, isChildOrParentTable } }) => {
	const tablesList = useMemo(() => tableInstance.getTables(isChildOrParentTable), [isChildOrParentTable]);
	const link = useDbeActionsHelpLink(
		tableInstance.warehouseUiType,
		isChildOrParentTable ? DbeActions.CHILD_RECORDS : DbeActions.PARENT_RECORDS,
	);
	const { parentChildTable, destroyChildParentTable, setChildParentConfig } = useScreenBuilderContext();
	const { childParentTable, childParentTableTemplateID } = parentChildTable;

	const [joinedColumnGroups, setJoinedColumnGroups] = useState(null);
	const defaultTemplate = useMemo(
		() => childParentScreenTemplates.find((el) => el.ID === childParentTableTemplateID),
		[],
	);
	const [selectedTemplate, selectTemplate] = useState(defaultTemplate);
	const [table, setTable] = useState<string>(childParentTable);
	const formRef = useRef<Form>();

	return (
		<div id={'screen-builder-template'}>
			<Form ref={formRef}>
				<SimpleItem
					dataField={'table'}
					editorType={InputType.SelectBox}
					editorOptions={{
						label: translate('TABLE'),
						items: tablesList,
						searchEnabled: true,
						searchExpr: 'localizedChildTableName',
						searchMode: 'contains',
						displayExpr: 'localizedChildTableName',
						valueExpr: 'childTableName',
						value: table,
						onSelectionChanged: (e) => {
							setTable(e.selectedItem?.childTableName);
							setJoinedColumnGroups(e.selectedItem?.joinedColumnGroups);
						},
					}}
				>
					<RequiredRule />
				</SimpleItem>
				<SimpleItem
					render={() => {
						return (
							<Templates
								templatesElements={childParentScreenTemplates}
								defaultValue={defaultTemplate}
								getSelectedTemplate={selectTemplate}
							/>
						);
					}}
				></SimpleItem>
				<GroupItem colCount={10}>
					<GroupItem colSpan={1}>
						<ButtonItem
							cssClass={'help-button'}
							buttonOptions={{
								icon: HelpIcon,
								useSubmitBehavior: false,
								onClick: () => window.open(link, '_blank'),
								stylingMode: 'text',
							}}
						/>
					</GroupItem>
					<EmptyItem colSpan={6} />
					<GroupItem colSpan={3} colCount={2}>
						<ButtonItem
							verticalAlignment={'center'}
							cssClass={'zeroPadding'}
							buttonOptions={{
								text: translate('Destroy'),
								type: 'normal',
								stylingMode: 'contained',
								useSubmitBehavior: false,
								onClick: () => {
									destroyChildParentTable();
									tableInstance.tableRelatedUserParameters.storeParentChildTableBuilderSettings(
										null,
										null,
									);
									closeModal();
								},
							}}
						/>
						<ButtonItem
							verticalAlignment={'center'}
							buttonOptions={{
								text: translate('BUILD'),
								type: 'success',
								stylingMode: 'contained',
								useSubmitBehavior: false,
								onClick: () => {
									if (formRef.current.instance.validate().isValid) {
										destroyChildParentTable();
										setChildParentConfig(
											selectedTemplate.splitScreenConfig(table),
											table,
											selectedTemplate.ID,
											joinedColumnGroups,
										);

										tableInstance.tableRelatedUserParameters.storeParentChildTableBuilderSettings(
											selectedTemplate.ID,
											[table],
											{ joinedColumnGroups },
										);
										closeModal();
									}
								},
								disabled: !selectedTemplate,
							}}
						/>
					</GroupItem>
				</GroupItem>
			</Form>
		</div>
	);
};

export default ChildParentTableModal;
