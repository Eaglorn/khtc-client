const routes = [
  {
    path: "/",
    component: () => import("layouts/Main.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/Index.vue")
      },
      {
        path: "index",
        component: () => import("pages/Index.vue")
      },
      {
        path: "login",
        component: () => import("pages/Login.vue")
      },
      {
        path: "profile",
        component: () => import("pages/Profile.vue")
      },
      {
        path: "calendars",
        component: () => import("pages/Calendars.vue")
      },
      {
        path: "calendar",
        component: () => import("pages/Calendar.vue")
      }
    ]
  }
];

routes.push({
  path: "*",
  component: () => import("pages/Error404.vue")
});

export default routes;
