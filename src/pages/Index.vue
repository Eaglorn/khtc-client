<template>
  <!-- <q-page class="flex flex-center">-->
  <q-page>
    <!-- <img src="~assets/logo.png" alt="ХТК Лого" width="250px" /> -->
    <q-file color="lime-11" bg-color="green" filled v-model="model" @input="fileLoad">
      <template v-slot:prepend>
        <q-icon name="attachment" />
      </template>
    </q-file>
    <div>{{this.text}}</div>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      model: null,
      text: ""
    };
  },
  methods: {
    fileLoad() {
      const formData = new FormData();
      formData.append("model", this.model);
      this.$axios({
        method: "post",
        url: "http://46.8.146.12:4000/api/txt/table",
        data: formData,
        timeout: 5000,
        responseType: "json"
      })
        .then(response => {
          this.text = response.data.text;
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  }
};
</script>
