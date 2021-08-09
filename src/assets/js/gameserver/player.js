import axios from 'axios';

const player = {
    getPlayer: (cb) => {
        axios.get(`../../api/team/getplayer`, {
            headers: {
                "Content-type": "application/json",
                // "Authorization": `Bearer ${process.env.VUE_APP_AUTHTOKEN}`,
                'Cache-control': "no-cache"
            },
            withCredentials: true
        }).then((response) => {
            cb(response);
        }).catch((err) => {
            cb(err);
        });
    },
    /**
    * @param 0 = respawn
    * @param 1 = support
    * @param 2 = bannen
    * @param 3 = info
    */
    editPlayer: (pid, type, cb) => { //
        axios.post(`../../api/team/editplayer`, {
            pid: pid,
            type: type
        },{
            headers: {
                "Content-type": "application/json",
                // "Authorization": `Bearer ${process.env.VUE_APP_AUTHTOKEN}`,
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
    player
}
