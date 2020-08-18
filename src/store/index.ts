import { store } from 'quasar/wrappers';
import Vuex from 'vuex';

import user from './user';
import { UserStateInterface } from './user/state';

import calendar from './user';
import { CalendarStateInterface } from './calendar/state';

import event from './user';
import { EventStateInterface } from './event/state';

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export interface StateInterface {
  // Define your own store structure, using submodules if needed
  // example: ExampleStateInterface;
  // Declared as unknown to avoid linting issue. Best to strongly type as per the line above.
  user: UserStateInterface;
  calendar: CalendarStateInterface;
  event: EventStateInterface;
}

export default store(function ({ Vue }) {
  Vue.use(Vuex);

  const Store = new Vuex.Store<StateInterface>({
    modules: {
      user,
      calendar,
      event
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: !!process.env.DEV
  });

  return Store;
});
