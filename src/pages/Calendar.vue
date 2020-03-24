<template>
  <q-page>
    <q-toolbar>
      <q-breadcrumbs>
        <q-breadcrumbs-el label="Главная страница" to="/index" />
        <q-breadcrumbs-el label="Календари" to="" v-on:click="calendars()" />
        <q-breadcrumbs-el :label="this.$store.state.calendar.calendar.title" />
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
              <q-date v-model="date" :events="dates" event-color="orange" />
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
      icon="edit"
      color="orange"
      style="position: absolute; right: 160px; bottom: 60px"
      v-on:click="confirmEditCalendar()"
    />
    <q-btn
      fab
      icon="add"
      color="green"
      style="position: absolute; right: 100px; bottom: 60px"
      v-on:click="createCalendar()"
    />
    <q-btn
      fab
      icon="delete"
      color="red"
      style="position: absolute; right: 40px; bottom: 60px"
      v-on:click="confirmDeleteCalendar()"
    />
    <q-dialog v-model="deleteConfirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="delete" color="red" text-color="white" />
          <span class="q-ml-sm" style="font-size:16px"
            >Вы действительно хотите удалить этот календарь?</span
          >
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            flat
            label="Да"
            color="green"
            v-close-popup
            v-on:click="deleteCalendar()"
          />
          <q-btn flat label="Нет" color="red" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="editConfirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="edit" color="blue" text-color="white" />
          <span class="q-ml-sm" style="font-size:16px"
            >Редактирование календаря</span
          >
        </q-card-section>
        <q-card-section class="q-pt-none q-gutter-md" style="max-width: 300px">
          <q-input
            rounded
            outlined
            v-model="calendarTitle"
            label="Название календаря"
          />
          <q-input
            label="Описание календаря"
            v-model="calendarText"
            filled
            type="textarea"
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            flat
            label="Сохранить"
            color="green"
            v-close-popup
            v-on:click="editCalendar()"
          />
          <q-btn flat label="Отмена" color="red" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      splitterModel: 50,
      date: "2019/02/01",
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
    confirmDeleteCalendar() {
      this.deleteConfirm = true;
    },
    deleteCalendar() {
      this.$store.dispatch("calendar/deleteCalendar", {
        app: this,
        login: this.$store.state.user.login,
        password: this.$store.state.user.password,
        id: this.$store.state.calendar.calendar.id
      });
    },
    confirmEditCalendar() {
      this.editConfirm = true;
    },
    editCalendar() {}
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
