/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

const downloadFile = (file: Blob, fileName?: string) => {
	const a = document.createElement('a');
	const url = window.URL.createObjectURL(file);
	a.href = url;
	a.target = '_blank';
	fileName && (a.download = fileName);
	a.click();
	window.URL.revokeObjectURL(url);
};

export default downloadFile;
