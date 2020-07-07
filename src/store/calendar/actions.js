export function updateCalendar(context, value) {
  context.commit("updateCalendar", value);
}

export function updateCalendars(context, value) {
  context.commit("updateCalendars", value);
}

export function updateCalendarTitle(context, value) {
  context.commit("updateCalendarTitle", value);
}

export function updateCalendarText(context, value) {
  context.commit("updateCalendarText", value);
}

export function getCalendar(context, { app, id }) {
  app.$q.loading.show();
  app
    .$axios({
      method: "post",
      url: "http://46.8.146.12:4000/api/user/calendar",
      data: { id: id },
      timeout: 5000,
      responseType: "json"
    })
    .then(response => {
      var items = [];
      response.data.dates.forEach(event => {
        items.push(event.date);
      });
      context.commit("updateCalendar", response.data.calendar);
      context.commit("updateCalendarTitle", response.data.calendar.title);
      context.commit("updateCalendarText", response.data.calendar.text);
      app.$store.dispatch("event/updateDates", items);
      app.$store.dispatch("event/updateEvents", response.data.events);
      if (app.$route.path !== "/calendar") {
        app.$router.push("/calendar");
      }
      app.$q.loading.hide();
    })
    .catch(function(err) {
      console.log(err);
    });
}

export function createCalendar(context, { app, login, password, title, text }) {
  app.$q.loading.show();
  app
    .$axios({
      method: "post",
      url: "http://46.8.146.12:4000/api/user/calendar/create",
      data: {
        login: login,
        password: password,
        title: title,
        text: text
      },
      timeout: 5000,
      responseType: "json"
    })
    .then(response => {
      context.commit("updateCalendar", response.data.calendar);
      var dates = [];
      response.data.events.forEach(event => {
        dates.push(event.date);
      });
      app.$store.dispatch("event/updateDates", dates);
      app.$store.dispatch("event/updateEvents", response.data.events);
      if (app.$route.path !== "/calendar") {
        app.$router.push("/calendar");
      }
      app.$q.loading.hide();
    })
    .catch(function(err) {
      console.log(err);
    });
}

export function getCalendars(context, { app, login }) {
  app.$q.loading.show();
  app
    .$axios({
      method: "post",
      url: "http://46.8.146.12:4000/api/user/calendars",
      data: { login: login },
      timeout: 5000,
      responseType: "json"
    })
    .then(response => {
      context.commit("updateCalendars", response.data.calendars);
      if (app.$route.path !== "/calendars") {
        app.$router.push("/calendars");
      }
      app.$q.loading.hide();
    })
    .catch(function(err) {
      console.log(err);
    });
}

export function deleteCalendar(context, { app, id }) {
  app.$q.loading.show();
  app
    .$axios({
      method: "post",
      url: "http://46.8.146.12:4000/api/user/calendar/delete",
      data: { id: id },
      timeout: 5000,
      responseType: "json"
    })
    .then(() => {
      context.commit(
        "updateCalendars",
        app.$store.state.calendar.calendars.filter(
          calendar => calendar.id !== id
        )
      );
      app.$q.loading.hide();
    })
    .catch(function(err) {
      console.log(err);
    });
}

export function editCalendar(context, { app, id, title, text }) {
  app.$q.loading.show();
  app
    .$axios({
      method: "post",
      url: "http://46.8.146.12:4000/api/user/calendar/edit",
      data: {
        id: id,
        title: title,
        text: text
      },
      timeout: 5000,
      responseType: "json"
    })
    .then(() => {
      var items = app.$store.state.calendar.calendars.slice();
      items.forEach(function(item, i, items) {
        if (item.id === id) {
          item.title = title;
          item.text = text;
        }
      });
      context.commit("updateCalendars", items);
      app.$q.loading.hide();
    })
    .catch(function(err) {
      console.log(err);
    });
}
