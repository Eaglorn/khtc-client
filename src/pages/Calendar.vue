<template>
  <q-page>
    <q-toolbar>
      <q-breadcrumbs>
        <q-breadcrumbs-el label="Главная страница" to="/index" />
        <q-breadcrumbs-el label="Календари" to="" v-on:click="calendars()" />
        <q-breadcrumbs-el :label="calendarTitle" />
      </q-breadcrumbs>
    </q-toolbar>
    <div class="row items-center">
      <div class="col-1"></div>
      <div class="col-3">
        <div
          class="q-pa-md"
          style="max-width: 350px; height: 408px; padding: 16px;"
        >
          <q-card flat bordered>
            <q-card-section>
              <div class="text-h5" style="font-weight: bold;">
                {{ calendarTitle }}
              </div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              {{ calendarText }}
            </q-card-section>
          </q-card>
        </div>
      </div>
      <div class="col-8">
        <q-splitter
          v-model="splitterModel"
          style="height: 450px; width: 800px;"
        >
          <template v-slot:before>
            <div class="q-pa-md">
              <q-date
                v-model="date"
                :events="dates"
                event-color="orange"
                input=""
                ref="calendar"
                v-on:click="calendarClick()"
              />
            </div>
          </template>
          <template v-slot:after>
            <q-tab-panels
              v-model="date"
              animated
              transition-prev="jump-up"
              transition-next="jump-up"
              v-for="event in events"
              :key="event.id"
            >
              <q-tab-panel :name="event.date">
                <div class="text-h4 q-mb-md">{{ event.title }}</div>
                <p>
                  {{ event.text }}
                </p>
              </q-tab-panel>
            </q-tab-panels>
          </template>
        </q-splitter>
      </div>
    </div>
    <q-btn
      fab
      icon="add"
      color="green"
      style="position: absolute; right: 160px; bottom: 60px"
      v-on:click="createEvent()"
    />
    <q-btn
      fab
      icon="edit"
      color="orange"
      style="position: absolute; right: 100px; bottom: 60px"
      v-on:click="confirmEditEvent()"
    />
    <q-btn
      fab
      icon="delete"
      color="red"
      style="position: absolute; right: 40px; bottom: 60px"
      v-on:click="confirmDeleteEvent()"
    />
  </q-page>
</template>

<script>
import { date } from "quasar";

export default {
  data() {
    return {
      splitterModel: 50,
      date: date.formatDate(Date.now(), "YYYY/MM/DD"),
      innerMonth: 0,
      innerYear: 0,
      deleteConfirm: false,
      editConfirm: false
    };
  },
  methods: {
    calendars() {
      this.$store.dispatch("calendar/getCalendars", {
        app: this,
        login: this.$store.state.user.login,
        password: this.$store.state.user.password
      });
    },
    calendarClick() {
      if (
        this.innerMonth !== this.$refs.calendar.innerModel.month ||
        this.innerYear !== this.$refs.calendar.innerModel.year
      ) {
        this.innerMonth = this.$refs.calendar.innerModel.month;
        this.innerYear = this.$refs.calendar.innerModel.year;
        this.$store.dispatch("calendar/getEventsMonth", {
          app: this,
          login: this.$store.state.user.login,
          password: this.$store.state.user.password,
          id: this.$store.state.calendar.calendar.id,
          month: this.innerMonth,
          year: this.innerYear
        });
      }
    },
    createEvent() {}
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
    },
    calendarTitle: {
      get() {
        return this.$store.state.calendar.calendar.title;
      },
      set(val) {
        this.$store.commit("calendar/updateCalendarTitle", val);
      }
    },
    calendarText: {
      get() {
        return this.$store.state.calendar.calendar.text;
      },
      set(val) {
        this.$store.commit("calendar/updateCalendarText", val);
      }
    }
  }
};
</script>
