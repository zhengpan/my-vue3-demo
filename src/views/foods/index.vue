<!-- eslint-disable no-debugger -->
<template>
  <div style="display: flex">
    <!-- 菜单 -->
    <food-menu
      :tabBars="tabBars"
      :tabIndexShow="tabIndexShow"
      :swiperWidth="menuWidth"
      :swiperHeight="swiperHeight"
      @tabtap="tabtap"
    ></food-menu>
    <!-- 商品 -->
    <div
      class="scroll-view"
      ref="foodRef"
      :style="{ height: swiperHeight + 'px', width: foodWidth + 'px' }"
    >
      <template v-for="(items, index) in foodsList" :key="index">
        <div :id="'tab_' + tabBars[index].id">
          <div
            style="
              font-size: 20px;
              height: 40px;
              line-height: 40px;
              margin-left: 5px;
              color: deeppink;
              top: 0;
              z-index: 999;
              position: sticky;
              background: #666666;
            "
          >
            {{ tabBars[index].name }}
          </div>
          <template v-if="items.list.length > 0">
            <template v-for="(item, index1) in items.list" :key="index1">
              <food-component :item="item"></food-component>
            </template>
          </template>
          <template v-else> 该菜单尚未添加商品 </template>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, nextTick } from "vue";
import foodComponent from "./components/food-component.vue";
import FoodMenu from "./components/food-menu.vue";

import dataList from "./data";

let swiperHeight = ref(0);
let menuWidth = ref(0);
let foodWidth = ref(0);
let tabIndexShow = ref(0);

const foodRef = ref();

interface IRect {
  top: number;
  bot: number;
}
interface ITabBar {
  name: string;
  id: string;
}
let num = 0;
const scroNum = reactive<IRect[]>([]);
const tabBars = reactive<ITabBar[]>([
  {
    name: "粑粑",
    id: "0",
  },
  {
    name: "粥粥",
    id: "1",
  },
  {
    name: "包包",
    id: "2",
  },
  {
    name: "面面",
    id: "3",
  },
  {
    name: "粉粉",
    id: "4",
  },
  {
    name: "肉肉",
    id: "5",
  },
]);
const foodsList = reactive(dataList);

onMounted(() => {
  //初始化页面的组件大小
  let height = document.documentElement.clientHeight;
  let windowWidth = document.documentElement.clientWidth;
  swiperHeight.value = height;
  menuWidth.value = windowWidth / 5;
  foodWidth.value = (windowWidth * 4) / 5;

  // 子组件还没有完全渲染完成
  setTimeout(() => {
    loadScroNum();
  }, 0);

  foodRef.value.addEventListener("scroll", scrollGet);
});

//初始化右边商品的高度、起始高度数组，便于右边滑动，左边跟着动
const loadScroNum = () => {
  for (let i = 0; i < tabBars.length; i++) {
    const rect = document.querySelector("#tab_" + i)?.getBoundingClientRect();
    if (rect) {
      scroNum.push({
        top: rect.top,
        bot: rect.top + rect.height,
      });
    }
  }
};

// 监听子组件的tab点击事件
const tabtap = async (index: number) => {
  let timer: any = null;
  tabIndexShow.value = index;

  foodRef.value.removeEventListener("scroll", scrollGet);

  const fn = () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      console.log("end scroll");
      foodRef.value.removeEventListener("scroll", fn);
      foodRef.value.addEventListener("scroll", scrollGet);
    }, 30);
  };

  foodRef.value.addEventListener("scroll", fn);

  document
    .querySelector("#tab_" + index)
    ?.scrollIntoView({ behavior: "smooth" });
};

//监听右侧商品栏滑动事件，如果当前滑动的长度达到某个个区间内，则该区间的菜单为高亮
const scrollGet = () => {
  var now = parseInt(foodRef.value.scrollTop);
  console.log(now);
  num += 1;
  console.log({ num });

  for (var i = 0; i < tabBars.length; i++) {
    if (now > scroNum[i].top && now < scroNum[i].bot) {
      tabIndexShow.value = i;
      return;
    }
  }
};
</script>

<style>
.active {
  color: #fede33;
}
.scroll-view {
  overflow: auto;
  height: 100vh;
}
</style>
