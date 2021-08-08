<template>
    <h1 class="center">Logout in process...</h1>
</template>

<script>
import { getConfig } from '../../assets/js/config/getConfig'
import { logout } from '../../assets/js/login/logout/logout';
const config = getConfig.getConfig();

    export default {
        data: () => {
            return {
                name: config.routing.logout.name
            }
        },
        beforeCreate() {
            logout.logout((response) => {
                this.$router.push(config.routing.root.route + config.routing.signin.route);
            });
        }
    }
</script>
