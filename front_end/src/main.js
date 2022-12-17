import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@fortawesome/fontawesome-free/css/all.min.css'
import './assets/style.css'

import { createStore } from 'vuex'
import storeConfig from './store'
const store = createStore(storeConfig)

createApp(App)
    .use(store)
    .use(router)
    .mount('#app')
