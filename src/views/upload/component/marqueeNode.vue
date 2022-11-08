<template>
  <div className="marquee-root" @click="handleClick">
    <div className="marquee-content" :style="marqueeStyle">
      {{ marqueeStr }}
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from "vue";
const props = defineProps({
  marqueeStr: {
    type: String,
    default: "",
  },
});

const marqueeStyle = computed(() => {
  return { animationDuration: props.marqueeStr.length * 0.2 + 10 + "s" };
});

const emits = defineEmits(["getHello"]);

const handleClick = () => {
  emits("getHello", "我就是个子组件");
};
</script>
<style lang="less" scoped>
@keyframes marqueeAnim {
  0% {
    transform: translateX(100vw);
  }
  100% {
    transform: translateX(-100%);
  }
}

.marquee-content {
  white-space: nowrap;
  display: inline-block;
  color: chocolate;
  animation: marqueeAnim 5s linear 0s infinite;
}

.marquee-root {
  width: 100%;
  height: 30px;
  text-align: left;
  line-height: 30px;
  overflow: hidden;
  background-color: burlywood;
}
</style>
