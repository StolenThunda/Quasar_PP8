import axios from "axios";
import VueAxios from "vue-axios";
import Vue from "vue";
Vue.use(VueAxios, axios);
export default {
  namespaced: true,
  state: {
    bacon: null
  },
  mutations: {
    SET_BACON_DATA(ctx, data) {
      ctx.bacon = data;
    }
  },
  actions: {
    async fetchBaconData() {
      return axios.get("https://baconipsum.com/api/?callback=?", {
        type: "meat-and-filler",
        "start-with-lorem": "1",
        paras: "10"
      });
    },
    async fetchBacon(ctx) {
      return ctx.dispatch("fetchBaconData").then(response => {
        const newData = response.data.map((info, idx) => {
          return {
            id: "bit_" + idx,
            title: info
              .split(" ")
              .splice(0, 3)
              .join(" ")
              .toUpperCase(),
            data: info
              .split(" ")
              .splice(3)
              .join(" ")
          };
        });
        // console.log("obj", newData);
        ctx.commit("SET_BACON_DATA", newData);
        return newData;
      });
    },
    initStore: ctx => ctx.dispatch("fetchBacon")
  },
  getters: {
    getBacon: state => state.bacon,
    getSliceBacon: state =>
      state.bacon[Math.floor(Math.random() * state.bacon.length)]
  }
};
