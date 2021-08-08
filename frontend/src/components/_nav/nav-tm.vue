<template>
    <nav class="left white">
    <div class="navheader">
        <img src="../../assets/img/profile/default_avatar.png" class="profilbild" />
        <div class="profilname center display-grid">
            <span id="teamname">{{username}}</span>
            <span id="teamid">Team-ID: {{teamid}}</span>
        </div>
    </div>
    <div class="nav_main">
        <a href="index.php" class="white" rel="noopener noreferrer"><div class="nav-link cursor-pointer">
            <span>Startseite</span><img src="https://img.icons8.com/cute-clipart/50/000000/home.png" />
        </div></a>
        <a href="player.php" class="white" rel="noopener noreferrer"><div class="nav-link cursor-pointer">
            <span>Spieler</span><img src="https://img.icons8.com/color/48/000000/player-male.png" />
        </div></a>

        <a href="vehicles.php" class="white" rel="noopener noreferrer"><div class="nav-link cursor-pointer">
            <span>Fahrzeuge</span><img src="https://img.icons8.com/bubbles/50/000000/car.png" />
        </div></a>

        <a href="#" class="white" rel="noopener noreferrer"><div class="nav-link cursor-pointer">
            <span>Forum</span><img src="https://img.icons8.com/bubbles/50/000000/myspace.png" />
        </div></a>

        <a href="bewerbungen.php" class="white" rel="noopener noreferrer"><div class="nav-link cursor-pointer">
            <span>Bewerbungen</span><img src="https://img.icons8.com/ultraviolet/40/000000/gpx.png" />
        </div></a>

        <a href="#" class="white" rel="noopener noreferrer"><div class="nav-link cursor-pointer">
            <span>Antr&auml;ge</span><img src="https://img.icons8.com/offices/40/000000/invite.png" />
        </div></a>

        <a href="#" class="white" rel="noopener noreferrer"><div class="nav-link cursor-pointer">
            <span>Webseite</span><img src="https://img.icons8.com/color/48/000000/domain.png" />
        </div></a>
        <a href="#" class="white" rel="noopener noreferrer"><div class="nav-link cursor-pointer">
            <span>Roleplay-Log</span><img src="https://img.icons8.com/color/48/000000/event-log.png" />
        </div></a>

        <a href="#" class="white" rel="noopener noreferrer"><div class="nav-link cursor-pointer">
            <span>Gangwars-Log</span><img src="https://img.icons8.com/color/48/000000/event-log.png" />
        </div></a>

        <a href="#" class="white" rel="noopener noreferrer"><div class="nav-link cursor-pointer">
            <span>Website-Log</span><img src="https://img.icons8.com/color/48/000000/event-log.png" />
        </div></a>
        <a href="#" class="white" rel="noopener noreferrer"><div class="nav-link cursor-pointer">
            <span>Einstellungen</span><img src="https://img.icons8.com/fluent/48/000000/settings.png" />
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
import { getConfig } from '../../assets/js/config/getConfig'
const config = getConfig.getConfig();
const root = config.routing.root.route

export default {
    data: () => {
        return {
            name: 'Team Navigation',
            routes: {
                home: root + config.routing.home.route,
                logout: root + config.routing.logout.route
            },
            currentTime: ''
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

                    const date = current.getFullYear()+'.'+months+'.'+days;
                    const time = hrs + ":" + mins + ":" + secs;
                    const dateTime = date +' '+ time;
                    this.currentTime = dateTime;
        }
    },
    props: [
        "username",
        "teamid"
    ]
}
</script>