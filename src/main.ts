import './assets/main.scss'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'
import 'primeicons/primeicons.css'

import 'primevue/resources/themes/lara-light-green/theme.css'
const app = createApp(App)
app.use(ToastService)
app.use(router)
app.use(PrimeVue)
app.mount('#app')
