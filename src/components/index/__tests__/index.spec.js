import { createLocalVue, shallowMount } from "@vue/test-utils";
import HomePage from "../components/"; //home page
import Vuetify from "vuetify";
import Vue from "vue";

let wrapper;

beforeEach(() => {
  const localVue = createLocalVue();
  Vue.use(Vuetify);

  wrapper = shallowMount(HomePage, {
    propsData: {},
    mocks: {},
    stubs: {},
    methods: {},
    localVue
  });
});

afterEach(() => {
  wrapper.destroy();
});

describe("Home Component", () => {
  test("is a Vue instance", () => {
    expect(wrapper.isVueInstance).toBeTruthy();
  });

  test("should contain child components", () => {});
});
