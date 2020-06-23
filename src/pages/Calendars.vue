<template>
  <q-page>
    <q-toolbar>
      <q-breadcrumbs>
        <q-breadcrumbs-el label="Главная страница" to="/index" />
        <q-breadcrumbs-el label="Календари" />
      </q-breadcrumbs>
    </q-toolbar>
    <div class="row justify-center">
      <div class="col-4">
        <q-card>
          <q-card-section>
            <div
              class="text-h3 text-center"
              v-if="this.$store.state.calendar.calendars.length === 0"
            >
              У вас нет созданных календарей...
            </div>
            <div class="text-h3 text-center" v-else>КАЛЕНДАРИ</div>
          </q-card-section>
          <template>
            <q-list>
              <div
                v-for="calendar in this.$store.state.calendar.calendars"
                :key="calendar.id"
              >
                <q-item clickable>
                  <q-item-section side>
                    <q-badge color="teal" :label="calendar.id" />
                  </q-item-section>
                  <q-item-section v-ripple v-on:click="toCalendar(calendar.id)">
                    <q-item-label style="font-size: 24px;">{{
                      calendar.title
                    }}</q-item-label>
                    <q-item-label caption style="font-size: 16px;">{{
                      calendar.text
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
                        @click="confirmEditCalendar(calendar.id)"
                        icon="edit"
                      />
                      <q-fab-action
                        :hide-label="true"
                        color="negative"
                        @click="confirmDeleteCalendar(calendar.id)"
                        icon="delete"
                      />
                    </q-fab>
                  </q-item-section>
                </q-item>

                <q-separator spaced inset />
              </div>
            </q-list>
          </template>
        </q-card>
      </div>
    </div>
    <q-btn
      fab
      icon="add"
      color="green"
      style="position: absolute; right: 40px; bottom: 60px"
      v-on:click="createCalendar()"
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
      fab: [],
      deleteConfirm: false,
      editConfirm: false
    };
  },
  computed: {
    calendars: {
      get() {
        return this.$store.state.calendar.calendars;
      },
      set(val) {
        this.$store.commit("calendar/updateCalendars", val);
      }
    }
  },
  methods: {
    toCalendar(id) {
      this.$store.dispatch("calendar/getCalendar", {
        app: this,
        login: this.$store.state.user.login,
        password: this.$store.state.user.password,
        id: id
      });
    },
    createCalendar() {
      this.$store.dispatch("calendar/createCalendar", {
        app: this,
        login: this.$store.state.user.login,
        password: this.$store.state.user.password
      });
    },
    confirmDeleteCalendar(id) {
      this.deleteConfirm = true;
      this.deletId = id;
    },
    deleteCalendar() {
      this.$store.dispatch("calendar/deleteCalendar", {
        app: this,
        login: this.$store.state.user.login,
        password: this.$store.state.user.password,
        id: this.deletId
      });
    },
    confirmEditCalendar() {
      this.editConfirm = true;
    },
    editCalendar() {
      this.$store.dispatch("calendar/editCalendar", {
        app: this,
        login: this.$store.state.user.login,
        password: this.$store.state.user.password,
        id: this.$store.state.calendar.calendar.id,
        title: this.$store.state.calendar.calendarFormTitle,
        text: this.$store.state.calendar.calendarFormText
      });
    },
    calendarTitle: {
      get() {
        return this.$store.state.calendar.calendarFormTitle;
      },
      set(val) {
        this.$store.commit("calendar/updateCalendarTitle", val);
      }
    },
    calendarText: {
      get() {
        return this.$store.state.calendar.calendarFormText;
      },
      set(val) {
        this.$store.commit("calendar/updateCalendarText", val);
      }
    }
  }
};
</script>
