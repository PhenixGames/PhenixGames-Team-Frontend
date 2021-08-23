import axios from 'axios';
import { getLang } from '../../config/txt/getLang';
import { getConfig } from '../config/getConfig';

const config = getConfig.getConfig();
const lang = getLang();

const getplayerroute = (process.env.NODE_ENV === 'production') ? 
                    `${process.env.VUE_APP_HTTP}${process.env.VUE_APP_BACKENDDOMAIN}/${config.routing.root.route}/api/${process.env.VUE_APP_APIV}/${config.routing.game.player.view.route}` 
                    : `../../api${config.routing.root.route}/${process.env.VUE_APP_APIV}${config.routing.game.player.viewplayer.route}`

const editplayerroute = (process.env.NODE_ENV === 'production') ? 
                    `${process.env.VUE_APP_HTTP}${process.env.VUE_APP_BACKENDDOMAIN}/${config.routing.root.route}/api/${process.env.VUE_APP_APIV}/${config.routing.game.player.edit.route}` 
                    : `../../api${config.routing.root.route}/${process.env.VUE_APP_APIV}${config.routing.game.player.editplayer.route}`

const getplayerdataroute = (process.env.NODE_ENV === 'production') ? 
                    `${process.env.VUE_APP_HTTP}${process.env.VUE_APP_BACKENDDOMAIN}/${config.routing.root.route}/api/${process.env.VUE_APP_APIV}/${config.routing.game.player.get.route}` 
                    : `../../api${config.routing.root.route}/${process.env.VUE_APP_APIV}${config.routing.game.player.get.route}`


const player = {
    getPlayer: (cb) => {
        axios.get(getplayerroute, {
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
        axios.post(editplayerroute, {
            pid: pid,
            type: type
        }, {
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

    getPlayerData: (pid, cb) => {
        axios.get(`${getplayerdataroute}${pid}`, {
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

    showMorePlayerDetails(div, btn, divclass) {
        function toggleClass(div, divclass) {
            div.classList.toggle(divclass);
        }
        function setTxt(div, btn, divclass) {
            if(div.classList == divclass) {
                btn.innerHTML = lang.player.lessbtn;
            }else {
                btn.innerHTML = lang.player.morebtn;
            }
        }
        toggleClass(div, divclass);
        setTxt(div, btn, divclass);
        return;
    },
    
    insertMorePlayerData(v, data) {
        v.cid = data.cid;
        v.firstname = data.first_name;
        v.lastname = data.last_name;
        v.vehicles = data.vehicles;
        v.p_x = data.p_x;
        v.p_y = data.p_y;
        v.p_z = data.p_z;
        v.dim = data.dim;
        v.hp = data.HP;
        v.armor = data.Armor;
        v.height = data.Größe;
        v.age = data.age;
        v.fraction = data.Fraktion;
        v.pnumber = data.PNummer;
        v.phonenumber = data.Phone_Number;
        v.gender = data.gender;
        v.hunger = data.hunger;
        v.thirst = data.thirst;
    }
}

export {
    player
}