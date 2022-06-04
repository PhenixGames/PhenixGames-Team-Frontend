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
    getApply: (req, bid, cb) => {
        let query = (req) ? `?q=${req}`: `?q=${req}&bid=${bid}`;
        axios.get(applyGetRoute + query,  {
            headers: {
                "Content-type": "application/json",
                'x-access-token': `${localStorage.getItem(config.keyStorageName)}`,
                'Cache-control': "no-cache"
            },
            withCredentials: true
        }).then((response) => {
            return cb(response);
        }).catch((err) => {
            return cb(err);
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