<template>
  <div id="explore-textbooks-page" class="container">
    <div class="textbooks-header">
      <h1>Explore Textbooks</h1>
      <br><br>
    </div>
    <!-- List of Textbooks -->
    <div class="textbooks-list border" v-for="textbook in getTextbooksWithUser" :key="textbook.id">
      <div v-if="textbook.user_id !== getUserID">
        <br>
        <label class="textbooks-label">Title: </label> <span> &nbsp;"{{ textbook.title }}"</span> <br>
        <label class="textbooks-label">ISBN: </label> <span> &nbsp;{{ textbook.isbn }}</span> <br>
        <label class="textbooks-label">Contact: </label> <span> &nbsp;{{ textbook.email }}</span> <br>
        <br>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'TextbooksPage',
  computed: {
    ...mapGetters('sessionManager', ['getUserID']),
    ...mapGetters('textbooksManager', ['getTextbooksWithUser'])
  },
}
</script>

<style scoped>
#explore-textbooks-page{
  text-align:center;
}
.textbooks-fields {
  display: flex;
  flex-direction: column;
  align-items:center;
}
.textbooks-fields > input {
  width: 35%;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
  border: 2px solid #ccc;
  background-color: #f8f8f8;
  color: #111;
  border-radius: 4px;
  resize: vertical;
}
.textbooks-label {
  font-weight: bold;
}
</style>