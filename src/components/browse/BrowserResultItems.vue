<template>
  <div>
    <slot name="title" class="text-overline"></slot>
    <q-list dense bordered>
      
      <q-card v-for="entry in this.resultList" :key="entry.id">
        <q-separator spaced />
        <q-item>
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
              <q-img width="100px" :src="entry.avatar" contain />
            </q-item-section>

            <q-item-section style="width: 60vw;">
              <q-item-label
                text-color="primary"
                class="text-weight-bolder text-body2"
              >
                {{ entry.title }}
              </q-item-label>
              <q-item-label color="secondary" class="text-subtitle1">
                {{ entry.subtitle }}
              </q-item-label>

              <div class="browser-result-meta" v-html="entry.data"></div>
            </q-item-section>
          </q-item>
        </q-item>
      </q-card>
    </q-list>
  </div>
</template>

<script>
export default {
  props:{
      resultList: Array,
      default: []
    }
};
</script>
<style scoped></style>
