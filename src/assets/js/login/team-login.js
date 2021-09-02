import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { getConfig } from '../config/getConfig';
const config = getConfig.getConfig()

const tmloginroute = (process.env.NODE_ENV === 'production') ? 
                    `${process.env.VUE_APP_HTTP}${process.env.VUE_APP_BACKENDDOMAIN}/${config.routing.root.route}/api/${process.env.VUE_APP_APIV}/${config.routing.signin.route}` 
                    : `../../api${config.routing.root.route}/${process.env.VUE_APP_APIV}${config.routing.signin.route}`


export const tmlogin = {
    tmlogin: (teamid, password, cb) => {
        axios.post(tmloginroute, {
            teamid: teamid,
            password: password
        }, {
            headers: {
                "Content-type": "application/json",
                'Cache-control': "no-cache"
            },
            withCredentials: true
        }).then((response) => {
            let s = jwt_decode(response.data);
            if(response) {
                localStorage.setItem('authkey', response.data);
            }
            return cb(response);
        }).catch((error) => {
            return cb(error);
        });
    }
}
