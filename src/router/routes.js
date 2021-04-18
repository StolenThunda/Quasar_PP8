const routes = [
  {
    path: "/auth",
    component: () => import("src/pages/AuthPage.vue"),
  },
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/Index.vue") }]
  },
  {
    path: "/tools",
    component: () => import("layouts/Browser.vue"),
    // beforeEnter: authGuard,
    children: [
      {
        name: "external",
        path: "/ex/:dest",
        beforeEnter() {
          location.href = `https://texasbluesalley.com/${dest}`;
        }
      },
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
          src: "/dev/tuner"
        }
      },
      {
        name: "spider",
        path: "/spider",
        component: () => import("pages/Tools"),
        meta: {
          src: "/dev/spider"
        }
      },
      {
        name: "fretboard",
        path: "/fretboard",
        component: () => import("pages/Tools"),
        meta: {
          src: "/dev/fretboard"
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
