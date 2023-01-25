/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import React, { useState } from 'react';

const Templates = ({ templatesElements, defaultValue, getSelectedTemplate }) => {
	const [selectedTemplate, selectTemplate] = useState(defaultValue);

	return (
		<div className="form">
			<div className="dx-fieldset">
				<div className="templates-container">
					{templatesElements.map((template) => {
						const isSelected = selectedTemplate && template.ID === selectedTemplate.ID;
						return (
							<div
								key={template.ID}
								className={`${isSelected ? 'selected ' : ''}template-image-wrapper`}
								onClick={() => {
									selectTemplate(template);
									getSelectedTemplate(template);
								}}
							>
								<img style={{ width: '110px' }} src={template.ImageSrc} />
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default React.memo(Templates);
