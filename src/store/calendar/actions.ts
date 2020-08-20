import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { CalendarStateInterface, CalendarInterface } from './state';
import { Loading, Cookies, Notify } from 'quasar';
import axios from 'axios';
import { EventInterface } from '../event/state'
import { SetupContext } from '@vue/composition-api';

const actions: ActionTree<CalendarStateInterface, StateInterface> = {
  updateCalendar(context, value) {
    this.commit('updateCalendar', value);
  },

  updateCalendars(context, value) {
    this.commit('updateCalendars', value);
  },

  updateCalendarTitle(context, value) {
    this.commit('updateCalendarTitle', value);
  },

  updateCalendarText(context, value) {
    this.commit('updateCalendarText', value);
  },

  getCalendar(context, { app, id }: { app: SetupContext, id : number }) {
    Loading.show();
      axios({
        method: 'post',
        url: 'http://46.8.146.12:4000/api/user/calendar',
        data: { id: id },
        timeout: 5000,
        responseType: 'json'
      })
      .then(response => {
        const items: string[] = [];
        for (const event of (<{dates: [{ date:string }]}> response.data).dates) {
          items.push(event.date);
        }
        this.commit('updateCalendar', (<{calendar: CalendarInterface}> response.data).calendar);
        this.commit('updateCalendarTitle', (<{calendar: CalendarInterface}> response.data).calendar.title);
        this.commit('updateCalendarText', (<{calendar: CalendarInterface}> response.data).calendar.text);
        void this.dispatch('event/updateDates', items);
        void this.dispatch('event/updateEvents', (<{events: EventInterface}>response.data).events);
        if (app.root.$route.path !== '/calendar') {
          void app.root.$router.push('/calendar');
        }
        Loading.hide();
      })
      .catch(function(err) {
        console.log(err);
        Loading.hide();
      });
  },

  getCalendars(context, { app, login } : {app: SetupContext, login: string}) {
    Loading.show();
    axios({
        method: 'post',
        url: 'http://46.8.146.12:4000/api/user/calendars',
        data: { login: login },
        timeout: 5000,
        responseType: 'json'
      })
      .then(response => {
        context.commit('updateCalendars', (<{calendars: CalendarInterface[]}> response.data).calendars);
        if (app.root.$route.path !== '/calendars') {
          void app.root.$router.push('/calendars');
        }
        Loading.hide();
      })
      .catch(function(err) {
        console.log(err);
        Loading.hide();
      });
  },

  deleteCalendar(context, {id } : {id: number}) {
    Loading.show();
    axios({
        method: 'post',
        url: 'http://46.8.146.12:4000/api/user/calendar/delete',
        data: { id: id },
        timeout: 5000,
        responseType: 'json'
      })
      .then(() => {
        context.commit(
          'updateCalendars',
          context.state.calendars.filter(
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

  editCalendar(context, { id, title, text } : {id: number, title: string, text: string}) {
    Loading.show();
    axios({
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
        const items = context.state.calendars.slice();
        items.forEach(function(item) {
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
