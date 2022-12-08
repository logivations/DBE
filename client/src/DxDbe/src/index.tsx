/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import React, {Suspense} from 'react';
import Loader from './Components/Loader/Loader';
import * as Sentry from '@sentry/react';
import './index.css';
import './styles/general.less';

const DxDbe = React.lazy(() => import(/* webpackChunkName: "DxDbe" */ './DxDbe'));
const DbeTableDataContextProvider = React.lazy(() => {
    return import(/* webpackChunkName: "DbeTableDataContext" */ './context/DbeTableDataContext').then((module) => ({
        default: module.DbeTableDataContextProvider,
    }));
});
const ParentTablePopupContextProvider = React.lazy(() => {
    return import(/* webpackChunkName: "ParentTablePopupContext" */ './context/ParentTablePopupContext').then(
        (module) => ({default: module.ParentTablePopupContextProvider}),
    );
});
const ModalsProvider = React.lazy(() => {
    return import(/* webpackChunkName: "ModalsProvider" */ './context/ModalsContext').then((module) => ({
        default: module.ModalsProvider,
    }));
});
const ScreenBuilderContextProvider = React.lazy(() => {
    return import(/* webpackChunkName: "ScreenBuilderContextProvider" */ './context/ScreenBuilderContext').then((module) => ({
        default: module.ScreenBuilderContextProvider,
    }));
});

const RootApp = () => (
    <React.StrictMode>
        <Suspense
            fallback={
                <div>
                    <Loader/>
                </div>
            }
        >
            <DbeTableDataContextProvider>
                <ParentTablePopupContextProvider>
                    <ScreenBuilderContextProvider>
                        <ModalsProvider>
                            <DxDbe/>
                        </ModalsProvider>
                    </ScreenBuilderContextProvider>
                </ParentTablePopupContextProvider>
            </DbeTableDataContextProvider>

        </Suspense>
    </React.StrictMode>
);

export default RootApp;
