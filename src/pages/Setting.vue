<template>
  <q-page padding>
    <div class="row justify-center">
      <q-card>
        <q-card-section>
          <div class="text-h4">Настройки</div>
        </q-card-section>
        <q-card-section class="q-gutter-md">
          <q-form @submit="onSubmit" class="q-gutter-md">
            <q-date v-model="date" today-btn/>
            <div class="row justify-center">
              <q-btn label="Сохранить" type="submit" color="green"/>
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
export default {
  data () {
    return { }
  },

  methods: {
    onSubmit () {
      this.$axios({
        method: 'post',
        url: 'http://46.8.146.12:4300/api/set/date',
        data: { date: this.date },
        timeout: 5000,
        responseType: 'json'
      })
        .then((response) => {
          this.$store.dispatch('setting/updateDate', this.date)
        })
        .catch(() => {
          this.$q.notify({ color: 'negative', position: 'top', message: 'Ошибка сохранения', icon: 'report_problem' })
        })
    }
  },
  computed: {
    date: {
      get () {
        return this.$store.getters['setting/date']
      },
      set (value) {
        this.$store.dispatch('setting/updateDate', value)
      }
    }
  }
}
</script>
