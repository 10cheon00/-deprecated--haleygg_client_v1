import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { VuesticPlugin } from 'vuestic-ui'
import 'vuestic-ui/dist/vuestic-ui.css'

import getCustomVuesticConfig from '@/plugins/custom-vuestic-config.js'

createApp(App).use(router).use(VuesticPlugin,getCustomVuesticConfig()).mount('#app')