/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import React, {useMemo, useState} from 'react';
import Form, {SimpleItem} from "devextreme-react/form";
import InputType from "../../../../models/Enums/InputType";

const StartsWith = ({ data, column }) => {
    const [inputValue, setInputValue] = useState(() => data.value || '');
    const type = useMemo(() => {
        const type = column.getViewModel().getInputType()
        if (type === InputType.TextBox || type === InputType.NumberBox) {
            return type
        }
        return InputType.TextBox;
    }, []);

    return <Form>
        <SimpleItem
            editorType={type}
            editorOptions={{
                value: inputValue,
                onValueChanged: (e) => {
                    setInputValue(e.value);
                    data.setValue(e.value);
                }
            }}
        />
    </Form>
}

export default StartsWith;