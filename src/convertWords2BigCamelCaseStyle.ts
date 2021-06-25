import { getIgnoreFilenames } from './utils';
import { upperFirst } from 'lodash';
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
function hasDivider(divider = ' ') {
    return function (str: string) {
        return str.indexOf(divider) > -1;
    };
}

/**
 * 根据游标将字符串的制定位转为大写
 * @param {*} str
 * @param {*} index
 */
function upperCase(str = '') {
    return upperFirst(str).trim();
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
const hasDividerHyphen = hasDivider('-');

function convert(str: string, divider = ' ') {
    return str
        .split(divider)
        .map((v) => upperCase(v))
        .join('')
        .trim();
}

function convertWords2BigCamelCaseStyle(origionalName: string) {
    const ignoreNames = getIgnoreFilenames(false);
    if (ignoreNames.includes(origionalName)) {
        return origionalName;
    }

    const hasSpace = hasDividerSpace(origionalName);
    const hasHyphon = hasDividerHyphen(origionalName);

    if (hasUpperCaseChar(origionalName)) {
        if (firstCharIsUpper(origionalName) && !hasSpace && !hasHyphon) {
            // DemoComponent || Democomponent
            return origionalName;
        }
    }

    if (hasSpace && hasHyphon) {
        return convert(convert(origionalName), '-');
    }

    if (hasSpace && !hasHyphon) {
        return convert(origionalName);
    }

    if (!hasSpace && hasHyphon) {
        return convert(origionalName, '-');
    }

    return upperCase(origionalName);
}

export default convertWords2BigCamelCaseStyle;
