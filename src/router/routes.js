const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/Index.vue") }]
  },
  {
    path: "/browser",
    component: () => import("layouts/Browser.vue"),
    children: [     
      {
        name: "browser",
        path: "",
        component: () => import("pages/Browser")
      }
    ]
  },
  {
    path: "/watch",
    component: () => import("layouts/Watch.vue"),
    children: [
      {
        name: "watch",
        path: "",
        component: () => import("pages/Watch")
      }
    ]
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: "*",
    component: () => import("pages/Error404.vue")
  }
];

export default routes;
