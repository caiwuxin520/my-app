import Vue from 'vue'
import Router from 'vue-router'
import { getLocalStorage } from '../assets/js/common'

const index = () => import('@/view/index/index')//首页
const myinfo = () => import('@/view/myinfo/myinfo')//我的
const wallet = () => import('@/view/wallet/wallet')//钱包
const Customer = () => import('@/view/Customer/Customer')//客服
const login = () => import('@/view/login/login')//登录
const forgetpassword = () => import('@/view/forgetpassword/forgetpassword')//忘记密码
const register = () => import('@/view/register/register')//注册
const agreement = () => import('../view/agreement/agreement') //注册协议
const jkxy = () => import('../view/jkxy/jkxy') //借款协议
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
    {
      path: '/login',
      name: 'login',
      component: login,
    },
    {
      path: '/forgetpassword',
      name: 'forgetpassword',
      component: forgetpassword,
    },
    {
      path: '/register',
      name: 'register',
      component: register,
    },
    {
      path: '/agreement',
      name: 'agreement',
      component: agreement,
    },
    {
      path: '/jkxy',
      name: 'jkxy',
      component: jkxy,
    },
  ],
  //解决跳转滚动条不在顶部问题.
  scrollBehavior(to, from, savedPosition) {
    return {
      x: 0,
      y: 0
    }
  }
})

export default router
