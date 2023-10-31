<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <nav class="nav-height navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="#"> 
      <img class="logo" src="../../../images/textbooks-v2.jpeg" alt="Logo" />
    </a>
    <div class="vertical-line"></div>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavDropdown">
      <ul class="navbar-nav">
        <li v-if="isLoggedIn" class="nav-item">
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
  height: 45px;
  border-radius: 50%;
  width: auto;
  margin-left: 10px;
}
.vertical-line {
  border-left: 1px solid black;
  height: 50px;
  margin: 5px;
}
.nav-height {
  height: 50px;
}
</style>