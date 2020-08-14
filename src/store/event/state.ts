export interface EventInterface {
  id: number;
  title: string;
  text: string;
  calendar: number;
  date: string;
}

export interface EventStateInterface {
  events: [EventInterface];
  dates: [string];
}

const state: EventStateInterface = {
  events: [
    {
      id: 0,
      title: '',
      text: '',
      calendar: 0,
      date: ''
    }
  ],
  dates: ['']
};

export default state;
