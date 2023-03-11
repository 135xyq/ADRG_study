import App from './App'

// #ifndef VUE3
import Vue from 'vue'


// 引用uView框架
import uView from '@/uni_modules/uview-ui'
Vue.use(uView)

// 引入axios
import request from 'utils/request.js'

// 引入vuex
import store from './store/index.js'


Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App,
	store
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif