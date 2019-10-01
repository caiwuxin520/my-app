import Vue from 'vue'
import App from './App'
import router from './router'

//引入vant
import Vant from 'vant';
import 'vant/lib/index.css';

//引入字体图标
import './assets/fonts/iconfont.css'

//引入appback
import './assets/js/appback'
//引入common.js
import {setLocalStorage,getLocalStorage } from './assets/js/common'
//获取localstorage
Vue.prototype.getLocalStorage = getLocalStorage
//设置localstorage
Vue.prototype.setLocalStorage = setLocalStorage

//引入axios
import axios from './assets/js/axios'

//引入vux
import store from './store'
Vue.prototype.$axios = axios

Vue.use(Vant);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
