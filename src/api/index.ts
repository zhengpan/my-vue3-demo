
import type { IRegisterValue,ILoginValue,IList,IAdd,IDelete,IPage } from '../types/index'

import server from '../utils/request.js'
// 登录
export const login = (payload: ILoginValue) => {
  // return server.post('/login',payload).then(res => res.data);
  return server.post('/user/login',payload).then(res => res.data);
}
// 注册
export const register = (payload:IRegisterValue) => {
  return server.post('/user/register',payload).then(res => res.data);
}

//增加商品
export const goodsAdd = (payload:IAdd) => {
  return server.post('/goods/add',payload).then(res => res.data);
}
//删除商品
export const goodsDelete = (payload:IDelete) => {
  return server.post('/goods/delete',payload).then(res => res.data);
}
//查询商品列表
export const goodsList = (payload:IPage) => {
  return server.post('/goods/list',payload).then(res => res.data);
}
//修改商品
export const goodsModify = (payload:IAdd) => {
  return server.post('/goods/modify',payload).then(res => res.data);
}
//查询商品详情
export const goodsDetail = (payload:IDelete) => {
  return server.get('/goods/detail', {params:payload}).then(res => res.data);
}
// 获取用户列表
export const getUserList = (query: IList) => server.get('/user/list',{params:query}).then(res => res.data)