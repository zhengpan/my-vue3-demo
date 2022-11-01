import type { Directive, DirectiveBinding } from "vue";

function checkArray(key:string) {
  let arr = ['1', '2', '3', '4']
  let index = arr.indexOf(key)
  if (index > -1) {
    return true // 有权限
  } else {
    return false // 无权限
  }
}
const permission:Directive = {
  mounted(el, binding: DirectiveBinding) {
    // 下面会介绍各个参数的细节
    let permission = binding.value // 获取到v-permission的值

    if (permission) {
      let hashPermission = checkArray(permission);
      if (!hashPermission) {
        // 没有权限移除dom元素
        el.parentNode && el.parentNode.removeChild(el);
      }
    }
  },
}

export default permission