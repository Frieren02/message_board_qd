import axios from 'axios'
import { warn } from '@/utils'
import store from '@/store'

import { getToken } from '@/utils/auth'

const baseURL = process.env.VUE_APP_BASE_API
// console.log(store.getters.BASE_API, window.LOCAL_CONFIG.VUE_APP_BASE_API, baseURL)

const timeout = 30000

const service = axios.create({ baseURL, timeout })

service.interceptors.request.use(
  config => {
    const { headers: { ignoreCancelToken }} = config
    const token = getToken()
    // !ignoreCancelToken && axiosCancel.addPending(config)
    if (!ignoreCancelToken && token) {
      config.headers['Authorization'] = 'bearer ' + token
    }
    config.headers['unitType'] = 'PC'
    config.cancelToken = new axios.CancelToken(cancel => {
      // 存入一个cancel token
      store.commit('axiosrequest/addCancelToken', cancel)
    })
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

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

    if (typeof res === 'string') {
      warn(res)
    }

    switch (Reflect.get(res, 'code')) {
      case 502: {
        warn(res.msg || '502')
        break
      }
      case 422: {
        warn(res.msg || '422')
        break
      }
      case 401: {
        warn(res.msg || '401')
        break
      }
      case 404: {
        warn(res.msg || '404')
        break
      }
    }

    // if (Reflect.get(res, 'ok') === false) {
    //   warn(res.msg || '出现异常问题')
    // }

    return res
  },
  error => {
    if (error instanceof axios.Cancel) return
    if (!axios.isCancel(error)) warn('网络异常，请刷新页面后重新尝试。')
    return Promise.reject(error)
  }
)


export default service
