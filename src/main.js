import Vue from 'vue'
import App from './App'
import router from './router'

//引入vant
import Vant from 'vant';
import 'vant/lib/index.css';

//引入字体图标
import './assets/fonts/iconfont.css'

Vue.use(Vant);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
