<template>
    <div class="star" :class="itemSize">
        <span v-for="(itemClass , index) in itemClasses" class="star_item" :class="itemClass" :key="index"></span>
    </div>
</template>

<script>
const LENGTH = 5
const CLS_ON = 'on'
const CLS_HALF = 'half'
const CLS_OFF = 'off'
export default {
  // 评分星星组件
  name: 'Star',
  props: {
    starLength: {
      type: Number,
      default: 0
    },
    starSize: {
      // 默认48，只接受
      type: Number,
      default: 48
    }
  },
  computed: {
    itemClasses () {
      let arr = [] // 建立空数组
      let integer = Math.floor(this.starLength)
      for (let i = 0; i <= LENGTH; i++) {
        if (i < integer) {
          arr.push(CLS_ON)
        } else if (i > integer && i === integer + 1 && this.starLength % 1 !== 0) {
          arr.push(CLS_HALF)
        } else if (i > integer && arr.length < LENGTH) {
          arr.push(CLS_OFF)
        }
      }
      //   if (this.starLength % 1 !== 0) {
      //     arr.push(CLS_HALF)
      //   }

      //   while (arr.length < LENGTH) {
      //     arr.push(CLS_OFF)
      //   }
      return arr
    },
    itemSize: function () {
      if (this.starSize === 48 || this.starSize === 36 || this.starSize === 24) {
        return 'star_' + this.starSize
      } else {
        return 'star_48'
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
    @import '~@/assets/stylus/mixin.styl'
    .star
        font-size 0
        text-align center
        display inline-block
        .star_item
            display inline-block
            background-repeat no-repeat
        &.star_48
            .star_item
              width .4rem
              height .4rem
              background-size .4rem .4rem
              margin-right .44rem
              &:last-child
                  margin-right 0
              &.on
                  bg-image('~@/assets/img/star48_on')
              &.half
                  bg-image('~@/assets/img/star48_half')
              &.off
                  bg-image('~@/assets/img/star48_off')
        &.star_36
            .star_item
              width .3rem
              height .3rem
              background-size .3rem .3rem
              margin-right .12rem
              &:last-child
                  margin-right 0
              &.on
                  bg-image('~@/assets/img/star36_on')
              &.half
                  bg-image('~@/assets/img/star36_half')
              &.off
                  bg-image('~@/assets/img/star36_off')
        &.star_24
            .star_item
              width .2rem
              height .2rem
              background-size .2rem .2rem
              margin-right .06rem
              &:last-child
                  margin-right 0
              &.on
                  bg-image('~@/assets/img/star24_on')
              &.half
                  bg-image('~@/assets/img/star24_half')
              &.off
                  bg-image('~@/assets/img/star24_off')
</style>
