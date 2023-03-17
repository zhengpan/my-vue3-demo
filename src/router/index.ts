import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import Login from "../views/login/index.vue";
import Register from "../views/register/index.vue";
import List from "../views/list/index.vue";
import GoodsList from "../views/goods/list/index.vue";
import GoodsAdd from "../views/goods/add/index.vue";

import Upload from "../views/upload/index.vue";

import Flex from "../views/flex/index.vue";

import Foods from "../views/foods/index.vue";

const home = () => import("@/views/home/index.vue");

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: home,
  },
  // {
  //   path: "/child-one/:pathMatch(.*)*",
  //   component: () => import("@/views/childOne/index.vue"),
  // },
  // {
  //   path: "/child-two/:pathMatch(.*)*",
  //   component: () => import("@/views/childTwo/index.vue"),
  // },
  // {
  //   path: "/",
  //   redirect: "/login",
  // },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/register",
    name: "register",
    component: Register,
  },
  {
    path: "/list",
    name: "List",
    component: List,
  },
  {
    path: "/goodsAdd",
    name: "GoodsAdd",
    component: GoodsAdd,
  },
  {
    path: "/goodsList",
    name: "GoodsList",
    component: GoodsList,
  },
  {
    path: "/upload",
    name: "Upload",
    component: Upload,
  },
  {
    path: "/flex",
    name: "Flex",
    component: Flex,
  },
  {
    path: "/foods",
    name: "Foods",
    component: Foods,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
