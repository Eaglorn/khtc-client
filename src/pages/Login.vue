<template>
  <q-page padding>
    <div class="row justify-center">
      <div class="col-4">
        <q-card>
          <q-card-section>
            <div class="text-h4">Авторизация</div>
          </q-card-section>
          <q-card-section>
            <q-form @submit="onSubmit" class="q-gutter-md">
              <q-input
                filled
                v-model="login"
                label="Логин *"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Введите логин']"
              />
              <q-input
                filled
                type="password"
                v-model="password"
                label="Пароль *"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Введите пароль']"
              />
              <div class="row justify-center">
                <q-btn label="Войти" type="submit" color="primary" />
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      login: null,
      password: null
    };
  },

  methods: {
    onSubmit() {
      this.$store.dispatch("user/auth", {
        app: this,
        login: this.login,
        password: this.password
      });
    }
  }
};
</script>
