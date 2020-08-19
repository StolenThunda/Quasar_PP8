<template>
   <q-item clickable v-ripple>
        <q-item-section avatar>
          <q-icon name="play" />
        </q-item-section>

        <q-item-section>{{ title }}</q-item-section>
      </q-item>
</template>

<script>
export default {
  name: "FavoritesList",
  props: {
    title: {
      type: String,
      required: true
    }

    // caption: {
    //   type: String,
    //   default: ''
    // },

    // link: {
    //   type: String,
    //   default: '#'
    // },

    // icon: {
    //   type: String,
    //   default: ''
    // }
  }
};
</script>
