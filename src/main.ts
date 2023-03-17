import { createApp } from "vue";
import { createPinia } from "pinia";
// 1. 引入你需要的组件
// import vant from "vant";
// 2. 引入组件样式
// import "vant/lib/index.css";

import App from "./App.vue";

// import router from "./router";

import Directives from "./js/directives";

// import "./assets/reset.css";

import microApps from "./config/sub_app";

import { registerMicroApps, start, setDefaultMountApp } from "qiankun";

// 注册应用
registerMicroApps(microApps);

//设置默认进入的子应用
setDefaultMountApp("/child-one");

// 启动
start();

const app = createApp(App);

app.use(createPinia());

// app.use(router);

app.use(Directives);

// vant.install(app);
// app.use(Button)

app.mount("#app-base");
