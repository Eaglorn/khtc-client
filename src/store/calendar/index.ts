import { Module } from 'vuex';
import { StateInterface } from '../index';
import state, { CalendarStateInterface } from './state';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const calendarModule: Module<CalendarStateInterface, StateInterface> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state
};

export default calendarModule;
