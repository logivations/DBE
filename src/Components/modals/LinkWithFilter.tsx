/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import React, {useEffect, useState} from 'react';
import {FilterGroup} from '../../models/Classes';
import translate from '../../i18n/localization';
import Form, {ButtonItem, GroupItem, SimpleItem} from 'devextreme-react/form';
import InputType from '../../models/Enums/InputType';
import {HelpIcon} from '../../assets/icons';
import {useDbeActionsHelpLink} from '../../hooks/useHelpLink';
import {DbeActions} from '../../models/Enums/HelpLinks';
import NotificationController from '../../services/Notification/NotificationController';
import {Severity} from '../../models/Enums/Notification';

const LinkWithFilter = ({ props: { tableInstance, filterString }, closeModal }) => {
	const [link, setLink] = useState<URL>(new URL(window.location.toString()));

	useEffect(() => {
		console.log('filterString', filterString);
		if (filterString.length <= FilterGroup.MAX_LENGTH_URL_FILTER) {
			setLink((prev) => {
				const newUrl = new URL(prev);
				newUrl.searchParams.delete('filter');
				newUrl.searchParams.append('filter', filterString);
				return newUrl;
			});
		} else {
			NotificationController.createNotification({
				message: translate('DATA_IS_TOO_LONG_FOR_URL_FILTER'),
				type: Severity.ERROR,
			});
		}
	}, [filterString]);

	const helpLink = useDbeActionsHelpLink(tableInstance.warehouseUiType, DbeActions.LINK_WITH_FILTER);

	return (
		<Form>
			<SimpleItem
				editorType={InputType.TextBox}
				editorOptions={{
					value: link.toString(),
					readOnly: true,
					onFocusIn: (e) => {
						e.element.getElementsByTagName('input')[0].select();
					},
				}}
			/>
			<GroupItem colSpan={2} colCount={2}>
				<ButtonItem
					cssClass={'help-button'}
					buttonOptions={{
						icon: HelpIcon,
						useSubmitBehavior: false,
						onClick: () => window.open(helpLink, '_blank'),
						stylingMode: 'text',
					}}
				/>
				<ButtonItem
					buttonOptions={{
						type: 'success',
						text: translate('COPY'),
						stylingMode: 'contained',
						useSubmitBehavior: false,
						onClick: async () => {
							await navigator.clipboard.writeText(link.toString());
							closeModal();
						},
					}}
				/>
			</GroupItem>
		</Form>
	);
};

export default LinkWithFilter;
