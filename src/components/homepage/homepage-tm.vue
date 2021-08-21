<template>
    <main class="startseite_body">
    <section class="col startseite_section">
      <header>
        <div class="tab center left site_name">
          <span class="fsize-1-5">{{lang.homepage.welcome}}</span>
        </div>
      </header>
      <main class="left width-100 display-block margin-0-auto">
        <header>
          <div class="tab tab-33 center left">
            <span class="fsize-1-5">{{lang.homepage.openrequests}}: 12</span>
          </div>

          <div class="tab tab-33 center left">
            <span class="fsize-1-5">{{lang.homepage.openreports}}: 12</span>
          </div>

          <div class="tab tab-33 center left">
            <span class="fsize-1-5">{{lang.homepage.openapplys}}: 12</span>
          </div>
        </header>
        <div class="startseite_tab_select right">
          <div class="tab">
            <span class="fsize-1-5"
              ><span>{{lang.words.settings}}</span>
              <img
                class="right"
                src="https://img.icons8.com/color/48/000000/settings--v2.png"
            /></span>
            <span>{{lang.homepage.settingsdesc}}</span>
          </div>
          <div class="tab" id="setadmindienst">
            <span class="fsize-1-5"
              ><span>{{lang.words.adminservice}}</span>
              <img
                class="right"
                src="https://img.icons8.com/bubbles/50/000000/user-male.png"
            /></span>
            <span
              >{{lang.homepage.adminservicedesc}}</span
            >
          </div>
          <div class="tab">
            <span class="fsize-1-5"
              ><span>{{lang.words.userarea}}</span>
              <img
                class="right"
                src="https://img.icons8.com/bubbles/50/000000/user-male.png"
            /></span>
            <span>{{lang.homepage.userareaddesc}}</span>
          </div>
          <div class="tab">
            <span class="fsize-1-5"
              ><span>{{lang.words.forum}}</span>
              <img
                class="right"
                src="https://img.icons8.com/doodle/48/000000/chat.png"
            /></span>
            <span>{{lang.homepage.forumdesc}}</span>
          </div>
          <a
            href="https://phenixgames.de/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div class="tab">
              <span class="fsize-1-5"
                ><span>{{lang.words.homepage}}</span>
                <img
                  class="right"
                  src="https://img.icons8.com/fluent/48/000000/domain.png"
              /></span>
              <span>{{lang.homepage.homepagedesc}}</span>
            </div>
          </a>
          <a
            href="https://discord.gg/SBC3Edh"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div class="tab">
              <span class="fsize-1-5"
                ><span translate="no">Discord</span>
                <img
                  class="right"
                  src="https://img.icons8.com/color/48/000000/discord-new-logo.png"
              /></span>
              <span>{{lang.homepage.discorddesc}}</span>
            </div>
          </a>
        </div>
        <div class="tab center left teaminfo">
          <span class="fsize-1-5">
              <span class="bold big">{{lang.words.teaminfo}}</span>
          </span>
          <p v-if="!teaminfo.message" class="center "><br />{{lang.errors.nodata}}</p>
          <p class="team_info textleft" v-else>
            <span>{{lang.words.from.up}}: <span class="red bold">{{teaminfo.from}}</span></span>
            <p>{{teaminfo.message}}</p>
            <span class="thin">Am: {{teaminfo.at}}</span>
          </p>
          <div class="team_info_btn">
            <img @click="addTeamInfoMethod()" src="../../assets/img/icons/more.png" v-if="rank === 3" class="right cursor-pointer" title="Add info"/>
            <img @click="showTeamInfoHistory()" class="right team_info_history cursor-pointer" src="https://img.icons8.com/dusk/64/000000/time-machine.png" title="Show History"/>
          </div>
        </div>
      </main>
    </section>
    <teamhistorytm v-if="!teaminfo.hideTeamInfo" :data="teaminfo.showAll" :openorCloseInfoHistory="openorCloseInfoHistory"/>
    <teaminfotm v-if="showAddTeamInfo" :closeAddNewTeamInfo="closeAddNewTeamInfo" :sendNewTeamInfo="sendNewTeamInfo"/>
  </main>
</template>

<script>
import { getLang } from '../../assets/config/txt/getLang';
import { getConfig } from '../../assets/js/config/getConfig';
import { getuser } from '../../assets/js/getuser';
import Teaminfo from '../../assets/js/teaminfo/Teaminfo';
import teaminfotm from '../../components/teaminfo/teaminfo-tm.vue';
import teamhistorytm from '../../components/teaminfo/teamhistory-tm.vue';

const config = getConfig.getConfig();
const lang = getLang();

export default {
  name: config.routing.home.name,
  data: () => {
    return {
      lang: lang,
      rank: '',
      showAddTeamInfo: false,
      teaminfo: {
        id: '',
        message: '',
        from: '',
        at:'',
        showAll: '',
        hideTeamInfo: true
      }
    }
  },
  components: {
    teaminfotm,
    teamhistorytm
  },
  methods: {
    addTeamInfoMethod() {
      this.showAddTeamInfo = true;
    },
    closeAddNewTeamInfo() {
      this.showAddTeamInfo = false;
    },
    sendNewTeamInfo: function(e) {
      e.preventDefault();
      let teaminfo = new Teaminfo(e.target.[0].value);
      if(teaminfo.checkMessage()) {
        teaminfo.saveMessage((response) => {
          if(response) {
            this.showAddTeamInfo = false;
            this.showInfo();
          }
        });
      }
    },
    showInfo() {
      let showteaminfo = new Teaminfo();
      showteaminfo.showTeamInfo(false, (response) => {
        if(!response) {return;}
        this.teaminfo.id = response.data.infoid;
        this.teaminfo.message = response.data.message;
        this.teaminfo.from = response.data.teammember;

        let created_at = response.data.created_at;
        created_at = created_at.replace('T', ' ');
        created_at = created_at.replace('Z', '');
        created_at = created_at.slice(0, -4);
        this.teaminfo.at = created_at;
      });
    },
    showTeamInfoHistory() {
      let showteaminfo = new Teaminfo();
      showteaminfo.showTeamInfo(true, (response) => {
        if(!response) {return;}
        this.teaminfo.showAll = response.data;
        for(let i in this.teaminfo.showAll) {
          let created_at = this.teaminfo.showAll[i].created_at;
          created_at = created_at.replace('T', ' ');
          created_at = created_at.replace('Z', '');
          created_at = created_at.slice(0, -4);
          this.teaminfo.showAll[i].created_at = created_at;
        }
      });
      this.openorCloseInfoHistory();
    },
    openorCloseInfoHistory() {
      if(!this.teaminfo.message) {
        return;
      }
      let showteaminfo = new Teaminfo();
      showteaminfo.openCloseInfoHistory(this.teaminfo);
    }
  },
  mounted() {
    this.showInfo();
  },
  beforeCreate() {
    getuser.getuser((response) => {
      this.rank = response.data.rank;
      this.teamid = response.data.teamid
    });
  },
}
</script>
