<template>
  <q-page padding>
    <div class="row justify-center">
      <div class="col-4">
        <q-card class="login-card">
          <q-card-section>
            <q-form @submit="onSubmit" class="q-gutter-md">
              <q-input filled v-model="login" label="Логин *" lazy-rules :rules="[ val => val && val.length > 0 || 'Введите логин']" />
              <q-input filled type="password" v-model="password" label="Пароль *" lazy-rules :rules="[ val => val && val.length > 0 || 'Введите пароль']" />
              <div class="row justify-center">
                <q-btn label="Войти" type="submit" color="primary"/>
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { Cookies } from 'quasar'

export default {
  data () {
    return {
      login: null,
      password: null
    }
  },

  methods: {
    onSubmit () {
      this.$axios({
        method: 'post',
        url: 'http://46.8.146.12:4300/api/authorization',
        data: { login: this.login, password: this.password },
        timeout: 5000,
        responseType: 'json'
      })
        .then((response) => {
          console.log(response.data)
          if (response.datalogin === false) {
            this.$q.notify({ color: 'negative', position: 'top', message: 'Пользователя с таким логином нет', icon: 'report_problem' })
          } else {
            if (response.data.password === false) {
              this.$q.notify({ color: 'negative', position: 'top', message: 'Не верный пароль', icon: 'report_problem' })
            } else {
              this.$q.notify({ color: 'teal', position: 'top', message: '<i class="fad fa-check-circle"></i> Успешно', html: true })
              this.$store.dispatch('user/updateAuth', true)
              this.$store.dispatch('user/updateLogin', this.login)
              this.$store.dispatch('user/updatePassword', this.password)
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
    }
  }
}
</script>
