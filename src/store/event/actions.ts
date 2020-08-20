import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { EventStateInterface, EventInterface } from './state';
import { Loading } from 'quasar';
import axios from 'axios';

const actions: ActionTree<EventStateInterface, StateInterface> = {
  updateDates(context, value) {
    context.commit('updateDates', value);
  },

  updateEvents(context, value) {
    context.commit('updateEvents', value);
  },

  getDatesMonth(context, { id, month, year } : {id: number, month: number, year: number}) {
    Loading.show();
    axios({
      method: 'post',
      url: 'http://46.8.146.12:4000/api/user/calendar/dates/month',
      data: {
        id: id,
        month: month - 1,
        year: year
      },
      timeout: 5000,
      responseType: 'json'
    })
      .then(response => {
        const dates: string[] = [];
        (<{events: EventInterface[]}> response.data).events.forEach(event => {
          dates.push(event.date);
        });
        context.commit('updateDates', dates);
        Loading.hide();
      })
      .catch(function(err) {
        console.log(err);
        Loading.hide();
      });
  },

  getEventsDay(context, { id, day, month, year } : {id: number, day: number, month: number, year: number}) {
    Loading.show();
    axios({
      method: 'post',
      url: 'http://46.8.146.12:4000/api/user/calendar/events/day',
      data: {
        id: id,
        day: day,
        month: month - 1,
        year: year
      },
      timeout: 5000,
      responseType: 'json'
    })
      .then(response => {
        context.commit('updateEvents', (<{events: EventInterface[]}> response.data).events);
        Loading.hide();
      })
      .catch(function(err) {
        console.log(err);
        Loading.hide();
      });
  },

  deleteEvent(context, { id } : { id: number }) {
    Loading.show();
    axios({
      method: 'post',
      url: 'http://46.8.146.12:4000/api/user/calendar/event/delete',
      data: { id: id },
      timeout: 5000,
      responseType: 'json'
    })
      .then(response => {
        context.commit(
          'updateEvents',
          context.state.events.filter(event => event.id !== id)
        );
        context.commit('updateDates', (<{dates: string[]}> response.data).dates);
        Loading.hide();
      })
      .catch(function(err) {
        console.log(err);
        Loading.hide();
      });
  },

  createEvent(context, { title, text, calendar, date } : { title: string, text: string, calendar: number, date: string }) {
    Loading.show();
    axios({
      method: 'post',
      url: 'http://46.8.146.12:4000/api/user/calendar/event/create',
      data: { title: title, text: text, calendar: calendar, date: date },
      timeout: 5000,
      responseType: 'json'
    })
      .then(response => {
        date = date.substring(0, date.length - 5);
        context.commit('pushEvent', {
          id: (<{id: number}> response.data).id,
          title: title,
          text: text,
          calendar: calendar,
          date: date
        });
        let isData = false;
        context.state.dates.forEach(storeDate => {
          if (storeDate === date) {
            isData = true;
          }
        });
        if (!isData) {
          const dates = [];
          context.state.dates.forEach(storeDate => {
            dates.push(storeDate);
          });
          dates.push(date);
          context.commit('updateDates', dates);
        }
        Loading.hide();
      })
      .catch(function(err) {
        console.log(err);
        Loading.hide();
      });
  }
};

export default actions;
