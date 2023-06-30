import Storage from './storage.js'

const TokenKey = 'xiaoxin_token'

let storage = new Storage()
export function getToken() {
	return storage.getItem(TokenKey)
}

export function setToken(token) {
	return storage.setItem({name:TokenKey,value:token,expires:24*60*60*1000})
}

export function removeToken() {
	return storage.removeItem(TokenKey)
}

export function clearAll() {
	return storage.clear()
}