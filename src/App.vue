<template>
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
      scname: false
    }
  },
  beforeCreate() {
    getuser.getuser((response) => {
      this.teamid = response.data.teamid;
      this.username = response.data.username;
      this.scname = response.data.scname;
    });
  },
};
</script>

