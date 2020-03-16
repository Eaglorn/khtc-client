export function updateCalendars(context, value) {
  context.commit("updateCalendars", value);
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
        if (value.app.$route.path !== "/profile") {
          value.app.$router.push("/profile");
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
