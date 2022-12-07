/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import React, {useEffect, useMemo, useState} from 'react';
import {SelectBox} from 'devextreme-react/select-box';
import Templates from '../ScreenBuilder/Templates';
import {screenBuilderTemplates} from '../../constants/TemplateSource';
import translate from '../../i18n/localization';
import {TableInfo} from '../../models/Classes';
import Form, {ButtonItem, EmptyItem, GroupItem, SimpleItem} from "devextreme-react/form";
import useScreenBuilderContext from "../../context/ScreenBuilderContext";

const SelectBoxesComponent = ({selectBoxes, tablesList, selectedTables, setSelectedTables}) => {
    return selectBoxes.map((selectBox) => {
		return <SelectBox
			dataSource={tablesList}
			displayExpr={(item) => {
				return item && translate(item.name);
			}}
			valueExpr={'table_name'}
			label={selectBox.label}
			searchEnabled={true}
			searchMode={'contains'}
			searchExpr={translate('name')}
			searchTimeout={200}
			key={selectBox.key}
			value={selectedTables[`table${selectBox.key}`]}
			onSelectionChanged={(e) => {
				setSelectedTables((prev) => {
					return {
						...prev,
						[`table${selectBox.key}`]: e.selectedItem.table_name,
					};
				});
			}}
		/>;

	});
};

const ScreenBuilderConfig = ({ closeModal, props: { tableInstance } }) => {
	const tablesList = useMemo<TableInfo[]>(() => tableInstance.getAllVisibleTables(), []);
	const {setScreenBuilderConfig, destroyScreenBuilder, screenBuilder} =  useScreenBuilderContext();
	const {screenBuilderTemplateID, screenBuilderTables, isScreenBuilderOn} = screenBuilder;
	const defaultTemplate = useMemo(() => screenBuilderTemplates.find((el) => el.ID === screenBuilderTemplateID),[]);
	const [selectedTemplate, setSelectedTemplate] = useState(isScreenBuilderOn ? defaultTemplate : null);
	const [selectedTables, setSelectedTables] = useState<{ [key: string]: TableInfo }>({});

	useEffect(() => {
		setSelectedTables(() => {
			if (!isScreenBuilderOn) {
				return {};
			}
			if(!selectedTemplate || (selectedTemplate && selectedTemplate.ID !== screenBuilderTemplateID)) {
				return {};
			}
			return screenBuilderTables.reduce((acc, tableName, index) => {
				return {...acc, [`table${index + 1}`] : tableName};
			}, {});
		});
	}, [selectedTemplate]);
	const selectBoxes = useMemo(() => {
		if (selectedTemplate) {
			return  Array(selectedTemplate.numberOfTables).fill({}).map((_, i) => {
				return { label: `Table ${i + 1}`, key: i + 1 };
			});
		} else {
			return [];
		}
	}, [selectedTemplate]);

	return (
		<div id={'screen-builder-template'}>
			<Form>
				<SimpleItem
					render={() => {
						return <Templates
							templatesElements={screenBuilderTemplates}
							defaultValue={selectedTemplate}
							getSelectedTemplate={setSelectedTemplate}
						/>;
					}}
				/>
				<GroupItem>
					<SelectBoxesComponent
						selectedTables={selectedTables}
						tablesList={tablesList}
						selectBoxes={selectBoxes}
						setSelectedTables={setSelectedTables}
					/>
				</GroupItem>
				<GroupItem colCount={10}>
					<EmptyItem colSpan={7} />
					<GroupItem colSpan={3} colCount={2}>
						<ButtonItem
							verticalAlignment={'center'}
							cssClass={'zeroPadding'}
							buttonOptions={{
								text: translate('Destroy'),
								type: 'normal',
								stylingMode: 'contained',
								onClick: () => {
									destroyScreenBuilder();
									tableInstance.tableRelatedUserParameters.storeScreenBuilderSettings(null, null);
									closeModal();
								},
								disabled: !screenBuilderTemplateID,
							}}
						/>
						<ButtonItem
							verticalAlignment={'center'}
							cssClass={'dx-button-success'}
							buttonOptions={{
								text: translate('BUILD'),
								type: 'normal',
								stylingMode: 'contained',
								onClick: async () => {
									const splitElementsByTemplate = selectedTemplate.splitScreenConfig(
										Object.values(selectedTables),
									);
									destroyScreenBuilder();
									setScreenBuilderConfig(
										splitElementsByTemplate,
										selectedTemplate.ID,
										Object.values(selectedTables)
									);
									tableInstance.tableRelatedUserParameters.storeScreenBuilderSettings(
										selectedTemplate.ID,
										Object.values(selectedTables),
									);
									closeModal();
								},
								disabled: !selectedTemplate || Object.keys(selectedTables).length !== selectedTemplate.numberOfTables,
							}}
						/>
					</GroupItem>
				</GroupItem>
			</Form>
		</div>
	);
};

export default ScreenBuilderConfig;
