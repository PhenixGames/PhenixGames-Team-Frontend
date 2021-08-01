import axios from 'axios';
import tmconfig from '../../../../config-team.json';

export const tmlogin = {
    tmlogin: (cb) => {
        axios.post(tmconfig.routing.root.route + tmconfig.routing.login.route, {
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${process.env.VUE_APP_AUTHTOKEN}`,
                    'Cache-control': "no-cache"
                },
                withCredentials: true
        }).then((response) => {
            return cb(response);
        }).catch((error) => {
            return cb(error);
        });
    }
}