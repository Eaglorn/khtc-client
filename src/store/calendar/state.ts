export interface CalendarInterface {
  title: string;
  text: string;
}

export interface CalendarStateInterface {
  calendar: CalendarInterface;
  calendarFormTitle: string;
  calendarFormText: string;
  calendars: [];
}

const state: CalendarStateInterface = {
  calendar: {
    title: '',
    text: ''
  },
  calendarFormTitle: '',
  calendarFormText: '',
  calendars: []
};

export default state;
