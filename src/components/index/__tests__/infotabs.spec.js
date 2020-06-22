import { shallowMount, createLocalVue } from "@vue/test-utils";
import InfoTabs from "../components/index/InfoTabs"; //home page
import Vuex from "vuex";
import Vuetify from "vuetify";

let wrapper;
let store;
let actions;
let mutations;
let state;

beforeEach(() => {
  const localVue = createLocalVue();
  localVue.use(Vuex);
  localVue.use(Vuetify);
  actions = {};
  mutations = {};
  state = {};
  store = new Vuex.Store({
    actions,
    mutations,
    state
  });

  wrapper = shallowMount(InfoTabs, {
    propsData: {},
    mocks: {},
    stubs: {},
    methods: {},
    store,
    localVue
  });
});

afterEach(() => {
  wrapper.destroy();
});

describe("InfoTabs Component (Announcement/Course Updates)", () => {
  test("is a Vue instance", () => {
    expect(wrapper.isVueInstance).toBeTruthy();
  });
});
