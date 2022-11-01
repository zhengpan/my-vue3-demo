<template>
  <div class="activity-desc-wrapper">
  <input
    type="checkbox"
    class="toggleInput"
    id="toggleInput"
    v-model="isUnFold"
  />
  <div class="activity-desc" ref="descBox" id="descBox">
    <label
      class="btn"
      for="toggleInput"
      v-if="isMoreThan2Line && (!isUnFold || isMoreThan7Line)"
      >{{ isUnFold ? '展开' : '收起' }}</label>
      概述文字概述文字概述文字概述文字概
      述文字概述文字概述文字概述文字概述文字概述文字
      述文字概述文字概述文字概述文字概述文字概述文字
      述文字概述文字概述文字概述文字概述文字概述文字
      述文字概述文字概述文字概述文字概述文字概述文字
    <label
      class="btn-no-absolute"
      for="toggleInput"
      v-if="isUnFold && !isMoreThan7Line"
      >收起</label
    >
  </div>
</div>
</template>
<script setup lang='ts'>
import { ref, reactive, onMounted } from 'vue'

const isUnFold = ref<boolean>(false);
let isMoreThan2Line = ref<boolean>(false);
let isMoreThan7Line = ref<boolean>(false);
const descBox = ref<HTMLElement | null>(null);

onMounted(() => {
  getContentHeight();
})

const getContentHeight = () => {
  if (descBox.value) {
    const height = (descBox.value as HTMLElement).scrollHeight;
    const lineHeightWithPx:string = window.getComputedStyle(descBox.value as HTMLElement).lineHeight
    const matchItemArray = lineHeightWithPx.match(/\d+\.*\d+/g);
    const lineHeight = matchItemArray &&  +matchItemArray[0];
    console.log(lineHeight)
    isMoreThan7Line.value = (height / Number(lineHeight)) > 7;
    isMoreThan2Line.value = (height / Number(lineHeight)) > 2;
  }

}
</script>
<style lang='less' scoped>
.activity-desc-wrapper {
  display: flex;
  .toggleInput {
    display: none;
  }
  .toggleInput:checked + .activity-desc {
    -webkit-line-clamp: 7;
  }

  .activity-desc {
    padding: 0;
    position: relative;
    margin-top: 7px;
    font-size: 24px;
    font-weight: 400;
    color: #8a8f99;
    line-height: 1.2;

    display: -webkit-box;
    overflow: hidden;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;

    .btn {
      position: absolute;
      padding: 0 3px 0 7px;
      font-weight: 400;
      bottom: 0px;
      right: 0;
      line-height: 1.2;
      font-size: 24px;
      color: #939fe1;
      background: #f5f7fa;
      &::before {
        content: '...';
        color: #8a8f99;
        transform: translateX(-100%);
      }
    }
    .btn-no-absolute {
      float: none;
      font-size: 24px;
      font-weight: 400;
      color: #939fe1;
    }
  }
}
</style>