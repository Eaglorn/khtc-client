<template>
  <q-page>
    <div class="row justify-center">
      <div class="col-4">
        <q-card>
          <q-card-section>
            <div class="text-h4">Авторизация</div>
          </q-card-section>
          <q-card-section>
            <q-form class="q-gutter-md" @submit="onSubmit">
              <q-input
                v-model="login"
                :rules="[val => (val && val.length > 0) || 'Введите логин']"
                filled
                label="Логин *"
                lazy-rules
              />
              <q-input
                v-model="password"
                :rules="[val => (val && val.length > 0) || 'Введите пароль']"
                type="password"
                filled
                label="Пароль *"
                lazy-rules
              />
              <div class="row justify-center">
                <q-btn type="submit" label="Войти" color="primary" />
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
