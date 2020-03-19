<template>
    <div class="business" ref="business">
        <div class="business_content">
            <div class="header">
                <div class="header_top">
                    <h1 class="titele">{{seller.name}}</h1>
                    <div class="desc">
                        <star :starSize='36' :starLength='seller.score'></star>
                        <span class="text" style="margin-right:.24rem;padding-left:.16rem">({{seller.ratingCount}})</span>
                        <span class="text">月售{{seller.sellCount}}单</span>
                    </div>
                    <div class="zan" :class="{'active':Gives}" @click="GiveBool(Gives)">
                        <span class="iconfont">&#xe707;</span>
                        <h4>{{Gives?'已收藏':'收藏'}}</h4>
                    </div>
                </div>
                <div class="header_bottom">
                    <div class="info_item">
                        <h3>起送价</h3>
                        <span>{{seller.minPrice}}<i class="item_i">元</i></span>
                    </div>
                    <div class="info_item">
                         <h3>商家配送</h3>
                        <span>{{seller.deliveryPrice}}<i class="item_i">元</i></span>
                    </div>
                    <div class="info_item">
                         <h3>平均配送时间</h3>
                        <span>{{seller.deliveryTime}}<i class="item_i">分钟</i></span>
                    </div>
                </div>
            </div>
            <div class="business_infor">
                <h1 class="titele">公告与活动</h1>
                <span class="text">{{seller.bulletin}}</span>
                <ul class="supports">
                    <li class="supports_item" v-for="(item,index) of seller.supports" :key="index">
                        <span class="detail_support_icon" :class="classMap[item.type]"></span>
                        <span class="infor_text">{{item.description}}</span>
                    </li>
                </ul>
            </div>
            <div class="business_bg">
                <h1 class="titele">商家实景</h1>
                <div class="business_bg_content" ref="bg">
                    <ul class="bg_ul">
                        <li class="bg_item" v-for="(item,index) in seller.pics" :key="index">
                            <img :src="item">
                        </li>
                    </ul>
                </div>
            </div>
            <div class="information">
                <h1 class="titele">商家信息</h1>
                <ul class="infor_ul">
                    <li class="infor_item" v-for="(item,index) in seller.infos" :key="index">
                        {{item}}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import star from '@/components/header/star'
import BScroll from 'better-scroll'
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'Business',
  components: {
    star
  },
  props: {
    seller: {
      type: Object,
      default () {
        return {}
      }
    },
    ratings: {
      type: Array
    }
  },
  data () {
    return {
      classMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    }
  },
  methods: {
    GiveBool (data) {
      let bool = !data
      this.handleGive(bool)
    },
    ...mapMutations(['handleGive'])
  },
  mounted () {
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.business, {
        click: true
      })
      this.scroll.refresh()

      this.bg = new BScroll(this.$refs.bg, {
        click: true,
        scrollX: true,
        scrollY: false
      })
      this.bg.refresh()
    })
  },
  computed: {
    ...mapState(['Gives'])
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/stylus/mixin.styl'
.business
    position absolute
    top 3.48rem
    bottom .96rem
    left 0
    width 100%
    overflow hidden
    background  #f3f5f7
    .header
        position relative
        width 100%
        padding .36rem
        box-sizing border-box
        background #ffffff
        &:before
            content ''
            position absolute
            width 100%
            bottom 0
            left 0
            border-top  1px solid rgba(7,17,27,.2)
            transform  scaleY(0.5)
        .header_top
            position relative
            overflow hidden
            padding-bottom .36rem
            &:before
                content ''
                position absolute
                width 100%
                bottom 0
                left 0
                border-top  1px solid rgba(7,17,27,.2)
                transform  scaleY(0.5)
            .titele
                font-size .28rem
                color rgb(7,17,27)
                line-height .28rem
                font-weight inherit
            .desc
                float left
                font-size 0
                .text
                    font-size .2rem
                    color rgb(77,85,93)
                    line-height .36rem
            .zan
                position absolute
                width .8rem
                right 0
                top 0
                text-align center
                &.active
                    .iconfont
                        color rgb(240,20,20)
                .iconfont
                    font-size .48rem
                    line-height .48rem
                    color rgb(212,214,217)
                h4
                    font-weight normal
                    padding-top .08rem
                    margin 0
                    font-size .2rem
                    color rgb(77,85,93)
                    line-height .2rem
        .header_bottom
            position relative
            display flex
            padding-top .36rem
            width 100%
            .info_item
                flex 1
                text-align center
                position relative
                overflow hidden
                &:before
                    content ''
                    position absolute
                    height  100%
                    bottom 0
                    right 0
                    border-right  1px solid rgba(7,17,27,.2)
                    transform  scaleX(0.5)
                &:last-child
                    &:before
                        border-right none
                h3
                    margin 0
                    font-size .27rem
                    color rgb(147,153,159)
                    line-height .27rem
                    font-weight normal
                span
                    display block
                    margin-top .08rem
                    font-size .48rem
                    font-weight 200
                    color rgb(7,17,27)
                    line-height .48rem
                    .item_i
                        font-size .20rem
                        font-style normal
    .business_infor
        position relative
        width 100%
        padding .36rem .36rem 0 .36rem
        box-sizing border-box
        background #ffffff
        margin-top 0.32rem
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
        .titele
            font-size .28rem
            color rgb(7,17,27)
            line-height .28rem
            font-weight inherit
        .text
            display inline-block
            font-size .24rem
            font-weight 200
            color rgb(240,20,20)
            line-height .48rem
            padding .16rem .24rem .32rem .24rem
            position relative
            &:before
                content ''
                position absolute
                width 100%
                bottom 0
                left 0
                border-top  1px solid rgba(7,17,27,.2)
                transform  scaleY(0.5)
        .supports
            position relative
            list-style-type none
            display block
            padding 0
            margin 0
            .supports_item
                font-size 0
                display block
                padding .32rem .24rem
                position relative
                &:last-child
                    &:before
                        border 0
                &:before
                    content ''
                    position absolute
                    width 100%
                    bottom 0
                    left 0
                    border-top  1px solid rgba(7,17,27,.2)
                    transform  scaleY(0.5)
                .detail_support_icon
                    width .32rem
                    height .32rem
                    display inline-block
                    vertical-align top
                    margin-right .12rem
                    background-size .32rem .32rem
                    background-repeat no-repeat
                    &.decrease
                        bg-image('~@/assets/img/decrease_1')
                    &.discount
                        bg-image('~@/assets/img/discount_1')
                    &.guarantee
                        bg-image('~@/assets/img/guarantee_1')
                    &.invoice
                        bg-image('~@/assets/img/invoice_1')
                    &.special
                        bg-image('~@/assets/img/special_1')
                .infor_text
                    font-size .24rem
                    font-weight 200
                    color rgb(7,17,27)
                    line-height .32rem
    .business_bg
        position relative
        width 100%
        padding .36rem 0 .36rem .36rem
        box-sizing border-box
        background #ffffff
        margin-top 0.32rem
        overflow hidden
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
        .titele
            font-size .28rem
            color rgb(7,17,27)
            line-height .28rem
            font-weight inherit
            margin 0
        .business_bg_content
            margin-top .24rem
            position relative
            width 100%
            overflow hidden
            white-space nowrap
            font-size 0
            line-height 0
            .bg_ul
                position relative
                height 1.8rem
                width auto
                display inline-block
                padding 0
                overflow-x auto
                margin 0
                list-style-type none
                .bg_item
                    display inline-block
                    width 2.40rem
                    height 1.8rem
                    margin-right .12rem
                    img
                        width 2.40rem
                        height 1.8rem
    .information
        position relative
        width 100%
        padding .36rem .36rem 0 .36rem
        box-sizing border-box
        background #ffffff
        margin-top 0.32rem
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
        .titele
            margin 0
            position relative
            display block
            padding-bottom .24rem
            font-size .28rem
            color rgb(7,17,27)
            font-weight inherit
            &:before
                content ''
                position absolute
                width 100%
                bottom 0
                left 0
                border-top  1px solid rgba(7,17,27,.2)
                transform  scaleY(0.5)
        .infor_ul
            margin 0
            padding 0
            list-style-type none
            .infor_item
                font-size .24rem
                font-weight 200
                color rgb(7,17,27)
                line-height .32rem
                padding .32rem .24rem
                position relative
                &:before
                    content ''
                    position absolute
                    width 100%
                    height 1px
                    bottom 0
                    left 0
                    background-color  rgba(7,17,27,.2)
                    transform  scaleY(0.5)
                &:last-child
                    &:before
                        height  0
</style>
