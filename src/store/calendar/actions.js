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
      data: { login: value.login, password: value.password, id: value.id },
      timeout: 5000,
      responseType: "json"
    })
    .then(response => {
      if (response.data.success === false) {
        value.app.$q.notify({
          color: "negative",
          position: "top",
          message: "Неверная авторизация",
          icon: "report_problem"
        });
      } else {
        context.commit("updateCalendar", {
          calendar: response.data.calendar,
          events: response.data.events
        });
        context.commit("updateCalendarTitle", response.data.calendar.title);
        context.commit("updateCalendarText", response.data.calendar.text);
        var items = [];
        response.data.events.forEach(event => {
          items.push(event.date);
        });
        context.commit("updateDates", items);
        if (value.app.$route.path !== "/calendar") {
          value.app.$router.push("/calendar");
        }
      }
    })
    .catch(response => {
      value.app.$q.notify({
        color: "negative",
        position: "top",
        message: "Нет соединения с сервером",
        icon: "report_problem"
      });
    });
}

export function createCalendar(context, value) {
  value.app
    .$axios({
      method: "post",
      url: "http://46.8.146.12:4000/api/user/calendar/create",
      data: { login: value.login, password: value.password, title: value.title, text: value.text },
      timeout: 5000,
      responseType: "json"
    })
    .then(response => {
      if (response.data.success === false) {
        value.app.$q.notify({
          color: "negative",
          position: "top",
          message: "Неверная авторизация",
          icon: "report_problem"
        });
      } else {
        context.commit("updateCalendar", {
          calendar: response.data.calendar,
          events: response.data.events
        });
        var items = [];
        response.data.events.forEach(event => {
          items.push(event.date);
        });
        context.commit("updateDates", items);
        if (value.app.$route.path !== "/calendar") {
          value.app.$router.push("/calendar");
        }
      }
    })
    .catch(response => {
      value.app.$q.notify({
        color: "negative",
        position: "top",
        message: "Нет соединения с сервером",
        icon: "report_problem"
      });
    });
}

export function getCalendars(context, value) {
  value.app
    .$axios({
      method: "post",
      url: "http://46.8.146.12:4000/api/user/calendars",
      data: { login: value.login, password: value.password },
      timeout: 5000,
      responseType: "json"
    })
    .then(response => {
      if (response.data.success === false) {
        value.app.$q.notify({
          color: "negative",
          position: "top",
          message: "Неверная авторизация",
          icon: "report_problem"
        });
      } else {
        context.commit("updateCalendars", response.data.calendars);
        if (value.app.$route.path !== "/calendars") {
          value.app.$router.push("/calendars");
        }
      }
    })
    .catch(response => {
      value.app.$q.notify({
        color: "negative",
        position: "top",
        message: "Нет соединения с сервером",
        icon: "report_problem"
      });
    });
}

export function deleteCalendar(context, value) {
  value.app
    .$axios({
      method: "post",
      url: "http://46.8.146.12:4000/api/user/calendar/delete",
      data: { login: value.login, password: value.password, id: value.id },
      timeout: 5000,
      responseType: "json"
    })
    .then(response => {
      if (response.data.success === false) {
        value.app.$q.notify({
          color: "negative",
          position: "top",
          message: "Неверная авторизация",
          icon: "report_problem"
        });
      } else {
        context.commit(
          "updateCalendars",
          value.app.$store.state.calendar.calendars.filter(
            calendar => calendar.id !== value.id
          )
        );
      }
    })
    .catch(response => {
      value.app.$q.notify({
        color: "negative",
        position: "top",
        message: "Нет соединения с сервером",
        icon: "report_problem"
      });
    });
}

export function editCalendar(context, value) {
  value.app
    .$axios({
      method: "post",
      url: "http://46.8.146.12:4000/api/user/calendar/edit",
      data: {
        login: value.login,
        password: value.password,
        id: value.id,
        title: value.title,
        text: value.text
      },
      timeout: 5000,
      responseType: "json"
    })
    .then(response => {
      if (response.data.success === false) {
        value.app.$q.notify({
          color: "negative",
          position: "top",
          message: "Неверная авторизация",
          icon: "report_problem"
        });
      } else {
        var items = value.app.$store.state.calendar.calendars.slice();
        items.forEach(function(item, i, items) {
          console.log(item);
          if (item.id === value.id) {
            item.title = value.title;
            item.text = value.text;
          }
        });
        context.commit("updateCalendars", items);
      }
    })
    .catch(response => {
      value.app.$q.notify({
        color: "negative",
        position: "top",
        message: "Нет соединения с сервером",
        icon: "report_problem"
      });
    });
}
