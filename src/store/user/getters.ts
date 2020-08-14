import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { UserStateInterface } from './state';

const getters: GetterTree<UserStateInterface, StateInterface> = {
  auth(state) {
    return state.auth;
  },

  login(state) {
    return state.login;
  },
  
  password(state) {
    return state.password;
  }
};

export default getters;
