import Vue from 'vue'
import VueRouter from 'vue-router'
import Goods from '../pages/goods/goods.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    meta: {
      title: '商品页面'
    },
    component: Goods
  },
  {
    path: '/ratings',
    meta: {
      title: '评价页面'
    },
    component: (resolve) => require(['../pages/ratings/ratings.vue'], resolve)
  },
  {
    path: '/seller',
    meta: {
      title: '商家页面'
    },
    component: (resolve) => require(['../pages/seller/seller.vue'], resolve)
  },

]

const router = new VueRouter({
  // base: process.env.BASE_URL,
  routes
})

export default router
