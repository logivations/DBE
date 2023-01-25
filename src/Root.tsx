/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import React, { Suspense } from 'react';
import Loader from './Components/Loader/Loader';
import './index.css';
import './styles/general.css';

const App = React.lazy(() => import(/* webpackChunkName: "App" */ './App'));
const DbeTableDataContextProvider = React.lazy(() => {
	return import(/* webpackChunkName: "DbeTableDataContext" */ './context/DbeTableDataContext').then((module) => ({
		default: module.DbeTableDataContextProvider,
	}));
});
const ParentTablePopupContextProvider = React.lazy(() => {
	return import(/* webpackChunkName: "ParentTablePopupContext" */ './context/ParentTablePopupContext').then(
		(module) => ({
			default: module.ParentTablePopupContextProvider,
		}),
	);
});

const ModalWindowPopupContextProvider = React.lazy(() => {
	return import(/* webpackChunkName: "ParentTablePopupContext" */ './context/ModalPopupContext').then((module) => ({
		default: module.ModalWindowPopupContextProvider,
	}));
});

const ScreenBuilderContextProvider = React.lazy(() => {
	return import(/* webpackChunkName: "ScreenBuilderContextProvider" */ './context/ScreenBuilderContext').then(
		(module) => ({
			default: module.ScreenBuilderContextProvider,
		}),
	);
});

const RootApp = () => (
	<React.StrictMode>
		<Suspense
			fallback={
				<div>
					<Loader />
				</div>
			}
		>
			<DbeTableDataContextProvider>
				<ParentTablePopupContextProvider>
					<ScreenBuilderContextProvider>
						<ModalWindowPopupContextProvider>
							<App />
						</ModalWindowPopupContextProvider>
					</ScreenBuilderContextProvider>
				</ParentTablePopupContextProvider>
			</DbeTableDataContextProvider>
		</Suspense>
	</React.StrictMode>
);

// export default Sentry.withProfiler(RootApp, {name: 'DxDbe'});
export default RootApp;
