<template>
    <input type="checkbox" style="display-none" id="mobile_menu_checkbox" class="display-none mobile_menu_checkbox" />
    <label for="mobile_menu_checkbox">
        <img src="../../assets/img/icons/burger_menu.svg"  class="burger_mobile_menu cursor-pointer"/>
    </label>
    <nav class="left white">
    <div class="navheader">
        <img src="../../assets/img/profile/default_avatar.png" class="profilbild" />
        <div class="profilname center display-grid">
            <span id="teamname" title="Username"><strong>{{username}}</strong></span>
            <span class="tiny bold" title="Socialclub name">({{scname}})</span>
            <span id="teamid">{{lang.words.teamid}}: <strong>{{teamid}}</strong></span>
        </div>
    </div>
    <div class="nav_main">
        <router-link :to="{path: routes.home}" class="white" rel="noopener noreferrer"><div class="nav-link cursor-pointer">
            <span>{{lang.words.homepage}}</span><img src="https://img.icons8.com/cute-clipart/50/000000/home.png" />
        </div></router-link>
        <router-link :to="{path: routes.games.player}" class="white" rel="noopener noreferrer"><div class="nav-link cursor-pointer">
            <span>{{lang.words.player.more}}</span><img src="https://img.icons8.com/color/48/000000/player-male.png" />
        </div></router-link>

        <router-link :to="{path: routes.games.vehicle}" class="white" rel="noopener noreferrer"><div class="nav-link cursor-pointer">
            <span>{{lang.words.vehicle.more}}</span><img src="https://img.icons8.com/bubbles/50/000000/car.png" />
        </div></router-link>

        <router-link :to="{path: routes.games.forum}" class="white" rel="noopener noreferrer"><div class="nav-link cursor-pointer">
            <span>{{lang.words.forum}}</span><img src="https://img.icons8.com/bubbles/50/000000/myspace.png" />
        </div></router-link>

        <a href="bewerbungen.php" class="white" rel="noopener noreferrer"><div class="nav-link cursor-pointer">
            <span>{{lang.words.apply.more}}</span><img src="https://img.icons8.com/ultraviolet/40/000000/gpx.png" />
        </div></a>

        <a href="#" class="white" rel="noopener noreferrer"><div class="nav-link cursor-pointer">
            <span>{{lang.words.request.more}}</span><img src="https://img.icons8.com/offices/40/000000/invite.png" />
        </div></a>

        <a href="#" class="white" rel="noopener noreferrer"><div class="nav-link cursor-pointer">
            <span>{{lang.words.website.one}}</span><img src="https://img.icons8.com/color/48/000000/domain.png" />
        </div></a>
        <a href="#" class="white" rel="noopener noreferrer"><div class="nav-link cursor-pointer">
            <span translate="no">Roleplay-Log</span><img src="https://img.icons8.com/color/48/000000/event-log.png" />
        </div></a>

        <a href="#" class="white" rel="noopener noreferrer"><div class="nav-link cursor-pointer">
            <span translate="no">Gangwars-Log</span><img src="https://img.icons8.com/color/48/000000/event-log.png" />
        </div></a>

        <a href="#" class="white" rel="noopener noreferrer"><div class="nav-link cursor-pointer">
            <span translate="no">Website-Log</span><img src="https://img.icons8.com/color/48/000000/event-log.png" />
        </div></a>
        <a href="#" class="white" rel="noopener noreferrer"><div class="nav-link cursor-pointer">
            <span>{{lang.words.settings}}</span><img src="https://img.icons8.com/fluent/48/000000/settings.png" />
        </div></a>
    </div>

    <div class="nav_bottom">

        <div class="mode_switcher left">
            <label class="switch">
                <input type="checkbox" id="darkmode-nav-on-off">
                <span class="slider round"></span>
                <span class="light" id="lightimg"><img
                        src="https://img.icons8.com/color/48/000000/sun--v1.png" /></span>
                <span class="dark" id="darkimg"><img
                        src="https://img.icons8.com/color/48/000000/full-moon.png" /></span>
            </label>
        </div>

        <router-link :to="{path: routes.logout}" class="logoutbtn" id=""><div class="logout left" id="logout">
            <span><img src="https://img.icons8.com/color/48/000000/exit.png" /></span>
        </div></router-link>

    </div>
</nav>
<div class="infobar white textright">
    <span>{{currentTime}}</span>
</div>

</template>

<style scoped>
@import url('../../assets/css/_nav/nav-tm.css');
</style>

<script>
import { getLang } from '../../assets/config/txt/getLang';
import { getConfig } from '../../assets/js/config/getConfig'

const lang = getLang();
const config = getConfig.getConfig();
const root = config.routing.root.route

export default {
    data: () => {
        return {
            name: 'Team Navigation',
            routes: {
                home: root + config.routing.home.route,
                logout: root + config.routing.logout.route,
                games: {
                    player: root + config.routing.game.player.view.route,
                    vehicle: root + config.routing.game.vehicle.view.route,
                    forum: root + config.routing.game.forum.view.route
                }
            },
            currentTime: '',
            lang: lang
        }
    },
    mounted() {
        setInterval(() => {
            this.setTime()    
        }, 1000);  
    },
    methods: {
        setTime() {
            const current = new Date();
            const months = ((current.getMonth()+1) < 10) ? '0' + (current.getMonth()+1) : current.getMonth()+1;
            const days = (current.getDate() < 10) ? '0' + current.getDate() : current.getDate();
            const hrs = (current.getHours() < 10) ? '0' + current.getHours() : current.getHours();
            const mins = (current.getMinutes() < 10) ? '0' + current.getMinutes() : current.getMinutes();
            const secs = (current.getSeconds() < 10) ? '0' + current.getSeconds(): current.getSeconds();

            const date = days + '.' + months + '.' + current.getFullYear();
            const time = hrs + ":" + mins + ":" + secs;
            const dateTime = date +' '+ time;
            this.currentTime = dateTime;
        }
    },
    props: [
        "username",
        "teamid",
        "scname"
    ]
}
</script>