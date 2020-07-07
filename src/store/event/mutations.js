export function updateEvents(state, value) {
  state.events = value;
}

export function updateDates(state, value) {
  state.dates = value;
}

export function pushEvent(state, { id, title, text, calendar, date }) {
  var event = {
    id: id,
    title: title,
    text: text,
    calendar: calendar,
    date: date
  };
  state.events.push(event);
}
