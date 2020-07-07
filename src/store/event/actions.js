export function updateDates(context, value) {
  context.commit("updateDates", value);
}

export function updateEvents(context, value) {
  context.commit("updateEvents", value);
}

export function getDatesMonth(context, { app, id, month, year }) {
  app.$q.loading.show();
  app
    .$axios({
      method: "post",
      url: "http://46.8.146.12:4000/api/user/calendar/dates/month",
      data: {
        id: id,
        month: month - 1,
        year: year
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
      app.$q.loading.hide();
    })
    .catch(function(err) {
      console.log(err);
      app.$q.loading.hide();
    });
}

export function getEventsDay(context, { app, id, day, month, year }) {
  app.$q.loading.show();
  app
    .$axios({
      method: "post",
      url: "http://46.8.146.12:4000/api/user/calendar/events/day",
      data: {
        id: id,
        day: day,
        month: month - 1,
        year: year
      },
      timeout: 5000,
      responseType: "json"
    })
    .then(response => {
      context.commit("updateEvents", response.data.events);
      app.$q.loading.hide();
    })
    .catch(function(err) {
      console.log(err);
      app.$q.loading.hide();
    });
}

export function deleteEvent(context, { app, id }) {
  app.$q.loading.show();
  app
    .$axios({
      method: "post",
      url: "http://46.8.146.12:4000/api/user/calendar/event/delete",
      data: { id: id },
      timeout: 5000,
      responseType: "json"
    })
    .then(response => {
      context.commit(
        "updateEvents",
        app.$store.state.event.events.filter(event => event.id !== id)
      );
      context.commit("updateDates", response.data.dates);
      app.$q.loading.hide();
    })
    .catch(function(err) {
      console.log(err);
      app.$q.loading.hide();
    });
}

export function createEvent(context, { app, title, text, calendar, date }) {
  app.$q.loading.show();
  app
    .$axios({
      method: "post",
      url: "http://46.8.146.12:4000/api/user/calendar/event/create",
      data: { title: title, text: text, calendar: calendar, date: date },
      timeout: 5000,
      responseType: "json"
    })
    .then(response => {
      date = date.substring(0, date.length - 5);
      context.commit("pushEvent", {
        id: response.data.id,
        title: title,
        text: text,
        calendar: calendar,
        date: date
      });
      var isData = false;
      app.$store.state.event.dates.forEach(storeDate => {
        if (storeDate === date) {
          isData = true;
        }
      });
      if (!isData) {
        var dates = [];
        app.$store.state.event.dates.forEach(storeDate => {
          dates.push(storeDate);
        });
        dates.push(date);
        context.commit("updateDates", dates);
      }
      app.$q.loading.hide();
    })
    .catch(function(err) {
      console.log(err);
      app.$q.loading.hide();
    });
}
