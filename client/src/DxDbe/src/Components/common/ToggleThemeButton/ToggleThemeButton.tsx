/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/
import React, {useCallback, useState} from 'react';
import './styles.less';

const ToggleThemeButton = ({onValueChanged}) => {
    const [isChecked, setChecked] = useState(() => {
        const localStorageTheme = localStorage.getItem('themeName');
        return localStorageTheme === 'dark';
    });

    const onChange = useCallback((e) => {
        setChecked(e.target.checked);
        onValueChanged();
    }, []);

    return <div className="onoffswitch">
        <input onChange={onChange} type="checkbox" name="onoffswitch" className="onoffswitch-checkbox input-dark" id="myonoffswitch" checked={isChecked} />
        <label className="onoffswitch-label" htmlFor="myonoffswitch"></label>
    </div>;
};

export default ToggleThemeButton;
