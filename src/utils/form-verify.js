import {
  isPhone, isPhones, isEmail, isFalseNumber, isTrueNumber, isNumber, isDouble, isDoublePlus, isIntegerNumber
} from './validate.js'

// 手机号验证
export function validPhone(rule, value, callback) {
  if (value === '' || isPhone(value)) {
    callback()
  } else {
    callback(new Error('请输入正确的手机号码'))
  }
}
// 手机号验证
export function validPhone2(rule, value, callback) {
  if (isPhone(value)) {
    callback()
  } else {
    callback(new Error('请输入正确的手机号码'))
  }
}
// 手机号验证(非中文和字母)
export function validPhone3(rule, value, callback) {
  if (isPhones(value)) {
    callback()
  } else {
    callback(new Error('号码格式错误，请重新输入'))
  }
}

// 邮箱验证
export function validEmail(rule, value, callback) {
  if (isEmail(value)) {
    callback()
  } else {
    callback(new Error('请输入正确的邮箱地址'))
  }
}

// 整数验证
export function integerCheck(rule, value, callback) {
  if (isIntegerNumber(value)) {
    callback()
  } else {
    callback(new Error('只能允许输入整数'))
  }
}

// 正整数验证
export function trueNumber(rule, value, callback) {
  if (isTrueNumber(value)) {
    callback()
  } else {
    callback(new Error('只能允许输入正整数'))
  }
}

// 负整数验证
export function falseNumber(rule, value, callback) {
  if (isFalseNumber(value)) {
    callback()
  } else {
    callback(new Error('只能允许输入负整数'))
  }
}

// 数字验证
export function validNumber(rule, value, callback) {
  if (value === '' || isNumber(value) || typeof (value) === 'undefined') {
    callback()
  } else {
    callback(new Error('请输入正确的数字'))
  }
}

// 浮点数验证
export function validDouble(n) {
  return (rule, value, callback) => {
    if (isDouble(value, n) || typeof (value) === 'undefined') {
      callback()
    } else {
      callback(new Error(`请输入正确的金额（最多保留${n}位小数）`))
    }
  }
}

// 正浮点数验证
export function validDoublePlus(n) {
  return (rule, value, callback) => {
    if (isDoublePlus(value, n) || typeof (value) === 'undefined') {
      callback()
    } else {
      callback(new Error(`请输入正确的金额（最多保留${n}位小数）`))
    }
  }
}

// 密码验证
export function validPasswordLevel(rule, value, callback) {
  if (value === '') callback()
  const alphabetReg = /[A-Za-z]+/
  const numberReg = /[0-9]+/
  // charReg = /(\W|_)+/;
  let count = 0

  if (alphabetReg.test(value)) count++
  if (numberReg.test(value)) count++
  // if (charReg.test(value)) count++

  if (value.length <= 8 || value.length >= 30) {
    return callback(new Error('密码长度必须大于8小于30'))
  }
  if (count < 2) {
    return callback(new Error('密码必须包括数字和字母'))
    // return callback(new Error('密码必须包括数字、字母、符号其中两者'))
  }
  callback()
}

// 立项项目新建标段信息表格
export function bidContract(rule, v, callback){
  v.forEach(item => {
    if (!item.pro_name || !item.build_office) {
      callback(new Error('请填写完整标段信息'))
    }
  })
  callback()
}
export function amiTable(rule, v, callback){
  v.forEach((item,i) => {
    if (!item.major?.length || !item.phone || !item.userName) {
      callback(new Error('请填写完整信息'))
    } else if(!isPhones(item.phone)) {
      callback(new Error(`号码格式错误，位于第${i+1}行`))
    }
  })
  callback()
}

export function checkBankNum(rule, v, callback){
  if (v && v.length === 16) {
    callback()
  }
  callback(new Error('银行卡卡号错误'))
}

export function checkDistpicker(rule, v, callback){
  if (v && Array.isArray(v)) {
    for (const val of v) {
      if (!val.trim()) {
        callback(new Error('请填写完整地址'))
        break
      }
    }
  }
  callback()
}