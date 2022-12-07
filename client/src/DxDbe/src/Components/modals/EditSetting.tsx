/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Button} from 'devextreme-react/button';
import translate from '../../i18n/localization';
import Builder from './builders/Builder';

const EditSetting = ({ closeModal, props }) => {
	const { builderKey, data, component, rowIndex, tableInstance } = props;
	const [settingChanges, setSettingChanges] = useState();

	const defaultValue = useMemo(() => {
		return data.getSetting();
	}, [data]);

	useEffect(() => {
		setSettingChanges(data.getSetting());
	}, [data]);

	const getSettingChanges = useCallback((settingChanges) => {
		return setSettingChanges(settingChanges);
	}, []);

	return (
		<div>
			<Builder
				builderKey={builderKey}
				tableInstance={tableInstance}
				defaultValue={defaultValue}
				getSettingChanges={getSettingChanges}
			/>
			<div className={'dx-field'}>
				<div className={'dx-field-value'}>
					<Button
						width={70}
						className={'dx-button-success'}
						text={translate('SAVE')}
						type={'normal'}
						stylingMode={'contained'}
						onClick={async () => {
							const setting = settingChanges;
							data.setSetting(setting);
							component.cellValue(rowIndex, data, setting);
							await component.saveEditData();
							await component.refresh();
							closeModal();
						}}
					/>
				</div>
			</div>
		</div>
	);
};

export default EditSetting;
