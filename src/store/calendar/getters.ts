import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { CalendarStateInterface } from './state';

const getters: GetterTree<CalendarStateInterface, StateInterface> = {
  getCalendar (state) {
    return state.calendar;
  },

  getCalendars (state) {
    return state.calendars;
  }
};

export default getters;
