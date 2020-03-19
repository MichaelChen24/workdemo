<template>
    <div class="rating_select">
        <div class="rating_typpe">
            <span class="block positive" @click="select(2,$event)" :class="{'active':selectType==2}">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
            <span class="block positive" @click="select(0,$event)" :class="{'active':selectType==0}">{{desc.positive}}<span class="count">{{positives.length}}</span></span>
            <span class="block negative" @click="select(1,$event)" :class="{'active':selectType==1}">{{desc.negative}}<span class="count">{{negatives.length}}</span></span>
        </div>
        <div class="switch" @click="toggleContent()" :class="{'on':onlyConent}">
            <span class="iconfont">&#xe656;</span> <span class="switch_txt">只看有内容的评价</span>
        </div>
    </div>
</template>

<script>
const POSITIVE = 0
const NEGATIVE = 1
const ALL = 2
export default {
  name: 'RatingSelect',
  props: {
    ratings: {
      type: Array,
      default () {
        return []
      }
    },
    selectType: {
      type: Number,
      default: ALL
    },
    onlyConent: {
      type: Boolean,
      default: false
    },
    desc: {
      type: Object,
      default () {
        return {
          all: '全部',
          positive: '满意',
          negative: '不满意'
        }
      }
    }
  },
  methods: {
    select (type, event) {
      this.$emit('selectTypes', type)
    },
    toggleContent () {
      this.$emit('toggleContent', !this.onlyConent)
    }
  },
  computed: {
    positives () {
      return this.ratings.filter((rating) => {
        return rating.rateType === POSITIVE
      })
    },
    negatives () {
      return this.ratings.filter((rating) => {
        return rating.rateType === NEGATIVE
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.rating_select
    .rating_typpe
        padding-bottom .36rem
        padding-top .24rem
        width 100%
        border-bottom 1px solid rgba(7,17,27,0.1)
        font-size 0
        .block
            display inline-block
            padding .16rem .24rem
            font-size .24rem
            background rgba(77,85,93,.2)
            color rgb(77,85,93)
            margin-right .16rem
            line-height .32rem
            border-radius .02rem
            &.positive
                background rgba(0,160,220,.2)
                color rgb(77,85,93)
                &.active
                    background rgb(0,160,220)
                    color #ffff
            &.negative
                background rgba(77,85,93,.2)
                &.active
                    background rgb(77,85,93)
                    color #ffff
            .count
                margin-left .04rem
                font-size .16rem
    .switch
        padding .24rem 0
        position relative
        width 100%
        &.on
            .iconfont
                color #00c850
        .iconfont
            font-size .48rem
            color rgb(147,153,159)
            line-height .48rem
            margin-right .08rem
            vertical-align middle
        .switch_txt
            font-size .24rem
            color rgb(147,153,159)
            line-height .48rem
</style>
