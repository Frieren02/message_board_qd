import Vue from 'vue'
import userRouters from './userPage'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  ...userRouters,
  { path: '*', redirect: '/404' },
  { path: '/404', component: () => import('@/views/error-page/404'),}
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
