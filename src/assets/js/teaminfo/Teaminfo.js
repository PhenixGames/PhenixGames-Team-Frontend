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
    showTeamInfo(cb) {
        axios.get('../../api/team/getteaminfo', {
            headers: {
                "Content-type": "application/json",
                //"Authorization": `Bearer ${process.env.VUE_APP_AUTHTOKEN}`,
                'Cache-control': "no-cache"
            },
            withCredentials: true
        }).then((response) => {
            return cb(response);
        }).catch(() => {
            let Error = new Errormessage(lang.errors.some_went_wrong + ' ' + lang.errors.tryagain, 2);
            Error.mountError();
            return;
        });
    }
}