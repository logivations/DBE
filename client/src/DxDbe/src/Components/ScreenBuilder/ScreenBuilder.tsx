/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import React, {useEffect, useMemo, useState} from 'react';
import Split from 'react-split';
import debounce from 'lodash/debounce';
import classNames from 'classnames';

import TableInstanceManager from '../../services/TableInstanceManager/TableInstanceManager';
import OriginalTable from '../OriginalTable/OriginalTable';
import Loader from '../Loader/Loader';
import useScreenBuilderContext from "../../context/ScreenBuilderContext";
import { Direction } from '../../models/Enums/Enumns';

const DbeDataGrid = React.lazy(
	() => import(/* webpackChunkName: "DbeDataGrid" */ '../DbeDataGrid/DbeDataGrid'),
);

const CreateScreenBuilder = ({
	configs,
	isScreenBuilder,
	tableInstanceManager,
}) => {
	const height = useMemo(() => {
		return configs.direction === Direction.VERTICAL
			? window.innerHeight / configs.elements.length - 30
			: window.innerHeight - 50;
	}, []);

	useEffect(() => {
		if (configs.direction === Direction.HORIZONTAL) {
			tableInstanceManager.repaintToolbars();
		}
	}, []);

	return (
		<Split
			className={classNames({
				'split-wrapper': true,
				'split': configs.direction === Direction.HORIZONTAL
			})}
			gutterSize={5}
			direction={configs.direction}
			minSize={configs.direction === Direction.VERTICAL ? height : 100}
			onDrag={debounce(() => {
				if (configs.direction === Direction.HORIZONTAL) {
					tableInstanceManager.repaintToolbars();
				}
			}, 100)}
		>
			{configs.elements.map((table, index) => {
				if (table.table_name) {
					if (table.table_name === TableInstanceManager.ORIGINAL_TABLE && isScreenBuilder) {
						return <div key={`${table.table_name}-${index}`}><OriginalTable height={height} /></div>;
					} else if (table.table_name === TableInstanceManager.ORIGINAL_TABLE) {
						return (
							<div key={`${table.table_name}-${index}`}>
								<DbeDataGrid
									tableName={TableInstanceManager.ORIGINAL_TABLE}
									height={height}
									isScreenBuilderTable={false}
								/>
							</div>
						);
					} else {
						return (
							<div key={`${table.tableKey}`}>
								<DbeDataGrid
									tableName={table.table_name}
									height={height}
									isScreenBuilderTable={true}
								/>
							</div>
						);
					}
				} else {
					return (
						<CreateScreenBuilder
							configs={table}
							isScreenBuilder={isScreenBuilder}
							tableInstanceManager={tableInstanceManager}
							key={`${table.elements.length}-${table.direction}-${index}`}
						/>
					);
				}
			})}
		</Split>
	);
};

const ScreenBuilder = ({isScreenBuilder}) => {
	const [isLoading, setLoading] = useState<boolean>(true);
	const tableInstanceManager = new TableInstanceManager();
	const {parentChildTable, screenBuilder} =  useScreenBuilderContext();

	const {screenBuilderTables, screenBuilderTemplateID, screenBuilderTemplate} = useMemo(() => {
		return {
			screenBuilderTables: isScreenBuilder ? screenBuilder.screenBuilderTables : [parentChildTable.childParentTable],
			screenBuilderTemplateID: isScreenBuilder ? screenBuilder.screenBuilderTemplateID : parentChildTable.childParentTableTemplateID,
			screenBuilderTemplate: isScreenBuilder ? screenBuilder.splitElements : parentChildTable.childParentConfig
		};
	}, []);

	useEffect(() => {
		if (screenBuilderTables.length && screenBuilderTemplateID) {
			Promise.all(
				screenBuilderTables.map((table_name, index) => {
					const tableKey = `${table_name}-${screenBuilderTemplateID}-${index + 1}`;
					return tableInstanceManager.createInstance(
						table_name,
						{
							tableKey: isScreenBuilder
								? { screenBuilderTableKey: tableKey }
								: { childParentTableKey: tableKey },
							screenBuilderJoinedColumnGroups: parentChildTable.screenBuilderJoinedColumnGroups
						},
					);
				}),
			).then(() => setLoading(false));
		}
	}, [screenBuilderTables, screenBuilderTemplateID]);

	return (
		<div>
			{isLoading ? (
				<Loader />
			) : (
				<CreateScreenBuilder
					configs={screenBuilderTemplate}
					isScreenBuilder={isScreenBuilder}
					tableInstanceManager={tableInstanceManager}
				/>
			)}
		</div>
	);
};

export default ScreenBuilder;
