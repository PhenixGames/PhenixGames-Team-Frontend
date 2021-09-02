import axios from 'axios';
import {getConfig} from '../../config/getConfig';
const config = getConfig.getConfig();

const logoutroute = (process.env.NODE_ENV === 'production') ? 
                    `${process.env.VUE_APP_HTTP}${process.env.VUE_APP_BACKENDDOMAIN}/${config.routing.root.route}/api/${process.env.VUE_APP_APIV}/${config.routing.logout.route}` 
                    : `../../api${config.routing.root.route}/${process.env.VUE_APP_APIV}${config.routing.logout.route}`

export const logout = {
    logout: (cb) => {
        axios.post(logoutroute, {
            headers: {
                "Content-type": "application/json",
                'x-access-token': `${localStorage.getItem('authkey')}`
            },
            withCredentials: true
        }).then((response) => {
            return cb(response);
        }).catch((error) => {
            return cb(error.response.data);
        })
    }
}