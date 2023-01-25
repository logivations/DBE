/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import React, { Fragment } from 'react';
import { Tooltip } from 'devextreme-react/tooltip';
import DataGrid, { Column, Paging, Selection } from 'devextreme-react/data-grid';
import translate from '../i18n/localization';
import NotificationController from '../services/Notification/NotificationController';
import { Severity } from '../models/Enums/Notification';
import Accordion from 'devextreme-react/accordion';

class ImportExportResultHelpers {
	private static getNotificationSeverityForImport(resultHeader) {
		switch (resultHeader) {
			case 'ALL_RECORDS_LOADED':
				return { severity: Severity.SUCCESS, text: '_UPLOAD_SUCCESSFUL' };
			case 'NOT_ALL_RECORDS_LOADED':
				return { severity: Severity.WARNING, text: '_UPLOAD_PARTLY_SUCCESSFUL' };
			default:
				return { severity: Severity.ERROR, text: '' };
		}
	}

	private static createNotificationHeader(failedRecords, importedRecords, headerText) {
		const importedRowsLabel = translate('ROWS_IMPORTED_$', importedRecords);
		const failedRowsLabel = translate('ROWS_FAILED_$', failedRecords);

		return (
			<div className={'notification-content-header'}>
				{headerText ? (
					<>
						<span>
							<b>{translate(headerText)}</b>
						</span>
						<br />
					</>
				) : null}
				<span>{importedRowsLabel}</span>
				<br />
				<span>{failedRowsLabel}</span>
			</div>
		);
	}

	private static createNotificationBody(resultBody, skippedColumnNames) {
		if (resultBody.length === 1 && resultBody[0].recordNumber === null) {
			return (
				<div className={'notification-content-body'}>
					{skippedColumnNames.length ? <span>{skippedColumnNames.join(', ')}</span> : null}
					<span>{resultBody[0].failedReason}</span>
				</div>
			);
		} else {
			return (
				<div className={'notification-content-body'}>
					{resultBody.length ? (
						<Accordion
							dataSource={[resultBody]}
							collapsible={true}
							animationDuration={1000}
							itemTitleRender={() => (
								<span>{translate('SHOW_FIRST_$_FAILED_RECORDS', resultBody.length)}</span>
							)}
							itemRender={(body) => {
								return body.map(({ failedReason, recordNumber }, index) => {
									return (
										<Fragment key={index}>
											<span>
												{translate('RECORD_$', recordNumber)}: {failedReason}
											</span>
											<br />
										</Fragment>
									);
								});
							}}
							id={'notification-content-accordion-body'}
						/>
					) : null}
					{skippedColumnNames.length ? (
						<Accordion
							dataSource={[skippedColumnNames]}
							animationDuration={1000}
							collapsible={true}
							itemTitleRender={() => <span>{translate('SKIPPED_COLUMNS_$', '')}</span>}
							itemRender={(skippedColNames) => {
								return <span>{skippedColNames.join(', ')}</span>;
							}}
							id={'notification-content-accordion-skipped-cols'}
						/>
					) : null}
				</div>
			);
		}
	}

	public static parseImportResult(result) {
		const notificationController = new NotificationController();
		const {
			failedRecords,
			importedRecords,
			isRightSeparator,
			resultBody,
			resultHeader,
			skippedColumnNames,
			postProcessingResult,
		} = result.result;
		const { severity, text: headerText } = ImportExportResultHelpers.getNotificationSeverityForImport(resultHeader);

		if (!isRightSeparator) {
			notificationController.createNotification({
				message: translate('FIELD_SEPARATOR_IS_WRONG'),
				type: Severity.WARNING,
			});
		}

		const NotificationContent = (): JSX.Element => {
			return (
				<div className={'notification-content'}>
					{ImportExportResultHelpers.createNotificationHeader(failedRecords, importedRecords, headerText)}
					{ImportExportResultHelpers.createNotificationBody(resultBody, skippedColumnNames)}
				</div>
			);
		};
		notificationController.createNotification({
			Content: NotificationContent,
			type: severity,
			displayTime: 10000,
			hasCopyButton: false,
		});

		postProcessingResult.forEach((postProcessingRes) => {
			const message = translate(postProcessingRes.alias, ...(postProcessingRes.parameters.split(',') || []));
			notificationController.createNotification({
				message: message,
				type: postProcessingRes.severity,
				displayTime: 10000,
				hasCopyButton: false,
			});
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
				<Tooltip target={targetSelector} position="right" visible={visible} hideOnOutsideClick={false}>
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
