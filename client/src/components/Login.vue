<template>
  <div>
    <h2>Log In</h2>
    <label>Username:</label>
    <input 
      type="text"
      v-model="email"
      placeholder="Email"
      class="email-input" />
    <label>Password:</label>
    <input 
      type="text"
      v-model="password"
      placeholder="password"
      class="password-input" />
  </div>
</template>

<script setup>


</script>

<style scoped>
.email-input {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
  border: 2px solid #ccc;
  background-color: #f8f8f8;
  color: #111;
  border-radius: 4px;
  resize: vertical;
}

.password-input {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
  border: 2px solid #ccc;
  background-color: #f8f8f8;
  color: #111;
  border-radius: 4px;
  resize: vertical;
}
</style>