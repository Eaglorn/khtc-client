export function exit(context, value) {
  context.commit("updateAuth", false);
  value.app.$socket.client.disconnect();
  value.app.$q.cookies.remove("login");
  value.app.$q.cookies.remove("password");
}

export function updateAuth(context, value) {
  context.commit("updateAuth", value);
}

export function auth(context, { app, login, password }) {
  app.$q.loading.show();
  app
    .$axios({
      method: "post",
      url: "http://46.8.146.12:4000/api/user/authorization",
      data: { login: login, password: password },
      timeout: 5000,
      responseType: "json"
    })
    .then(response => {
      if (response.data.login === false) {
        app.$q.notify({
          color: "negative",
          position: "top",
          message: "Пользователя с таким логином нет",
          icon: "report_problem"
        });
      } else {
        if (response.data.password === false) {
          app.$q.notify({
            color: "negative",
            position: "top",
            message: "Не верный пароль",
            icon: "report_problem"
          });
        } else {
          context.commit("updateAuth", true);
          context.commit("updateLogin", login);
          try {
            app.$q.cookies.set("login", login, { expires: 3 });
          } catch (e) {
            console.log(e);
          }
          context.commit("updatePassword", password);
          try {
            app.$q.cookies.set("password", password, {
              expires: 3
            });
          } catch (e) {
            console.log(e);
          }
          app.$socket.client.open();
          if (app.$route.path !== "/index") {
            app.$router.push("/index");
          }
        }
      }
      app.$q.loading.hide();
    })
    .catch(function(err) {
      console.log(err);
      app.$q.loading.hide();
    });
}
