import Vue from 'vue'
import Router from 'vue-router'
import { getLocalStorage } from '../assets/js/common'
import axios from 'axios'

const index = () => import('@/view/index/index')//首页
const myinfo = () => import('@/view/myinfo/myinfo')//我的
const wallet = () => import('@/view/wallet/wallet')//钱包
const Customer = () => import('@/view/Customer/Customer')//客服
const login = () => import('@/view/login/login')//登录
const forgetpassword = () => import('@/view/forgetpassword/forgetpassword')//忘记密码
const register = () => import('@/view/register/register')//注册
const jkxy = () => import('../view/jkxy/jkxy') //借款协议
const agreement = () => import('@/view/agreement/agreement') //注册协议
const idcardinfo = () => import('@/view/idcardinfo/idcardinfo') //身份证信息
const workinfo = () => import('@/view/workinfo/workinfo') //单位信息
const blankcard = () => import('@/view/blankcard/blankcard') //银行卡信息
const mobileinfo = () => import('@/view/mobileinfo/mobileinfo') //手机号信息
const updatapassword = () => import('@/view/updatapassword/updatapassword') //修改密码
const myorder = () => import('@/view/myorder/myorder') //修改密码
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
      path: '/idcardinfo',
      name: 'idcardinfo',
      component: idcardinfo,
    },
    {
      path: '/workinfo',
      name: 'workinfo',
      component: workinfo,
    },
    {
      path: '/blankcard',
      name: 'blankcard',
      component: blankcard,
    },
    {
      path: '/mobileinfo',
      name: 'mobileinfo',
      component: mobileinfo,
    },
    {
      path: '/updatapassword',
      name: 'updatapassword',
      component: updatapassword,
    },
    {
      path: '/myorder',
      name: 'myorder',
      component: myorder,
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

let arrpath = [
  '/idcardinfo',
  '/workinfo',
  '/blankcard',
  '/mobileinfo',
  '/updatapassword',
  '/myorder'
]
router.beforeEach((to, from, next) => {
  //如果去的路由需要登陆
  if (arrpath.includes(to.path)) {
    axios({
      method: "post",
      url: "http://39.98.251.244/loan/backend/systemuser/checkLogin",
    }).then(res => {
      if(res.data.code == 0){
        next()
        return
      }else{
        next({
          path:'/login'
        })
        return
      }
    })
    return
  }
  next()
})

export default router
