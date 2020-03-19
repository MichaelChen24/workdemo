<template>
    <div class="cartcontrol">
      <transition>
        <div class="cart_decrease" v-show='item>0' @click.stop="decrease($event)">
          <span class="inner iconfont">&#xe712;</span>
        </div>
      </transition>
      <transition>
        <div class="cart_count" v-show='item>0'>{{item}}</div>
      </transition>
      <div class="cart_add" @click.stop="add"  transition='move'>
        <span class="iconfont">&#xe6e0;</span>
      </div>
    </div>
</template>

<script>
// 产品加减号组件
import { mapState, mapMutations } from 'vuex'
import BUS from '@/BUS.js'
export default {
  name: 'Cartcontrol',
  data () {
    return {
      item: 0
    }
  },
  props: {
    foods: {
      type: Object
    }
  },
  mounted () {
    for (const iterator of this.selectFoods) {
      if (iterator.name === this.foods.name) {
        this.item = iterator.count
      }
    }
  },
  methods: {
    add: function (event) {
      this.foodesClocke({name: this.foods.name, price: this.foods.price})
      BUS.$emit('Ball', event.target)
    },
    decrease: function () {
      this.foodesDecrease({name: this.foods.name, price: this.foods.price})
    },
    ...mapMutations(['foodesClocke', 'foodesPrice', 'foodesDecrease'])
  },
  watch: {
    selectFoods: {
      handler: function () {
        let foodIndex = this.selectFoods.findIndex(food => food.name === this.foods.name)
        if (foodIndex === -1) {
          this.item = 0
        } else {
          this.item = this.selectFoods[foodIndex].count
        }
      },
      deep: true
    }
  },
  computed: {
    ...mapState(['selectFoods'])
  }
}
</script>

<style lang="stylus" scoped>
  .cartcontrol
    font-size 0
    .cart_decrease
      display inline-block
      line-height .32rem
      font-size .32rem
      color rgb(0,160,220)
      .iconfont
        line-height .48rem
        font-size .48rem
      &.v-leave-active,&.v-enter-active
        transform translate3D(0,0,0)
        transition all .5s
        opacity 1
        .inner
          transition all .5s
          transform rotate(0)
      &.v-enter,&.v-leave-to
        opacity 0
        transform translate3D(.48rem,0,0)
        .inner
          transform rotate(180deg)
    .cart_count
      display inline-block
      line-height: 0.48rem;
      font-size: 0.2rem;
      vertical-align top
      text-align center
      color  rgb(147,153,159)
      &.v-enter-active,&.v-leave-active
        transition: all .3s linear
      &.v-enter,&.v-leave-to
        transform translate3d(0,0,0)
        opacity 0
    .cart_add
      display inline-block
      line-height .32rem
      font-size .32rem
      color rgb(0,160,220)
      .iconfont
        font-size .48rem
        line-height .48rem
</style>
