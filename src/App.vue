<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {
    var login = "";
    var password = "";
    try {
      login = this.$q.cookies.get("login");
      password = this.$q.cookies.get("password");
      console.log(login);
      console.log(password);
      if (login.length != null && password.length != null) {
        this.$store.dispatch("user/auth", {
          app: this,
          login: login,
          password: password
        });
      }
    } catch (e) {
      console.log(e);
    }
    if (this.$route.path !== "/") {
      this.$router.push("/");
    }
  }
};
</script>
