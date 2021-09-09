import axios from 'axios';
import {
    getConfig
} from '../config/getConfig';

const config = getConfig.getConfig();

const applyGetRoute = (process.env.NODE_ENV === 'production') ?
    `${process.env.VUE_APP_HTTP}${process.env.VUE_APP_BACKENDDOMAIN}/${config.routing.root.route}/api/${process.env.VUE_APP_APIV}/${config.routing.game.apply.view.route}` :
    `../../api${config.routing.root.route}/${process.env.VUE_APP_APIV}${config.routing.game.apply.view.route}`;

const applyEditRoute = (process.env.NODE_ENV === 'production') ?
    `${process.env.VUE_APP_HTTP}${process.env.VUE_APP_BACKENDDOMAIN}/${config.routing.root.route}/api/${process.env.VUE_APP_APIV}/${config.routing.game.apply.edit.route}` :
    `../../api${config.routing.root.route}/${process.env.VUE_APP_APIV}${config.routing.game.apply.edit.route}`;


const apply = {
    getApply: (cb) => {
        axios.get(applyGetRoute, {
            headers: {
                "Content-type": "application/json",
                'x-access-token': `${localStorage.getItem(config.keyStorageName)}`,
                'Cache-control': "no-cache"
            },
            withCredentials: true
        }).then((response) => {
            cb(response);
        }).catch((err) => {
            cb(err);
        });
    },
    editApply: (type, bid, cb) => {
        axios.post(applyEditRoute, {
            bid: bid,
            type: type
        }, {
            headers: {
                "Content-type": "application/json",
                'x-access-token': `${localStorage.getItem(config.keyStorageName)}`,
                'Cache-control': "no-cache"
            },
            withCredentials: true
        }).then((response) => {
            cb(response);
        }).catch((err) => {
            cb(err);
        });
    }
}


export {
    apply
};