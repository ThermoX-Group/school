import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { CkeditorPlugin } from '@ckeditor/ckeditor5-vue'
import AOS from 'aos'
import 'aos/dist/aos.css'
AOS.init()
const app = createApp(App)
app.use(router)
app.use(CkeditorPlugin)
app.mount('#app')