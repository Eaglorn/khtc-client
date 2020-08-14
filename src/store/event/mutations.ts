import { MutationTree } from 'vuex';
import { EventStateInterface } from './state';
import { EventInterface } from './state';

const mutation: MutationTree<EventStateInterface> = {
  updateEvents(state, value: [EventInterface]) {
    state.events = value;
  },
  updateDates(state, value: [string]) {
    state.dates = value;
  },
  pushEvent(state, { id, title, text, calendar, date }: EventInterface) {
    const event: EventInterface = {
      id: id,
      title: title,
      text: text,
      calendar: calendar,
      date: date
    };
    state.events.push(event);
  }
};

export default mutation;
