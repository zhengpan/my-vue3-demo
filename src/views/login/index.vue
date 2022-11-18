<template>
  <div>
    <div class="title">welcome to login!</div>
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
          v-model="email"
          clearable
          name="email"
          cle
          label="邮箱"
          placeholder="邮箱"
          :rules="[{ required: true, message: '请填写邮箱' }]"
        />
        <van-field
          v-model="password"
          clearable
          type="password"
          name="password"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
      </van-cell-group>
      <div style="margin: 16px">
        <van-button round block type="primary" native-type="submit">
          登录
        </van-button>
      </div>
    </van-form>
    <RouterLink to="/register" class="center">注册</RouterLink>
  </div>
</template>

<script setup lang="ts">
import { RouterLink, useRouter } from "vue-router";
import { ref } from "vue";
import type { ILoginValue } from "../../types/index";
import { useStore } from "../../stores/index";
import { Dialog } from "vant";
import { setStorage } from "../../utils/index";

const router = useRouter();
const store = useStore();
const email = ref("");
const password = ref("");

const doLogin = async (values: ILoginValue) => {
  const result = await store.handleLogin(values);
  console.log(result);
  const { code, data } = result;
  if (code === 200 && data.token) {
    Dialog.alert({
      title: "提示",
      message: "登录成功",
    }).then(() => {
      // on close
      setStorage("token", data.token);
      router.push({
        path: "/list",
        query: {
          page: 1,
          pageSize: 20,
        },
      });
    });
  }
};
const onSubmit = (values: ILoginValue) => {
  console.log("submit", values);
  doLogin(values);
};
</script>

<style lang="less" scoped>
.title {
  margin-top: 30px;
  font-size: 28px;
  text-align: center;
  margin-bottom: 20px;
}

.center {
  display: block;
  text-align: center;
  text-decoration: underline;
}
</style>
