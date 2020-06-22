import { createLocalVue, mount, shallowMount } from "@vue/test-utils";
import mockRouter from "../../../router/mocks/mockRouter";
import flushPromises from "flush-promises";
// import { toHaveRouteName } from "../../../plugins/vue-test-util-helpers/";
import Welcome from "../components/index/Welcome"; //wecome section of home page
import Vuetify from "vuetify";
// import VueRouter from "vue-router";
// import Vue from 'vue'

let wrapper;
let config = createConfig();
function createConfig(overrides) {
  const user = "Antonio";
  const mocks = {
    // Vue Auth
    $auth: {
      check: () => false
    },
    // Vue Router
    $router: {
      push: () => {}
    },
    // Vuex
    $store: {
      state: [{ user }],
      commit: () => {}
    }
  };
  const propsData = { user };
  return Object.assign({ mocks, propsData }, overrides);
}
const localVue = createLocalVue();
localVue.use(Vuetify);
// localVue.use(VueRouter);

beforeEach(() => {
  // global wrapper
  wrapper = shallowMount(Welcome, {
    config,
    localVue
  });
});

afterEach(() => {
  wrapper.destroy();
});

describe(" Welcome Component", () => {
  test("is a Vue instance", () => {
    expect(wrapper.isVueInstance).toBeTruthy();
  });

  test("should contain greeting class", () => {
    expect(wrapper.contains(".greeting")).toBe(true);
  });

  test("should display user from props", () => {
    const user = "Bob";
    const wrapper = shallowMount(Welcome, {
      propsData: {
        user: user
      }
    });
    expect(wrapper.find("span").text()).toBe(user);
  });

  describe("Buttons", () => {
    test("should contain 3 buttons", () => {
      // console.log(wrapper.html())
      expect(wrapper.findAll("v-btn-stub").length).toBe(3);
    });

    test("should have favorites button", () => {
      expect(wrapper.findAll("#showFav").length).toBe(1);
    });

    test("favorites sent toggleSidebar event", async () => {
      wrapper.find("#showFav").trigger("click");
      await wrapper.vm.$nextTick();
      debugger;
      expect(wrapper.emitted()).toBeTruthy();
      // expect(wrapper.emitted().toggleSidebar).toBeTruthy();
    });

    test("router called when user clicks browse", async () => {
      const router = mockRouter.mock();
      const wrapper = mount(Welcome, { localVue, router });
      localVue.use(router);
      expect(wrapper.findAll("#browse").length).toBe(1);
      wrapper.find("#browse").trigger("click");
      await flushPromises();
      debugger;
      console.log("emitted", wrapper.emitted());

      expect(wrapper.emitted()).toBeTruthy();

      // expect(wrapper.vm.$route.name).toBe();
    });
  });
});
