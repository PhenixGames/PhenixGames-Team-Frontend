import validator from 'validator';
import Errormessage from '../Errormessage/Errormessage';
import axios from 'axios';
import {getLang} from '../../config/txt/getLang';
const lang = getLang();

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
            let Error = new Errormessage('Kann nicht leer sein', 1);
            Error.mountError();
            return false;
        }
        return true;
    }
    saveMessage(cb) {
        axios.post('../../api/team/setteaminfo', {
            teaminfo: this.message,
        }, {
            headers: {
                "Content-type": "application/json",
                //"Authorization": `Bearer ${process.env.VUE_APP_AUTHTOKEN}`,
                'Cache-control': "no-cache"
            },
            withCredentials: true
        }).then((response) => {
            let Error = new Errormessage('Geschafft', 2);
            Error.mountError();
            return cb(true);
        }).catch((error) => {
            let Error = new Errormessage(lang.errors.some_went_wrong + ' ' + lang.errors.tryagain, 2);
            Error.mountError();
            return;
        });
    }
    showTeamInfo(type, cb) {
        let url;
        if(type === true) {url = true} else {url = false}
        axios.get('../../api/team/getteaminfo?q='+url, {
            headers: {
                "Content-type": "application/json",
                //"Authorization": `Bearer ${process.env.VUE_APP_AUTHTOKEN}`,
                'Cache-control': "no-cache"
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
        }).catch((e) => {
            let Error = new Errormessage(lang.errors.some_went_wrong + ' ' + lang.errors.tryagain, 2);
            Error.mountError();
            return cb(false);
        });
    }
    openCloseInfoHistory(val) {
        val.hideTeamInfo = !val.hideTeamInfo;
    }
}