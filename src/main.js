import './assets/styles/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router' // 確保 router/index.js 存在
import 'virtual:svg-icons-register' // 這是給 SvgIcon 用的

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')