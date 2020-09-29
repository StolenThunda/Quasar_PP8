<template>
  <div class="q-ml-md q-pt-xs">
    <span class="text-h6"> <slot name="title"></slot></span>
    <slot name="header-pages"></slot>
    <q-list dense>
      <q-intersection
      v-for="entry in this.resultList"
      :key="entry.id"
      transition="slide-right"
    >
      <q-card flat>
        <q-item  >
          <q-item-section v-model="entry.avatar" avatar>
            <q-btn
              class="glossy"
              :color="entry.favColor"
              icon="favorite"
              round
              push
            />
          </q-item-section>

          <q-item :to="'/watch/' + entry.id" clickable v-ripple>
            <q-item-section side>
              <q-avatar size='4rem' square>
              <q-img :src="entry.avatar" contain />
              </q-avatar>
            </q-item-section>

            <q-item-section >
              <q-item-label
                text-color="secondary"
                class="text-weight-bolder text-body2"
              >
                {{ entry.title }}
              </q-item-label>
              <q-item-label color="secondary" class="text-thin ">
                {{ entry.subtitle }}
              </q-item-label>
              <div class="browser-result-meta" v-html="entry.data"></div>
            </q-item-section>
          </q-item>
        </q-item>
      </q-card>
    </q-intersection>
      <slot name="footer-pages"></slot>
      </q-list>
  </div>
</template>

<script>
export default {
  props: {
    resultList: Array,
    default: []
  },
  computed: {
    images() { return (this.resultList.length > 0 )}
  }
};
</script>

<style lang="scss" scoped>
.img {
  height: 140px;
  max-width: 150px
}

.browser-result-meta .meta-wrapper {
    white-space: nowrap !important;
    margin-right: .5em;
    font-size: 1.2em !important;
    font-weight: 700 !important;
    margin-top: .25em !important;
}
span.meta-key {
  color: white !important;  
}
span.meta-value  {
    font-weight: 200 !important;
  color: #aaa !important;
}
</style>