import { createRouter, createWebHistory } from 'vue-router';
import AppSnake from './views/AppSnake.vue';
import MainPage from './views/MainPage.vue'; 
import TikTakToe from './views/TikTakToe.vue';

// Define your routes
const routes = [
    {
        path: '/snake',
        component: AppSnake
    },
    {
        path: '/',
        component: MainPage
    },
    {
        path: '/tic-tac-toe',
        component: TikTakToe
    },

];

export default createRouter({
    history: createWebHistory(),
    routes
});
