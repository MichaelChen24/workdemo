<template>
    <div class="list" ref="wrapper">
        <ul class="list_ul">
            <li class="list_item" v-for="(item,index) of commodity" :key="index" @click="listClick(item.name,$event)" :ref="item.name" :class="{active:index==scrollItem}">
                <span class="list_item_text border-bottom">
                    <span class="list_item_icon" v-if="item.type>0" :class="classMap[item.type]"></span>
                    {{item.name}}
                </span>
            </li>
        </ul>
    </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: 'List',
  data () {
    return {
      itemname: ''
    }
  },
  methods: {
    listClick: function (data, event) {
      // if (event._constructed) {
      //   return
      // }
      this.$emit('listClick', data)
      this.itemname = data
    }
  },
  props: {
    commodity: {
      type: Array,
      default: function () {
        return []
      }
    },
    scrollItem: {
      default: function () {
        return 0
      }
    }
  },
  mounted () {
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      bounceTime: 300
    })
    this.scroll.refresh()
  },
  created () {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
  },
  watch: {
    commodity: function () {
      if (this.commodity) {
        this.$nextTick(function () {
          this.scroll.refresh()
          for (let datas of this.commodity) {
            if (datas.first) {
              this.itemname = datas.name
            }
          }
        })
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/stylus/mixin.styl'
    .list
        position absolute
        top 0
        bottom 0
        left 0
        height 100%
        width 100%
        .list_ul
            list-style-type none
            padding 0
            margin 0
            .list_item
                width 100%
                height  1.08rem
                font-size .24rem
                color rgb(24,2,2)
                font-weight 500
                line-height .28rem
                box-sizing border-box
                padding 0 .24rem
                display table
                cursor pointer
                &.active
                    background #ffffff
                    font-weight 700
                    color #000
                .list_item_text
                    display: table-cell
                    vertical-align: middle;
                    .list_item_icon
                        width .24rem
                        height .24rem
                        display inline-block
                        background-size .24rem .24rem
                        background-repeat no-repeat
                        &.decrease
                            bg-image('~@/assets/img/decrease_3')
                        &.discount
                            bg-image('~@/assets/img/discount_3')
                        &.guarantee
                            bg-image('~@/assets/img/guarantee_3')
                        &.invoice
                            bg-image('~@/assets/img/invoice_3')
                        &.special
                            bg-image('~@/assets/img/special_3')
</style>
