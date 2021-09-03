<template>
    <h1 class="center">{{loading}}</h1>
    <p class="center" v-if="error"><router-link :to="home">Signin</router-link></p>
</template>

<script>
import { getConfig } from '../../assets/js/config/getConfig'
import { logout } from '../../assets/js/login/logout/logout';
import Errormessage from '../../assets/js/Errormessage/Errormessage';
import { getLang } from '../../assets/config/txt/getLang';

const lang = getLang();
const config = getConfig.getConfig();

    export default {
        data: () => {
            return {
                name: config.routing.logout.name,
                loading: lang.logout.logoutprocess,
                error: false,
                home: config.routing.root.route + config.routing.signin.route
            }
        },
        beforeCreate() {
            logout.logout((response) => {
                if(response.status === 200) {
                    localStorage.removeItem(config.keyStorageName);
                    this.$router.push(config.routing.root.route + config.routing.signin.route);
                }else {
                    this.error = true;
                    this.loading = lang.errors.logoutfailed + ' ' + lang.errors.plsdeletecookies;
                    let Error = new Errormessage(lang.errors.logoutfailed + ' ' + lang.errors.plsdeletecookies)
                    Error.mountError();
                    return;
                }
            });
        }
    }
</script>
