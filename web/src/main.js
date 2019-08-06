import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'
import http from './http'
import './assets/scss/style.scss'
Vue.config.productionTip = false
Vue.prototype.$http = http

import ArticleList from './components/ArticleList'
Vue.component('m-article-list', ArticleList)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
