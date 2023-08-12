<script setup>
import Navbar from './components/shared/Navbar.vue'
</script>
<template>
  <Navbar class="navbar" />
  <b-container id="page-container">
    <router-view></router-view>
  </b-container>
</template>

<style scoped>
#page-container {
  margin: 40px;
  display: block;
}
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}

.navbar {
  padding-left: 10px;
}

</style>
