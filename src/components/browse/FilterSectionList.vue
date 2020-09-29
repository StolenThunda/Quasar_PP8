
<script>
import { createNamespacedHelpers } from "vuex";
const { mapActions, mapState } = createNamespacedHelpers("browser");
import { ProPlayerBrowser} from "components/browse/logic";
export default {
  name: 'withBrowser',
  data: () => ({
    browserTool: new ProPlayerBrowser(this)
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
