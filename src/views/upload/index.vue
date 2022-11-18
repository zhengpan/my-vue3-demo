<template>
  <div
    class="container"
    v-safeWaterMarker="{
      text: '版权所有',
      textColor: 'rgba(180, 180, 180, 0.4)',
    }"
  >
    <marquee-node :marqueeStr="marqueeData" @getHello="getHello">
    </marquee-node>
    <van-uploader v-model="fileList" :after-read="afterRead" />

    <time-down v-slot="timeObj" :end="1667212299000">
      {{ timeObj.d }}天{{ timeObj.hh }}小时{{ timeObj.mm }}分钟{{
        timeObj.ss
      }}秒
    </time-down>

    <!-- 显示 -->
    <button v-permission="'1'">权限按钮1</button>
    <!-- 不显示 -->
    <button v-permission="'10'">权限按钮2</button>
    <img
      class="auto-image"
      v-lazy="
        'https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7f2421e0269d41299dad3ff4bd0dced9~tplv-k3u1fbpfcp-watermark.image?'
      "
    />
    <div>{{ dateStr }}---{{ message }}</div>
    <div v-if="flag">{{ dateStr }}</div>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref, computed, watch } from "vue";
import { uploadFile } from "@/api";
import MarqueeNode from "./component/marqueeNode.vue";
import TimeDown from "./component/timeDown.vue";
const flag = ref<boolean>(false);
let message = ref<string>("郑攀");
let myName = "计算属性";
let watchValue = "111";

interface IData {
  url: string;
}

// const a:string[] = ['1']
// const a:Array<string> = ['1']
const marqueeData = ref<string>(
  "在这里上传文件啊，别搞错了,是对冯绍峰大事发生范德萨发"
);
const fileList = reactive<Array<IData>>([]);

let fd = new FormData();
const afterRead = (file: any) => {
  // 此时可以自行将文件上传至服务器
  fd.append("profilePic", file.file);
  console.log(file.file);
  upload();
};

const upload = async () => {
  const result = await uploadFile(fd, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  const { code, data } = result;
  if (code === 200) {
    fileList.push(data);
  }
};

const getHello = (childMsg: string) => {
  marqueeData.value = `我是父组件，我要改变你的值,${childMsg}`;
};

const dateStr = computed(() => {
  return myName + "，你好！";
});
setTimeout(() => {
  watchValue = "222";
  myName = "刘欢";
  message.value = "刘欢";
  flag.value = true;
}, 2000);

watch(message, (newValue, oldValue) => {
  console.log("watch执行了");
});
</script>
<style lang="less" scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
}
.auto-image {
  width: 100%;
  margin-top: 30px;
}
</style>
