import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

import '@unocss/reset/tailwind.css'
import 'uno.css'
import 'plyr/dist/plyr.css'
import '@/assets/global.scss'

const app = createApp(App)
const pinia = createPinia()

app.use(router)
app.use(pinia)
app.mount('#app')
