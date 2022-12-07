/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/
import DxCompareTypeGroup from '../../models/Enums/DxCompareTypeGroup';
import TableInstance from '../TableInstanceManager/TableInstance';

interface ICompareDataButton {
	readonly name: string;
	readonly localizedName: string;

	setVisible(isButtonVisible: boolean): ICompareDataButton;
	getName(): DxCompareTypeGroup;
	getCaption(): string;
	getComponent(tableInstance: TableInstance, campaigns);
}

export default ICompareDataButton;
