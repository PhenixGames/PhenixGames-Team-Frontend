import teamconfig from '../../config-team.json';
import {createRouter, createWebHistory} from 'vue-router';

const routes = [
    {
        path: teamconfig.routing.root + teamconfig.routing.home.route,
        name: teamconfig.routing.home.name,
        component: () => import ('../views/Team-home.vue')
    },
    {
        path: teamconfig.routing.root + teamconfig.routing.signin.route,
        name: teamconfig.routing.signin.name,
        component: () => import ('../views/login/Team-login.vue')
    }
]

const router = createRouter({
    history: createWebHistory(config.frontend.baseURL),
    routes
})

export default router