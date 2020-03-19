<template>
    <div class="header">
        <img :src="seller.avatar" alt="" class="background">
        <div class="content">
            <div class="header_infor">
                <img class="header_infor_img" :src="seller.avatar" alt="">
                <div class="header_infor_txt">
                    <div>
                        <span class="infor_brand"></span>
                        <span class="infor_name">{{seller.name}}</span>
                    </div>

                    <div class="infor_description">
                        {{seller.description}}/{{seller.deliveryTime}}分钟送达
                    </div>
                    <div class="infor_support">
                        <span class="infor_icon" :class="classMap[seller.supports[0].type]"></span>
                        <span class="infor_text">{{seller.supports[0].description}}</span>
                    </div>
                </div>
            </div>
            <div class="header_bottom" @click="detail_show">
                <span class="header_bottom_title"></span>
                <span class="header_bottom_text">{{seller.bulletin}}</span>
                <span class="iconfont icon">&#xe6a3;</span>
            </div>
            <div v-if="seller.supports.length" class="header_icon" @click="detail_show">
                <span class="header_icon_txt">{{seller.supports.length}}个</span>
                <span class="iconfont icon">&#xe6a3;</span>
            </div>
        </div>
        <transition>
            <div v-show="detail" class="detail">
                <div class="detail_wrapper">
                    <div class="detail_main">
                    <h1 class="detail_main_name">{{seller.name}}</h1>
                    <div class="star_wrapper">
                        <Star :starLength='3.8'></Star>
                    </div>
                    <div class="detail_title">
                        <div class="detail_title_lint"></div>
                        <div class="detail_title_text">优惠信息</div>
                        <div class="detail_title_lint"></div>
                    </div>
                    <ul class="detail_support" v-if="seller.supports">
                        <li class="detail_support_itme" v-for="(item,index) of seller.supports" :key="index">
                            <span class="detail_support_icon" :class="classMap[seller.supports[item.type].type]"></span>
                            <span class="infor_text">{{seller.supports[item.type].description}}</span>
                        </li>
                    </ul>
                        <div class="detail_title">
                        <div class="detail_title_lint"></div>
                        <div class="detail_title_text">商家公告</div>
                        <div class="detail_title_lint"></div>
                    </div>
                    <div class="detail_bulletin">
                        {{seller.bulletin}}
                    </div>
                    </div>
                </div>
                <div class="detail_close" @click="detail_close">
                    <i class="iconfont icon">&#xe6e9;</i>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import Star from './star'
export default {
  name: 'heade',
  components: {
    Star
  },
  data () {
    return {
      detail: false
    }
  },
  methods: {
    detail_show: function () {
      this.detail = true
    },
    detail_close: function () {
      this.detail = false
    }
  },
  props: {
    seller: {
      type: Object,
      default: function () {
        return {
          supports: [{
            type: 0,
            description: ''
          }]
        }
      }
    }
  },
  created () {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
  }
}
</script>

<style lang="stylus" scoped>
    @import '~@/assets/stylus/mixin.styl'
    .v-enter,.v-leave-to
        opacity: 0;
    .v-enter-active,.v-leave-active
        transition: all .5s
    .header
        position relative
        height  2.68rem
        width 100%
        .background
            content: ""
            filter: blur(5px)
            z-index: -1
            width: 100%
            height: 100%
            top: 0px;
            left: 0px;
            background-size: cover
            overflow:hidden
            position absolute
        .content
            left 0
            top 0
            width: 100%
            height 100%
            position absolute
            background rgba(7,17,27,.5)
            box-sizing border-box
            padding .48rem .24rem .36rem .48rem
            .header_infor
                width 100%
                height 100%
                overflow hidden
                .header_infor_img
                    height 1.28rem
                    width 1.28rem
                    border-radius .04rem
                    margin-right .32rem
                    float left
                .header_infor_txt
                    float left
                    color #fff
                    padding .04rem 0
                    overflow hidden
                    .infor_brand
                        display inline-block
                        width .6rem
                        height .36rem
                        bg-image('~@/assets/img/brand')
                        background-size .6rem .36rem
                        margin-right .12rem
                    .infor_name
                        font-size .32rem
                        font-weight bold
                        line-height .36rem
                        display inline-block
                        max-width 4rem
                        overflow hidden
                        white-space: nowrap
                        text-overflow: ellipsis
                    .infor_description
                        font-size .24rem
                        font-weight 200
                        line-height .24rem
                        margin-top .16rem
                    .infor_support
                        margin-top .2rem
                        display block
                        line-height .24rem
                        .infor_icon
                            width .24rem
                            height .24rem
                            display inline-block
                            margin-right .08rem
                            background-size .24rem .24rem
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
                            vertical-align top
                            font-size .2rem
                            font-weight 200
                            display inline-block
                            padding 0
                            margin 0
            .header_bottom
                width 100%
                height .56rem
                background rgba(7,17,27,.2);
                position absolute
                bottom 0
                left 0
                color #fff
                font-size .2rem
                line-height .56rem
                padding 0 .44rem 0 .24rem
                box-sizing border-box
                overflow hidden
                white-space: nowrap
                text-overflow: ellipsis
                .header_bottom_title
                    width .44rem
                    height .24rem
                    bg-image('~@/assets/img/bulletin')
                    background-repeat no-repeat
                    background-size .44rem .24rem
                    display inline-block
                    line-height .56rem
                    vertical-align top
                    margin-top .15rem
                .header_bottom_text
                    height .56rem
                    margin 0 .08rem
                    vertical-align top
                .icon
                    position absolute
                    right .24rem
                    font-size .2rem
            .header_icon
                position absolute
                right .24rem
                bottom .92rem
                background-color rgba(0,0,0,.2)
                padding .14rem .16rem
                color #fff
                border-radius .4rem
                font-size .2rem
                line-height .24rem
                font-weight 200
                .icon
                    font-size .2rem
                    line-height .24rem
        .detail
            width 100%
            height 100%
            z-index 100
            position fixed
            overflow auto
            background rgba(7,17,27,.8)
            .detail_wrapper
                // min-height 100%
                &:after
                    display block
                    content ''
                    height 0
                    line-height 0
                    clear both
                    visibility hidden
                .detail_main
                    margin-top 1.28rem
                    padding-bottom  1.28rem
                    padding-right .72rem
                    padding-left .72rem
                    .detail_main_name
                        font-size .32rem
                        font-weight 700
                        color #ffffff
                        line-height .32rem
                        text-align center
                    .star_wrapper
                        margin-top .32rem
                        padding .04rem 0
                        text-align center
                    .detail_title
                        color #ffffff
                        display flex
                        width  80%
                        margin .56rem auto .48rem auto
                        .detail_title_lint
                            flex 1
                            justify-content center
                            width 100%
                            height .02rem
                            background rgba(255,255,255,.2)
                            position relative
                            top .2rem
                        .detail_title_text
                            flex 1
                            padding  0 .24rem
                            text-align center
                            font-size .32rem
                            font-weight 700
                    .detail_support
                        display block
                        list-style-type none
                        position relative
                        padding-left .24rem
                        width 80%
                        margin  0 auto
                        box-sizing border-box
                        .detail_support_itme
                            display block
                            font-size .24rem
                            font-weight 200
                            color #ffffff
                            line-height .24rem
                            margin-bottom .24rem
                            &:last-child
                                margin-bottom 0
                            .detail_support_icon
                                width .32rem
                                height .32rem
                                display inline-block
                                vertical-align middle
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
                    .detail_bulletin
                        font-size .24rem
                        font-weight 200
                        color #ffffff
                        width 80%
                        padding 0 .24rem
                        margin 0 auto
                        box-sizing border-box
                        line-height .48rem
            .detail_close
                position relative
                margin -.64rem auto 0 auto
                width .64rem
                height .64rem
                clear both
                color rgba(255,255,255,.5)
                font-weight 500
                .icon
                    font-size .64rem
</style>
