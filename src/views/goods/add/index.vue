

<template>
  <div>
    <div class="title">{{route.query._id?'商品详情':'添加商品'}}</div>
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field v-model="goodsName" clearable name="goodsName" cle label="商品名称" placeholder="商品名称"
          :rules="[{ required: true, message: '请填写商品名称' }]" />
        <van-field v-model="price" clearable name="price" label="商品价格" placeholder="商品价格"
          :rules="[{ required: true, message: '请填写商品价格' }]" />
      </van-cell-group>
      <div style="margin: 16px;">
        <van-button round block type="primary" native-type="submit">
          {{route.query._id?'修改':'添加'}}
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script setup lang="ts">
import { useRouter,useRoute } from 'vue-router'
import { ref,onMounted } from 'vue';
import type { IAdd,IModify } from '@/types/index'
import { useStore } from "@/stores/index";
import { goodsModify,goodsDetail } from '@/api'

const router = useRouter();
const route = useRoute();
const { _id } = route.query;

const store = useStore();
const goodsName = ref('');
const price = ref('');

const doAdd = async (values:IAdd) => {
  const result = await store.handleGoodsAdd(values);
  console.log(result);
  const { code } = result;
  if (code === 200) {
    router.push({
      path:'/goodsList'
    })
  }
}

const doModify = async (modifyValues:IModify) => {
  const result = await goodsModify(modifyValues);
  const { code } = result;
  if (code === 200) {
    router.push({
      path:'/goodsList'
    })
  }
}
const onSubmit = (values: IAdd) => {
  console.log('submit', values);
  if (_id) {
    doModify({ _id: _id as string, ...values })
  } else {
    doAdd(values)
  }
};

onMounted(() => {
  if (route.query._id) {  // 修改
    getInitData(route.query._id  as string);
  }
})

const getInitData = async (_id:string) => {
  const result = await goodsDetail({_id:_id});
  const { data, code } = result;
  if (code === 200) {
    goodsName.value = data.goodsName;
    price.value = data.price;
  }
}
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

