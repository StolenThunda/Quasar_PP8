import { authGuard } from "../auth/authGuard.js"
const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/Index.vue") }]
  },
  {
    path: "/tools",
    component: () => import("layouts/Browser.vue"),
    beforeEnter: authGuard,
    children: [
      {
        name: "browser",
        path: "/browser",
        component: () => import("pages/Browser")
      },
    {
        name: "tuner",
        path: "/tuner",
        component: () => import("pages/Tools"),
        meta: { 
          src: '/dev/tuner'
        }
      }
    ]
  },

  {
    name: "watch",
    path: "/watch",
    component: () => import("layouts/WatchLayout.vue"),
    beforeEnter: authGuard,
    children: [{ 
      name: "player",
      path: "/watch/:packageID/:segmentID",
      component: () => import("components/watch/Player")
    },{
      name: "package",
      path: "/watch/:packageID", 
      component: () => import("pages/Watch"),
    }]
  },
  {
    path: "/profile",
    component: () => import("layouts/MainLayout.vue"),
    beforeEnter: authGuard,
    children: [{ path: "", component: () => import("pages/Profile.vue") }]
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: "*",
    component: () => import("pages/Error404.vue")
  }
];

export default routes;
