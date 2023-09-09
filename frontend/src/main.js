import { createApp } from 'vue';
import App from './App.vue';
import router from './router';  // Ensure you imported the router

createApp(App).use(router).mount('#app');  // Ensure .use(router) is here
