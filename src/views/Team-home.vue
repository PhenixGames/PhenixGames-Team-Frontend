<template>
  <navtm :username="username" :teamid="teamid" :scname="scname" />
  <homepagetm />
</template>

<style scoped>
@import url("../assets/css/homepage/homepage-tm.css");
</style>

<script>
import navtm from "../components/_nav/nav-tm.component.vue";
import homepagetm from "../components/homepage/homepage-tm.component.vue";
import { getuser } from "../assets/js/getuser";
import { getConfig } from "../assets/js/config/getConfig";

const config = getConfig.getConfig();

export default {
  name: config.routing.home.name,
  data: () => {
    return {};
  },
  components: {
    navtm,
    homepagetm,
  },
  props: {
    username: {
      type: String,
      required: true,
      default: "Max",
    },
    teamid: {
      type: Number,
      required: true,
      default: "99999",
    },
    scname: {
      type: String,
      required: true,
      default: "MaxMuster123",
    },
  },
};
</script>