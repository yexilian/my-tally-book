import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import i18n from './plugins/i18n'

// 全局引入 Vant
import Vant from 'vant'
import 'vant/lib/index.css'

const app = createApp(App)
app.use(router)
app.use(createPinia())
app.use(i18n)
app.use(Vant)        // 注册所有 Vant 组件
app.mount('#app')