<template>
  <div>
    <div class="title">welcome to register!</div>
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
          v-model="formValues.username"
          name="username"
          label="用户名"
          placeholder="请输入用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="formValues.password"
          type="password"
          name="password"
          label="密码"
          placeholder="请输入密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <van-field
          v-model="formValues.passwordConfirmation"
          type="password"
          name="passwordConfirmation"
          label="确认密码"
          placeholder="请再次输入密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <van-field
          v-model="formValues.email"
          name="email"
          label="邮箱"
          placeholder="请输入邮箱"
          :rules="[{ required: true, message: '请填写邮箱' }]"
        />
        <van-field
          v-model="formValues.phone"
          name="phone"
          label="手机号"
          placeholder="请输入手机号"
          :rules="[{ required: true, message: '请填写手机号' }]"
        />
      </van-cell-group>
      <div style="margin: 16px">
        <van-button round block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
  <RouterLink class="center" to="/login">已有账号，去登录</RouterLink>
</template>

<script setup lang="ts">
import { RouterLink, useRouter } from "vue-router";

import { reactive } from "vue";
import type { IRegisterValue } from "../../types/register";
import { useStore } from "../../stores/index";
import { Toast } from "vant";
const store = useStore();
const router = useRouter();
const formValues = reactive({
  username: "",
  password: "",
  passwordConfirmation: "",
  email: "",
  phone: "",
});

const doRegister = async (formValues: IRegisterValue) => {
  const { code } = await store.handleRegister(formValues);
  if (code === 200) {
    Toast("注册成功");
    router.push({
      path: "/login",
    });
  }
};
const onSubmit = (values: IRegisterValue) => {
  console.log("submit", values);
  doRegister(values);
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
