<template>
  <div>
    <q-card>
      <q-card-section>
        <center class="text-h6">
          Welcome, <span v-if="user">{{ user }}</span>
          <span v-else> please LOGIN</span>

          <div>
            <q-btn
              label="Orientation"
              color="positive"
              icon="play_circle_outlined"
              size="sm"
              class="q-mx-sm"
              to="/watch/5882"
            />
            <q-btn
              label="Favorites"
              color="secondary"
              icon="favorite"
              class="q-mx-sm"
              size="sm"
              @click="$emit('toggle-drawer')"
            />
            <q-btn
              label="Browse"
              color="secondary"
              icon="search"
              class="q-mx-sm"
              size="sm"
              :to="{ name: 'browser' }"
            />
          </div>
        </center>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: String,
      default: "Default User"
    }
  }
};
</script>
