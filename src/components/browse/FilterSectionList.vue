
<script>
import {
  Browser,
} from "../../middleware/ProPlayerCore.js";
export default {
  name: 'withBrowser',
  data: () => ({
    browserTool: new Browser(this)
  }),
  mounted() { 
    console.log('I AM HERE')
    this.buildList()
  },
  methods: {
    buildList() { this.browserTool.buildFilterSectionData(this.$store.state.browser.search.current)}
  },
  render(){
    return this.$scopedSlots.default({
      buildList: this.buildList,
      selList: this.browserTool?.filterSectionList
    })
  }
}
</script>
