<template>
  <!--<q-page class="flex flex-center">
    <img src="~assets/logo.png" alt="ХТК Лого" width="250px" />
  </q-page>-->
  <q-page>
    <div class="row justify-center">
      <div class="col-4">
        <q-card>
          <q-card-section>
            <div class="text-h4">Проверка</div>
          </q-card-section>
          <q-card-section>
            <q-form class="q-gutter-md">
              <q-input v-model="numb" filled label="Текст *" lazy-rules />
              <div class="row justify-center">
                <q-btn
                  v-on:click="updateNumb()"
                  label="Отправить"
                  color="primary"
                />
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
    return {};
  },

  methods: {
    updateNumb() {
      this.$socket.client.emit("SEND_NUMB", {
        numb: this.numb
      });
    }
  },

  sockets: {
    connect: function() {
      console.log("socket connected");
    },
    NUMB: function(data) {
      console.log(data.numb);
      this.$store.dispatch("socket/updateNumb", data.numb);
    }
  },

  computed: {
    numb: {
      get() {
        return this.$store.state.socket.numb;
      },
      set(val) {
        this.$store.commit("socket/updateNumb", val);
      }
    }
  }
};
</script>
