<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="#"> 
      <img class="logo" src="../../../images/textbooks-v2.jpeg" alt="Logo" />
    </a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavDropdown">
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link to="/textbooks">
            <button>My Textbooks</button>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/explore-textbooks">
            <button>Explore Textbooks</button>
          </router-link>
        </li>
        <li v-if="!isLoggedIn" class="nav-item">
          <router-link to="/">
            <button>Login</button>
          </router-link>
        </li>
        <li v-else class="nav-item">
          <button @click="logoutUser">Sign Out</button>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters('sessionManager', ['getUserID', 'isLoggedIn'])
  },
  methods: {
    ...mapActions('sessionManager', ['logoutUser']),
  }
}
</script>

<style>
.logo {
  height: 50px;
  border-radius: 35%;
  margin-left: 10px;
}
</style>