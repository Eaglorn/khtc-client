<template>
  <q-layout view='lHh Lpr lFf'>
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round @click='leftDrawerOpen = !leftDrawerOpen' icon='menu' aria-label='Menu' v-if='auth' />

        <q-toolbar-title> КГБ ПОУ ХТК </q-toolbar-title>

        <q-btn color='secondary' label='Войти' to="/login" v-if='!auth' />
        <q-btn color='red' label='Выйти' to="/login" v-if='auth' v-on:click="exit()"/>
      </q-toolbar>
    </q-header>

    <q-drawer v-model='leftDrawerOpen' show-if-above bordered content-class='bg-grey-2' v-if='auth'>
      <q-list>
        <q-item-label header>Header</q-item-label>
        <q-item clickable v-on:click='setting()'>
          <q-item-section avatar>
            <q-icon name='build' />
          </q-item-section>
          <q-item-section>
            <q-item-label>Настройки</q-item-label>
            <q-item-label caption></q-item-label>
          </q-item-section>
        </q-item>
        <!--
        <q-item clickable tag='a' target='_blank' href='https://github.quasar.dev'>
          <q-item-section avatar>
            <q-icon name='code' />
          </q-item-section>
          <q-item-section>
            <q-item-label>Github</q-item-label>
            <q-item-label caption>github.com/quasarframework</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag='a' target='_blank' href='https://chat.quasar.dev'>
          <q-item-section avatar>
            <q-icon name='chat' />
          </q-item-section>
          <q-item-section>
            <q-item-label>Discord Chat Channel</q-item-label>
            <q-item-label caption>chat.quasar.dev</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag='a' target='_blank' href='https://forum.quasar.dev'>
          <q-item-section avatar>
            <q-icon name='record_voice_over' />
          </q-item-section>
          <q-item-section>
            <q-item-label>Forum</q-item-label>
            <q-item-label caption>forum.quasar.dev</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag='a' target='_blank' href='https://twitter.quasar.dev'>
          <q-item-section avatar>
            <q-icon name='rss_feed' />
          </q-item-section>
          <q-item-section>
            <q-item-label>Twitter</q-item-label>
            <q-item-label caption>@quasarframework</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag='a' target='_blank' href='https://facebook.quasar.dev'>
          <q-item-section avatar>
            <q-icon name='public' />
          </q-item-section>
          <q-item-section>
            <q-item-label>Facebook</q-item-label>
            <q-item-label caption>@QuasarFramework</q-item-label>
          </q-item-section>
        </q-item>
        -->
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'MyLayout',

  data () {
    return {
      leftDrawerOpen: false
    }
  },
  methods: {
    exit () {
      this.$store.dispatch('user/exit')
      if (this.$route.path !== '/login') this.$router.push('/login')
    },
    setting () {
      this.$store.dispatch('setting/getDate', { app: this })
      if (this.$route.path !== '/setting') this.$router.push('/setting')
    }
  },
  computed: {
    auth: {
      get () {
        return this.$store.getters['user/auth']
      },
      set (value) {
        this.$store.dispatch('user/updateAuth', value)
      }
    }
  }
}
</script>
