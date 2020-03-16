<template>
  <div class="column items-center" style="width: 100%">
    <div class="col" style="width: 400px">
      <q-splitter v-model="splitterModel" style="height: 450px; width: 800px;">
        <template v-slot:before>
          <div class="q-pa-md">
            <q-date v-model="date" :events="events" event-color="orange" />
          </div>
        </template>

        <template v-slot:after>
          <q-tab-panels
            v-model="date"
            animated
            transition-prev="jump-up"
            transition-next="jump-up"
          >
            <q-tab-panel name="2019/02/01">
              <div class="text-h4 q-mb-md">2019/02/01</div>
              <p>
                Починить компьютер
              </p>
            </q-tab-panel>

            <q-tab-panel name="2019/02/05">
              <div class="text-h4 q-mb-md">2019/02/05</div>
              <p>
                Провести сетевой кабель
              </p>
            </q-tab-panel>

            <q-tab-panel name="2019/02/06">
              <div class="text-h4 q-mb-md">2019/02/06</div>
              <p>
                Настроить программу
              </p>
            </q-tab-panel>
          </q-tab-panels>
        </template>
      </q-splitter>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      splitterModel: 50,
      date: "2019/02/01",
      events: ["2019/02/01", "2019/02/05", "2019/02/06"]
    };
  },

  methods: {
    onSubmit() {
      this.$axios({
        method: "post",
        url: "http://46.8.146.12:4300/api/set/date",
        data: { date: this.date },
        timeout: 5000,
        responseType: "json"
      })
        .then(response => {
          this.$store.dispatch("setting/updateDate", this.date);
        })
        .catch(() => {
          this.$q.notify({
            color: "negative",
            position: "top",
            message: "Ошибка сохранения",
            icon: "report_problem"
          });
        });
    }
  }
};
</script>
