<template>
  <!-- <q-page class="flex flex-center">-->
  <q-page style="padding:10px;">
    <!-- <img src="~assets/logo.png" alt="ХТК Лого" width="250px" /> -->
    <q-file bg-color="green-2" filled v-model="model" @input="fileLoad">
      <template v-slot:prepend>
        <q-icon name="attachment" />
      </template>
    </q-file>
    <br />
    <br />
    <q-table
      class="shadow-box shadow-5"
      title="Платёжки"
      :data="data"
      :columns="columns"
      hide-bottom
      separator="cell"
      :visible-columns="visibleColumns"
      v-if="data.length != 0"
    >
      <template v-slot:top="props">
        <div class="col-2 q-table__title">Платёжки</div>
        <q-space />
        <div v-if="$q.screen.gt.xs" class="col">
          <q-toggle
            v-model="visibleColumns"
            val="name1"
            label="Дата"
            @input="visibleEdit"
            color="light-blue-2"
          />
          <q-toggle
            v-model="visibleColumns"
            val="name2"
            label="name2"
            @input="visibleEdit"
            color="light-blue-2"
          />
          <q-toggle
            v-model="visibleColumns"
            val="name3"
            label="name3"
            @input="visibleEdit"
            color="light-blue-2"
          />
          <q-toggle
            v-model="visibleColumns"
            val="name4"
            label="name4"
            @input="visibleEdit"
            color="light-blue-2"
          />
          <q-toggle
            v-model="visibleColumns"
            val="name5"
            label="name5"
            @input="visibleEdit"
            color="light-blue-2"
          />
          <q-toggle
            v-model="visibleColumns"
            val="name6"
            label="Платильщик"
            @input="visibleEdit"
            color="light-blue-2"
          />
          <q-toggle
            v-model="visibleColumns"
            val="name7"
            label="Проживающий"
            @input="visibleEdit"
            color="light-blue-2"
          />
          <q-toggle
            v-model="visibleColumns"
            val="name8"
            label="Назначение платежа"
            @input="visibleEdit"
            color="light-blue-2"
          />
          <q-toggle
            v-model="visibleColumns"
            val="name9"
            label="name9"
            @input="visibleEdit"
            color="light-blue-2"
          />
          <q-toggle
            v-model="visibleColumns"
            val="name10"
            label="КБК"
            @input="visibleEdit"
            color="light-blue-2"
          />
          <q-toggle
            v-model="visibleColumns"
            val="name11"
            label="Сумма"
            @input="visibleEdit"
            color="light-blue-2"
          />
          <q-toggle
            v-model="visibleColumns"
            val="name12"
            label="Сумма"
            @input="visibleEdit"
            color="light-blue-2"
          />
          <q-toggle
            v-model="visibleColumns"
            val="name13"
            label="name13"
            @input="visibleEdit"
            color="light-blue-2"
          />
        </div>
        <q-select
          v-else
          v-model="visibleColumns"
          multiple
          borderless
          dense
          options-dense
          :display-value="$q.lang.table.columns"
          emit-value
          map-options
          :options="columns"
          style="min-width: 150px"
        />

        <q-btn
          flat
          round
          dense
          :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
          @click="props.toggleFullscreen"
          class="q-ml-md"
        />
      </template>
      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
            style="font-weight:bolder;font-size:14px;"
          >{{ col.label }}</q-th>
        </q-tr>
      </template>
    </q-table>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      model: null,
      text: "",
      visibleColumns: [
        "name1",
        "name2",
        "name3",
        "name4",
        "name5",
        "name6",
        "name7",
        "name8",
        "name9",
        "name10",
        "name11",
        "name12",
        "name13"
      ],
      columns: [
        { name: "name1", label: "Дата", field: "name1", align: "left" },
        { name: "name2", label: "name2", field: "name2", align: "left" },
        { name: "name3", label: "name3", field: "name3", align: "left" },
        { name: "name4", label: "name4", field: "name4", align: "left" },
        { name: "name5", label: "name5", field: "name5", align: "left" },
        { name: "name6", label: "Платильщик", field: "name6", align: "left" },
        { name: "name7", label: "Проживающий", field: "name7", align: "left" },
        {
          name: "name8",
          label: "Назначение платежа",
          field: "name8",
          align: "left"
        },
        { name: "name9", label: "name9", field: "name9", align: "left" },
        { name: "name10", label: "КБК", field: "name10", align: "left" },
        { name: "name11", label: "Сумма", field: "name11", align: "left" },
        { name: "name12", label: "Сумма", field: "name12", align: "left" },
        { name: "name13", label: "name13", field: "name13", align: "left" }
      ],
      data: []
    };
  },
  created() {
    if (this.$q.localStorage.getItem("data") != null) {
      this.data = this.$q.localStorage.getItem("data");
    } else {
      this.data = [];
    }
    if (this.$q.localStorage.getItem("visibleColumns") != null) {
      this.visibleColumns = this.$q.localStorage.getItem("visibleColumns");
    } else {
      this.visibleColumns = [
        "name1",
        "name2",
        "name3",
        "name4",
        "name5",
        "name6",
        "name7",
        "name8",
        "name9",
        "name10",
        "name11",
        "name12",
        "name13"
      ];
      this.$q.localStorage.set("visibleColumns", this.visibleColumns);
    }
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
          dataResponse.forEach((row, index) => {
            row.index = index;
          });
          Object.freeze(dataResponse);
          this.data = dataResponse;
          if (this.$q.localStorage.getItem("visibleColumns") != null) {
            this.visibleColumns = this.$q.localStorage.getItem(
              "visibleColumns"
            );
          } else {
            this.visibleColumns = [
              "name1",
              "name2",
              "name3",
              "name4",
              "name5",
              "name6",
              "name7",
              "name8",
              "name9",
              "name10",
              "name11",
              "name12",
              "name13"
            ];
            this.$q.localStorage.set("visibleColumns", this.visibleColumns);
          }
          this.$q.localStorage.set("data", this.data);
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    visibleEdit() {
      this.$q.localStorage.set("visibleColumns", this.visibleColumns);
    }
  }
};
</script>
