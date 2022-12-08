<template>
  <div>
    <div class="title" @click="handleClickCount">
      welcome to login!-->{{ loginStore.count }}
    </div>
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
import { ref, computed } from "vue";
import type { ILoginValue } from "../../types/index";
import { useStore } from "../../stores/index";
import { useLoginStore } from "@/stores/login";
import { Dialog } from "vant";
import { setStorage } from "../../utils/index";
import { mapState } from "pinia";

const router = useRouter();
const store = useStore();
const loginStore = useLoginStore();
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
        name: "GoodsList",
        query: {
          page: 1,
          pageSize: 20,
          apiName: "goodsList",
        },
      });
    });
  }
};
const onSubmit = (values: ILoginValue) => {
  console.log("submit", values);
  doLogin(values);
};

const handleClickCount = () => {
  loginStore.increment(5);
};
loginStore.$subscribe((mutation, state) => {
  console.log(mutation.type, mutation.storeId, mutation.events);
  console.log(state);
});

const threeNum = computed(() => {
  return loginStore.doublePlusOne * 3;
});

const unsubscribe = loginStore.$onAction(
  ({
    name, // action 名称
    store, // store 实例，类似 `someStore`
    args, // 传递给 action 的参数数组
    after, // 在 action 返回或解决后的钩子
    onError, // action 抛出或拒绝的钩子
  }) => {
    // 为这个特定的 action 调用提供一个共享变量
    const startTime = Date.now();
    // 这将在执行 "store "的 action 之前触发。
    console.log(`Start "${name}" with params [${args.join(", ")}].`);

    // 这将在 action 成功并完全运行后触发。
    // 它等待着任何返回的 promise
    after((result) => {
      console.log(
        `Finished "${name}" after ${
          Date.now() - startTime
        }ms.\nResult: ${result}.`
      );
    });

    // 如果 action 抛出或返回一个拒绝的 promise，这将触发
    onError((error) => {
      console.warn(
        `Failed "${name}" after ${Date.now() - startTime}ms.\nError: ${error}.`
      );
    });
  }
);
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
