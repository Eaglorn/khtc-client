

export interface CalendarInterface {
  id: number;
  title: string;
  text: string;
}

export interface CalendarStateInterface {
  calendar: CalendarInterface;
  calendarFormTitle: string;
  calendarFormText: string;
  calendars: CalendarInterface[];
}

const state: CalendarStateInterface = {
  calendar: {
    id: 0,
    title: '',
    text: ''
  },
  calendarFormTitle: '',
  calendarFormText: '',
  calendars: []
};

export default state;
