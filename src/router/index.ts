import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

import Login from '../views/login/index.vue'
import Register from '../views/register/index.vue'
import List from '../views/list/index.vue'
import GoodsList from '../views/goods/list/index.vue'
import GoodsAdd from '../views/goods/add/index.vue'

const routes:Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect:'/login'
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/list',
    name: 'List',
    component: List
  },
  {
    path: '/goodsAdd',
    name: 'GoodsAdd',
    component:GoodsAdd
  },
  {
    path: '/goodsList',
    name: 'GoodsList',
    component:GoodsList
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
