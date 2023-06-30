import router from './router'
import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken, removeToken, setToken } from '@/utils/auth' // get token from cookie
import { Url, warn, isEmptyObject } from '@/utils/index.js'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/dashboard', '/404', '/confirmRegister', '/oauth', '/register'] // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  NProgress.start()

  // set page title
  // document.title = 'msgBoard'

  // determine whether the user has logged in
  const hasToken = getToken()
  if (hasToken) {
    // determine whether the user has obtained his permission roles through getInfo
    const hasUserInfo = store.getters.userInfo.name
    if (hasUserInfo) {
      next()
    } else {
      try {
        const res = await store.dispatch('user/updateUser')
        if (res !== 'ok') {
          removeToken()
        }
        next()
      } catch (error) {
        console.log(error)
        await store.dispatch('user/resetToken')
        next(`/dashboard?redirect=${encodeURIComponent(to.fullPath)}`)
        NProgress.done()
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1 || to.name === 'CommonDetail') {
      // in the free login whitelist, go directly
      next()
    } else {
      warn('请先登录')
      const url = new Url(to.fullPath)
      const otherParams = url.get()
      delete otherParams.code

      const paramsUrl = to.path + url.resize(otherParams)
      if (from.path === '/') {
        next(`/dashboard?redirect=${encodeURIComponent(paramsUrl)}`)
      } else {
        let repath
        if (isEmptyObject(from.query)) {
          repath = from.fullPath + '?'
        } else {
          let oldquery = from.query
          delete oldquery.redirect;
          if (Object.keys(oldquery).length) {
            let path = from.path + '?'
            Object.keys(oldquery).forEach(key => {
              path = path + key + '=' + oldquery[key] + '&'
            })
            repath = path
          } else {
            repath = from.path + '?'
          }
        }
        next(`${repath}redirect=${encodeURIComponent(paramsUrl)}`)
      }
      NProgress.done()
    }
  }
})

router.afterEach((to, form, next) => {
  // finish progress bar
  NProgress.done()
})
