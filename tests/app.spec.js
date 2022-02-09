import { mount } from "@vue/test-utils";
import { App } from "src/App.vue";


describe( 'App.vue', () => {
  it('should exist', () => {
    const wrapper = mount( App );
    expect( wrapper.exists() ).toBeTruthy();
  });
});