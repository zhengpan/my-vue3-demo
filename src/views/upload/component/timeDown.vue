<template>
  <div class="_base-count-down">
    <div class="content">
      <slot
        v-bind="{
          d: days,
          h: hours,
          m: mins,
          s: seconds,
          hh: `00${hours}`.slice(-2),
          mm: `00${mins}`.slice(-2),
          ss: `00${seconds}`.slice(-2),
        }"
      ></slot>
    </div>
  </div>
</template>
<script setup lang="ts">
import { durationFormatter } from "@/utils/index";
import { ref, computed, onMounted, watch } from "vue";
const days = ref<string | number>("0");
const hours = ref<string | number>("00");
const mins = ref<string | number>("00");
const seconds = ref<string | number>("00");
let timer: number = 0;
let curTime: number = 0;

const props = defineProps({
  time: {
    type: [Number, String],
    default: 0,
  },
  isMilliSecond: {
    type: Boolean,
    default: false,
  },
  end: {
    // 截止时间戳
    type: Number,
    default: 0,
  },
});

const duration = computed(() => {
  if (props.end) {
    let endTimeStamp =
      String(props.end).length >= 13 ? +props.end : +props.end * 1000;
    // 最终还是要计算出剩余时间的时间戳,返回已秒为单位
    endTimeStamp = (endTimeStamp - Date.now()) / 1000;

    return Math.round(endTimeStamp);
  }
  const ctime = props.isMilliSecond
    ? Math.round(+props.time / 1000)
    : Math.round(+props.time);
  return ctime;
});

onMounted(() => {
  // 开始倒计时
  countDown();
});
const countDown = () => {
  curTime = Date.now();
  getTime(duration.value); // 计算属性处理成响应式了
};
const getTime = (duration: number) => {
  timer && clearTimeout(timer);
  if (duration < 0) {
    return;
  }

  const { dd, hh, mm, ss } = durationFormatter(duration);
  days.value = dd || 0;
  hours.value = hh || 0;
  mins.value = mm || 0;
  seconds.value = ss || 0;
  timer = setTimeout(() => {
    const now = Date.now();
    const diffTime = Math.floor((now - curTime) / 1000);
    curTime = now;
    getTime(duration - diffTime);
  }, 1000);
};

watch(duration, () => {
  // 当剩余时间有变化时需要重新倒计时。比如有tab 切换显示活动剩余时间的场景，切换了就需要重新计算
  countDown();
});
</script>
<style lang="less" scoped>
._base-count-down {
  color: red;
  text-align: left;
  position: relative;
  .content {
    width: auto;
    display: flex;
    align-items: center;
  }
  span {
    display: inline-block;
  }
  .section {
    position: relative;
  }
}
</style>
