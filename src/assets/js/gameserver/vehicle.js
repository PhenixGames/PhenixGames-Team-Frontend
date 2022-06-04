import axios from "axios"

import { getConfig } from '../config/getConfig';
const config = getConfig.getConfig()

const getvehicleroute = (process.env.NODE_ENV === 'production') ? 
                    `${process.env.VUE_APP_HTTP}${process.env.VUE_APP_BACKENDDOMAIN}/${config.routing.root.route}/api/${process.env.VUE_APP_APIV}/${config.routing.game.vehicle.view.route}` 
                    : `../../api${config.routing.root.route}/${process.env.VUE_APP_APIV}${config.routing.game.vehicle.view.route}`

const editvehicleroute = (process.env.NODE_ENV === 'production') ? 
                    `${process.env.VUE_APP_HTTP}${process.env.VUE_APP_BACKENDDOMAIN}/${config.routing.root.route}/api/${process.env.VUE_APP_APIV}/${config.routing.game.vehicle.edit.route}` 
                    : `../../api${config.routing.root.route}/${process.env.VUE_APP_APIV}${config.routing.game.vehicle.edit.route}`

const getoneroute = (process.env.NODE_ENV === 'production') ? 
                    `${process.env.VUE_APP_HTTP}${process.env.VUE_APP_BACKENDDOMAIN}/${config.routing.root.route}/api/${process.env.VUE_APP_APIV}/${config.routing.game.vehicle.getone.route}` 
                    : `../../api${config.routing.root.route}/${process.env.VUE_APP_APIV}${config.routing.game.vehicle.getone.route}`


const vehicle = {
    get: (cb) => {
        axios.get(getvehicleroute, {
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
    edit: (vid, type, cb) => {
        if(!vid) {
            return cb(false);
        }
        axios.put(editvehicleroute, {
            vid: vid,
            type: type,
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
    getOne: (vid, cb) => {
        if(!vid) {
            return cb(false);
        }
        axios.get(`${getoneroute}${vid}`, {
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
    vehicle
}