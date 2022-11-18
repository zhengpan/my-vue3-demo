import type { Directive, DirectiveBinding } from "vue";

import defaultPng from "@/assets/images/default.png";

interface ElType extends HTMLElement {
  src: string;
}

// 初始化图片src和data-src
const init = (el: ElType, value: string) => {
  // data-src 储存真实的src
  el.setAttribute("data-src", value);
  el.setAttribute("src", defaultPng);
};

// 监听页面可视区域或者页面滚动事件
const observe = (el: ElType) => {
  const io = new IntersectionObserver((entries) => {
    const realSrc = el.dataset.src;
    if (entries[0].isIntersecting && realSrc) {
      el.src = realSrc;
      el.removeAttribute("data-src");
    }
  });
  io.observe(el);
};
const listennerScroll = (el: ElType) => {
  const handler = throttle(load, 300);
  load(el);
  window.addEventListener("scroll", () => {
    handler(el);
  });
};

// 加载真实图片
const load = (el: ElType) => {
  const windowHeight = document.documentElement.clientHeight;
  const elTop = el.getBoundingClientRect().top;
  const elBtm = el.getBoundingClientRect().bottom;
  const realSrc = el.dataset.src;
  if (elTop - windowHeight < 0 && elBtm > 0) {
    if (realSrc) {
      el.src = realSrc;
      el.removeAttribute("data-src");
    }
  }
};
// 节流
const throttle = (fn: Function, delay: number) => {
  let timer: any;
  let prevTime: number;
  return (...args: any) => {
    const currTime = Date.now();
    const context = this;
    if (!prevTime) prevTime = currTime;
    clearTimeout(timer);
    if (currTime - prevTime > delay) {
      prevTime = currTime;
      fn.apply(context, args);
      clearTimeout(timer);
      return;
    }
    timer = setTimeout(function () {
      prevTime = Date.now();
      timer = null;
      fn.apply(context, args);
    }, delay);
  };
};

const directive: Directive = {
  // 在元素被插入到 DOM 前调用
  beforeMount(el: ElType, binding: DirectiveBinding) {
    init(el, binding.value);
  },
  // 在绑定元素的父组件
  // 及他自己的所有子节点都挂载完成后调用
  mounted(el: ElType) {
    // 兼容处理
    if ("IntersectionObserver" in window) {
      observe(el);
    } else {
      listennerScroll(el);
    }
  },
};
export default directive;
