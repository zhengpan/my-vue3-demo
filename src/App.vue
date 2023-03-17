<template>
  <div id="nav">
    <!-- 新增site1路由 -->
    <router-link to="/child-one">child-one-vue</router-link> |
    <!-- 新增site2路由 -->
    <router-link to="/child-two">child-two-react</router-link>
    <!-- <ul>
      <li>
        <a href="javascript:void(0)" @click="handleClick('child-one')"
          >child-one-vue</a
        >
      </li>
      <li>
        <a href="javascript:void(0)" @click="handleClick('child-two')"
          >child-two-react</a
        >
      </li>
    </ul> -->
  </div>
  <div id="subapp-container"></div>
  <!-- <router-view /> -->
</template>

<script setup lang="ts">
// const handleClick = (subApp: string) => {
//   subApp = "/" + subApp;
//   history.pushState(null, subApp, subApp);
// };
</script>

<style lang="less" scoped></style>
