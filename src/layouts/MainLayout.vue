<template>
  <q-layout view="hHh Lpr lff" class="shadow-2 rounded-borders">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          v-if="auth"
          flat
          @click="drawer = !drawer"
          round
          dense
          icon="menu"
        />

        <q-toolbar-title>Электронный Помощник ХТК</q-toolbar-title>
        <q-btn
          dense
          color="purple"
          round
          icon="people"
          class="q-ml-md"
          v-if="auth"
        >
          <q-badge color="red" floating>{{ peoples }}</q-badge>
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
          <q-item clickable v-ripple v-on:click="documents()">
            <q-item-section avatar>
              <i class="fad fa-id-badge fa-2x"></i>
            </q-item-section>
            <q-item-section>
              <q-item-label>Документооборот</q-item-label>
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Store } from 'vuex';
import { UserStateInterface } from '../store/user/state';

export default defineComponent({
  name: 'MyLayout',
  setup(props, context) {
    const store = context.root.$store;
    let drawer = ref(false);
    let miniState = ref(true);

    console.log(store.getters);

    const auth = computed(() => {
      (<UserStateInterface> store.state).auth;
    });

    function exit() {
      void store.dispatch('user/exit');
    }

    return { drawer, miniState, auth, exit };
  }
});
</script>
