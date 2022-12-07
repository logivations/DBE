/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import AbstractColumnModel from '../../models/Classes/AbstractColumnModel';

interface ITableDataModel {
	columns: AbstractColumnModel[];
	mappedColumnModelsByName: Map<string, AbstractColumnModel>;
}

export default ITableDataModel;
