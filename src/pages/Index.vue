<template>
  <!-- <q-page class="flex flex-center">-->
  <q-page style="padding-top:5px;padding-left:5px;padding-right:5px;font-size:20px!iportant;">
    <!-- <img src="~assets/logo.png" alt="ХТК Лого" width="250px" /> -->
    <q-file color="lime-11" bg-color="green-3" filled v-model="model" @input="fileLoad">
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
        <div class="col-2 q-table__title">Treats</div>

        <q-space />

        <div v-if="$q.screen.gt.xs" class="col">
          <q-toggle v-model="visibleColumns" val="name1" label="name1" />
          <q-toggle v-model="visibleColumns" val="name2" label="name2" />
          <q-toggle v-model="visibleColumns" val="name3" label="name3" />
          <q-toggle v-model="visibleColumns" val="name4" label="name4" />
          <q-toggle v-model="visibleColumns" val="name5" label="name5" />
          <q-toggle v-model="visibleColumns" val="name6" label="name6" />
          <q-toggle v-model="visibleColumns" val="name7" label="name7" />
          <q-toggle v-model="visibleColumns" val="name8" label="name8" />
          <q-toggle v-model="visibleColumns" val="name9" label="name9" />
          <q-toggle v-model="visibleColumns" val="name10" label="name13" />
          <q-toggle v-model="visibleColumns" val="name11" label="name11" />
          <q-toggle v-model="visibleColumns" val="name12" label="name12" />
          <q-toggle v-model="visibleColumns" val="name13" label="name13" />
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
    </q-table>
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
          dataResponse.forEach((row, index) => {
            row.index = index;
          });
          Object.freeze(dataResponse);
          this.data = dataResponse;
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  },
  computed: {
    visibleColumns: {
      get() {
        console.log(this.$q.cookies);
        if (this.$q.cookies.get("visibleColumns") === null) {
          return [
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
        } else {
          return this.$q.cookies.get("visibleColumns");
        }
      },
      set(val) {
        this.$q.cookies.set("visibleColumns", val, { expires: 99999 });
      }
    }
  }
};
</script>
