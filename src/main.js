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
import {setLocalStorage,getLocalStorage,url} from './assets/js/common'
//获取localstorage
Vue.prototype.getLocalStorage = getLocalStorage
//设置localstorage
Vue.prototype.setLocalStorage = setLocalStorage
//设置url
Vue.prototype.$url = url
//引入axios
import axios from './assets/js/axios'

function getParameterByName(name) {
  let url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
  if (!results) return 2;
  if (!results[2]) return 2;
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

let comId = getParameterByName('comId')
//公司id存储
setLocalStorage("comId", comId);

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
