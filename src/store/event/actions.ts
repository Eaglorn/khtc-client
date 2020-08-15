import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { EventStateInterface } from './state';
import { Loading } from 'quasar';
import axios from 'axios';

const actions: ActionTree<EventStateInterface, StateInterface> = {
  updateDates(context, value) {
    context.commit('updateDates', value);
  },

  updateEvents(context, value) {
    context.commit('updateEvents', value);
  },

  getDatesMonth(context, { id, month, year }) {
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
        const dates = [];
        response.data.events.forEach(event => {
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

  getEventsDay(context, { app, id, day, month, year }) {
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
        context.commit('updateEvents', response.data.events);
        Loading.hide();
      })
      .catch(function(err) {
        console.log(err);
        Loading.hide();
      });
  },

  deleteEvent(context, { app, id }) {
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
          app.$store.state.event.events.filter(event => event.id !== id)
        );
        context.commit('updateDates', response.data.dates);
        Loading.hide();
      })
      .catch(function(err) {
        console.log(err);
        Loading.hide();
      });
  },

  createEvent(context, { app, title, text, calendar, date }) {
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
          id: response.data.id,
          title: title,
          text: text,
          calendar: calendar,
          date: date
        });
        let isData = false;
        app.$store.state.event.dates.forEach(storeDate => {
          if (storeDate === date) {
            isData = true;
          }
        });
        if (!isData) {
          const dates = [];
          app.$store.state.event.dates.forEach(storeDate => {
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
