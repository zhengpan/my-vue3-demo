<template>
  <div style="flex: 1; background-color: #f1f2f5">
    <div
      class="scroll-view"
      :style="{ height: swiperHeight + 'px', width: swiperWidth + 'px' }"
    >
      <template v-for="(tab, index) in tabBars" :key="tab.id">
        <div
          class="swiper-tab-list"
          :class="{ active: tabIndexShow === index }"
          @click="tabtap(index)"
        >
          {{ tab.name }}
          <div class="swiper-tab-line"></div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
// import { defineProps } from "vue";
interface ITabBar {
  name: string;
  id: string;
}
defineProps({
  tabBars: Array<ITabBar>,
  tabIndexShow: Number,
  swiperHeight: Number,
  swiperWidth: Number,
});

const emits = defineEmits(["tabtap"]);

const tabtap = (index: number) => {
  emits("tabtap", index);
};
</script>

<style scoped>
.swiper-tab-list {
  width: 100%;
  text-align: center;
  color: #808080;
  font-size: 26px;
  height: 60px;
  line-height: 60px;
}
.active {
  color: #000000;
  font-weight: bold;
  background-color: #ffffff;
}
.scroll-view {
  overflow: auto;
  height: 100vh;
}
</style>
