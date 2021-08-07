import axios from 'axios';
import {getConfig} from '../../config/getConfig';
const config = getConfig.getConfig();

export const logout = {
    logout: (cb) => {
        axios.post('../api' + config.routing.root.route + config.routing.logout.route, {
            headers: {
                "Content-type": "application/json"
            },
            withCredentials: true
        }).then((response) => {
            return cb(response);
        }).catch((error) => {
            return cb(error.response.data);
        })
    }
}