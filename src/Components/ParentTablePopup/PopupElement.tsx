/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import React, { lazy, Suspense, useMemo, useState } from 'react';
import { PositionConfig } from 'devextreme/animation/position';
import translate from '../../i18n/localization';

const Popup = lazy(() => {
	return import(/* webpackChunkName: "Popup" */ 'devextreme-react/popup');
});

const DbeDataGrid = lazy(() => {
	return import(/* webpackChunkName: "DbeDataGrid" */ '../DbeDataGrid/DbeDataGrid');
});

const PopupElement = ({
	tableName,
	tableTitle,
	isVisible,
	close,
	index,
	tableType,
	initialFilter,
	saveButtonVisibility,
}) => {
	const position = useMemo<PositionConfig>(
		() => ({ my: 'center', at: 'center', offset: { x: 15 * index, y: 15 * index } }),
		[],
	);

	const [contentHeight, setContentHeight] = useState(null);

	return (
		<Suspense fallback={<div>{translate('POPUP LOADING...')}</div>} key={tableName}>
			<Popup
				key={`${tableName}-${index}`}
				visible={isVisible}
				onShown={({ component }) => {
					setContentHeight(component.content().clientHeight - 70 - 37);
				}}
				onHiding={close}
				dragEnabled={true}
				resizeEnabled={true}
				hideOnOutsideClick={true}
				showCloseButton={true}
				showTitle={true}
				shading={true}
				title={tableTitle}
				position={position}
				shadingColor={'rgba(0,0,0,0.3)'}
				contentRender={() => {
					return (
						<DbeDataGrid
							tableType={tableType}
							tableName={tableName}
							height={contentHeight}
							initialFilter={initialFilter}
							saveButtonVisibility={saveButtonVisibility}
						/>
					);
				}}
			/>
		</Suspense>
	);
};

export default React.memo(PopupElement, (prevProps, nextProps) => {
	return (
		prevProps.tableName !== nextProps.tableName &&
		prevProps.isVisible !== nextProps.isVisible &&
		prevProps.index !== nextProps.index
	);
});
