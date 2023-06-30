
/**
 * @param {string} str
 * @returns {Boolean}
 */
export function isExternal(str) {
  return /^(https?:|mailto:|tel:)/.test(str)
}

/**
 * @description 链接
 * @param {string} str
 * @returns {Boolean}
 */
export function isURL(str) {
  const reg = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return reg.test(str)
}

/**
 * @description 手机号
 * @param {string} str
 * @returns {Boolean}
 */
export function isPhone(str) {
  const reg = /^1(3|4|5|6|7|8|9)\d{9}$/
  return reg.test(str)
}

 export function isPhones(str) {
  const reg = /^[^A-Za-z\u4e00-\u9fa5]*$/
  return reg.test(str)
}

/**
 * @description 邮箱
 * @param {string} str
 * @returns {Boolean}
 */
export function isEmail(str) {
  const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return reg.test(str)
}

/**
 * @description 整数
 * @param {string} str
 * @returns {Boolean}
 */
export function isIntegerNumber(str) {
  const reg = /^[\+\-]?([1-9]\d*|0)?$/
  return reg.test(str)
}

/**
 * @description 正整数
 * @param {string} str
 * @returns {Boolean}
 */
export function isTrueNumber(str) {
  const reg = /^[0-9]+$/g
  return reg.test(str)
}

/**
 * @description 负整数
 * @param {string} str
 * @returns {Boolean}
 */
export function isFalseNumber(str) {
  const reg = /[^0-9.]/g
  return reg.test(str)
}

/**
 * @description 数字
 * @param {string} str
 * @returns {Boolean}
 */
export function isNumber(str) {
  const reg = /^[\+\-]?([1-9]\d*|0)(\.\d*)?$/
  return reg.test(str)
}

/**
 * @description 浮点数
 * @param {string} str
 * @param {string} n 小数位数
 * @returns {Boolean}
 */
export function isDouble(str, n) {
  const reg = new RegExp('^([-+]?[0-9]*)+(\.[0-9]{1,' + n + '})?$')
  const reg2 = /^[\+\-]?([1-9]\d*|0)(\.\d*)?$/
  return reg.test(str) && (str ? reg2.test(str) : true)
}

/**
 * @description 正浮点数
 * @param {string} str
 * @param {string} n 小数位数
 * @returns {Boolean}
 */
export function isDoublePlus(str, n) {
  const reg = new RegExp('^([+]?[0-9]*)+(\.[0-9]{1,' + n + '})?$')
  const reg2 = /^[\+]?([1-9]\d*|0)(\.\d*)?$/
  return reg.test(str) && (str ? reg2.test(str) : true)
}

/**
 * @description 小写字母
 * @param {string} str
 * @returns {Boolean}
 */
export function isLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/**
 * @description 大写字母
 * @param {string} str
 * @returns {Boolean}
 */
export function isUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/**
 * @description 字母
 * @param {string} str
 * @returns {Boolean}
 */
export function isAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

/**
 * @description 字符串
 * @param {string} str
 * @returns {Boolean}
 */
export function isString(str) {
  if (typeof str === 'string' || str instanceof String) {
    return true
  }
  return false
}

/**
 * @description 兼容行处理判断数据是否是数组
 * @param {Array} arg
 * @returns {Boolean}
 */
export function isArray(arg) {
  if (typeof Array.isArray === 'undefined') {
    return Object.prototype.toString.call(arg) === '[object Array]'
  }
  return Array.isArray(arg)
}

const types = ['Array', 'Boolean', 'Date', 'Number', 'Object', 'RegExp', 'String', 'Window', 'HTMLDocument']
const v = {}
types.forEach(c => {
  v['is' + c] = ((type) => obj => Object.prototype.toString.call(obj) === '[object ' + type + ']')(c)
})

export const is = v
