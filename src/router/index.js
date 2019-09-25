import Vue from 'vue'
import Router from 'vue-router'
const index = () => import('@/view/index/index')//首页
const myinfo = () => import('@/view/myinfo/myinfo')//我的
const wallet = () => import('@/view/wallet/wallet')//钱包
const Customer = () => import('@/view/Customer/Customer')//客服

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/index',
    },
    {
      path: '/index',
      name: 'index',
      component: index,
    },
    {
      path: '/myinfo',
      name: 'myinfo',
      component: myinfo,
    },
    {
      path: '/wallet',
      name: 'wallet',
      component: wallet,
    },
    {
      path: '/Customer',
      name: 'Customer',
      component: Customer,
    },
  ]
})

export default router
