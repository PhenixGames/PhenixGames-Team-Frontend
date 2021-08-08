import axios from 'axios';
import tmconfig from '../../../../config-team.json';

export const tmlogin = {
    tmlogin: (teamid, password, cb) => {
        axios.post('../api' + tmconfig.routing.root.route + tmconfig.routing.signin.route, {
            teamid: teamid,
            password: password
        }, {
            headers: {
                "Content-type": "application/json"
            },
            withCredentials: true
        }).then((response) => {
            return cb(response);
        }).catch((error) => {
            return cb(error);
        });
    }
}
