import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 导入全局样式表
import './assets/css/global.css'
// 导入字体图标
import './assets/fonts/iconfont.css'
// 引入element-ui
import ElementUI from 'element-ui';  
import 'element-ui/lib/theme-chalk/index.css';

// 引入 echarts
import * as echarts from 'echarts'

import axios from 'axios'       // 引入axios
// 配置请求的根路径
axios.defaults.baseURL = 'http://127.0.0.1:5000/'  // 定义公共接口
Vue.prototype.$http = axios   // 将axios 全局挂载 vue 实例上

Vue.prototype.$echarts = echarts
Vue.config.productionTip = false

Vue.use(ElementUI);


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
