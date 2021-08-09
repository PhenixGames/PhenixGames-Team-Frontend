<template>
    <section class="col player_section">
        <header class="left display-flex width-100">
            <div class="tab left center welcome">
                <span class="fsize-4 ">{{lang.words.playerlist}}</span>
            </div>
            <div style="width: 400px;">
                <div class="tab center">
                    <span class="fsize-1-5">{{lang.words.online.up}}: <span id="p_online">12</span></span>
                </div>
                <div class="tab center">
                    <span class="fsize-1-5">{{lang.words.offline.up}}: <span id="p_offline">12</span></span>
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
                    <div class="tab center cursor-pointer " id="showgw">
                        <span class="fsize-1-5">{{lang.words.gangwar}}</span>
                    </div>
                </a>
            </div>
            <div class="tab left playerlist">
                <table cellpadding="50">
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
                        <tr>
                            <th class="online">Offline</th>
                            <th>12345</th>
                            <th translate="no">Test#123</th>
                            <th>Roleplay</th>
                            <th class="banned">banned</th>
                        </tr>
                        <tr>
                            <th colspan="6">
                                <span class="red big bold">Nix hier</span>
                            </th>
                        </tr>
                    </tbody>
                </table>
            </div>
            <!-- Respawn, Ts Support Bannen Info  -->
            <div class="int_btn_menu fixed">
                <input type="checkbox" id="open_int_menu_checkbox" class="display-none"/>
                <div class="int_btn_main_menu">
                    <div class="int_btn int_btn_respawn cursor-no-drop">
                        <img src="../../assets/img/icons/repeat_respawn.png" class="right"/>
                        <span class="tip">{{lang.words.respawn}}</span>
                    </div>
                    <div class="int_btn int_btn_ts cursor-no-drop">
                        <img src="../../assets/img/icons/support.png" class="right"/>
                        <span class="tip">Ts&nbsp;{{lang.words.support.up}}</span>
                    </div>
                    <div class="int_btn int_btn_ban cursor-no-drop">
                        <img src="../../assets/img/icons/banned.png" class="right"/>
                        <span class="tip">{{lang.words.ban.more}}</span>
                    </div>
                    <div class="int_btn int_btn_info cursor-no-drop">
                        <img src="../../assets/img/icons/more-info.png" class="right"/>
                        <span class="tip">{{lang.words.infos.short.one.up}}</span>
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

const config = getConfig.getConfig();
const lang = getLang();

export default {
    name: config.routing.game.player.viewplayer.name,
    data: () => {
        return {
            lang: lang
        }
    }
}
</script>