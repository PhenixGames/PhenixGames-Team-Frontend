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
            <img src="https://img.icons8.com/fluent/48/000000/user-group-man-woman.png" />
              <span>{{lang.words.teaminfo}}</span>
            <img src="https://img.icons8.com/fluent/48/000000/user-group-man-woman.png"/>
          </span>
          <p class="team_info textleft">
            <span><br /><br />{{lang.words.from.up}}: <span class="red"></span></span>
          </p>
          <span id="team_info_history" class="cursor-pointer">
            <img
              class="right team_info_history"
              src="https://img.icons8.com/dusk/64/000000/time-machine.png"
            />
          </span>
        </div>
      </main>
    </section>
  </main>
</template>

<script>
import { getLang } from '../../assets/config/txt/getLang';
import { getConfig } from '../../assets/js/config/getConfig';

const config = getConfig.getConfig();
const lang = getLang();

export default {
  name: config.routing.home.name,
  data: () => {
    return {
      lang: lang
    }
  }
}
</script>
