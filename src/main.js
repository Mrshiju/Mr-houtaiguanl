// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/index'
import Http from '@/http/http'
import moment from 'moment'
import ElementUI from 'element-ui'

import cutBase from '@/components/cutBase'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/index.css'
Vue.config.productionTip = false

Vue.use(Http)
Vue.use(ElementUI)
Vue.component(cutBase.name,cutBase)
/* eslint-disable no-new */
//过滤器
Vue.filter('fmData', (value)=> {
  return moment(value).format('YYYY-MM-DD')
})
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
