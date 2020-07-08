<template>
  <!-- <q-page class="flex flex-center">-->
  <q-page>
    <!-- <img src="~assets/logo.png" alt="ХТК Лого" width="250px" /> -->
    <q-file color="lime-11" bg-color="green" filled v-model="model" @input="fileLoad">
      <template v-slot:prepend>
        <q-icon name="attachment" />
      </template>
    </q-file>
    <q-table title="Treats" :data="data" :columns="columns" />
    <div>{{this.text}}</div>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      model: null,
      text: "",
      columns: [
        { name: "name1", label: "name1", field: "name1", align: "left" },
        { name: "name2", label: "name2", field: "name2", align: "left" },
        { name: "name3", label: "name3", field: "name3", align: "left" },
        { name: "name4", label: "name4", field: "name4", align: "left" },
        { name: "name5", label: "name5", field: "name5", align: "left" },
        { name: "name6", label: "name6", field: "name6", align: "left" },
        { name: "name7", label: "name7", field: "name7", align: "left" },
        { name: "name8", label: "name8", field: "name8", align: "left" },
        { name: "name9", label: "name9", field: "name9", align: "left" },
        { name: "name10", label: "name10", field: "name10", align: "left" },
        { name: "name11", label: "name11", field: "name11", align: "left" },
        { name: "name12", label: "name12", field: "name12", align: "left" },
        { name: "name13", label: "name13", field: "name13", align: "left" }
      ],
      data: []
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
          var valueRows = response.data.text.split(
            "\r\n",
            response.data.text.split("\r\n").length - 2
          );
          var dataResponse = [];
          valueRows.forEach(function(row, i, rows) {
            var item = {};
            var valueCell = row.split(";");
            item.name1 = valueCell[0];
            item.name2 = valueCell[1];
            item.name3 = valueCell[2];
            item.name4 = valueCell[3];
            item.name5 = valueCell[4];
            item.name6 = valueCell[5];
            item.name7 = valueCell[6];
            item.name8 = valueCell[7];
            item.name9 = valueCell[8];
            item.name10 = valueCell[9];
            item.name11 = valueCell[10];
            item.name12 = valueCell[11];
            item.name13 = valueCell[12];
            dataResponse.push(item);
          });
          this.data = dataResponse;
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  }
};
</script>
