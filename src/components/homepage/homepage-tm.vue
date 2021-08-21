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
          <p class="team_info textleft">
            <span class="bold">{{lang.words.from.up}}: <span class="red">Test</span></span>
            <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.   

Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet,</p>
          </p>
          <div class="team_info_btn">
            <img @click="addTeamInfoMethod()" src="../../assets/img/icons/more.png" v-if="rank === 3" class="right cursor-pointer" title="Add info"/>
            <img class="right team_info_history cursor-pointer" src="https://img.icons8.com/dusk/64/000000/time-machine.png" title="Show History"/>
          </div>
        </div>
      </main>
    </section>
    <teaminfotm v-if="showAddTeamInfo" :closeAddNewTeamInfo="closeAddNewTeamInfo" :sendNewTeamInfo="sendNewTeamInfo"/>
  </main>
</template>

<script>
import { getLang } from '../../assets/config/txt/getLang';
import { getConfig } from '../../assets/js/config/getConfig';
import { getuser } from '../../assets/js/getuser';
import Teaminfo from '../../assets/js/teaminfo/Teaminfo';
import teaminfotm from '../../components/teaminfo/teaminfo-tm.vue';

const config = getConfig.getConfig();
const lang = getLang();

export default {
  name: config.routing.home.name,
  data: () => {
    return {
      lang: lang,
      rank: '',
      showAddTeamInfo: false
    }
  },
  components: {
    teaminfotm
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
          }
        });
      }
    }
  },
  beforeCreate() {
    getuser.getuser((response) => {
      this.rank = response.data.rank;
      this.teamid = response.data.teamid
    });
    let showteaminfo = new Teaminfo(0);
    showteaminfo.showTeamInfo();
  },
}
</script>
