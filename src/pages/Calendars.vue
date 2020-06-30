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
                        @click="
                          confirmEditCalendar(
                            calendar.id,
                            calendar.title,
                            calendar.text
                          )
                        "
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
      v-on:click="confirmCreateCalendar()"
    />
    <q-dialog v-model="createConfirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="calendar_today" color="green" text-color="white" />
          <span class="q-ml-sm" style="font-size:16px"
            >Создание нового календаря</span
          >
        </q-card-section>
        <q-card-section class="q-pt-none q-gutter-md" style="max-width: 300px">
          <q-input
            rounded
            outlined
            v-model="createCalendarTitle"
            label="Название календаря"
          />
          <q-input
            label="Описание календаря"
            v-model="createCalendarText"
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
            v-on:click="createCalendar()"
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
            v-model="editCalendarTitle"
            label="Название календаря"
          />
          <q-input
            label="Описание календаря"
            v-model="editCalendarText"
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
      createConfirm: false,
      deleteConfirm: false,
      editConfirm: false,
      deleteId: 0,
      editId: 0,
      createCalendarTitle: "",
      createCalendarText: "",
      editCalendarTitle: "",
      editCalendarText: ""
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
    confirmCreateCalendar() {
      this.createCalendarTitle = "";
      this.createCalendarText = "";
      this.createConfirm = true;
    },
    createCalendar() {
      this.$store.dispatch("calendar/createCalendar", {
        app: this,
        login: this.$store.state.user.login,
        password: this.$store.state.user.password,
        title: this.createCalendarTitle,
        text: this.createCalendarText
      });
    },
    confirmDeleteCalendar(id) {
      this.deleteConfirm = true;
      this.deleteId = id;
    },
    deleteCalendar() {
      this.$store.dispatch("calendar/deleteCalendar", {
        app: this,
        login: this.$store.state.user.login,
        password: this.$store.state.user.password,
        id: this.deleteId
      });
    },
    confirmEditCalendar(id, titile, text) {
      this.editCalendarTitle = titile;
      this.editCalendarText = text;
      this.editConfirm = true;
      this.editId = id;
    },
    editCalendar() {
      this.$store.dispatch("calendar/editCalendar", {
        app: this,
        login: this.$store.state.user.login,
        password: this.$store.state.user.password,
        id: this.editId,
        title: this.editCalendarTitle,
        text: this.editCalendarText
      });
    }
  }
};
</script>
