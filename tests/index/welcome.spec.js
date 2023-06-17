import { mount } from "@vue/test-utils";
import Welcome from "src/components/index/Welcome.vue;";


describe( 'index/Welcome.vue', () => {
  it( 'should exist', () => {
    const wrapper = mount( Welcome );
    expect( wrapper.exists() ).toBeTruthy();
  } );
} );