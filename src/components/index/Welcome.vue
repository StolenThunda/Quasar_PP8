<template>
    <div class="full-width row justify-center content-between q-pa-md">
      <div class="col-md-6 justify-start items-start q-pa-md">
        <span class="text-body2">
          Welcome, <span v-if="user">{{ user }}</span>
          <span v-else> please LOGIN</span>
        </span>
      </div>

      <div class="col-md-6 row justify-evenly content-between">
          <q-btn label="Orientation" color="secondary" icon="play_circle_outlined" size="sm" class="col-md-3 "></q-btn>
          <q-btn label="Favorites" color="primary" icon="favorite" class="col-md-3 " size="sm"></q-btn>
          <q-btn label="Browse" color="primary" icon="search" class="col-md-3 " size="sm" :to="{name: 'browser'}"></q-btn>
      </div>
    </div>
</template>

<script>
export default {
    data: () => ({
        user: "Antonio"
    })
};
</script>

<style lang="scss" scoped>

</style>
