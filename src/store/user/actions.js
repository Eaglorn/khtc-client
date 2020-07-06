export function exit(context, value) {
  context.commit("updateAuth", false);
  value.app.$socket.client.disconnect();
  value.app.$q.cookies.remove("login");
  value.app.$q.cookies.remove("password");
}

export function updateAuth(context, value) {
  context.commit("updateAuth", value);
}

export function auth(context, value) {
  value.app
    .$axios({
      method: "post",
<<<<<<< HEAD
      url: "http://46.8.146.12:4000/api/user/authorization",
      data: { login: login, password: password },
=======
      url: "http://46.8.146.12:4000/api/authorization",
      data: { login: value.login, password: value.password },
>>>>>>> parent of a1d399b... update
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
          context.commit("updateAuth", true);
          context.commit("updateLogin", value.login);
          try {
            value.app.$q.cookies.set("login", value.login, { expires: 3 });
          } catch (e) {
            console.log(e);
          }
          context.commit("updatePassword", value.password);
          try {
            value.app.$q.cookies.set("password", value.password, {
              expires: 3
            });
          } catch (e) {
            console.log(e);
          }
          value.app.$socket.client.open();
          if (value.app.$route.path !== "/index") {
            value.app.$router.push("/index");
          }
        }
      }
    })
    .catch(function(err) {
      console.log(err);
    });
}
