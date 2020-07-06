export function updateCalendar(state, value) {
  state.calendar = value;
}

export function updateCalendars(state, value) {
  state.calendars = value;
}

export function updateCalendarTitle(state, value) {
  state.calendar.title = value;
}

export function updateCalendarText(state, value) {
  state.calendar.text = value;
}
