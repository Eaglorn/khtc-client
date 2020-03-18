<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
export default {
  created() {
    this.$router.push("/");
  }
};
</script>
