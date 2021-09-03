import validator from 'validator';
import Errormessage from '../Errormessage/Errormessage';
import axios from 'axios';
import {getLang} from '../../config/txt/getLang';
import { getConfig } from '../config/getConfig';
const lang = getLang();
const config = getConfig.getConfig();

const getteaminfo = (process.env.NODE_ENV === 'production') ? 
                    `${process.env.VUE_APP_HTTP}${process.env.VUE_APP_BACKENDDOMAIN}/${config.routing.root.route}/api/${process.env.VUE_APP_APIV}/${config.routing.game.teaminfo.get.route}` 
                    : `../../api${config.routing.root.route}/${process.env.VUE_APP_APIV}${config.routing.game.teaminfo.get.route}`
const editteaminfo = (process.env.NODE_ENV === 'production') ? 
                    `${process.env.VUE_APP_HTTP}${process.env.VUE_APP_BACKENDDOMAIN}/${config.routing.root.route}/api/${process.env.VUE_APP_APIV}/${config.routing.game.teaminfo.edit.route}` 
                    : `../../api${config.routing.root.route}/${process.env.VUE_APP_APIV}${config.routing.game.teaminfo.edit.route}`



export default class Teaminfo {
    constructor(message) {
        this.message = message
    }
    checkMessage() {
        if(!this.checkEmpty()) {return false;}

        this.message = validator.escape(this.message);
        
        return true;
    }
    checkEmpty() {
        if(validator.isEmpty(this.message)) {
            let Error = new Errormessage(lang.teaminfo.teaminfomessage_empty, 1);
            Error.mountError();
            return false;
        }
        return true;
    }
    saveMessage(cb) {
        axios.post(editteaminfo, {
            teaminfo: this.message,
        }, {
            headers: {
                "Content-type": "application/json",
                'x-access-token': `${localStorage.getItem(config.keyStorageName)}`,
                'Cache-control': "no-cache"
            },
            withCredentials: true
        }).then((response) => {
            let Error = new Errormessage(response.data.code, 2);
            Error.mountError();
            return cb(true);
        }).catch(() => {
            let Error = new Errormessage(lang.errors.some_went_wrong + ' ' + lang.errors.tryagain, 2);
            Error.mountError();
            return;
        });
    }
    showTeamInfo(type, cb) {
        let url;
        if(type === true) {url = true} else {url = false}
        axios.get(getteaminfo+url, {
            headers: {
                "Content-type": "application/json",
                'Cache-control': "no-cache",
                'x-access-token': `${localStorage.getItem(config.keyStorageName)}`
            },
            withCredentials: true
        }).then((response) => {
            if(response.status === 204) {
                let Error = new Errormessage(lang.words.teaminfo + ': ' + lang.errors.nodata, 1);
                Error.mountError();
                return cb(false);
            }else {
                return cb(response);
            }
        }).catch(() => {
            let Error = new Errormessage(lang.errors.some_went_wrong + ' ' + lang.errors.tryagain, 2);
            Error.mountError();
            return cb(false);
        });
    }
    openCloseInfoHistory(val) {
        val.hideTeamInfo = !val.hideTeamInfo;
    }
}