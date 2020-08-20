import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { UserStateInterface } from './state';
import { Loading, Cookies, Notify } from 'quasar';
import axios from 'axios';
import { SetupContext } from '@vue/composition-api';

const actions: ActionTree<UserStateInterface, StateInterface> = {
  exit(context) {
    context.commit('updateAuth', false);
    Cookies.remove('login');
    Cookies.remove('password');
  },
  updateAuth(context, value) {
    context.commit('updateAuth', value);
  },
  auth(context, { app, login, password }: { app: SetupContext, login : string, password : string }) {
    Loading.show();
    axios({
        method: 'post',
        url: 'http://46.8.146.12:4000/api/user/authorization',
        data: { login: login, password: password },
        timeout: 5000,
        responseType: 'json'
      })
      .then(response => {
        if ((<{login: boolean}> response.data).login === false) {
          Notify.create({
            color: 'negative',
            position: 'top',
            message: 'Пользователя с таким логином нет',
            icon: 'report_problem'
          });
        } else {
          if ((<{password: boolean}> response.data).password === false) {
            Notify.create({
              color: 'negative',
              position: 'top',
              message: 'Не верный пароль',
              icon: 'report_problem'
            });
          } else {
            context.commit('updateAuth', true);
            context.commit('updateLogin', login);
            try {
              Cookies.set('login', login, { expires: 3 });
            } catch (e) {
              console.log(e);
            }
            context.commit('updatePassword', password);
            try {
              Cookies.set('password', password, {
                expires: 3
              });
            } catch (e) {
              console.log(e);
            }
            //app.$socket.client.open();
            if (app.root.$route.path !== '/index') {
              void app.root.$router.push('/index');
            }
          }
        }
        Loading.hide();
      })
      .catch(function(err) {
        console.log(err);
        Loading.hide();
      });
  }
}

export default actions;
