<template>
  <div class="column items-center" style="width: 100%">
    <div class="col" style="width: 400px">
      <q-splitter v-model="splitterModel" style="height: 450px; width: 800px;">
        <template v-slot:before>
          <div class="q-pa-md">
            <q-date v-model="date" :events="dates" event-color="orange" />
          </div>
        </template>

        <template v-slot:after>
          <q-tab-panels
            v-model="dates"
            animated
            transition-prev="jump-up"
            transition-next="jump-up"
          >
            <div v-for="event in events" :key="event.id">
              <q-tab-panel :name="event.date">
                <div class="text-h4 q-mb-md">{{ event.title }}</div>
                <p>
                  {{ event.text }}
                </p>
              </q-tab-panel>
            </div>
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
      date: "2019/02/01"
    };
  },
  computed: {
    events: {
      get() {
        return this.$store.state.calendar.events;
      },
      set(val) {
        this.$store.commit("calendar/updateEvents", val);
      }
    },
    dates: {
      get() {
        return this.$store.state.calendar.dates;
      },
      set(val) {
        this.$store.commit("calendar/updateDates", val);
      }
    }
  }
};
</script>
