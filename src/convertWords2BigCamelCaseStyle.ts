/**
 * 是否存在大写字符
 * @param {*} str
 * @returns boolean
 */
function hasUpperCaseChar(str: string) {
	return /[A-Z]/g.test(str);
}

/**
 * 存在分隔符
 * @param {*} divider = ' ' 默认空格
 * @returns () => boolean
 */
function hasDivider(divider = " ") {
	return function (str: string) {
		return str.indexOf(divider) > -1;
	};
}

/**
 * 根据游标将字符串的制定位转为大写
 * @param {*} str
 * @param {*} index
 */
function upperCase(str = "", index = 0) {
	return str
		.split("")
		.reduce((acc, cur, idx) => {
			const upperChar = index === idx ? cur.toUpperCase() : cur;
			return `${acc}${upperChar}`;
		}, "")
		.trim();
}

/**
 * 判断字符串的首字母是大写的
 * @param {*} str
 * @returns boolean
 */
function firstCharIsUpper(str: string) {
	return hasUpperCaseChar(str[0]);
}

const hasDividerSpace = hasDivider();
const hasDividerHyphen = hasDivider("-");

function convertWords2BigCamelCaseStyle(origionalName: string) {
	function convert(str: string, divider = " ") {
		return str
			.split(divider)
			.map((v) => upperCase(v))
			.join("")
			.trim();
	}
	if (hasUpperCaseChar(origionalName)) {
		if (
			firstCharIsUpper(origionalName) &&
			!hasDividerSpace(origionalName) &&
			!hasDividerHyphen(origionalName)
		) {
			// DemoComponent || Democomponent
			return origionalName;
		}

		if (hasDividerHyphen(origionalName) && hasDividerSpace(origionalName)) {
			return convert(convert(origionalName), "-");
		}

		if (
			hasDividerSpace(origionalName) &&
			!hasDividerHyphen(origionalName)
		) {
			return convert(origionalName);
		}
		if (
			!hasDividerSpace(origionalName) &&
			hasDividerHyphen(origionalName)
		) {
			return convert(origionalName, "-");
		}

		// demoComponent

		return upperCase(origionalName);
	}

	// demo component
	if (hasDividerSpace(origionalName)) {
		return convert(origionalName);
	}
	// demo-component

	if (hasDividerHyphen(origionalName)) {
		return convert(origionalName, "-");
	}
	// democomponent

	return upperCase(origionalName);
};


export default convertWords2BigCamelCaseStyle;