<template>
  <q-layout view="hHh Lpr lff" class="shadow-2 rounded-borders">
    <q-header elevated>
      <q-toolbar>
        <!--<q-btn
          v-if="auth"
          flat
          @click="drawer = !drawer"
          round
          dense
          icon="menu"
        />-->
        <q-btn v-if="auth" flat round dense icon="menu" @click="show(true)" />

        <q-toolbar-title>Электронный Помощник ХТК</q-toolbar-title>
        <q-btn
          dense
          color="purple"
          round
          icon="people"
          class="q-ml-md"
          v-if="auth"
        >
          <!--<q-badge color="red" floating>{{ peoples }}</q-badge>-->
        </q-btn>
        <span>&nbsp;&nbsp;&nbsp;</span>
        <q-btn push v-if="!auth" color="secondary" label="Войти" to="/login" />
        <q-btn
          push
          v-if="auth"
          v-on:click="exit()"
          color="red"
          label="Выйти"
          to="/login"
        />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-if="auth"
      v-model="drawer"
      show-if-above
      :mini="miniState"
      @mouseover="miniState = false"
      @mouseout="miniState = true"
      :width="200"
      :breakpoint="500"
      bordered
      content-class="bg-grey-3"
    >
      <q-scroll-area class="fit">
        <q-list padding>
          <q-item clickable v-ripple v-on:click="profile()">
            <q-item-section avatar>
              <i class="fad fa-id-badge fa-2x"></i>
            </q-item-section>
            <q-item-section>
              <q-item-label>Профиль</q-item-label>
            </q-item-section>
          </q-item>
          <q-separator />
          <q-item clickable v-ripple v-on:click="calendars()">
            <q-item-section avatar>
              <i class="far fa-calendar-alt fa-2x"></i>
            </q-item-section>
            <q-item-section>
              <q-item-label>Календари</q-item-label>
            </q-item-section>
          </q-item>
          <q-separator />
        </q-list>
      </q-scroll-area>
    </q-drawer>
    <br />
    <q-page-container>
      <router-view></router-view>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from '@vue/composition-api';

import { StateInterface } from '../store/';
import { Store } from 'vuex';

import { BottomSheet } from 'quasar';

let drawer = ref(false);
let miniState = ref(true);

function getAuth(store: Store<unknown>) {
  const auth = computed(() => (<StateInterface>store.state).user.auth);
  return {
    auth
  };
}

export default defineComponent({
  name: 'MyLayout',
  setup(props, context) {
    const store = context.root.$store;

    function exit() {
      void store.dispatch('user/exit');
    }

    function calendars() {
      void store.dispatch('calendar/getCalendars', context);
    }

    function show(grid: boolean) {
      BottomSheet.create({
        dark: true,
        message: 'Меню',
        grid,
        actions: [
          {
            label: 'Профиль',
            icon: 'fad fa-id-badge fa-color-white',
          },
          {
            label: 'Календари',
            icon: 'far fa-calendar-alt fa-color-white',
          }
        ]
      })
        .onOk((action: { label: string }) => {
          if (action.label === 'Профиль') {
          } else if (action.label === 'Календари') {
            void store.dispatch('calendar/getCalendars', context);
          }
        })
    }
    return { drawer, miniState, ...getAuth(store), exit, calendars, show };
  }
});
</script>

<style lang="sass">
.fa-color-white
  color: white !important
</style>
