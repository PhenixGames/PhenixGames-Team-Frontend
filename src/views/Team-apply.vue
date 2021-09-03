<template>
  <navtm :username="username" :teamid="teamid" :scname="scname" />
  <applytm />
</template>
<style scoped>
    @import url('../assets/css/apply/apply-tm.css');
</style>
<script>
import navtm from '../components/_nav/nav-tm.component.vue';
import applytm from '../components/apply/apply-tm.component.vue';
import { getConfig } from '../assets/js/config/getConfig';
import { getuser } from '../assets/js/getuser';

const config = getConfig.getConfig();

export default {
    name: config.routing.game.apply.view.name,
    data: () => {return {}},
    components: {
        navtm,
        applytm
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