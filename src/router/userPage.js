const userRouters = [
    {
        path: '/',
        redirect: '/dashboard',
        component: () => import('@/layout/index.vue'),
        children: [{
            path: 'dashboard',
            name: 'Home',
            component: () => import('@/views/admin/index.vue'),
        }, {
            path: 'register',
            name: 'registerView',
            component: () => import('@/views/register/index.vue')
        }, {
            path: 'confirmRegister',
            name: 'confirmRegister',
            component: () => import('@/views/confirmRegister/index.vue')
        }, {
            path: '/oauth',
            name: 'oauth',
            component: () => import('@/views/oauth')
        }, {
            path: 'publish',
            name: 'publish',
            component: () => import('@/views/publishMsg')
        }]
    },
    {
        path: '/commonDetail',
        component: () => import('@/layout/index.vue'),
        meta: { title: '详情展示' },
        name: 'commonDetail',
        children: [{
            path: ':id',
            name: 'CommonDetail',
            meta: { title: '详情展示' },
            props: true,
            component: () => import('@/views/detail')
        }]
    }
]

export default userRouters