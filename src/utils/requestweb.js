import axios from 'axios'
import { warn } from '@/utils'

const baseURL = 'https://api.vvhan.com/'

const timeout = 30000

const service = axios.create({ baseURL, timeout })


service.interceptors.request.use(
  config => {
    let url = config.url
    // get参数编码
    if (config.method === 'get' && config.params) {
      if (url.indexOf('?') === -1) {
        url += '?'
      } else {
        if (url.indexOf('&') !== url.length - 1 && url.indexOf('?') !== url.length - 1) {
          url += '&'
        }
      }
      const keys = Object.keys(config.params)
      for (const key of keys) {
        if (config.params[key]) url += `${key}=${encodeURIComponent(config.params[key])}&`
      }
      url = url.substring(0, url.length - 1)
      config.params = {}
    }
    config.url = url
    return config
  }
)

service.interceptors.response.use(
  response => {

    const res = response.data

    return res
  },
  error => {
    if (!axios.isCancel(error)) warn('网络异常，请刷新页面后重新尝试。')
    return Promise.reject(error)
  }
)


export default service
