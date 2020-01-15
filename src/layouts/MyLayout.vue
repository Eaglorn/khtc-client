<template>
  <q-layout view='lHh Lpr lFf'>
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round @click='leftDrawerOpen = !leftDrawerOpen' icon='menu' aria-label='Menu' v-if='auth' />

        <q-toolbar-title>
          Quasar App
        </q-toolbar-title>

        <q-btn color='secondary' label='Войти' to="/login" v-if='!auth' />
        <q-btn color='red' label='Выйти' to="/login" v-if='auth' v-on:click="exit()"/>
      </q-toolbar>
    </q-header>

    <q-drawer v-model='leftDrawerOpen' show-if-above bordered content-class='bg-grey-2' v-if='auth'>
      <q-list>
        <q-item-label header>Header</q-item-label>
        <q-item clickable tag='a' target='_blank' href='https://quasar.dev'>
          <q-item-section avatar>
            <q-icon name='school' />
          </q-item-section>
          <q-item-section>
            <q-item-label>Docs</q-item-label>
            <q-item-label caption>quasar.dev</q-item-label>
          </q-item-section>
        </q-item>
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
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { Cookies } from 'quasar'

export default {
  name: 'MyLayout',

  data () {
    return {
      leftDrawerOpen: false
    }
  },
  methods: {
    exit () {
      this.$store.dispatch('user/updateAuth', false)
      this.$store.dispatch('user/updateLogin', '')
      this.$store.dispatch('user/updatePassword', '')
      Cookies.remove('auth')
      Cookies.remove('login')
      Cookies.remove('password')
      if (this.$route.path !== '/index') this.$router.push('/index')
    },
    onLoad () {
      if (Cookies.get('auth') === true) {
        this.$axios({
          method: 'post',
          url: 'http://46.8.146.12:4300/api/authorization',
          data: { login: Cookies.get('login'), password: Cookies.get('password') },
          timeout: 5000,
          responseType: 'json'
        })
          .then((response) => {
            if (response.datalogin === false) {
              this.$q.notify({ color: 'negative', position: 'top', message: 'Пользователя с таким логином нет', icon: 'report_problem' })
            } else {
              if (response.data.password === false) {
                this.$q.notify({ color: 'negative', position: 'top', message: 'Не верный пароль', icon: 'report_problem' })
              } else {
                this.$q.notify({ color: 'teal', position: 'top', message: '<i class="fad fa-check-circle"></i> Успешно', html: true })
                this.$store.dispatch('user/updateAuth', true)
                this.$store.dispatch('user/updateLogin', Cookies.get('login'))
                this.$store.dispatch('user/updatePassword', Cookies.get('password'))
                Cookies.set('auth', this.$store.getters['user/auth'], { expires: 1 })
                Cookies.set('login', this.$store.getters['user/login'], { expires: 1 })
                Cookies.set('password', this.$store.getters['user/password'], { expires: 1 })
                if (this.$route.path !== '/index') this.$router.push('/index')
              }
            }
          })
          .catch(() => {
            this.$q.notify({ color: 'negative', position: 'top', message: 'Ошибка отправки', icon: 'report_problem' })
          })
      } else {
        if (this.$route.path !== '/login') this.$router.push('/login')
      }
    }
  },
  created () {
    this.onLoad()
  },
  computed: {
    auth: {
      get () {
        return this.$store.getters['user/auth']
      },
      set (val) {
        this.$store.dispatch('user/updateAuth', val)
      }
    }
  }
}
</script>
