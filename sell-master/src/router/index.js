import Vue from 'vue'
import Router from 'vue-router'
// 商品页面
import Commodity from 'com/content/commodity/index'
// 商家页面
import business from 'com/content/business/index'
// 评价页面
import evaluate from 'com/content/evaluate/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      // 首页默认页面
      path: '/',
      redirect: 'commodity'
    },
    {
      // 商家页面
      path: '/business',
      name: 'business',
      component: business
    },
    {
      // 评价页面
      path: '/evaluate',
      name: 'evaluate',
      component: evaluate
    },
    {
      // 商品页面
      path: '/commodity',
      name: 'commodity',
      component: Commodity
    }
  ],
  linkActiveClass: 'active'
})
