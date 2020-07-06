export function updateCalendar(context, value) {
  context.commit("updateCalendar", value);
}

export function updateCalendars(context, value) {
  context.commit("updateCalendars", value);
}

export function updateDates(context, value) {
  context.commit("updateDates", value);
}

export function updateCalendarTitle(context, value) {
  context.commit("updateCalendarTitle", value);
}

export function updateCalendarText(context, value) {
  context.commit("updateCalendarText", value);
}

export function getCalendar(context, { app, id }) {
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
      context.commit("event/updateDates", items);
      context.commit("updateCalendar", {
        calendar: response.data.calendar,
        events: response.data.events
      });
      context.commit("updateCalendarTitle", response.data.calendar.title);
      context.commit("updateCalendarText", response.data.calendar.text);
      if (app.$route.path !== "/calendar") {
        app.$router.push("/calendar");
      }
    })
    .catch(function(err) {
      console.log(err);
    });
}

export function createCalendar(context, { app, login, password, title, text }) {
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
      context.commit("updateCalendar", {
        calendar: response.data.calendar,
        events: response.data.events
      });
      var dates = [];
      response.data.events.forEach(event => {
        dates.push(event.date);
      });
      app.$store.dispatch("event/updateDates", dates);
      if (app.$route.path !== "/calendar") {
        app.$router.push("/calendar");
      }
    })
    .catch(function(err) {
      console.log(err);
    });
}

export function getCalendars(context, { app, login }) {
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
    })
    .catch(function(err) {
      console.log(err);
    });
}

export function deleteCalendar(context, { app, id }) {
  app
    .$axios({
      method: "post",
      url: "http://46.8.146.12:4000/api/user/calendar/delete",
      data: { id: id },
      timeout: 5000,
      responseType: "json"
    })
    .then(response => {
      context.commit(
        "updateCalendars",
        app.$store.state.calendar.calendars.filter(
          calendar => calendar.id !== id
        )
      );
    })
    .catch(function(err) {
      console.log(err);
    });
}

export function editCalendar(context, { app, id, title, text }) {
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
    .then(response => {
      var items = app.$store.state.calendar.calendars.slice();
      items.forEach(function(item, i, items) {
        if (item.id === id) {
          item.title = title;
          item.text = text;
        }
      });
      context.commit("updateCalendars", items);
    })
    .catch(function(err) {
      console.log(err);
    });
}
