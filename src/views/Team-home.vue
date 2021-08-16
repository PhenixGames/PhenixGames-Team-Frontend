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
  data: function () {return {}},
  components: {
    navtm,
    homepagetm,
    errormessage
  },
  props: {
    username: { 
      type: String,
      required: true,
      default: "Max"
    },
    teamid: { 
      type: Number,
      required: true,
      default: "99999"
    },
    scname: { 
      type: String,
      required: true,
      default: 'MaxMuster123'
    },
  }
};
</script>