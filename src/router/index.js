import teamconfig from '../../config-team.json';
import {createRouter, createWebHistory} from 'vue-router';

const routes = [
    {
        path: teamconfig.routing.root.route + teamconfig.routing.home.route,
        name: teamconfig.routing.home.name,
        component: () => import ('../views/Team-home.vue')
    },
    {
        path: teamconfig.routing.root.route + teamconfig.routing.signin.route,
        name: teamconfig.routing.signin.name,
        component: () => import ('../views/login/Team-login.vue')
    },
    {
        path: teamconfig.routing.root.route + teamconfig.routing.logout.route,
        name: teamconfig.routing.logout.name,
        component: () => import ('../views/login/Team-logout.vue')
    },
    {
        path: teamconfig.routing.root.route + teamconfig.routing.game.player.viewplayer.route,
        name: teamconfig.routing.game.player.name,
        component: () => import ('../views/Team-player.vue')
    },
    {
        path: teamconfig.routing.root.route + teamconfig.routing.game.vehicle.viewvehicle.route,
        name: teamconfig.routing.game.vehicle.name,
        component: () => import ('../views/Team-vehicle.vue')
    },
    {
        path: teamconfig.routing.root.route + teamconfig.routing.game.forum.viewforum.route,
        name: teamconfig.routing.game.forum.name,
        component: () => import ('../views/Team-home.vue')
    }
]

const router = createRouter({
    history: createWebHistory(teamconfig.frontend.baseURL),
    routes
})

export default router