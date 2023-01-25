/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import Form, { ButtonItem, GroupItem, SimpleItem } from 'devextreme-react/form';
import React, { useEffect, useMemo, useState } from 'react';

import './style.css';

const endsWith = new RegExp('^(%)(.*)$', 'gm');
const startWith = new RegExp('^(.*)(%)$', 'gm');

const SearchInText = ({ data }) => {
	const defaultValue = useMemo(() => data.value || '', []);
	const [inputValue, setInputValue] = useState(defaultValue);
	const [leftPercent, setLeftPercent] = useState(() => {
		return !!defaultValue.matchAll(endsWith).next().value;
	});
	const [rightPercent, setRightPercent] = useState(() => {
		return !!defaultValue.matchAll(startWith).next().value;
	});

	useEffect(() => {
		data.setValue(inputValue);
	}, [inputValue]);

	return (
		<Form>
			<GroupItem colCount={6}>
				<ButtonItem
					colSpan={1}
					cssClass={'ends-with percent-btn'}
					buttonOptions={{
						elementAttr: {
							class: leftPercent ? 'active' : '',
						},
						icon: 'percent',
						stylingMode: 'text',
						useSubmitBehavior: false,
						onClick: () => {
							setInputValue((prev) => {
								if (prev.matchAll(endsWith).next().value) {
									setLeftPercent(false);
									return prev.matchAll(endsWith).next().value[2];
								} else {
									setLeftPercent(true);
									return `%${prev}`;
								}
							});
						},
					}}
				/>
				<SimpleItem
					colSpan={4}
					editorType={'dxTextBox'}
					editorOptions={{
						value: inputValue,
						elementAttr: { class: 'searchInTextInput' },
						onValueChanged: ({ value }) => {
							setInputValue(value);
							setLeftPercent(() => {
								return !!value.matchAll(endsWith).next().value;
							});
							setRightPercent(() => {
								return !!value.matchAll(startWith).next().value;
							});
						},
					}}
				></SimpleItem>
				<ButtonItem
					colSpan={1}
					cssClass={'percent-btn'}
					buttonOptions={{
						elementAttr: {
							class: rightPercent ? 'active' : '',
						},
						icon: 'percent',
						stylingMode: 'text',
						useSubmitBehavior: false,
						onClick: () => {
							setInputValue((prev) => {
								if (prev.matchAll(startWith).next().value) {
									setRightPercent(false);
									return prev.matchAll(startWith).next().value[1];
								} else {
									setRightPercent(true);
									return `${prev}%`;
								}
							});
						},
					}}
				/>
			</GroupItem>
		</Form>
	);
};

export default SearchInText;
