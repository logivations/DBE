/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import { AbstractColumnModel, ColumnModel } from '../Classes';
import Notification from '../../services/Notification/Notification';

export interface IEditorComponentProps {
	data: any;
	column: AbstractColumnModel;
}

export interface INotification {
	notification: Notification;
}
