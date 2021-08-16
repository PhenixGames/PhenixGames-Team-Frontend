<template>
  <router-view :username="username" :teamid="teamid" :scname="scname" v-if="isCalled" />
</template>

<style>
@import url("./assets/css/root-tm.css");
</style>

<script>
import { getConfig } from './assets/js/config/getConfig';
import { getuser } from './assets/js/getuser';
const config = getConfig.getConfig();
export default {
  data: () => {
    return {
      isCalled: false,
      teamid: false,
      username: false,
      scname: false
    }
  },
  beforeCreate() {
    getuser.getuser((response) => {
      if ( !response.data || response.data == "" && this.$router !== config.routing.root.route + config.routing.signin.route) {
        this.$router.push(config.routing.root.route + config.routing.signin.route);
              if(this.$router !== config.routing.root.route + config.routing.signin.route) {
                setTimeout(() => {
                  this.isCalled = true;
                }, 500);

              }
        return;
      }
      setTimeout(() => {
        this.isCalled = true;
      },500);
      this.teamid = response.data.teamid;
      this.username = response.data.username;
      this.scname = response.data.scname;
    });
  },
};
</script>

