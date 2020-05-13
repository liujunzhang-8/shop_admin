import Vue from 'vue'
import Router from 'vue-router'
import Login from '../pages/Login'
import Home from '../pages/Home.vue'
import Welcome from '../pages/Welcome'
import Users from '../pages/user/Users'
import Rights from '../pages/power/Rights'
import Roles from '../pages/power/Roles'
import Cate from '../pages/goods/Cate'
import Prarams from '../pages/goods/Params'
import GoodList from '../pages/goods/List'
import Add from '../pages/goods/Add'
import Order from '../pages/order/order'

Vue.use(Router)

const router = new Router({
  routes: [
        { path: '/', redirect: 'login' },
        { path: '/login', component: Login },
        { 
            path: '/home', 
            component: Home, 
            redirect: '/welcome',
            children: [
                { path: '/welcome', component: Welcome },
                { path: '/users', component: Users},
                { path: '/rights', component: Rights},
                { path: '/roles', component: Roles},
                { path: '/categories', component: Cate },
                { path: '/params', component: Prarams },
                { path: '/goods', component: GoodList},
                { path: '/goods/add', component: Add },
                { path: '/orders', component: Order }
            ]
        },
  ]
})

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
    // to 将要访问的路径
    // from 代表从哪个路径跳转而来
    // next是一个函数，表示放行
    // next() 放行  next('/login') 强制跳转

    if(to.path === '/login') return next();
    // 获取token
    const tokenStr = window.sessionStorage.getItem('token')
    if(!tokenStr) return next('/login')
    next()
})

export default router