<template>
  <q-banner v-if="search.pages.length" relative-position>
    <div class="pagination-links">
    <q-btn
      v-for="lnk in search.pages"
      :key="lnk.url + Math.random()"
      :title="lnk.content"
      :icon="lnk.icon"
      :label="lnk.content"
      :class="lnk.class"
      @click="goto(lnk.url)"
      :color="lnk.class.indexOf('active') > -1 ? 'primary' : 'secondary'"
      push
      size="md"
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
      const url = str.replace("https://texasbluesalley.com/proplayer74-tony/", "")
      console.log("goto",url)
      this.gotoPage(url)
    },
    ...mapActions('browser',['gotoPage'])
  }
}
</script>

<style lang="stylus" scoped>
.pagination-links button 
  font-size: .5rem;
  display: inline-block;
  margin-right: .25em;

.pagination-links button.active 
  background-color: 'grey' !important;
  pointer-events: none !important;

</style>