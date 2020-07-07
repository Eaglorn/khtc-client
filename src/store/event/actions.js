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
        app.$store.state.event.events.filter(
          event => event.id !== id
        )
      );
      context.commit("updateDates", response.data.events);
      app.$q.loading.hide();
    })
    .catch(function(err) {
      console.log(err);
    });
}
