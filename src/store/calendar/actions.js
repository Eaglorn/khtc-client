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

export function getCalendar(context, value) {
  value.app
    .$axios({
      method: "post",
      url: "http://46.8.146.12:4000/api/user/calendar",
      data: { id: value.id },
      timeout: 5000,
      responseType: "json"
    })
    .then(response => {
      var items = [];
      response.data.dates.forEach(event => {
        items.push(event.date);
      });
      context.commit("updateDates", items);
      context.commit("updateCalendar", {
        calendar: response.data.calendar,
        events: response.data.events
      });
      context.commit("updateCalendarTitle", response.data.calendar.title);
      context.commit("updateCalendarText", response.data.calendar.text);
      if (value.app.$route.path !== "/calendar") {
        value.app.$router.push("/calendar");
      }
    })
    .catch(function(err) {
      console.log(err);
    });
}

export function createCalendar(context, value) {
  value.app
    .$axios({
      method: "post",
      url: "http://46.8.146.12:4000/api/user/calendar/create",
      data: {
        login: value.login,
        password: value.password,
        title: value.title,
        text: value.text
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
      context.commit("updateDates", dates);
      if (value.app.$route.path !== "/calendar") {
        value.app.$router.push("/calendar");
      }
    })
    .catch(function(err) {
      console.log(err);
    });
}

export function getCalendars(context, value) {
  value.app
    .$axios({
      method: "post",
      url: "http://46.8.146.12:4000/api/user/calendars",
      data: { login: value.login },
      timeout: 5000,
      responseType: "json"
    })
    .then(response => {
      context.commit("updateCalendars", response.data.calendars);
      if (value.app.$route.path !== "/calendars") {
        value.app.$router.push("/calendars");
      }
    })
    .catch(function(err) {
      console.log(err);
    });
}

export function deleteCalendar(context, value) {
  value.app
    .$axios({
      method: "post",
      url: "http://46.8.146.12:4000/api/user/calendar/delete",
      data: { id: value.id },
      timeout: 5000,
      responseType: "json"
    })
    .then(response => {
      context.commit(
        "updateCalendars",
        value.app.$store.state.calendar.calendars.filter(
          calendar => calendar.id !== value.id
        )
      );
    })
    .catch(function(err) {
      console.log(err);
    });
}

export function editCalendar(context, value) {
  value.app
    .$axios({
      method: "post",
      url: "http://46.8.146.12:4000/api/user/calendar/edit",
      data: {
        id: value.id,
        title: value.title,
        text: value.text
      },
      timeout: 5000,
      responseType: "json"
    })
    .then(response => {
      var items = value.app.$store.state.calendar.calendars.slice();
      items.forEach(function(item, i, items) {
        if (item.id === value.id) {
          item.title = value.title;
          item.text = value.text;
        }
      });
      context.commit("updateCalendars", items);
    })
    .catch(function(err) {
      console.log(err);
    });
}

export function getDatesMonth(context, value) {
  value.app
    .$axios({
      method: "post",
      url: "http://46.8.146.12:4000/api/user/calendar/dates/month",
      data: {
        id: value.id,
        month: value.month - 1,
        year: value.year
      },
      timeout: 5000,
      responseType: "json"
    })
    .then(response => {
      var dates = [];
      response.data.events.forEach(event => {
        dates.push(event.date);
      });
      context.commit("updateDates", dates);
    })
    .catch(function(err) {
      console.log(err);
    });
}

export function getEventsDay(context, value) {
  value.app
    .$axios({
      method: "post",
      url: "http://46.8.146.12:4000/api/user/calendar/events/day",
      data: {
        id: value.id,
        day: value.day,
        month: value.month - 1,
        year: value.year
      },
      timeout: 5000,
      responseType: "json"
    })
    .then(response => {
      context.commit("updateEvents", response.data.events);
    })
    .catch(function(err) {
      console.log(err);
    });
}

export function deleteEvent(context, value) {
  value.app
    .$axios({
      method: "post",
      url: "http://46.8.146.12:4000/api/user/calendar/event/delete",
      data: { id: value.id },
      timeout: 5000,
      responseType: "json"
    })
    .then(response => {
      context.commit(
        "updateEvents",
        value.app.$store.state.calendar.events.filter(
          event => event.id !== value.id
        )
      );
    })
    .catch(function(err) {
      console.log(err);
    });
}
