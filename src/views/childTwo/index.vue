<template>
  <h2>我是子应用 react-two</h2>
  <div id="child-react-two-content"></div>
</template>

<script setup>
import { start } from "qiankun";
import { onMounted } from "vue";

onMounted(async () => {
  console.log("主应用页面挂载钩子");
  if (!window.qiankunStarted) {
    window.qiankunStarted = true;
    start();
  }
});
</script>

<style></style>
