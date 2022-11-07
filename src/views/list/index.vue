<template>
  <van-contact-card
    v-for="item in store.list"
    :key="item._id"
    type="edit"
    :name="item.username"
    :tel="item.phone"
    :editable="false"
  />
</template>
<script setup lang="ts">
import { onMounted } from "vue";
import { useStore } from "../../stores/index";

const store = useStore();

onMounted(async () => {
  await store.getList({ page: 1, pageSize: 20 });
});
</script>
<style lang="less" scoped></style>
