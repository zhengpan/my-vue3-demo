
import type { App } from "vue";
import permission from './permission'
import draggable from './draggable'
import waterMarker from './waterMarker'
import safeWaterMarker from './safeWaterMarker'
// 自定义指令
const directives: any = {
  draggable,
  permission,
  waterMarker,
  safeWaterMarker
}

export default {
  install:function (app:App<Element>) {
    Object.keys(directives).forEach(key => {
      // 注册所有自定义指令
      app.directive(key, directives[key])
    })
  }
}