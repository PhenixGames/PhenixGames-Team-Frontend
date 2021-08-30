<template>
  <navtm :username="username" :teamid="teamid" :scname="scname" />
  <playertm />
</template>
<style scoped>
    @import url('../assets/css/player/player-tm.css');
</style>
<script>
import navtm from '../components/_nav/nav-tm.vue';
import playertm from '../components/player/player-tm.vue';
import { getConfig } from '../assets/js/config/getConfig';
import { getuser } from '../assets/js/getuser';

const config = getConfig.getConfig();

export default {
    name: config.routing.game.player.view.name,
    data: () => {return {}},
    components: {
        navtm,
        playertm
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