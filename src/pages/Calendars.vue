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
            <div class="text-h3 text-center">КАЛЕНДАРИ</div>
          </q-card-section>
          <template>
            <q-list>
              <div
                v-for="calendar in this.$store.state.calendar.calendars"
                :key="calendar.id"
              >
                <q-item clickable v-ripple v-on:click="toCalendar(calendar.id)">
                  <q-item-section>
                    <q-item-label style="font-size: 24px;">{{
                      calendar.title
                    }}</q-item-label>
                    <q-item-label caption style="font-size: 16px;">{{
                      calendar.text
                    }}</q-item-label>
                  </q-item-section>

                  <q-item-section side>
                    <q-badge color="teal" :label="calendar.id" />
                  </q-item-section>
                </q-item>

                <q-separator spaced inset />
              </div>
            </q-list>
          </template>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  data() {
    return {};
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
    }
  }
};
</script>
