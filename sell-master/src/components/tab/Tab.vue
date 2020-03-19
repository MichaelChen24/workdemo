<template>
    <div class="tab">
        <ul class="list">
            <router-link tag="li" :to="{path:'/commodity'}"  class="list_item" exact>商品</router-link>
            <router-link tag="li" :to="{path:'/evaluate'}"  class="list_item" exact>评价</router-link>
            <router-link tag="li" :to="{path:'/business'}" class="list_item" exact>商家</router-link>
        </ul>
    </div>
</template>

<script>
export default {
  name: 'Tab'
}
</script>

<style lang="stylus" scoped>
    .tab
        position relative
        width 100%
        height .8rem
        background #fff
        &:before
            content ''
            position absolute
            width 100%
            bottom 0
            left 0
            border-top  1px solid rgba(7,17,27,.2)
            transform  scaleY(0.5)
        .list
            display flex
            position relative
            list-style-type none
            height 100%
            margin 0
            padding 0
            .list_item
                flex 1
                line-height .8rem
                font-size .28rem
                color rgb(77,85,93)
                text-align center
                cursor pointer
            .active
                color rgb(240,20,20)

</style>
