// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// rem
import './assets/js/rem.js'
// 1px边框解决CSS
import './assets/css/border.css'
// 字体文件
import './assets/css/iconfont.css'
import fastClick from 'fastclick'
// vuex引入
import store from './vuex/index.js'

Vue.config.productionTip = false

// 注册fastClick插件
fastClick.attach(document.body)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  fastClick,
  store,
  components: { App },
  template: '<App/>'
})
