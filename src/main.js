import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

// CSS
import './assets/css/main.css'

// Font Awesome
const fontAwesomeCDN = document.createElement('link')
fontAwesomeCDN.rel = 'stylesheet'
fontAwesomeCDN.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css'
document.head.appendChild(fontAwesomeCDN)

// Google Fonts
const googleFonts = document.createElement('link')
googleFonts.href = 'https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&display=swap'
googleFonts.rel = 'stylesheet'
document.head.appendChild(googleFonts)

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

app.mount('#app')