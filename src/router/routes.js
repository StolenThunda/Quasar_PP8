const routes = [
  {
    path: "/auth",
    component: () => import("src/pages/AuthPage.vue")
  },
  {
    path: "/",
    component: () => import("components/tools/Fretboard")
  },
  // {
  //   path: "/",
  //   component: () => import("layouts/MainLayout.vue"),
  //   children: [{ path: "", component: () => import("pages/Index.vue") }]
  // },
  {
    path: "/tools",
    component: () => import("src/layouts/Tools.vue"),
    // beforeEnter: authGuard,
    children: [
      {
        name: "external",
        path: "/tools/ex/:dest",
        beforeEnter() {
          location.href = `https://texasbluesalley.com/${dest}`;
        }
      },
      {
        name: "browser",
        path: "/tools/browser",
        component: () => import("pages/Browser")
      },
      {
        name: "tuner",
        path: "/tools/tuner",
        component: () => import("pages/Tools"),
        meta: {
          src: "/dev/tuner",
          name: "Tuner"
        }
      },
      {
        name: "spider",
        path: "/tools/spider",
        component: () => import("pages/Tools"),
        meta: {
          src: "/dev/spider",
          name: "Spider Drills"
        }
      },
      {
        name: "fretboard",
        path: "/tools/fretboard",
        component: () => import("components/tools/Fretboard"),
        meta: {
          src: "/dev/fretboard",
          name: "Fretboard"
        }
      }
    ]
  },
  {
    name: "watch",
    path: "/watch",
    component: () => import("src/layouts/WatchDrawer.vue"),
    children: [
      {
        name: "player",
        path: "/watch/:packageID/:segmentID",
        component: () => import("components/watch/player/Wrapper")
      },
      {
        name: "package",
        path: "/watch/:packageID",
        component: () => import("pages/Watch")
      }
    ]
  },
  {
    path: "/profile",
    component: () => import("layouts/MainLayout.vue"),
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
