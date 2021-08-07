<template>
  <navtm :name="name"/>
  <homepagetm />
  <errormessage />

</template>

<style scoped>
@import url("../assets/css/root-tm.css");
@import url("../assets/css/homepage/homepage-tm.css");
</style>

<script>
import navtm from "../components/_nav/nav-tm.vue";
import homepagetm from '../components/homepage/homepage-tm.vue';
import errormessage from '../components/errormessage/errormessage.vue';
import { getuser } from '../assets/js/getuser';

export default {
  name: "Team",
  data: () => {},
  components: {
    navtm,
    homepagetm,
    errormessage
  },
  async beforeCreate() {
    await getuser.getuser((response) => {
      console.log(response);
    });
  },
};
</script>