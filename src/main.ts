import { createApp } from 'vue'
import naive from 'naive-ui';
import App from './App.vue'
import router from './router/index'


createApp(App).use(router).use(naive).mount('#app')
