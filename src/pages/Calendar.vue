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
                @input="calendarPickDate"
                ref="calendar"
                v-on:click="calendarClick()"
              />
            </div>
          </template>
          <q-list>
            <div v-for="event in events" :key="event.id">
              <q-item clickable>
                <q-item-section side>
                  <q-badge color="teal" :label="event.id" />
                </q-item-section>
                <q-item-section v-ripple>
                  <q-item-label style="font-size: 24px;">{{
                    event.title
                  }}</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-fab
                    external-label
                    color="primary"
                    icon="keyboard_arrow_right"
                    direction="right"
                    :hide-label="true"
                  >
                    <q-fab-action
                      :hide-label="true"
                      color="warning"
                      icon="edit"
                    />
                    <q-fab-action
                      :hide-label="true"
                      color="negative"
                      @click="confirmDeleteEvent(event.id)"
                      icon="delete"
                    />
                  </q-fab>
                </q-item-section>
              </q-item>

              <q-separator spaced inset />
            </div>
          </q-list>
        </q-splitter>
      </div>
    </div>
    <q-btn
      fab
      icon="add"
      color="green"
      style="position: absolute; right: 40px; bottom: 60px"
      v-on:click="createEvent()"
    />
    <q-dialog v-model="createConfirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="calendar_today" color="green" text-color="white" />
          <span class="q-ml-sm" style="font-size:16px"
            >Создание нового события</span
          >
        </q-card-section>
        <q-card-section class="q-pt-none q-gutter-md" style="max-width: 300px">
          <q-input
            rounded
            outlined
            v-model="createEventTitle"
            label="Название календаря"
          />
          <q-input
            label="Описание календаря"
            v-model="createEventText"
            filled
            type="textarea"
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            flat
            label="Да"
            color="green"
            v-close-popup
            v-on:click="createEvent()"
          />
          <q-btn flat label="Нет" color="red" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="deleteConfirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="delete" color="red" text-color="white" />
          <span class="q-ml-sm" style="font-size:16px"
            >Вы действительно хотите удалить это событие?</span
          >
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            flat
            label="Да"
            color="green"
            v-close-popup
            v-on:click="deleteEvent()"
          />
          <q-btn flat label="Нет" color="red" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
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
      createEventTitle: "",
      createEventText: "",
      createConfirm: false,
      deleteConfirm: false
    };
  },
  methods: {
    calendars() {
      this.$store.dispatch("calendar/getCalendars", {
        app: this,
        login: this.$store.state.user.login
      });
    },
    calendarClick() {
      console.log(this.$refs.calendar.value);
      if (
        this.innerMonth !== this.$refs.calendar.innerModel.month ||
        this.innerYear !== this.$refs.calendar.innerModel.year
      ) {
        this.innerMonth = this.$refs.calendar.innerModel.month;
        this.innerYear = this.$refs.calendar.innerModel.year;
        this.$store.dispatch("calendar/getDatesMonth", {
          app: this,
          id: this.$store.state.calendar.calendar.id,
          month: this.innerMonth,
          year: this.innerYear
        });
      }
    },
    calendarPickDate(value, reason, details) {
      if (details.changed === true) {
        this.$store.dispatch("calendar/getEventsDay", {
          app: this,
          id: this.$store.state.calendar.calendar.id,
          day: details.day,
          month: details.month,
          year: details.year
        });
      }
    },
    confirmDeleteEvent(id) {
      this.deleteConfirm = true;
      this.deleteId = id;
    },
    deleteEvent() {
      this.$store.dispatch("calendar/deleteEvent", {
        app: this,
        login: this.$store.state.user.login,
        id: this.deleteId
      });
    },
    confirmCreateEvent() {
      this.createEventTitle = "";
      this.createEventText = "";
      this.createConfirm = true;
    },
    createEvent() {
      this.$store.dispatch("calendar/createEvent", {
        app: this,
        title: this.createCalendarTitle,
        text: this.createCalendarText,
        calendar: this.$store.state.calendar.calendar.id
      });
    }
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
