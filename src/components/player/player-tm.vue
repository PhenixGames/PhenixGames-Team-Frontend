<template>
    <section class="col player_section">
        <header class="left display-flex width-100">
            <div class="tab left center site_name">
                <span class="fsize-4 ">{{lang.words.playerlist}}</span>
            </div>
            <div style="width: 400px;">
                <div class="tab center">
                    <span class="fsize-1-5">{{lang.words.online.up}}: <span id="p_online">{{onlineplayer}}</span></span>
                </div>
                <div class="tab center">
                    <span class="fsize-1-5">{{lang.words.offline.up}}: <span id="p_offline">{{offlineplayer}}</span></span>
                </div>
            </div>
        </header>
        <main>
            <div class="tab left playerlist">
                <table cellpadding="50" >
                    <thead class="big">
                        <tr class="user-select-none">
                            <th>{{lang.words.offline.up}}/{{lang.words.online.up}}</th>
                            <th>{{lang.words.playerid}}</th>
                            <th>{{lang.words.rockstarname}}</th>
                            <th>{{lang.words.status}}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in player" @click="selectPlayer(item.pid)" :class="(selectedPid === item.pid) ? 'player_selected' : ''">
                            <th :class="(item.online) ? 'user-select-none online' : 'user-select-none offline'">{{(item.online) ? 'Online' : 'Offline'}}</th>
                            <th>{{item.pid}}</th>
                            <th translate="no" :class="(item.VIP) ? 'vip' : '' ">{{item.Rkg_name}}</th>
                            <th :class="(item.banned) ? 'banned' : 'not_banned' "> {{item.banned}}</th>
                        </tr>
                        <tr v-if="!player">
                            <th colspan="4">
                                <span class="red big bold">{{lang.player.playernotfound}}</span>
                            </th>
                        </tr>
                    </tbody>
                </table>
                <table class="player_infotable">
                    <thead>
                        <tr>
                            <th class="text-deco-underline cursor-pointer" @click="closeMorePlayerDetails()">{{lang.words.close}}</th>
                            <th colspan="99"><h1 class="center">{{lang.words.playerinfo}}: {{morePlayerData.firstname}} {{morePlayerData.lastname}}</h1></th>
                        </tr>
                        <tr>
                            <th :title="lang.words.cid">cid</th>
                            <th>{{lang.words.firstname}}</th>
                            <th>{{lang.words.lastname}}</th>
                            <th>{{lang.player.haveCars}}</th>
                            <th>{{lang.words.lastlocation}}</th>
                            <th translate="no">HP</th>
                            <th>{{lang.words.dimension}}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>{{morePlayerData.cid}}</th>
                            <th>{{morePlayerData.firstname}}</th>
                            <th>{{morePlayerData.lastname}}</th>
                            <th>{{morePlayerData.vehicles}}</th>
                            <th>X: {{morePlayerData.p_x}}, Y: {{morePlayerData.p_y}}, Z: {{morePlayerData.p_z}}</th>
                            <th>{{morePlayerData.hp}}</th>
                            <th>{{morePlayerData.dim}}</th>
                        </tr>
                        <tr>
                            <th colspan="99" class="cursor-pointer show_more_details" @click="showMorePlayerDetails()">{{lang.player.morebtn}}</th>
                        </tr>
                        <tr>
                            <th colspan="99"><div></div></th>
                        </tr>
                    </tbody>
                    <tfoot class="">
                            <tr style="color: var(--organgenav);">
                                <th>{{lang.words.armor}}</th>
                                <th>{{lang.words.height}}</th>
                                <th>{{lang.words.age}}</th>
                                <th>{{lang.words.fraction}}</th>
                                <th>{{lang.words.pnumber}}</th>
                                <th>{{lang.words.phonenumber}}</th>
                                <th>{{lang.words.gender}}</th>
                                <th>{{lang.words.hunger}}</th>
                                <th>{{lang.words.thirst}}</th>
                            </tr>
                            <tr>
                                <th>{{morePlayerData.armor}}</th>
                                <th>{{morePlayerData.height}}</th>
                                <th>{{morePlayerData.age}}</th>
                                <th>{{morePlayerData.fraction}}</th>
                                <th>{{morePlayerData.pnumber}}</th>
                                <th>{{morePlayerData.phonenumber}}</th>
                                <th>{{morePlayerData.gender}}</th>
                                <th>{{morePlayerData.hunger}}</th>
                                <th>{{morePlayerData.thirst}}</th>
                            </tr>
                    </tfoot>
                </table>
            </div>
            <!-- Respawn, Ts Support Bannen Info  -->
            <div class="int_btn_menu fixed">
                <input type="checkbox" id="open_int_menu_checkbox" class="display-none"/>
                <div class="int_btn_main_menu">
                    <div :class="(selectedPid) ? 'int_btn int_btn_ts' : ' int_btn int_btn_ts cursor-no-drop'" :data-pid="selectedPid">
                        <img src="../../assets/img/icons/repeat_respawn.png" class="right" @click="editP(selectedPid, 0)"/>
                        <span class="tip white bold">{{lang.words.respawn}}</span>
                    </div>
                    <div :class="(selectedPid) ? 'int_btn int_btn_ts' : ' int_btn int_btn_ts cursor-no-drop'" :data-pid="selectedPid">
                        <img src="../../assets/img/icons/support.png" class="right" @click="editP(selectedPid, 1)"/>
                        <span class="tip white bold">Ts&nbsp;{{lang.words.support.up}}</span>
                    </div>
                    <div :class="(selectedPid) ? 'int_btn int_btn_ts' : ' int_btn int_btn_ts cursor-no-drop'" :data-pid="selectedPid">
                        <img src="../../assets/img/icons/banned.png" class="right" @click="editP(selectedPid, 2)"/>
                        <span class="tip white bold">{{lang.words.ban.more}}</span>
                    </div>
                    <div :class="(selectedPid) ? 'int_btn int_btn_ts' : ' int_btn int_btn_ts cursor-no-drop'" :data-pid="selectedPid">
                        <img src="../../assets/img/icons/more-info.png" class="right" @click="editP(selectedPid, 3)"/>
                        <span class="tip white bold">{{lang.words.infos.short.one.up}}</span>
                    </div>
                </div>
                <label for="open_int_menu_checkbox">
                    <div class="open_int_menu right cursor-pointer">
                        <img src="../../assets/img/icons/more.png" class="right"/>
                    </div>
                </label>
            </div>
        </main>
    </section>
</template>

<script>
import { getLang } from '../../assets/config/txt/getLang'
import { getConfig } from '../../assets/js/config/getConfig';
import { player } from '../../assets/js/gameserver/player';

const config = getConfig.getConfig();
const lang = getLang();

export default {
    name: config.routing.game.player.viewplayer.name,
    data: () => {
        return {
            lang: lang,
            player: [],
            selectedPid: '',
            onlineplayer: '',
            offlineplayer: '',
            morePlayerData: {
                cid: '',
                firstname: '',
                lastname: '',
                vehicles: '',
                p_x: '',
                p_y: '',
                p_z: '',
                dim: '',
                hp: '',
                armor: '',
                height: '',
                age: '',
                fraction: '',
                pnumber: '',
                phonenumber: '',
                gender: '',
                hunger: '',
                thirst: '',
            }
        }
    },
    methods: {
        selectPlayer(pid) {
            if(this.selectedPid == pid) {
                this.selectedPid = ''
                return;
            }
            this.selectedPid = pid
        },
        /**
         * @param 0 = respawn
         * @param 1 = support
         * @param 2 = bannen
         * @param 3 = info
         */
        editP(pid, type) {
            if(type !== 3) {
                player.editPlayer(pid, type, (response) => {
                    if(response.data) {
                        alert(pid + ' erfolgreich geändert');
                        return;
                    }
                    alert('ERROR ' + response.data);
                    return;
                });
            }else {
                player.getPlayerData(pid, (response) => {
                    if(response.data) {
                        player.insertMorePlayerData(this.morePlayerData, response.data[0]);
                        document.querySelector('.player_infotable').classList.add('player_infotable_active')
                        return;
                    }
                    alert('ERROR ' + response.data)
                    return;
                });
            }
        },
        showMorePlayerDetails() {
            let div = document.querySelector('.player_infotable > tfoot:nth-child(3)');
            let btn = document.querySelector('.show_more_details');
            let divclass = 'player_tfoot_active';
            player.showMorePlayerDetails(div, btn, divclass);
        },
        closeMorePlayerDetails() {
            document.querySelector('.player_infotable').classList.remove('player_infotable_active');
            document.querySelector('.player_infotable > tfoot:nth-child(3)').classList.remove('player_tfoot_active');
            return;
        }
    },
    async beforeCreate() {
        await player.getPlayer((response) => {  
            var onlineplayer = 0;
            var offlineplayer = 0; 
            for(let i = 0; i < response.data.length; i++ ) {    
                this.player.push(response.data[i]);
                (response.data[i].online) ? onlineplayer++ : offlineplayer++;
            }
            this.onlineplayer = onlineplayer;
            this.offlineplayer = offlineplayer
        });
    }
}
</script>