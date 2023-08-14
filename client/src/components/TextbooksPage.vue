<template>
  <b-container id="textbooks-page">
    <div class="textbooks-header">
      <h1>Textbooks</h1>
    </div>
    <div class="textbooks-fields">
      <input type="text" v-model="title" placeholder="Title" class="title-input" />
      <input type="text" v-model="isbn" placeholder="ISBN" class="isbn-input" />

      <div class="buttons-container">
        <button v-if="isEditing" @click="updateTextbook">Update</button>
        <button v-if="isEditing" @click="cancelEdit">Cancel</button>
        <button v-else @click="createTextbook">Create</button>
      </div>
    </div>
    <!-- List of Textbooks -->
    <div class="textbooks-list" v-for="textbook in textbooks" :key="textbook.id">
      <div v-if="textbook.user_id === getUserID">
        <h5>{{ textbook.title }}</h5>
        <p>{{ textbook.isbn }}</p>

        <div class="buttons-container">
          <button @click="editTextbook(textbook.id)">Edit</button>
          <button @click="deleteTextbook(textbook.id)">Delete</button>
        </div>
      </div>
    </div>

    <div class="textbooks-header">
      <h1>User</h1>
      <p>User id is: {{ getUserID }}</p>
    </div>
  </b-container>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import { mapGetters } from 'vuex'

const API_URL = 'http://localhost:3000/textbooks'

export default {
  name: 'TextbooksPage',
  computed: {
    ... mapGetters('sessionManager', ['getUserID']),
  },
  async mounted() {
    const res = await fetch(API_URL)
    this.textbooks = await res.json()
  },
  data() {
    return {
      title: '',
      isbn: '',
      textbook_id: 0,
      isEditing: false,
      textbooks: []
    }
  }, 
  methods: {
    async createTextbook() {
        const res = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: this.title,
          isbn: this.isbn,
          user_id: this.getUserID
        })
      })

      const data = await res.json()

      this.textbooks.push(data)
      this.title = ''
      this.isbn = ''
      this.textbook_id = 0
    },
    async updateTextbook() {
      const res = await fetch(`${API_URL}/${this.textbook_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: title,
          isbn: isbn,
          id: textbook_id
        })
      })

      const data = await res.json()

      const index = this.textbooks.findIndex(textbook => textbook.id === data.id)
      this.textbooks[index] = data

      this.title = ''
      this.isbn = ''
      this.textbook_id = 0
      this.isEditing = false
    },
    cancelEdit() {
      this.title = ''
      this.isbn = ''
      this.textbook_id = 0
      this.isEditing = false
    },
    async deleteTextbook(id) {
      await fetch (`${API_URL}/${id}`, {
        method: 'DELETE'
      })
      this.textbooks = this.textbooks.filter(post => post.id !== id)
    },
    async editTextbook(id) {
      const textbook = this.textbooks.find(post => post.id === id)
      
      this.title = textbook.title
      this.isbn = textbook.isbn
      this.textbook_id = textbook.id
      this.isEditing = true

      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    },
  },
}
</script>

<style scoped>
#textbooks-page{
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
</style>