<template>
  <div id="app">
    <Header :seller='sellen.seller'></Header>
    <tab></tab>
    <Shopcart :deliveryPrice='seller.deliveryPrice' :minPrice='seller.minPrice'></Shopcart>
    <keep-alive include="Commodity">
      <router-view :seller='seller' :ratings='ratings'/>
    </keep-alive>
  </div>
</template>

<script>
import Header from './components/header/Header'
import Shopcart from './components/shopcart.vue'
import tab from './components/tab/Tab'
import axios from 'axios'
export default {
  name: 'App',
  data () {
    return {
      sellen: {},
      seller: {},
      ratings: []
    }
  },
  components: {
    Header,
    tab,
    Shopcart
  },
  created () {
    var _this = this
    axios.get('/static/json/data.json', {
      id: '123'
    }).then(function (res) {
      _this.sellen = res.data
      _this.seller = _this.sellen.seller
      _this.ratings = res.data.ratings
    })
  }

}
</script>

<style lang="stylus">
*
  touch-action: none
body
  margin 0
  padding 0
  border 0
</style>
