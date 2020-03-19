<template>
<div>
  <div class="shopcart">
    <div class="content">
      <div class="content_left">
        <div class="logo_wrapper"  @click="show_cart" :class="{active:this.selectFoods.length }">
          <div class="logo">
            <span class="iconfont">&#xe746;</span>
          </div>
          <i class="iconNumber">{{this.selectFoods.length}}</i>
        </div>
        <div class="price">{{this.price}}￥</div><div class="desc">另需配送费￥{{deliveryPrice}}元</div>
      </div>
      <div class="content_right" :class="{active:this.price>=this.minPrice}">{{payDesc}}</div>
    </div>
    <div class="ball-container">
      <transition-group :before-enter="beforeEnter"
        :enter="enter"
        :after-enter="afterEnter">
        <div class="ball" v-for="(ball,index) in balls" v-show="ball.show" :key="index">
          <div class="inner inner-hook"></div>
        </div>
      </transition-group>
    </div>
    <transition>
      <div class="shopcart-List" v-show="shopcart_show">
        <div class="list-header">
          <h1 class="title">购物车</h1>
          <span class="empty" @click="empty">清空</span>
        </div>
        <div class="list_content" ref="contentss">
          <ul>
            <li class="food" v-for="(food,index) of selectFoods" :key="index">
                <h2 class="food_title">{{food.name}}</h2>
                <div class="food_info">
                  <span class="food_price">{{food.price*food.count}}￥</span>
                  <div class="cartcontrol">
                    <Cartcontrol :foods='{name:food.name,price:food.price}'></Cartcontrol>
                  </div>
                </div>
            </li>
          </ul>
        </div>
      </div>
    </transition>
  </div>
  <transition>
    <div class="mum" v-show="shopcart_show"></div>
  </transition>
</div>
</template>

<script>
// 底部购物篮组件
import { mapState, mapMutations } from 'vuex'
import BUS from '@/BUS.js'
import Cartcontrol from '@/components/cartcontrol'
import BScroll from 'better-scroll'
export default {
  name: 'Shopcart',
  components: {
    Cartcontrol
  },
  mounted () {
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.contentss, {
        click: true
      })
      this.scroll.refresh()
    })
  },
  data () {
    return {
      balls: [
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        }
      ],
      dropBalls: [],
      shopcart_show: false
    }
  },
  created () {
    // 由总线接收派发事件
    BUS.$on('Ball', (data) => {
      this.$nextTick(() => {
        // 将dom元素传递给_drop()事件
        this._drop(data)
      })
    })
  },
  methods: {
    _drop (data) {
      // 循环遍历balls(还未执行动画小球)
      for (let i = 0; i < this.balls.length; i++) {
        // 遍历第i个小球获取show
        let ball = this.balls[i]
        // 如果第i个小球为false时候，将i小球show值改为true,并创建el字段，赋值dom元素
        if (!ball.show) {
          ball.show = true
          ball.el = data
          // 将正在进行的动画小球赋值给dropBalls
          this.dropBalls.push(ball)
          // 获取到未在进行动画的小球后return
          return
        }
      }
    },
    // 准备进行动画的时事件调用
    beforeEnter (el) {
      // 获取当前小球的个数
      let count = this.balls.length
      // 通过while循环进行遍历小球，直到有正在运准备行动的小球
      while (count--) {
        let ball = this.balls[count]
        // 如果碰到准备进行动画的小球，执行下面方法
        if (ball.show) {
          // 以下代码是初始化小球的位置，也就是将小球定位到加减号的旁边，因为之前传过
          let rect = ball.el.getBoundingClientRect()
          let x = rect.left - 32
          let y = -(window.innerHeight - rect.top - 22)
          el.style.display = ''
          el.style.webkitTransform = `translate3d(0,${y}px,0)`
          el.style.transform = `translate3d(0,${y}px,0)`
          let inner = el.getElementsByClassName('inner-hook')[0]
          inner.style.webkitTransform = `translate3d(${x}px,0,0)`
          inner.style.transform = `translate3d(${x}px,0,0)`
        }
      }
    },
    // 小球动画进行中的回调
    enter (el) {
      /* eslint-disable no-unused-vars */
      let rf = el.offsetHeight // 这里是关键初始化小球的内部高度
      this.$nextTick(() => { // 优化小球动画
        el.style.webkitTransform = 'translate3d(0,0,0)'
        el.style.transform = 'translate3d(0,0,0)'
        let inner = el.getElementsByClassName('inner-hook')[0]
        inner.style.webkitTransform = 'translate3d(0,0,0)'
        inner.style.transform = 'translate3d(0,0,0)'
      })
    },
    // 小球动画结束的回调
    afterEnter (el) {
      let ball = this.dropBalls.shift()
      if (ball) {
        ball.show = false
        el.style.display = 'none'
      }
    },
    show_cart: function () {
      if (this.selectFoods.length) {
        this.shopcart_show = !this.shopcart_show
      }
    },
    ...mapMutations(['empty'])
  },
  computed: {
    payDesc: function () {
      if (this.price === 0) {
        return `￥${this.minPrice}元起送`
      } else if (this.price < this.minPrice) {
        let diff = this.minPrice - this.price
        return `还差￥${diff}元起送`
      } else {
        return '去结算'
      }
    },
    ...mapState({
      selectFoods: 'selectFoods',
      price: 'price'
    })
  },
  props: {
    deliveryPrice: {
      type: Number,
      default: function () {
        return 0
      }
    },
    minPrice: {
      type: Number,
      default: function () {
        return 0
      }
    }
  },
  watch: {
    selectFoods: function () {
      this.scroll.refresh()
      if (this.selectFoods.length <= 0) {
        this.shopcart_show = false
      }
    },
    shopcart_show: function () {
      this.scroll.refresh()
    }
  }
}
</script>

<style lang="stylus" scoped>
  .mum
    position fixed
    width 100%
    height 100%
    top 0
    bottom 0
    left 0
    right 0
    z-index 40
    background rgba(7,17,27,.6)
    &.v-leave-active,&.v-enter-active
      opacity  1
      transition all .5s
    &.v-enter,&.v-leave-to
      opacity 0
    &:after
      content: "";
      width:100%;
      height:100%;
      position: absolute;
      left:0;
      top:0;
      background: inherit;
      filter: blur(10px);
      z-index: 2;
  .shopcart
    position fixed
    bottom 0
    left 0
    width 100%
    height .96rem
    z-index 50
    .content
      z-index 50
      display flex
      position relative
      width 100%
      height 100%
      background-color #141d27
      .content_left
        flex 1
        position relative
        .logo_wrapper
          float left
          width 1rem
          height 1rem
          border-radius 50%
          background-color #141d27
          margin -.16rem .36rem  0 .36rem
          box-sizing border-box
          padding .12rem
          display inline-block
          .logo
            width 100%
            height 100%
            border-radius 50%
            background-color rgba(255,255,255,.4)
            text-align center
            position relative
            .iconfont
              display inline-block
              font-size .48rem
              color rgba(255,255,255,.4)
              margin-top 50%
              transform translateY(-50%)
          .iconNumber
            position absolute
            top 0
            right -.28rem
            width .48rem
            height .38rem
            font-style normal
            font-size .28rem
            line-height .38rem
            background rgb(240,20,20)
            color #ffffff
            font-weight 700
            padding 0 .12rem
            text-align center
            vertical-align middle
            border-radius .38rem
            box-shadow 0 .08rem .16rem 0 rgba(0,0,0,.4)
            display none
          &.active
            position relative
            .logo
              background rgb(0,160,200)
              position relative
              .iconfont
                color #ffffff
            .iconNumber
              display inline-block
        .price
          display inline-block
          line-height .48rem
          vertical-align top
          padding-right .24rem
          box-sizing border-box
          border-right 1px solid rgba(255,255,255,.1)
          font-size .38rem
          font-weight 700
          color rgba(255,255,255,.4)
          margin-top .24rem
        .desc
          display inline-block
          vertical-align top
          margin-left  .24rem
          line-height .96rem
          color rgba(255,255,255,.4)
          font-size .2rem
          max-width 2.2rem
          overflow hidden
          white-space: nowrap
          text-overflow: ellipsis
      .content_right
        width 2.1rem
        height 100%
        color  rgba(255,255,255,0.4)
        font-size .24rem
        line-height .96rem
        display: table-cell;
        vertical-align: middle;
        text-align center
        font-weight 700
        padding 0 .16rem
        box-sizing border-box
        background rgb(43,51,59)
        &.active
          background #00b43c
          color #fff
    .ball-container
      .ball
        position fixed
        left .64rem
        bottom .44rem
        z-index 2000
        &.v-enter-active
          transition all .4s cubic-bezier(0.49,-0.29,0.75,0.41)
          .inner
            width .32rem
            height .32rem
            border-radius 50%
            background rgb(0,160,220)
            transition all .4s linear
    .shopcart-List
      z-index 35
      position absolute
      bottom .96rem
      left 0
      width 100%
      max-height 6.11rem
      background #ffffff
      &.v-leave-active,&.v-enter-active
       transition all .5s
       transform translate3d(0,0,0)
      &.v-enter,&.v-leave-to
        transform translate3d(0,100%,0)
      .list-header
        width 100%
        height .8rem
        background #f3f5f7
        border-bottom 1px solid rgba(7,17,27,.1)
        line-height .8rem
        box-sizing border-box
        padding  0 .3rem
        .title
          margin 0
          display inline-block
          float left
          font-size .28rem
          font-weight 700
          color rgb(7,17,27)
        .empty
          font-size .24rem
          color rgb(0,160,220)
          float right
      .list_content
        max-height 5.15rem
        padding 0 .3rem
        box-sizing border-box
        overflow hidden
        width 100%
        ul
          padding 0
          margin 0
          .food
            list-style-type none
            padding .24rem 0
            width 100%
            border-bottom 1px solid rgba(7,17,27,.1)
            &:last-child
              border none
            .food_title
              font-size .28rem
              color rgb(7,17,27)
              display inline-block
              line-height .48rem
              margin 0
            .food_info
              display inline-block
              float right
              .food_price
                font-size .28rem
                font-weight 700
                line-height .48rem
                color rgb(240,20,20)
                display inline-block
                margin-right .24rem
                vertical-align middle
              .cartcontrol
                display inline-block
                vertical-align top
</style>
