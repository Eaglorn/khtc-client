import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { EventStateInterface } from './state';

const getters: GetterTree<EventStateInterface, StateInterface> = {
  getEvents(state) {
    return state.events;
  },
  getDates(state) {
    return state.dates;
  }
};

export default getters;