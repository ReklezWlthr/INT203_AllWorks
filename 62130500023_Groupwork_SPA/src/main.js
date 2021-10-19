import { createApp } from 'vue'
import App from './App.vue'
import router from './routers'
import EditForm from './components/EditForm.vue'
import './assets/tailwind.css'

createApp(App).use(router).component('edit-form', EditForm).mount('#app')
