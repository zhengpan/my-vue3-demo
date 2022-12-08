import { defineStore } from "pinia";

export const useLoginStore = defineStore("login", {
  state: () => ({ count: 0 }),
  getters: {
    double: (state) => state.count * 2,
    doublePlusOne(): number {
      return this.double + 1;
    },
  },
  actions: {
    increment(num: number) {
      this.count = this.count + num;
      return this.count;
    },
  },
});
