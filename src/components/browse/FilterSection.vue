<script>
export default {
  name: "FilterSection",
  props: {
    items: {
      type: Array,
      default: () => []
    }
  },
  mounted() {
    this.reset();
  },
  methods: {
    reset() {
      this.sectionType = "";
      this.channelID = 0;
      this.groupID = "";
      this.domID = "";
      this.parentIDs = [];
      this.children = [];
      this.parents = [];
      this.keys = [];
    },
    addKey(objKey) {
      this.keys.push(objKey);
    },
    addChild(objChild) {
      this.children.push(objChild);
    },
    addParent(objParent) {
      this.parents.push(objParent);
    },
    resetKeys() {
      this.keys = [];
    },
    getChannelID() {
      return this.channelID;
    },
    getSectionID() {
      return this.sectionID;
    },
    getSectionType() {
      return this.sectionType;
    },
    getChildren() {
      return this.children;
    },
    getGroupID() {
      return this.groupID;
    },
    getParentIDs() {
      return this.parentIDs;
    },
    getParents() {
      return this.parents;
    },
    getKeyString() {
      let theKeyString = "";
      for (let i = 0; i < this.keys.length; i++) {
        theKeyString += this.keys[i];
        if (i < this.keys.length - 1) {
          theKeyString += "|";
        }
      }

      return theKeyString;
    },
    setChannelID(id) { this.channelID = id },
    setGroupID(id) { this.groupID = id },
    setParentIDs(id) { this.parentIDs = id },
    setSectionID(id) { this.sectionID = id },
    setSectionType(id) { this.sectionType = id },

  },
  render() {
    return this.$scopedSlots.default({
      reset: this.reset,
      addKey: this.addKey,
      addChild: this.addChild,
      addParent: this.addParent,
      resetKeys: this.resetKeys,
      getChannelID: this.getChannelID,
      getSectionID: this.getSectionID,
      getSectionType: this.getSectionType
    });
  }
};
</script>
