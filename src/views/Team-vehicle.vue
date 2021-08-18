<template>
    <navtm :username="username" :teamid="teamid" :scname="scname"/>
    <errormessage />
</template>

<script>
import navtm from '../components/_nav/nav-tm.vue';
import { getConfig } from '../assets/js/config/getConfig';
import { getuser } from '../assets/js/getuser';
import errormessage from '../components/_errormessage/errormessage.vue';

const config = getConfig.getConfig();

export default {
    name: config.routing.game.player.viewplayer.name,
    data: function () {return {}},
    components: {
        navtm,
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