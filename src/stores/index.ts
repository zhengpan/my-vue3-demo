// import { ref, computed } from 'vue'
import { defineStore } from "pinia";

import { getUserList, register, login, goodsAdd } from "../api";

import type {
  ILoginValue,
  IRegisterValue,
  IList,
  IResult,
  IAdd,
} from "../types/index";

export const useStore = defineStore({
  id: "store",
  state: () => ({
    list: [] as Array<IResult>,
  }),
  actions: {
    // 获取用户注册列表
    async getList(query: IList) {
      const result = await getUserList(query);
      console.log("回来的数据：", result);
      this.list = result.data;
      return this.list;
    },
    // 登录
    async handleLogin(params: ILoginValue) {
      const result = await login(params);
      return result;
    },
    // 注册
    async handleRegister(params: IRegisterValue) {
      const result = await register(params);
      console.log("注册的数据：", result);
      return result;
    },
    // 增加商品
    async handleGoodsAdd(params: IAdd) {
      const result = await goodsAdd(params);
      console.log("增加的数据：", result);
      return result;
    },
  },
});
