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
    name: config.routing.game.player.viewplayer.name,
    data: () => {
        return {
            username: '',
            teamid: '',
            scname: ''
        }
    },
    components: {
        navtm,
        playertm
    },
    async beforeCreate() {
        await getuser.getuser((response) => {
        if (!response.data || response.data == "") {
            this.$router.push(
            config.routing.root.route + config.routing.signin.route
            );
            return;
        }
        this.teamid = response.data.teamid;
        this.username = response.data.username;
        this.scname = response.data.scname;
        });
    },
};
</script>