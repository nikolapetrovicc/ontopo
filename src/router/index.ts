import { createRouter, createWebHistory } from 'vue-router';
import SearchPage from '../views/SearchPage.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'Home',
            redirect: '/search',
        },
        {
            path: '/search',
            name: 'Search',
            component: SearchPage,
        },
    ],
});

export default router;