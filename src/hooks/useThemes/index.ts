/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import { useCallback, useMemo } from 'react';
import themes from 'devextreme/ui/themes';

const useThemes = () => {
	const themeFileName = useMemo(() => ({ dark: 'dark.theme', light: 'light.theme' }), []);
	const themeCssClass = useMemo(() => ({ dark: 'theme-dark', light: 'theme-light' }), []);
	const themeLocalStorageName = useMemo(() => ({ dark: 'dark', light: 'light' }), []);

	const changeTheme = useCallback(() => {
		const isDarkTheme = themes.current() === themeFileName.dark;
		themes.current(isDarkTheme ? themeFileName.light : themeFileName.dark);
		document.body.classList.replace(
			isDarkTheme ? themeCssClass.dark : themeCssClass.light,
			isDarkTheme ? themeCssClass.light : themeCssClass.dark,
		);
		localStorage.setItem('themeName', isDarkTheme ? themeLocalStorageName.light : themeLocalStorageName.dark);
	}, []);

	const applyBaseTheme = useCallback(() => {
		const localStorageTheme = localStorage.getItem('themeName');
		const isDarkTheme = localStorageTheme === themeLocalStorageName.dark;
		if (localStorageTheme && themes.current() !== localStorageTheme) {
			themes.current(isDarkTheme ? themeFileName.dark : themeFileName.light);
		}
		document.body.classList.add(isDarkTheme ? themeCssClass.dark : themeCssClass.light);
	}, []);

	return { changeTheme, applyBaseTheme };
};

export default useThemes;
