<template>
  <transition>
    <div class="food" v-show="showFlag" ref="food">
      <div class="food-content">
        <div class="image-header">
          <img :src="food.image" alt="food.name">
          <div class="back" @click="hide"><i class="iconfont">&#xe679;</i></div>
        </div>
        <div class="content">
          <h1 class="title">{{food.name}}</h1>
          <div class="detail">
            <span class="sell-count">月售{{food.sellCount}}份</span>
            <span class="ratings">好评率{{food.rating}}%</span>
          </div>
          <div class="foods_price">
            <span>￥{{food.price}}</span>
            <span v-show="food.oldPrice" class="foods_olprice">￥{{food.oldPrice}}</span>
          </div>
          <div class="pay_buttom" @click="push_Pay({name: food.name, price: food.price},$event)">加入购物车</div>
        </div>
        <div class="information" v-show="food.info !==''">
          <h1 class="infor_title">介绍</h1>
          <div class="infor_content">{{food.info}}</div>
        </div>
        <div class="rating">
          <h1 class="rating_title">商品评价</h1>
          <RatingSelect @toggleContent='toggleContent' @selectTypes='selectTypes' :selectType='selectType' :onlyConent='onlyContent' :desc='desc' :ratings='food.ratings'></RatingSelect>
          <div class="rating_wrapper">
            <ul v-show="food.ratings && food.ratings.length">
              <li v-show="needShow(ratings.rateType,ratings.text)" v-for="(ratings,index) of food.ratings" :key="index">
                <div class="user">
                  <span class="name">{{ratings.username}}</span>
                  <img class="avatar"  :src="ratings.avatar" :alt="ratings.username">
                </div>
                <div class="time">{{date(ratings.rateTime)}}</div>
                <p class="text">
                  <span class="iconfont good" v-if="ratings.rateType===0">&#xe7e2;</span>
                  <span class="iconfont difference" v-if="ratings.rateType===1">&#xe814;</span>
                  {{ratings.text?ratings.text:'用户未评价'}}
                </p>
              </li>
            </ul>
            <div class="no_rating" v-show="ratings_all(food.ratings)">暂无评价</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import BScroll from 'better-scroll'
import RatingSelect from './ratingselect.vue'
import { mapMutations } from 'vuex'
import BUS from '@/BUS.js'
// const POSITIVE = 0
// const NEGATIVE = 1
const ALL = 2
export default {
  name: 'Commodity',
  data () {
    return {
      showFlag: false,
      selectType: ALL,
      onlyContent: false,
      desc: {
        all: '全部',
        positive: '推荐',
        negative: '吐槽'
      }
    }
  },
  components: {
    RatingSelect
  },
  props: {
    food: {
      type: Object
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.food, {
        click: true
      })
      this.scroll.refresh()
    })
  },
  methods: {
    show () {
      this.selectType = ALL
      this.onlyContent = false
      this.showFlag = true
    },
    hide () {
      this.showFlag = false
    },
    selectTypes (data) {
      this.selectType = data
    },
    toggleContent (data) {
      this.onlyContent = data
    },
    date (i) {
      let date = new Date(i)
      return date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日' + ' ' + (date.getHours() + 1) + ':' + (date.getMinutes() + 1)
    },
    needShow (type, text) {
      if (this.onlyContent && !text) {
        return false
      }
      if (this.selectType === ALL) {
        return true
      } else {
        return this.selectType === type
      }
    },
    ratings_all (data) {
      for (var i in data) { // 如果不为空，则会执行到这一步，返回true
        return false
      }
      return true
    },
    push_Pay (data, event) {
      this.foodesClocke(data)
      this.foodesPrice()
      BUS.$emit('Ball', event.target)
    },
    ...mapMutations(['foodesClocke', 'foodesPrice'])
  }
}
</script>

<style lang="stylus" scoped>
  .food
    position fixed
    top 0
    left 0
    bottom .96rem
    z-index 30
    width 100%
    background #f3f5f7
    overflow hidden
    &.v-leave-active,&.v-enter-active
      transform translate3d(0,0,0)
      transition all .2s linear
    &.v-enter,&.v-leave-to
      transform translate3d(100%,0,0)
    .image-header
      position relative
      width 100%
      height 0
      padding-bottom 100%
      img
        position absolute
        top 0
        left 0
        width 100%
        height 100%
      .back
        position absolute
        top .2rem
        left 0
        .iconfont
          display block
          padding .2rem
          font-size .4rem
          color #ffffff
    .content
      position relative
      padding .36rem
      background #ffffff
      border-bottom 1px solid rgba(7,17,27,.1)
      .title
        font-size .28rem
        font-weight 700
        color rgb(7,17,27)
        line-height .28rem
        margin 0 0 .16rem 0
      .detail
        font-size .2rem
        color rgb(147,153,159)
        margin-bottom .36rem
      .foods_price
        font-weight 700
        color rgb(240,20,20)
        line-height .48rem
        font-size .28rem
        .foods_olprice
          font-size .2rem
          font-weight 700
          color rgb(147,153,159)
          line-height .48rem
          margin-left .08rem
          padding-right .08rem
          position relative
          &:after
            content ''
            position absolute
            width 100%
            height 1px
            background rgb(147,153,159)
            top 50%
            left 0
      .pay_buttom
        position absolute
        right .36rem
        bottom .36rem
        width 1.48rem
        height .48rem
        line-height .48rem
        text-align center
        background-color rgb(0,160,220)
        font-size .14rem
        color rgb(255,255,255)
        border-radius .48rem
    .information
      background #ffffff
      padding .36rem
      margin-top  .32rem
      border-bottom 1px solid rgba(7,17,27,.1)
      border-top 1px solid rgba(7,17,27,.1)
      .infor_title
        font-weight 600
        font-size .28rem
        line-height .28rem
        color rgb(7,17,27)
        margin 0 0 .12rem 0
      .infor_content
        padding 0 .16rem
        font-size .24rem
        font-weight 200
        color rgb(77,85,93)
        line-height .48rem
    .rating
      padding .36rem
      border-bottom 1px solid rgba(7,17,27,.1)
      border-top 1px solid rgba(7,17,27,.1)
      background #ffffff
      margin-top  .32rem
      .rating_title
        font-weight 600
        font-size .28rem
        line-height .28rem
        color rgb(7,17,27)
        margin 0 0 .12rem 0
      .rating_wrapper
        border-top 1px solid rgba(7,17,27,0.1)
        position relative
        width 100%
        .no_rating
            font-size: 0.24rem;
            color: #93999f;
            line-height: 0.48rem;
            padding-top: 0.24rem;
        ul
          margin 0
          padding 0
          li
            list-style-type none
            padding .32rem 0
            border-bottom 1px solid rgba(7,17,24,.1)
            &:last-child
              border-bottom none
            .user
              position relative
              float right
              .avatar
                width .24rem
                height .24rem
                border-radius 50%
                vertical-align top
              .name
                font-size .2rem
                color rgb(147,153,159)
                line-height .24rem
                vertical-align top
                padding-right .12rem
            .time
              font-size .2rem
              color rgb(147,153,159)
              line-height .24rem
            .text
              padding .12rem 0 0 0
              margin 0
              font-size .24rem
              color rgb(7,17,27)
              line-height .32rem
              .iconfont
                font-size .24rem
                line-height .48rem
                margin-right .08rem
                &.good
                  color rgb(0,160,220)
                &.difference
                  color rgb(147,153,159)
</style>
