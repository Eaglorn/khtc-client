<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
export default {
  created() {
    if (this.$route.path !== "/") {
      this.$router.push("/");
    }
  }
};
</script>
