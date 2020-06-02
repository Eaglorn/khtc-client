<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          v-if="auth"
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
          flat
          dense
          round
          icon="menu"
        />

        <q-toolbar-title>Электронный Помощник ХТК</q-toolbar-title>
        <q-btn-group push>
          <q-btn
            push
            v-if="auth"
            v-on:click="profile()"
            color="green"
            label="Профиль"
          />
          <q-separator dark vertical />
          <q-btn
            push
            v-if="!auth"
            color="secondary"
            label="Войти"
            to="/login"
          />
          <q-btn
            push
            v-if="auth"
            v-on:click="exit()"
            color="red"
            label="Выйти"
            to="/login"
          />
        </q-btn-group>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-if="auth"
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-2"
    >
      <q-list bordered separator padding class="rounded-borders">
        <q-item-label header>Меню</q-item-label>
        <q-item clickable v-ripple v-on:click="calendars()">
          <q-item-section avatar>
            <q-icon name="man" />
          </q-item-section>
          <q-item-section>
            <q-item-label style="font-size:24px;"
              ><i class="fad fa-calendar-alt fa-2x"></i> Календари</q-item-label
            >
            <q-item-label caption></q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable v-ripple v-on:click="statement()">
          <q-item-section avatar>
            <q-icon name="man" />
          </q-item-section>
          <q-item-section>
            <q-item-label style="font-size:24px;"
              ><i class="fas fa-cabinet-filing"></i> Заявления</q-item-label
            >
            <q-item-label caption></q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>
    <br />
    <q-page-container>
      <router-view></router-view>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: "MyLayout",

  data() {
    return {
      leftDrawerOpen: false
    };
  },
  methods: {
    exit() {
      this.$store.dispatch("user/exit");
    },
    calendars() {
      this.$store.dispatch("calendar/getCalendars", {
        app: this,
        login: this.$store.state.user.login,
        password: this.$store.state.user.password
      });
    }
  },
  computed: {
    auth: {
      get() {
        return this.$store.state.user.auth;
      },
      set(value) {
        this.$store.dispatch("user/updateAuth", value);
      }
    }
  }
};
</script>
