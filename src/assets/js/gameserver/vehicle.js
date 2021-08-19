import axios from "axios"

const vehicle = {
    get: (cb) => {
        axios.get(`../../api/team/getvehicle`, {
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
    edit: (vid, type, cb) => {
        if(!vid) {
            return cb(false);
        }
        axios.put(`../../api/team/editvehicle`, {
            vid: vid,
            type: type,
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
    getOne: (vid, cb) => {
        if(!vid) {
            return cb(false);
        }
        axios.get(`../../api/team/getvehicle?vid=${vid}`, {
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
    vehicle
}