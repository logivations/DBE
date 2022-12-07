/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import React from 'react';
import {Tooltip} from 'devextreme-react/tooltip';
import DataGrid, {Column, Paging, Selection} from 'devextreme-react/data-grid';
import translate from '../i18n/localization';
import NotificationController from "../services/Notification/NotificationController";
import {Severity} from "../models/Enums/Notification";

class ImportExportResultHelpers {

	public static parseImportResult(result) {
		const notificationController = new NotificationController();
		const { resultBody } = result.result;
		resultBody.forEach(({ failedReason }) => {
			notificationController.createNotification(failedReason, Severity.WARNING)
		});
	}

	public static getDataFormatsTooltip(targetSelector, visible) {
		const createDateFormatRow = (letter, desc, example) => ({
			letter,
			desc: translate(desc),
			example: example,
		});
		const dateFormats = [
			createDateFormatRow('G', 'ERA_DESIGNATOR', 'AD'),
			createDateFormatRow('y', 'YEAR', '1996; 96'),
			createDateFormatRow('Y', 'WEEK_YEAR', '2009; 09'),
			createDateFormatRow('M', 'MONTH_IN_YEAR', 'July; Jul; 07'),
			createDateFormatRow('w', 'WEEK_IN_YEAR', '27'),
			createDateFormatRow('W', 'WEEK_IN_MONTH', '2'),
			createDateFormatRow('D', 'DAY_IN_YEAR', '189'),
			createDateFormatRow('d', 'DAY_IN_MONTH', '10'),
			createDateFormatRow('F', 'DAY_OF_WEEK_IN_MONTH', '2'),
			createDateFormatRow('E', 'DAY_NAME_IN_WEEK', 'Tuesday; Tue'),
			createDateFormatRow('u', '_DAY_NUMBER_OF_WEEK', '1'),
			createDateFormatRow('a', '_AM_PM_MARKER', 'PM'),
			createDateFormatRow('H', '_HOUR_IN_DAY_0', '0'),
			createDateFormatRow('k', '_HOUR_IN_DAY_1', '24'),
			createDateFormatRow('K', '_HOUR_IN_AM_PM_0', '0'),
			createDateFormatRow('h', '_HOUR_IN_AM_PM_1', '12'),
			createDateFormatRow('m', 'MINUTE_IN_HOUR', '30'),
			createDateFormatRow('s', 'SECOND_IN_MINUTE', '55'),
			createDateFormatRow('S', 'MILLISECOND', '978'),
			createDateFormatRow('z', 'TIME_ZONE', 'PST; GMT-08:00'),
			createDateFormatRow('Z', 'TIME_ZONE', '-800'),
			createDateFormatRow('X', 'TIME_ZONE', '-08; -0800; -08:00'),
		];

		return (
			<div>
				<Tooltip target={targetSelector} position="right" visible={visible} closeOnOutsideClick={false}>
					<DataGrid
						dataSource={dateFormats}
						allowColumnReordering={false}
						rowAlternationEnabled={true}
						showBorders={false}
						width={450}
					>
						<Selection mode="single" />
						<Paging defaultPageSize={100} />
						<Column dataField="letter" caption={translate('LETTER')} width={40} />
						<Column dataField="desc" caption={translate('DATE_OR_TIME_COMPONENT')} width={270} />
						<Column dataField="example" caption={translate('EXAMPLES')} />
					</DataGrid>
				</Tooltip>
			</div>
		);
	}
}

export default ImportExportResultHelpers;
