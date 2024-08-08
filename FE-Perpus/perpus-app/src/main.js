import '@/assets/main.css'
import '@/css/app.css'
import 'swiper/css'
import 'swiper/swiper-bundle.css'
import 'vue3-toastify/dist/index.css'

import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)
const pinia = createPinia()

app.use(router)
app.use(pinia)
pinia.use(({ store }) => {
  store.router = markRaw(router)
})

app.mount('#app')
