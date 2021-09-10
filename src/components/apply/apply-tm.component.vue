<template>
    <section class="col apply_section">
        <header class="left display-flex width-100">
            <div class="tab left center site_name">
                <span class="fsize-4 ">{{lang.words.playerlist}}</span>
            </div>
            <div style="width: 400px;">
                <div class="tab center">
                    <span class="fsize-1-5">{{lang.words.applications}}: <span id="p_apply">{{applys}}</span></span>
                </div>
            </div>
        </header>
        <main>
            <div class="tab left applylist">
                <table cellpadding="50" >
                    <thead class="big">
                        <tr class="user-select-none">
                            <th>{{lang.words.status}}</th>
                            <th>ID</th>
                            <th>{{lang.words.applicant}}</th>
                            <th>{{lang.words.subject}}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in apply" @click="selectApply(item.bid)" :class="(selectedBid === item.bid) ? 'apply_selected' : ''">
                            <th>{{item.status}}</th>
                            <th>{{item.bid}}</th>
                            <th>{{item.bewerber}}</th>
                            <th>{{item.betreff}}</th>
                        </tr>
                        <tr v-if="apply == ''">
                            <th colspan="4">
                                <span class="red big bold">{{lang.player.playernotfound}}</span>
                            </th>
                        </tr>
                    </tbody>
                </table>
            </div>
            <!-- Anzeigen, Annehmen, Ablehnen, Löschen -->
            <div class="int_btn_menu fixed">
                <input type="checkbox" id="open_int_menu_checkbox" class="display-none"/>
                <div class="int_btn_main_menu">
                    <div :class="(selectedBid) ? 'int_btn int_btn_ts' : ' int_btn int_btn_ts cursor-no-drop'" :data-bid="selectedBid">
                        <img src="../../assets/img/icons/repeat_respawn.png" class="right" @click="editB(selectedBid, 0)"/>
                        <span class="tip white bold">{{lang.words.show.up}}</span>
                    </div>
                    <div :class="(selectedBid) ? 'int_btn int_btn_ts' : ' int_btn int_btn_ts cursor-no-drop'" :data-bid="selectedBid">
                        <img src="../../assets/img/icons/support.png" class="right" @click="editB(selectedBid, 1)"/>
                        <span class="tip white bold">{{lang.words.accept.up}}</span>
                    </div>
                    <div :class="(selectedBid) ? 'int_btn int_btn_ts' : ' int_btn int_btn_ts cursor-no-drop'" :data-bid="selectedBid">
                        <img src="../../assets/img/icons/banned.png" class="right" @click="editB(selectedBid, 2)"/>
                        <span class="tip white bold">{{lang.words.deny.up}}</span>
                    </div>
                    <div :class="(selectedBid) ? 'int_btn int_btn_ts' : ' int_btn int_btn_ts cursor-no-drop'" :data-bid="selectedBid">
                        <img src="../../assets/img/icons/more-info.png" class="right" @click="editB(selectedBid, 3)"/>
                        <span class="tip white bold">{{lang.words.delete}}</span>
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
import Errormessage from '../../assets/js/Errormessage/Errormessage';
import {apply} from '../../assets/js/gameserver/apply';

const config = getConfig.getConfig();
const lang = getLang();

export default {
    name: config.routing.game.player.view.name,
    data: () => {
        return {
            lang: lang,
            apply: [],
            selectedBid: '',
            applys: '',
        }
    },
    props: [
        "username",
        "teamid",
        "scname",
        "rank"
    ],
    methods: {
        selectApply(bid) {
            if(this.selectedBid == bid) {
                this.selectedBid = ''
                return;
            }
            this.selectedBid = bid
        },
        /**
         * @param 0 = Show
         * @param 1 = accept
         * @param 2 = deny
         * @param 3 = delete
         */
        editB(bid, type) {
            if(type !== 0) {
                apply.editApply(type, bid, (response) => {
                    console.log(response)
                });
            }else {
                apply.getApply(false, bid, (response) => {  
                    if(response.status === 200) {
                        alert(JSON.stringify(response.data.opt));
                        return;
                    }else {
                        let Error = new Errormessage(lang.errors.nodata, 0);
                        Error.mountError();
                        return;
                    }
                });
            }
        }
    },
    async beforeCreate() {
        await apply.getApply(true, '', (response) => {  
            if(response.status === 200) {
                this.applys = response.data.opt.length;
                this.apply = response.data.opt;
                return;
            }else {
                let Error = new Errormessage(lang.errors.nodata, 0);
                Error.mountError();
                return;
            }
        });
    }
}
</script>