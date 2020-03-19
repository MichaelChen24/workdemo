<template>
    <div class="content" ref="content">
        <ul class="content_ul">
            <li class="foods_list foods_list_hook" v-for="(list,index) of foodes" :key="index">
                <h1 class="foods_title">{{list.name}}</h1>
                <ul class="foods_list_ul" :ref="list.name">
                    <li class="foods_item" v-for="(items,i) of list.foods" :key="i" @click="selectFood(items,$event)">
                        <img class="foods_img"  :src="items.icon" :alt="items.name">
                        <div class="foods_content">
                            <h2 class="foods_name">{{items.name}}</h2>
                            <p class="foods_desc">{{items.description}}</p>
                            <div class="foods_extra">
                                <span class="foods_extra_mon">月售{{items.sellCount}}份</span>
                                <span class="foods_extra_P">好评率{{items.rating}}%</span>
                            </div>
                            <div class="foods_price">
                                <span>￥{{items.price}}</span>
                                <span v-show="items.oldPrice" class="foods_olprice">￥{{items.oldPrice}}</span>
                            </div>
                            <div class="cartcontrol_wrapper">
                                <Cartcontrol :foods='items'></Cartcontrol>
                            </div>
                        </div>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>

<script>
import BScroll from 'better-scroll'
import Cartcontrol from '@/components/cartcontrol'
import { mapMutations } from 'vuex'
export default {
  name: 'Content',
  data () {
    return {
      listHeight: [], // 所有产品块的高度区间
      scrollY: 0, // 获取当前滑动的高度
      timer: null // 函数节流
    }
  },
  components: {
    Cartcontrol
  },
  props: {
    foodes: {
      type: Array,
      default: function () {
        return []
      }
    },
    listdata: {
      type: String,
      default: function () {
        return ''
      }
    }
  },
  watch: {
    listdata: function () {
      if (this.listdata) {
        let element = this.$refs[this.listdata][0]
        this.scroll.scrollToElement(element, 500)
      }
    },
    foodes: function () {
      this.$nextTick(() => {
        this.scroll = new BScroll(this.$refs.content, {
          click: true,
          probeType: 3
        })

        this.scroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y))

          // 函数节流
          // if (this.timer) {
          //   clearTimeout(this.timer)
          // }
          // this.timer = setTimeout(() => {
          this.$emit('scrollitem', this.currentIndex)
          // }, 16)
        })
        this.scroll.refresh()
        // 获取所有li的高度
        this._calculateHeight()
      })
    }
  },
  methods: {
    _calculateHeight: function () {
      let foodList = this.$refs.content.getElementsByClassName('foods_list_hook')
      let height = 0
      this.listHeight.push(height)
      for (let index = 0; index < foodList.length; index++) {
        let item = foodList[index]
        height += item.clientHeight
        this.listHeight.push(height)
      }
    },
    foodesClock: function (name, price) {
      this.foodesClocke({name, price})
      this.foodesPrice({name, price})
    },
    selectFood: function (food, event) {
      this.$emit('selectFood', food)
    },
    ...mapMutations(['foodesClocke', 'foodesPrice'])
  },
  computed: {
    currentIndex () {
      for (let index = 0; index < this.listHeight.length; index++) {
        let height1 = this.listHeight[index]
        let height2 = this.listHeight[index + 1]
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          return index
        }
      }
      return 0
    }
  }
}
</script>

<style lang="stylus" scoped>
    .content
        position relative
        width 100%
        height 100%
        .content_ul
            margin 0
            padding 0
            .foods_list
                position relative
                list-style-type none
                .foods_title
                    margin 0
                    height .52rem
                    font-size .24rem
                    color rgb(147,153,159)
                    line-height .52rem
                    padding-left .28rem
                    background #f3f5f7
                .foods_list_ul
                    padding 0 .36rem
                    .foods_item
                        list-style-type none
                        padding .36rem 0
                        display flex
                        position relative
                        border-bottom .01rem solid rgba(7,17,27,.1)
                        &:last-child
                            border none
                        .foods_img
                            width 1.14rem
                            height 1.14rem
                            display inline-block
                            flex 0 0 1.14rem
                            margin-right .2rem
                        .foods_content
                            flex 1
                            position relative
                            overflow hidden
                            .foods_name
                                margin 0
                                font-size .28rem
                                color rgb(77,85,93)
                                line-height .28rem
                            .foods_desc
                                font-size .2rem
                                color rgb(147,153,159)
                                line-height .2rem
                                margin .16rem 0
                            .foods_extra
                                font-size .2rem
                                color rgb(147,153,159)
                                .foods_extra_mon
                                    margin-right .24rem
                            .foods_price
                                font-size .28rem
                                color rgb(240,20,20)
                                font-weight 700
                                line-height .48rem
                                .foods_olprice
                                    font-size .2rem
                                    margin-left 0
                                    line-height .2rem
                                    text-align top
                                    color rgb(147,153,159)
                                    vertical-align auto
                                    position relative
                                    display inline-block
                                    &:after
                                        content ''
                                        width 100%
                                        height 1px
                                        background rgb(147,153,159)
                                        position absolute
                                        left .02rem
                                        top .1rem
                            .cartcontrol_wrapper
                              position absolute
                              right 0
                              bottom 0
</style>
