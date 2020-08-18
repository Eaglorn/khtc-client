import { MutationTree } from 'vuex';
import { CalendarStateInterface } from './state';
import { CalendarInterface } from './state';

const mutation: MutationTree<CalendarStateInterface> = {
  updateCalendar (state, value: CalendarInterface) {
    state.calendar = value;
  },

  updateCalendars (state, value: []) {
    state.calendars = value;
  },

  updateCalendarTitle (state, value: string) {
    state.calendar.title = value;
  },

  updateCalendarText (state, value: string) {
    state.calendar.text = value;
  },
};

export default mutation;
