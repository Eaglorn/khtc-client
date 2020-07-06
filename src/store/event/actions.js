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
        value.app.$store.state.event.events.filter(
          event => event.id !== value.id
        )
      );
    })
    .catch(function(err) {
      console.log(err);
    });
}
