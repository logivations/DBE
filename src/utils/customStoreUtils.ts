/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

function processLoadResponse(d, res, getResolveArgs) {
	res = expandLoadResponse(res);

	if (!res || typeof res !== 'object') {
		d.reject(new Error('Unexpected response received'));
	} else {
		d.resolve.apply(d, getResolveArgs(res));
	}
}

function expandLoadResponse(value) {
	if (Array.isArray(value) || typeof value === 'object') {
		return { data: value };
	}

	if (typeof value === 'number') {
		return { totalCount: value };
	}

	return value;
}

function createLoadExtra(res) {
	return {
		totalCount: 'totalCount' in res ? res.totalCount : -1,
		groupCount: 'groupCount' in res ? res.groupCount : -1,
		summary: res.summary || null,
	};
}

function serializeKey(key) {
	if (typeof key === 'object') {
		return JSON.stringify(key);
	}

	return key;
}

function serializeDate(date) {
	function zpad(text, len) {
		text = String(text);
		while (text.length < len) {
			text = `0${text}`;
		}
		return text;
	}

	const builder = [1 + date.getMonth(), '/', date.getDate(), '/', date.getFullYear()];
	const h = date.getHours();
	const m = date.getMinutes();
	const s = date.getSeconds();
	const f = date.getMilliseconds();

	if (h + m + s + f > 0) {
		builder.push(' ', zpad(h, 2), ':', zpad(m, 2), ':', zpad(s, 2), '.', zpad(f, 3));
	}

	return builder.join('');
}

function stringifyDatesInFilter(crit) {
	crit.forEach((v, k) => {
		if (Array.isArray(v)) {
			stringifyDatesInFilter(v);
		} else if (Object.prototype.toString.call(v) === '[object Date]') {
			crit[k] = serializeDate(v);
		}
	});
}

function isAdvancedGrouping(expr) {
	if (!Array.isArray(expr)) {
		return false;
	}

	for (let i = 0; i < expr.length; i++) {
		if ('groupInterval' in expr[i] || 'isExpanded' in expr[i]) {
			return true;
		}
	}

	return false;
}

function getErrorMessageFromXhr(xhr) {
	const mime = xhr.getResponseHeader('Content-Type');
	const responseText = xhr.responseText;

	if (!mime) {
		return null;
	}

	if (mime.indexOf('text/plain') === 0) {
		return responseText;
	}

	if (mime.indexOf('application/json') === 0) {
		const jsonObj = safeParseJSON(responseText);

		if (typeof jsonObj === 'string') {
			return jsonObj;
		}

		if (typeof jsonObj === 'object') {
			for (const key in jsonObj) {
				if (typeof jsonObj[key] === 'string') {
					return jsonObj[key];
				}
			}
		}

		return responseText;
	}

	return null;
}

function safeParseJSON(json) {
	try {
		return JSON.parse(json);
	} catch (x) {
		return null;
	}
}

export {
	safeParseJSON,
	getErrorMessageFromXhr,
	isAdvancedGrouping,
	stringifyDatesInFilter,
	serializeDate,
	createLoadExtra,
	expandLoadResponse,
	processLoadResponse,
	serializeKey,
};
