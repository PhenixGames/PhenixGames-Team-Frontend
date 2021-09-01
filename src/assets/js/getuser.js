import axios from 'axios';
import { getConfig } from './config/getConfig';
const config = getConfig.getConfig();

const getuserroute = (process.env.NODE_ENV === 'production') ? 
                    `${process.env.VUE_APP_HTTP}${process.env.VUE_APP_BACKENDDOMAIN}/${config.routing.root.route}/api/${process.env.VUE_APP_APIV}/${config.routing.getuser}` 
                    : `../../api${config.routing.root.route}/${process.env.VUE_APP_APIV}${config.routing.getuser}`


export const getuser = {
    getuser: (cb) => {
        axios.get(getuserroute, {
            headers: {
                "Content-type": "application/json",
                'Cache-control': "no-cache"
            },
            withCredentials: true
        }).then((response) => {
            cb(response);
        }).catch((err) => {
            cb(err);
        });
    },
}