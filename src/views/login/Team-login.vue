<template>
  <img
    src="//www.blackdayz.de/Library/pg/logo/PhenixGames_Logo_no_text.svg"
    class="bg fixed"
  />

  <div class="wrapper">
    <div class="login">
      <div class="login_pic display-flex justify-content-center">
        <img src="//www.blackdayz.de/Library/pg/logo/PhenixGames_Logo_no_text.svg" />
      </div>

      <ul v-if="errors.length" class="red bold center">
        <li v-for="errors in errors" class="list-style-type-none">
          {{ errors }}
        </li>
      </ul>
      <div class="login_wrapper center">
        <form
          @submit="checkInput"
          action="/"
          method="POST"
          class="display-grid justify-content-center"
        >
          <input
            v-model="teamid"
            type="text"
            name="teamid"
            placeholder="TeamID"
            class="white center"
          />

          <input
            v-model="password"
            type="password"
            name="password"
            placeholder="Passwort"
            class="white center"
          />

          <input type="submit" value="Anmelden" class="cursor-pointer white" />

          <div class="savelogin">
            <input type="checkbox" name="savelogin" class="whitespace-nowrap" />
            <label for="checkbox" class="white">Angemeldet bleiben</label>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url("../../assets/css/login/login-tm.css");
</style>

<script>
import { checkForm } from "../../assets/js/login/checkForm";
import { tmlogin } from "../../assets/js/login/team-login";
import { getuser } from '../../assets/js/getuser';
import { getConfig } from '../../assets/js/config/getConfig';
const config = getConfig.getConfig()

export default {
  name: config.routing.signin.name,
  data: () => {
    return {
      errors: [],
      teamid: "",
      password: "",
    }
  },
  methods: {
    checkInput: function (e) {
      e.preventDefault();
      this.errors = [];
      let check = checkForm.checkForm(this.teamid, this.password);
      this.errors.push(check);
      if (check) return;
      tmlogin.tmlogin(this.teamid, this.password, (response) => {
        if(response.data == true) {
          this.$router.push({path: config.routing.root.route});
          return;
        }else {
          this.errors.push(response.data);
        }
      });
    },
  },
};
</script>