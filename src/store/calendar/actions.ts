import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { CalendarStateInterface } from './state';
import { Loading } from 'quasar';
import axios from 'axios'

const actions: ActionTree<CalendarStateInterface, StateInterface> = {
  updateCalendar(context, value) {
    context.commit('updateCalendar', value);
  },

  updateCalendars(context, value) {
    context.commit('updateCalendars', value);
  },

  updateCalendarTitle(context, value) {
    context.commit('updateCalendarTitle', value);
  },

  updateCalendarText(context, value) {
    context.commit('updateCalendarText', value);
  },

  getCalendar(context, id: number ) {
    Loading.show();
      axios({
        method: 'post',
        url: 'http://46.8.146.12:4000/api/user/calendar',
        data: { id: id },
        timeout: 5000,
        responseType: 'json'
      })
      .then(response => {
        const items = [];
        response.data.dates.forEach(event => {
          items.push(event.date);
        });
        context.commit('updateCalendar', response.data.calendar);
        context.commit('updateCalendarTitle', response.data.calendar.title);
        context.commit('updateCalendarText', response.data.calendar.text);
        app.$store.dispatch('event/updateDates', items);
        app.$store.dispatch('event/updateEvents', response.data.events);
        if (app.$route.path !== '/calendar') {
          app.$router.push('/calendar');
        }
        Loading.hide();
      })
      .catch(function(err) {
        console.log(err);
        Loading.hide();
      });
  },

  getCalendars(context, { app, login }) {
    Loading.show();
    app
      .$axios({
        method: 'post',
        url: 'http://46.8.146.12:4000/api/user/calendars',
        data: { login: login },
        timeout: 5000,
        responseType: 'json'
      })
      .then(response => {
        context.commit('updateCalendars', response.data.calendars);
        if (app.$route.path !== '/calendars') {
          app.$router.push('/calendars');
        }
        Loading.hide();
      })
      .catch(function(err) {
        console.log(err);
        Loading.hide();
      });
  },

  deleteCalendar(context, { app, id }) {
    Loading.show();
    app
      .$axios({
        method: 'post',
        url: 'http://46.8.146.12:4000/api/user/calendar/delete',
        data: { id: id },
        timeout: 5000,
        responseType: 'json'
      })
      .then(() => {
        context.commit(
          'updateCalendars',
          app.$store.state.calendar.calendars.filter(
            calendar => calendar.id !== id
          )
        );
        Loading.hide();
      })
      .catch(function(err) {
        console.log(err);
        Loading.hide();
      });
  },

  editCalendar(context, { app, id, title, text }) {
    Loading.show();
    app
      .$axios({
        method: 'post',
        url: 'http://46.8.146.12:4000/api/user/calendar/edit',
        data: {
          id: id,
          title: title,
          text: text
        },
        timeout: 5000,
        responseType: 'json'
      })
      .then(() => {
        const items = app.$store.state.calendar.calendars.slice();
        items.forEach(function(item, i, items) {
          if (item.id === id) {
            item.title = title;
            item.text = text;
          }
        });
        context.commit('updateCalendars', items);
        Loading.hide();
      })
      .catch(function(err) {
        console.log(err);
        Loading.hide();
      });
  }
};

export default actions;
