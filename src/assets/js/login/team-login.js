import axios from 'axios';
import tmconfig from '../../../../config-team.json';

export const tmlogin = {
    tmlogin: (teamid, password, cb) => {
        axios.post('../api' + tmconfig.routing.root.route + tmconfig.routing.signin.route, {
            teamid: teamid,
            password: password
        }, {
            headers: {
                "Content-type": "application/json",
                //"Authorization": `Bearer ${process.env.VUE_APP_AUTHTOKEN}`,
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
