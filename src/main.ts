import { createApp } from 'vue'
import { createPinia } from 'pinia'
// 1. 引入你需要的组件
import vant from 'vant';

// 2. 引入组件样式
import 'vant/lib/index.css';

import App from './App.vue'
import router from './router'

import './assets/reset.css'

const app = createApp(App)

app.use(createPinia())

app.use(router)

vant.install(app);
// app.use(Button)

app.mount('#app')
