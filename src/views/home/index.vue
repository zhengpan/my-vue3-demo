<template>
  <div class="home">
    <img
      class="main-img"
      src="https://gw.alipayobjects.com/zos/bmw-prod/8a74c1d3-16f3-4719-be63-15e467a68a24/km0cv8vn_w500_h500.png"
    />
    <span>Vue3 主应用 + Ts + Vite + Pinia + qiankun </span>
  </div>
</template>

<script setup></script>
<style lang="less" scoped>
.home {
  margin-top: 100px;
  .main-img {
    width: 60px;
    height: 60px;
    display: inline-block;
    vertical-align: middle;
  }
  span {
    margin-left: 20px;
    font-size: 24px;
    font-weight: bold;
    vertical-align: middle;
  }
  text-align: center;
  font-size: 0px;
}
</style>
