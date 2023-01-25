/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import { useEffect, useMemo } from 'react';
import useDebouncedRefresh from '../../hooks/useDebouncedRefresh';
import translate from '../../i18n/localization';
import { Severity } from '../../models/Enums/Notification';
import NotificationController from '../../services/Notification/NotificationController';

const useDbeDataGrid = (tableInstance, dbeDxGridRef, tableInstanceManager, toolbarRef, height) => {
	const notificationController = useMemo(() => new NotificationController(), []);
	const debouncedRefresh = useDebouncedRefresh(tableInstance);
	const additionalProps = useMemo(() => (height ? { height } : {}), [height]);

	useEffect(() => {
		if (tableInstance) {
			tableInstance.setTableRef(dbeDxGridRef);
		}
	}, [tableInstance, dbeDxGridRef, dbeDxGridRef.current]);

	useEffect(() => {
		if (toolbarRef && tableInstance) {
			tableInstanceManager.setToolbarInstance(tableInstance.table.getTableName(), toolbarRef);
		}
	}, [toolbarRef, toolbarRef.current, tableInstance]);

	useEffect(() => {
		if (tableInstance && tableInstance.canExecuteUpdateTable() && tableInstance.toolbarPanelButtonManager) {
			notificationController.createNotification({
				message: translate('_RECALCULATE_REPORT_DATA'),
				type: Severity.INFO,
				clickHandler:
					tableInstance?.toolbarPanelButtonManager?.toolbarPanelButtonEvents.recalculateReportDataClickHandler(),
			});
		}
	}, [tableInstance]);
	return { debouncedRefresh, additionalProps };
};

export default useDbeDataGrid;
