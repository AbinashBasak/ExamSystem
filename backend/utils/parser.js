const defaultParams = ['name', 'email', 'password', 'contactNo', 'address', 'city', 'state', 'country', 'pin_code'];

/**
 *
 * @param {Object} params requested parameters to parse
 * @param {Boolean} required required specifie params value
 * @param {Object} paramsToExtract feilds needed to be extracted
 * @param {Boolean} extended extract other values if exits in params
 */
const paramsPerser = (params, required = false, paramsToExtract = defaultParams, extended = false) => {
	let obj = {},
		missingKeys = [];

	paramsToExtract.forEach((key) => {
		if (params.hasOwnProperty(key)) {
			obj[key] = params[key];
		} else {
			missingKeys.push(key);
		}
	});

	// console.log(obj);
	if (missingKeys.length === 0 || !required) {
		if (extended) {
			Object.keys(params).forEach((key) => {
				if (obj[key] === undefined) {
					obj[key] = params[key];
				}
			});
		}

		return [false, obj];
	} else {
		return [true, missingKeys];
	}
};

module.exports = {
	paramsPerser,
};
