<template>
    <section class="col player_section">
        <header class="left display-flex width-100">
            <div class="tab left center welcome">
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
            <div>
                <a href="#">
                    <div class="tab center cursor-pointer " id="showrp">
                        <span class="fsize-1-5">{{lang.words.roleplay}}</span>
                    </div>
                </a>
                <a href="#">
                    <div class="tab center cursor-no-drop " id="showgw">
                        <span class="fsize-1-5">{{lang.words.gangwar}}</span>
                    </div>
                </a>
            </div>
            <div class="tab left playerlist">
                <table cellpadding="50" >
                    <thead class="big">
                        <tr class="user-select-none">
                            <th>{{lang.words.offline.up}}/{{lang.words.online.up}}</th>
                            <th>{{lang.words.playerid}}</th>
                            <th>{{lang.words.rockstarname}}</th>
                            <th>{{lang.words.server}}</th>
                            <th>{{lang.words.status}}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in player" @click="selectPlayer(item.pid)" :class="(selectedPid === item.pid) ? 'player_selected' : ''">
                            <th class="user-select-none">Offline</th>
                            <th>{{item.pid}}</th>
                            <th translate="no" :class="(item.VIP)? 'vip' : '' ">{{item.Rkg_name}}</th>
                            <th class="user-select-none">Roleplay</th>
                            <th class="banned"> {{item.banned}}</th>
                        </tr>
                        <!-- <tr>
                            <th colspan="5">
                                <span class="red big bold">Nix hier</span>
                            </th>
                        </tr> -->
                    </tbody>
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
            pl_length: [],
            selectedPid: '',
            onlineplayer: '',
            offlineplayer: '',
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
            player.editPlayer(pid, type, (response) => {
                if(response.data) {
                    alert(pid + ' erfolgreich geändert')
                }
                alert('ERROR ' + response.data)
            });
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