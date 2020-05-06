export function updateCalendar(state, value) {
  state.calendar = value.calendar;
  state.events = value.events;
}

export function updateCalendars(state, value) {
  state.calendars = value;
}

export function updateEvents(state, value) {
  state.events = value;
}

export function updateDates(state, value) {
  state.dates = value;
}

export function updateCalendarTitle(state, value) {
  state.calendarFormTitle = value;
}

export function updateCalendarText(state, value) {
  state.calendarFormText = value;
}
