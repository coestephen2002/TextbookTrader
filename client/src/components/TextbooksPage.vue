<template>
  <div v-if="isLoggedIn" id="textbooks-page" class="container">
    <div class="textbooks-header">
      <h1>My Textbooks</h1>
    </div>
    <div class="textbooks-fields">
      <input type="text" v-model="title" placeholder="Title" class="title-input" />
      <input type="number" v-model="isbn" placeholder="ISBN 13" class="isbn-input" />

      <div class="buttons-container">
        <button v-if="isEditing" @click="onUpdate">Update</button>
        <button v-if="isEditing" @click="cancelEdit">Cancel</button>
        <button style="width: 80px" v-else @click="onCreate">Add</button>
      </div>
      <br>
    </div>
    <!-- List of Textbooks -->
    <div style="margin: 10px;" class="textbooks-list" v-for="textbook in getTextbooks" :key="textbook.id">
      <div class="border" v-if="textbook.user_id === getUserID">
        <br>
        <label class="textbooks-label">Title: </label> <span> &nbsp;"{{ textbook.title }}"</span> <br>
        <label class="textbooks-label">ISBN: </label> <span> &nbsp;{{ textbook.isbn }}</span> <br>
        <br>

        <div style="margin-bottom: 10px" class="buttons-container">
          <button @click="editTextbook(textbook.id)">Edit</button>
          <button @click="onDelete(textbook.id)">Delete</button>
          
        </div>
      </div>
    </div>
  </div>
  <div v-else class="container text-center">
    <h1>Nothing to see here...</h1>
    <br>
    <router-link to="/" class="text-decoration-none ">
      <h2>Login!</h2>
  </router-link>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'TextbooksPage',
  computed: {
    ...mapGetters('sessionManager', ['getUserID', 'isLoggedIn']),
    ...mapGetters('textbooksManager', ['getTextbooks'])
  },
  async mounted() {
    this.refreshTextbooks()
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
    ...mapActions('textbooksManager', ['createTextbook', 'updateTextbook', 'deleteTextbook']),
    async onCreate() {
      if (this.validate()) {
        let data = {
          textbook: {
            title: this.title,
            isbn: this.isbn,
            user_id: this.getUserID
          }
        }
        await this.createTextbook(data)
        
        this.title = ''
        this.isbn = ''
        this.textbook_id = 0
        this.refreshTextbooks()
      }
    },
    async onUpdate() {
      if (this.validate()) {
        let data = {
          textbook: {
            title: this.title,
            isbn: this.isbn,
            id: this.textbook_id
          }
        }
        await this.updateTextbook(data)

        this.title = ''
        this.isbn = ''
        this.textbook_id = 0
        this.isEditing = false
        this.refreshTextbooks()
      }
    },
    cancelEdit() {
      this.title = ''
      this.isbn = ''
      this.textbook_id = 0
      this.isEditing = false
    },
    async onDelete(id) {
      await this.deleteTextbook(id)
      this.refreshTextbooks()
    },
    async editTextbook(id) {
      const textbook = this.textbooks.find(post => post.id === id)
      
      this.title = textbook.title
      this.isbn = textbook.isbn
      this.textbook_id = textbook.id
      this.isEditing = true

      this.refreshTextbooks()

      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    },
    async refreshTextbooks() {
      this.textbooks = this.getTextbooks
    },
    validate() {
      console.log(this.title)
      console.log(this.isbn)
      var result = true
      if (!this.title) {
        result = false
        this.$swal('Title cannot be empty')
      }
      if (!this.isbn || this.isbn.toString().length !== 13) {
        result = false
        this.$swal('ISBN must be a number with length 13')
      }
      return result;
    }
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
.textbooks-label {
  font-weight: bold;
}
</style>