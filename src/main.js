// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import  VueQuillEditor from 'vue-quill-editor'
// require styles 引入样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

// import myCharts from './comm/js/myCharts.js'
import echarts from 'echarts'
import 'echarts/map/js/china.js'
import ECharts from 'vue-echarts/components/ECharts.vue'
// import ws from 'WebSocket ';
import 'echarts/extension/bmap/bmap';

import { objDeepCopy } from "./api/bbb.js"


Vue.config.productionTip = false

Vue.prototype.$fn = {copy:objDeepCopy}
// Vue.use(myCharts)
Vue.use(ElementUI);
Vue.use(VueQuillEditor)
Vue.use(echarts)
Vue.component('chart', ECharts)
Vue.prototype.$echarts = echarts
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
