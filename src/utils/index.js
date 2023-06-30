import { Message } from 'element-ui'
export function warn(value) {
	Message.warning(value)
}

export function success(value) {
	Message.success(value)
}

export function error(value) {
	Message.error(value)
}
export const _is_dev_ = process.env.NODE_ENV === 'development'

// 生成 uuid
export function uuid(len, radix) {
	const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')
	const uuid = []
	let i
	radix = radix || chars.length

	if (len) {
		// Compact form
		for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix]
	} else {
		// rfc4122, version 4 form
		let r

		// rfc4122 requires these characters
		uuid[8] = uuid[13] = uuid[18] = uuid[23] = ''
		uuid[14] = '4'

		for (i = 0; i < 36; i++) {
			if (!uuid[i]) {
				r = 0 | Math.random() * 16
				uuid[i] = chars[(i === 19) ? (r & 0x3) | 0x8 : r]
			}
		}
	}
	return uuid.join('')
}

export class Url {
	constructor(inUrl) {
		this.url = inUrl
	}

	qs() {
		const url = this.url || location.href
		const paraString = url
			.substring(url.indexOf('?') + 1, url.length)
			.split('&')
		const paraObj = {}
		for (let i = 0; i < paraString.length; i++) {
			const j = paraString[i]
			paraObj[j.substring(0, j.indexOf('='))] = j.substring(
				j.indexOf('=') + 1,
				j.length
			)
		}
		return paraObj
	}

	get() {
		return this.qs()
	}

	resize(obj) {
		let str = '?'
		for (const key in obj) {
			if (obj[key] && key) {
				str += `${key}=${obj[key]}&`
			}
		}
		if (str !== '?') {
			str = str.substring(0, str.length - 1)
		} else {
			str = ''
		}
		return str
	}
}

export function isEmptyObject(obj) {
	for (var key in obj) {
		if (obj.hasOwnProperty(key)) {
			return false;
		}
	}
	return true;
}