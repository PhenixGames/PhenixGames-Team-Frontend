<template>
  <navtm :username="username" :teamid="teamid" :scname="scname"/>
  <homepagetm />
  <errormessage />
</template>

<style scoped>
@import url("../assets/css/homepage/homepage-tm.css");
</style>

<script>
import navtm from "../components/_nav/nav-tm.vue";
import homepagetm from '../components/homepage/homepage-tm.vue';
import errormessage from '../components/_errormessage/errormessage.vue';
import { getuser } from '../assets/js/getuser';
import { getConfig } from '../assets/js/config/getConfig';

const config = getConfig.getConfig();

export default {
  name: config.routing.home.name,
  data: () => {
    return {
      username: '',
      teamid: '',
      scname: ''
    }
  },
  components: {
    navtm,
    homepagetm,
    errormessage
  },
  async beforeCreate() {
    await getuser.getuser((response) => {
      if(!response.data || response.data == '') {
        this.$router.push(config.routing.root.route + config.routing.signin.route);
        return;
      }
      this.teamid = response.data.teamid
      this.username = response.data.username
      this.scname = response.data.scname
    });
  },
};
</script>