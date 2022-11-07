import type { App } from "vue";
import permission from "./permission";
import draggable from "./draggable";
import waterMarker from "./waterMarker";
import safeWaterMarker from "./safeWaterMarker";
import lazy from "./lazy";
// 自定义指令
const directives: any = {
  draggable,
  permission,
  waterMarker,
  safeWaterMarker,
  lazy,
};

export default {
  install: function (app: App<Element>) {
    Object.keys(directives).forEach((key) => {
      // 注册所有自定义指令
      app.directive(key, directives[key]);
    });
  },
};

/**
 * vue2 和 vue 3中 自定义指令 不同的方法
 */
// 2.X
// bind：指令绑定到元素后调用。只调用一次。
// inserted：元素插入父 DOM 后调用。
// update：当元素更新，但子元素尚未更新时，将调用此钩子。
// componentUpdated：一旦组件和子级被更新，就会调用这个钩子。
// unbind：一旦指令被移除，就会调用这个钩子。也只调用一次。

// 3.X
// created - 新增！在元素的 attribute 或事件监听器被应用之前调用。
// bind → beforeMount
// inserted → mounted
// beforeUpdate：新增！在元素本身被更新之前调用，与组件的生命周期钩子十分相似。
// update → 移除！该钩子与 updated 有太多相似之处，因此它是多余的。请改用 updated。
// componentUpdated → updated
// beforeUnmount：新增！与组件的生命周期钩子类似，它将在元素被卸载之前调用。
// unbind -> unmounted
