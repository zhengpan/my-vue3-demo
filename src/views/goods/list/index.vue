<template>
  <van-button type="primary" size="large" @click="goToAdd">添加商品</van-button>
  <van-list
    offset="10"
    v-model:loading="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
  >
    <van-swipe-cell v-for="item in list" :key="item._id">
      <van-cell
        :border="false"
        :title="'商品名称：' + item.goodsName"
        :value="'价格：' + item.price"
      />
      <template #right>
        <van-button
          square
          type="danger"
          text="删除"
          @click="clickGood(item._id)"
        />
        <van-button
          square
          type="primary"
          text="编辑"
          @click="modifyGood(item._id)"
        />
      </template>
    </van-swipe-cell>
  </van-list>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import type { IGoodList } from "@/types/index";
import * as goodListApi from "@/api";
import { windowHeight } from "vant/lib/utils";
const router = useRouter();
const route = useRoute();

const list = ref<Array<IGoodList>>([]);
const loading = ref<boolean>(false);
const finished = ref<boolean>(false);
let isRefresh: boolean = false;

let page = 1;
const onLoad = async () => {
  // 异步更新数据
  const result = await goodListApi["goodsList"]({
    page,
    pageSize: 10,
  });
  const { code, data, count } = result;
  if (code === 200) {
    page++;
    if (isRefresh) {
      list.value = [];
    }
    list.value = list.value.concat(data);
  }
  // 加载状态结束
  loading.value = false;
  // 数据全部加载完成
  if (list.value.length >= count) {
    finished.value = true;
  }
};

const goToAdd = () => {
  router.push({
    path: "/goodsAdd",
  });
};
const clickGood = async (_id: string) => {
  const result = await goodListApi.goodsDelete({ _id });
  if (result.code === 200) {
    isRefresh = true;
    page = 0;
    onLoad();
  }
};
const modifyGood = (_id: string) => {
  router.push({
    path: "/goodsAdd",
    query: {
      _id,
    },
  });
};
</script>
<style lang="less" scoped></style>
