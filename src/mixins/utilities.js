export const utilities = {
  data: () => ({
    cfgloopIcon: { icon: "mdi-infinity", type: "positive" },
    cfgLoopInfo: {
      icon: "mdi-information-outline",
      type: "warning",
      progress: true
    },
    cfgWarning: { icon: "mdi-alert-outline", type: "negative" }
  }),
  methods: {
    secondsToMinutes(sec) {
      sec = Math.round(Number(sec));
      var hours = Math.floor(sec / 3600);
      hours >= 1 ? (sec = sec - hours * 3600) : (hours = "00");
      var min = Math.floor(sec / 60);
      min >= 1 ? (sec = sec - min * 60) : (min = "00");
      sec < 1 ? (sec = "00") : void 0;

      min.toString().length == 1 ? (min = "0" + min) : void 0;
      sec.toString().length == 1 ? (sec = "0" + sec) : void 0;

      return hours + ":" + min + ":" + sec;
      console.log("strTime", strTime);
      return strTime;
    },
    showMessage(objOptions) {
      const defaults = {
        message: "",
         timeout: 800,
        position: 'top',
        icon: "mdi-information-outline",
        classes: "glossy",
        actions: [
          {
            label: "Dismiss",
            color: "secondary",
            handler: () => {
              /* ... */
            }
          }
        ]
      };
      if (typeof objOptions === "string") {
        objOptions = { message: objOptions, type: "info" };
      }
      this.$q.notify(Object.assign({}, defaults, objOptions));
    }
  }
};
