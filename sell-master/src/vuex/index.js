import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 点赞读取缓存
let defaultGives = false
try {
  if (localStorage.Gives) {
    if (localStorage.Gives === 'true') {
      defaultGives = true
    } else if (localStorage.Gives === 'false') {
      defaultGives = false
    }
  }
} catch (error) {}

export default new Vuex.Store({
  state: {
    selectFoods: [], // {count: 1, name: '皮蛋瘦肉粥', price: 10}
    price: 0,
    Gives: defaultGives
  },
  mutations: {
    // 增加商品方法
    foodesClocke: function (ctx, data) {
      let foodIndex = ctx.selectFoods.findIndex(food => food.name === data.name)
      if (foodIndex === -1) {
        ctx.selectFoods.push({
          name: data.name,
          price: data.price,
          count: 1
        })
        // foodIndex存在 ,更新数据
      } else {
        ctx.selectFoods[foodIndex].count++
      }
      this.commit('foodesPrice')
    },
    // 减少和删除商品方法调用
    foodesDecrease: function (ctx, data) {
      let foodIndex = ctx.selectFoods.findIndex(food => food.name === data.name)
      if (foodIndex === -1) {
        return ''
      } else {
        ctx.selectFoods[foodIndex].count--
        if (ctx.selectFoods[foodIndex].count < 1) {
          ctx.selectFoods.splice(foodIndex, 1)
        }
      }
      this.commit('foodesPrice')
    },
    // 清空购物车方法
    empty: function (ctx) {
      ctx.selectFoods = []
      ctx.price = 0
    },
    // 查询购物车现有商品数量，
    foodesPrice: function (ctx) {
      let total = 0
      ctx.selectFoods.forEach((food) => {
        total += food.price * food.count
      })
      ctx.price = total
    },
    // 点赞方法
    handleGive: function (ctx, data) {
      ctx.Gives = data
      try {
        localStorage.Gives = data
      } catch (e) { }
    }
  }
})
