/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

const downloadFile = (file: Blob, fileName: string) => {
	const a = document.createElement('a');
	let url = window.URL.createObjectURL(file);
	a.href = url;
	a.download = fileName;
	a.click();
	window.URL.revokeObjectURL(url);
};

export default downloadFile;
