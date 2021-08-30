<template>
    <div id="teamhistory" class="fixed">
        <header>
            <span @click="openorCloseInfoHistory()" class="white cursor-pointer text-deco-underline absolute">Close</span>
            <h2 class="center white bold">{{lang.teaminfo.teaminfohistory}}</h2>
        </header>
        <main class="white">
            <div class="center left teaminfo">
                <p class="team_info textleft" v-for="item in data">
                    <span>{{lang.words.from.up}}: <span class="red bold">{{item.teammember}}</span></span>
                    <p>{{item.message}}</p>
                    <span class="thin">Am: {{item.created_at}}</span>
                    <hr />
                </p>
            </div>
        </main>
    </div>
</template>

<script>
import { getLang } from '../../assets/config/txt/getLang'
import Teaminfo from '../../assets/js/teaminfo/teaminfo';
const lang = getLang();
export default {
    data() {
        return {
            lang: lang
        }
    },
    methods: {
        closeHistory() {
            let closeTeamInfo = new Teaminfo();
            closeTeamInfo.openCloseInfoHistory();
        }
    },
    props: [
        'data',
        'openorCloseInfoHistory'
    ]
}
</script>