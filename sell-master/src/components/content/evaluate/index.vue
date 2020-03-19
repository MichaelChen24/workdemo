<template>
    <div class="evaluate" ref="evaluate">
        <div class="evaluate_content">
            <div class="overview">
                <div class="overview_left">
                    <h1 class="score">{{seller.score}}</h1>
                    <div class="title">综合评分</div>
                    <div class="rank">高于周边商家{{seller.rankRate}}%</div>
                </div>
                <div class="overview_right">
                    <div class="score-wrapper">
                        <span class="title">服务态度</span>
                        <star class="star" :starSize='36' :starLength='seller.serviceScore'></star>
                        <span class="score">{{seller.serviceScore}}</span>
                    </div>
                    <div class="score-wrapper">
                        <span class="title">商品评分</span>
                        <star :starSize='36' :starLength='seller.foodScore'></star>
                        <span class="score">{{seller.foodScore}}</span>
                    </div>
                    <div class="delivery-wrapper">
                        <span class="title">送达时间</span>
                        <span class="score">{{seller.deliveryTime}}分钟</span>
                    </div>
                </div>
            </div>
            <div class="rating">
                <div class="rating_item">
                    <ratingselect @toggleContent='toggleContent' @selectTypes='selectTypes' :ratings='ratings' :selectType='selectType' :onlyConent='onlyContent' :desc='desc'></ratingselect>
                </div>
                <div class="rating_wrapper">
                    <ul class="rating_wrapper_ul">
                        <li class="rating_wrapper_item" v-for="(rating,index) of ratings" :key="index" v-show="needShow(rating.rateType,rating.text)">
                            <div class="item_img"><img :src="rating.avatar" :alt="rating.username"></div>
                            <div class="infor">
                                <div class="user">
                                    <div class="user_infor">
                                        <span class="name">{{rating.username}}</span>
                                        <!-- 星星 -->
                                        <star :starSize='24' :starLength='rating.score'></star>
                                    </div>
                                    <div class="time">{{date(rating.rateTime)}}</div>
                                </div>
                                <div class="text_info">{{rating.text?rating.text:'用户未评价'}}</div>
                                <div class="zan">
                                    <span class="iconfont good" v-if="rating.rateType===0">&#xe7e2;</span>
                                    <span class="iconfont difference" v-if="rating.rateType===1">&#xe814;</span>
                                    <ul class="iconlogo">
                                        <li class="iconlogo_item" v-for="(data,index) of rating.recommend.slice(0, 3)"  :key="index">{{data}}</li>
                                    </ul>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import star from '@/components/header/star'
import ratingselect from '@/components/food/ratingselect'
import BScroll from 'better-scroll'
const ALL = 2
export default {
  name: 'Evaluate',
  data () {
    return {
      selectType: ALL,
      onlyContent: false,
      desc: {
        all: '全部',
        positive: '推荐',
        negative: '吐槽'
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.evaluate, {
        click: true
      })
      this.scroll.refresh()
    })
  },
  props: {
    seller: {
      type: Object
    },
    ratings: {
      type: Array
    }
  },
  components: {
    star,
    ratingselect
  },
  methods: {
    sellers: function () {
      console.log(this.seller)
    },
    selectTypes (data) {
      this.selectType = data
    },
    toggleContent (data) {
      this.onlyContent = data
    },
    date (i) {
      let date = new Date(i)
      return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + (date.getHours() + 1) + ':' + (date.getMinutes() + 1)
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
    }
  }
}
</script>

<style lang="stylus" scoped>
.evaluate
    position absolute
    top 3.48rem
    bottom .96rem
    left 0
    width 100%
    overflow hidden
    background  #f3f5f7
    .overview
        display flex
        padding .36rem 0
        background #ffffff
        border-bottom  1px solid rgba(7,17,27,.2)
        .overview_left
            flex 0 0 2.75rem
            width 2.75rem
            border-right  1px solid rgba(7,17,27,.2)
            text-align center
            padding .12rem 0
            .score
                font-size .48rem
                color rgb(255,153,0)
                line-height .56rem
                margin 0 0 .12rem 0
            .title
                font-size .24rem
                color rgb(7,17,27)
                line-height .24rem
                margin-bottom .16rem
            .rank
                font-size .2rem
                color rgb(147,153,159)
                line-height .2rem
        .overview_right
            flex 1
            padding-left .48rem
            padding-top .12rem
            padding-bottom .12rem
            .score-wrapper
                font-size 0
                margin-bottom .16rem
                .title
                    font-size .24rem
                    color rgb(7,17,27)
                    line-height .36rem
                    vertical-align top
                    padding-right .24rem
                .score
                    padding-left .24rem
                    line-height .36rem
                    font-size .24rem
                    vertical-align top
                    color rgb(255,153,0)
            .delivery-wrapper
                font-size 0
                .title
                    font-size .24rem
                    color rgb(7,17,27)
                    line-height .36rem
                    vertical-align top
                    padding-right .24rem
                .score
                    line-height .36rem
                    font-size .24rem
                    vertical-align top
                    color rgb(147,153,159)
    .rating
        margin-top 0.32rem
        background #ffffff
        position relative
        padding-top .12rem
        &:after
            content ''
            position absolute
            width 100%
            top 0
            left 0
            border-top  1px solid rgba(7,17,27,.2)
            transform  scaleY(0.5)
        &:before
            content ''
            position absolute
            width 100%
            bottom 0
            left 0
            border-top  1px solid rgba(7,17,27,.2)
            transform  scaleY(0.5)
        .rating_item
            padding 0 0.36rem
            position relative
            &:before
                content ''
                position absolute
                width 100%
                bottom 0
                left 0
                border-top  1px solid rgba(7,17,27,.2)
                transform  scaleY(0.5)

        .rating_wrapper
            position relative
            ul
                list-style-type none
                padding  0
                margin 0
            .rating_wrapper_ul
                padding 0 .36rem
                .rating_wrapper_item
                    position relative
                    width 100%
                    padding  .36rem 0
                    display flex
                    &:last-child
                        &:before
                            border-top none
                    &:before
                        content ''
                        position absolute
                        width 100%
                        bottom 0
                        left 0
                        border-top  1px solid rgba(7,17,27,.2)
                        transform  scaleY(0.5)
                    .item_img
                        flex 0 0 .56rem
                        img
                            width .56rem
                            height .56rem
                            border-radius 50%
                            float left
                            display block
                    .infor
                        flex 1
                        padding-left .24rem
                        .user
                            width 100%
                            overflow hidden
                            .user_infor
                                float left
                                font-size 0
                                .name
                                    vertical-align top
                                    display block
                                    font-size .2rem
                                    line-height .24rem
                                    color rgb(7,17,27)
                                    margin-bottom .08rem
                            .time
                                display block
                                float right
                                font-size .2rem
                                font-weight 200
                                color rgb(147,153,159)
                                line-height .24rem
                        .text_info
                            padding-top .12rem
                            padding-bottom .16rem
                            font-size .24rem
                            color rgb(7,17,27)
                            line-height .36rem
                        .zan
                            position relative
                            width 100%
                            overflow hidden
                            .iconfont
                                font-size .32rem
                                line-height .32rem
                                vertical-align top
                                float left
                                &.good
                                    color rgb(0,160,220)
                                &.difference
                                    color rgb(183,187,191)
                            .iconlogo
                                float left
                                padding-left .16rem
                                .iconlogo_item
                                    display inline-block
                                    border 1px solid rgba(7,17,27,.1)
                                    font-size .18rem
                                    color rgb(147,153,159)
                                    line-height .32rem
                                    vertical-align top
                                    padding 0 .12rem
                                    margin-right .16rem
                                    &:last-child
                                        margin-right 0
</style>
