<template>
  <div class="q-ma-md">
    <div class="row align-items-center profile-header">
      <div class="col-md-2 mb-3">
        <img
          :src="$auth.user.picture"
          alt="User's profile picture"
          class="rounded-circle img-fluid profile-picture"
        />
      </div>
      <div class="col-md text-center text-md-left">
        <h3>{{ $auth.user.name }}</h3>
        <p class="text-overline">{{ $auth.user.email }}</p>
      </div>
    </div>

    <div class="row col-md ">
      <code class="json"><pre  class="rounded w-100"  v-html="JSON.stringify($auth.user, null, 4)" /> </code>
    </div>
    <div class="col-md text-center text-md-left">

    <q-btn
      icon="home"
      label="Back"
      to="/" />
    </div>
  </div>
</template>

