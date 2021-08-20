<template>
   <section class="col vehicle_section">
        <header class="left display-flex width-100">
            <div class="tab left center site_name">
                <span class="fsize-4 ">{{lang.words.vehlist}}</span>
            </div>
            <div style="width: 400px;">
                <div class="tab center">
                    <span class="fsize-1-5">{{lang.words.unparked}}: <span>{{unparkedveh}}</span></span>
                </div>
                <div class="tab center">
                    <span class="fsize-1-5">{{lang.words.parked}}: <span>{{parkedveh}}</span></span>
                </div>
            </div>
        </header>
        <main>
            <div class="tab left vehlist">
                <table cellpadding="50" >
                    <thead class="big">
                        <tr class="user-select-none">
                            <th>{{lang.vehicle.vehid}}</th>
                            <th>{{lang.words.owner}}</th>
                            <th>{{lang.vehicle.vehname}}</th>
                            <th>{{lang.words.lastlocation}}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in vehicles" @click="selectVeh(item.vid)" :class="(selectedVid === item.vid) ? 'veh_selected' : ''">
                            <th :class="(item.Eingepark) ? 'parked' : 'unparked'">{{item.vid}}</th>
                            <th>{{item.cid}}</th>
                            <th>{{item.VehDisplayname}}</th>
                            <th><span style="color: var(--organgenav)">X:</span> <span class="italic">{{item.p_x}}</span>, <span style="color: var(--organgenav)">Y:</span> <span class="italic">{{item.p_y}}</span>, <span style="color: var(--organgenav)">Z:</span> <span class="italic">{{item.p_z}}</span></th>
                        </tr>
                        <tr v-if="!vehicles">
                            <th colspan="4">
                                <span class="red big bold">{{lang.player.playernotfound}}</span>
                            </th>
                        </tr>
                    </tbody>
                </table>
            </div>
            <!-- Respawn, Ts Support Bannen Info  -->
            <div class="int_btn_menu fixed">
                <input type="checkbox" id="open_int_menu_checkbox" class="display-none"/>
                <div class="int_btn_main_menu">
                    <div :class="(selectedVid) ? 'int_btn int_btn_ts' : ' int_btn int_btn_ts cursor-no-drop'" :data-pid="selectedVid">
                        <img src="../../assets/img/icons/repeat_respawn.png" class="right" @click="editVeh(selectedVid, 0)"/>
                        <span class="tip white bold">{{lang.words.respawn}}</span>
                    </div>
                    <div :class="(selectedVid) ? 'int_btn int_btn_ts' : ' int_btn int_btn_ts cursor-no-drop'" :data-pid="selectedVid">
                        <img src="../../assets/img/icons/support.png" class="right" @click="editVeh(selectedVid, 1)"/>
                        <span class="tip white bold whitespace-nowrap" translate="no">S-T-T-R-D</span><!-- Set to the right dimension-->
                    </div>
                    <div :class="(selectedVid) ? 'int_btn int_btn_ts' : ' int_btn int_btn_ts cursor-no-drop'" :data-pid="selectedVid">
                        <img src="../../assets/img/icons/delete.png" class="right" @click="editVeh(selectedVid, 2)"/>
                        <span class="tip white bold">{{lang.words.delete}}</span>
                    </div>
                    <div :class="(selectedVid) ? 'int_btn int_btn_ts' : ' int_btn int_btn_ts cursor-no-drop'" :data-pid="selectedVid">
                        <img src="../../assets/img/icons/more-info.png" class="right" @click="editVeh(selectedVid, 3)"/>
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

<style scoped>
@import url('../../assets/css/vehicle/vehicle-tm.css');
</style>

<script>
import { getLang } from '../../assets/config/txt/getLang'
import { getConfig } from '../../assets/js/config/getConfig';
import { vehicle } from '../../assets/js/gameserver/vehicle';
import Errormessage from '../../assets/js/Errormessage/Errormessage';

const config = getConfig.getConfig();
const lang = getLang();

export default {
    name: config.routing.game.vehicle.viewvehicle.name,
    data: () => {
        return {
            lang: lang,
            vehicles : [],
            selectedVid: '',
            unparkedveh: 0,
            parkedveh: 0
        }
    },
    methods: {
        selectVeh(vid) {
            if(this.selectedVid == vid) {
                this.selectedVid = ''
                return;
            }
            this.selectedVid = vid
        },
        /**
         * @param 0 = respawn
         * @param 1 = sttrd (set to the right dimension)
         * @param 2 = delete
         * @param 3 = more
         */
        editVeh(vid, type) {
            if(type !== 3) {
                vehicle.edit(vid, type, (response) => {
                    if(response.status === 200) {
                        let Info = new Errormessage(vid + ' ' + lang.success.changes, 2)
                        Info.mountError();
                        return;
                    }else {
                        let Error = new Errormessage(lang.errors.some_went_wrong, 1);
                        Error.mountError();
                        return;
                    }
                });
            }else {
                vehicle.getOne(vid, (response) => {
                    if(response.status === 200) {
                        alert(JSON.stringify(response.data[0]))
                        return;
                    }else if(response.status === 204) {
                        let Error = new Errormessage(lang.errors.nodata, 0);
                        Error.mountError();
                        return;
                    }else {
                        let Error = new Errormessage(lang.errors.some_went_wrong, 1);
                        Error.mountError();
                        return; 
                    }
                });
            }
        }
    },
    async beforeCreate() {
        vehicle.get((response) => {
            if(response.status === 204) {
                let Error = new Errormessage(lang.errors.nodata, 2);
                Error.mountError();
                return;
            }else if(response.status === 200) {
                for(let i = 0; i < response.data.length; i++ ) {  
                    this.vehicles.push(response.data[i]);
                    (response.data[i].Eingeparkt) ? this.parkedveh++ : this.unparkedveh++;
                }
                return;
            }else {
                let Error = new Errormessage(lang.errors.some_went_wrong, 1);
                Error.mountError();
                return;
            }
        });
    }
}
</script>
