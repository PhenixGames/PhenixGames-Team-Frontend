import teamconfig from '../../config-team.json';
import {createRouter, createWebHistory} from 'vue-router';
import {getuser} from '../assets/js/getuser';
import Errormessage from '../assets/js/Errormessage/Errormessage';
import {getLang} from '../assets/config/txt/getLang';
import { getConfig } from '../assets/js/config/getConfig';
const config = getConfig.getConfig();
const lang = getLang();
const routes = [
    {
        path: "/",
        redirect: teamconfig.routing.root.route + teamconfig.routing.home.route
    },
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
        path: teamconfig.routing.root.route + teamconfig.routing.game.player.view.route,
        name: teamconfig.routing.game.player.name,
        component: () => import ('../views/Team-player.vue')
    },
    {
        path: teamconfig.routing.root.route + teamconfig.routing.game.vehicle.view.route,
        name: teamconfig.routing.game.vehicle.name,
        component: () => import ('../views/Team-vehicle.vue')
    },
    {
        path: teamconfig.routing.root.route + teamconfig.routing.game.forum.view.route,
        name: teamconfig.routing.game.forum.name,
        component: () => import ('../views/Team-home.vue')
    },
    {
        path: teamconfig.routing.root.route + teamconfig.routing.game.apply.view.route,
        name: teamconfig.routing.game.apply.view.name,
        component: () => import ('../views/Team-apply.vue')
    }
];

const router = createRouter({
    history: createWebHistory(teamconfig.frontend.baseURL),
    routes
});

router.beforeEach((to, from, next) => {
    if(localStorage.getItem(config.keyStorageName)) {
        getuser.getuser((response) => {
            if(response.status === 200 || response.status === 204) {
                if(to.fullPath === teamconfig.routing.root.route + teamconfig.routing.signin.route && response.data) {
                    return next({
                        path: teamconfig.routing.root.route + teamconfig.routing.home.route
                    });
                }
                if(to.name !== teamconfig.routing.signin.name && !response.data) {
                    let Error = new Errormessage(lang.errors.notloggedin + ' ' + lang.errors.signinfirst, 1);
                    Error.mountError();

                    return next({
                        path: teamconfig.routing.root.route + teamconfig.routing.signin.route
                    });
                }
                return next();
            }else {
                let Error = new Errormessage(lang.errors.some_went_wrong + ' ' + lang.errors.tryagain, 1);
                Error.mountError();
                return next();
            }
        });
    }else {
        return next();
    }
});

export default router