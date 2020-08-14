import { MutationTree } from 'vuex';
import { UserStateInterface } from './state';

const mutation: MutationTree<UserStateInterface> = {
  updateAuth(state, value: boolean) {
    state.auth = value;
  },
  
  updateLogin(state, value: string) {
    state.login = value;
  },

  updatePassword(state, value: string) {
    state.password = value;
  }
};

export default mutation;
