import axios from 'axios';

export const getuser = {
    getuser: (cb) => {
        axios.get("/api/team/getuser", {
            headers: {
                "Content-type": "application/json",
                //"Authorization": `Bearer ${process.env.VUE_APP_AUTHTOKEN}`,
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