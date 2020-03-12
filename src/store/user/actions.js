export function exit(context) {
  context.commit("updateAuth", false);
}

export function updateAuth(context, value) {
  context.commit("updateAuth", value);
}

export function auth(context, value) {
  value.app
    .$axios({
      method: "post",
      url: "http://46.8.146.12:4000/api/authorization",
      data: { login: value.login, password: value.password },
      timeout: 5000,
      responseType: "json"
    })
    .then(response => {
      if (response.data.login === false) {
        value.app.$q.notify({
          color: "negative",
          position: "top",
          message: "Пользователя с таким логином нет",
          icon: "report_problem"
        });
      } else {
        if (response.data.password === false) {
          value.app.$q.notify({
            color: "negative",
            position: "top",
            message: "Не верный пароль",
            icon: "report_problem"
          });
        } else {
          value.app.$q.notify({
            color: "teal",
            position: "top",
            message: "<i class='fad fa-check-circle'></i> Успешный вход",
            html: true
          });
          context.commit("updateAuth", true);
          context.commit("updateLogin", value.login);
          context.commit("updatePassword", value.password);
          if (value.app.$route.path !== "/index") {
            value.app.$router.push("/index");
          }
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
