module.exports = function(ctx) {
  return {
    boot: [
      "axios",
      {
        path: "socket.io",
        server: false,
        actionPrefix: "socket_",
        mutationPrefix: "SOCKET_"
      }
    ],

    css: ["app.sass"],

    extras: [
      "ionicons-v4",
      "mdi-v4",
      "fontawesome-v5",
      "eva-icons",
      "themify",
      "line-awesome",
      "roboto-font",
      "material-icons"
    ],

    framework: {
      iconSet: "material-icons",
      lang: "ru",

      importStrategy: "auto",

      components: [],

      directives: ["Ripple", "ClosePopup"],

      plugins: ["Notify", "Cookies", "LocalStorage", "SessionStorage", "Loading"],

      config: {
        notify: {},
        loading: {}
      }
    },

    build: {
      vueRouterMode: "hash",
      minify: true,
      uglifyOptions: {
        arguments: true,
        drop_console: true,
        toplevel: true
      },
      extendWebpack(cfg) {
        cfg.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /node_modules/,
          options: {
            formatter: require("eslint").CLIEngine.getFormatter("stylish")
          }
        });
      }
    },

    devServer: {
      https: false,
      port: 8080,
      open: true
    },

    animations: "all"
  };
};
