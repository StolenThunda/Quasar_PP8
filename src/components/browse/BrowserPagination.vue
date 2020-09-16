<template>
  <q-banner v-if="search.pages.length">
    <div class="pagination-links">
    <q-btn
      v-for="lnk in search.pages"
      :key="lnk.url + Math.random()"
      :title="lnk.content"
      :icon="lnk.icon"
      :label="lnk.content"
      :class="lnk.class"
      @click="goto(lnk.url)"
      size="md"
      glossy
      outline
    ></q-btn>
    <!-- PAGES: {{ search.pages.length }} -->
    
  </div>
  </q-banner>
  
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: 'BrowserPagination',
  computed:{
    ...mapState('browser',['search'])
  },
  methods: {
    getPage(cls){

    },
    goto(str){
      console.log(str)
      this.gotoPage(str)
    },
    ...mapActions('browser',['gotoPage'])
  }
}
</script>

<style lang="sass" scoped>
.pagination-links button 
  font-size: .5rem;
  display: inline-block;
  margin-right: .25em;
  background: "secondary"

.pagination-links button.active 
  background: #777;
  pointer-events: none;

</style>