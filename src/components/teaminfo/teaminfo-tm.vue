<template>
    <div class="addnewteaminfo">
        <header>
            <h2 class="center white bold">Add new Teaminfo</h2>
        </header>
        <form @submit="sendNewTeamInfo" action="/" method="POST">
            <main>
                <textarea minlength="50" maxlength="200" required placeholder="Schreibe hiere die Teaminfo rein..."></textarea>
            </main>
            <footer>
                <input @click="closeAddNewTeamInfo()" type="button" value="Cancel" class="cursor-pointer"/>
                <input type="submit" class="cursor-pointer"/>
            </footer>
        </form>
    </div>
</template>

<style scoped>
@import url('../../assets/css/teaminfo/teaminfo.css');
</style>

<script>
export default {
    props: [
        'closeAddNewTeamInfo',
        'sendNewTeamInfo'
    ]
}
</script>