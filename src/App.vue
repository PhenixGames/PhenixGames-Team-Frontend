<template>
  <div id="err_div"></div>
  <router-view :username="username" :teamid="teamid" :scname="scname" />
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
      teamid: false,
      username: false,
      scname: false,
      rank: 0
    }
  },
  beforeCreate() {
    getuser.getuser((response) => {
      this.teamid = response.data.teamid;
      this.username = response.data.username;
      this.scname = response.data.scname;
      this.rank = response.data.rank
    });
  },
};
</script>

