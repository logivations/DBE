/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

export const padZero2 = function (d) {
	let s = d.toString();
	if (s.length < 2) {
		s = '0' + s;
	}
	return s;
};

export const toSqlDateTimeDDMMYYYYHHMMSS = function (time, separator = '-') {
	const year = time.getFullYear();
	const month = time.getMonth();
	const day = time.getDate();
	const hours = time.getHours();
	const minutes = time.getMinutes();
	const seconds = time.getSeconds();
	return (
		year +
		separator +
		padZero2(month + 1) +
		separator +
		padZero2(day) +
		' ' +
		padZero2(hours) +
		':' +
		padZero2(minutes) +
		':' +
		padZero2(seconds)
	);
};
