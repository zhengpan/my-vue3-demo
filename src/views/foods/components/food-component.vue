<template>
  <div class="box">
    <img class="food_image" :src="item.food_image" />
    <div class="content">
      <div class="title">{{ item.food_name }}</div>
      <div class="foodNum">月售{{ item.num }}</div>
      <div class="money">￥{{ item.food_price }}</div>
      <div class="search">挑选规格</div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  item: {
    type: Object,
    default: () => {},
  },
});
</script>

<style>
.box {
  /* min-height: 120px; */
  width: 100%;
  padding: 5px;
  display: flex;
  /* height: 120px; */
  box-sizing: border-box;
}
.box > .food_image {
  height: 80px;
  width: 80px;
  border-radius: 5%;
  margin: 15px;
}
.box > .content {
  position: relative;
}
.box > .content > .title {
  font-size: 18px;
  font-weight: 600;
}
.box > .content > .foodNum {
  font-size: 16px;
  color: #6d6d72;
}
.box > .content > .money {
  font-size: 20px;
  color: #ff0000;
  font-weight: 600;
}
.box > .content > .search {
  font-size: 18px;
  font-weight: 600;
  background-color: #ffa200;
  border-radius: 5%;
  padding: 0 5px;
}
</style>
