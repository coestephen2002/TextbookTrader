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
      <p>User id is: {{ getUserEmail }}</p>
    </div>
  </b-container>
</template>

<script>
import { ref, onMounted } from 'vue'
import { mapGetters } from 'vuex'

const textbooks = ref([])
const user_id = ref(this.userId())

const title = ref('')
const isbn = ref('')
const textbook_id = ref(0)
const isEditing = ref(false)
const API_URL = 'http://localhost:3000/textbooks'

onMounted(async() => {
  const res = await fetch(API_URL)
  textbooks.value = await res.json()
})

const createTextbook = async() => {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title: title.value,
      isbn: isbn.value,
      user_id: user_id.value
    })
  })

  const data = await res.json()

  textbooks.value.push(data)
  title.value = ''
  isbn.value = ''
  textbook_id.value = 0
}

const updateTextbook = async() => {
  const res = await fetch(`${API_URL}/${textbook_id.value}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title: title.value,
      isbn: isbn.value,
      id: textbook_id.value
    })
  })

  const data = await res.json()

  const index = textbooks.value.findIndex(textbook => textbook.id === data.id)
  textbooks.value[index] = data

  title.value = ''
  isbn.value = ''
  textbook_id.value = 0
  isEditing.value = false
}

const cancelEdit = () => {
  title.value = ''
  isbn.value = ''
  textbook_id.value = 0
  isEditing.value = false
}

const deleteTextbook = async(id) => {
  await fetch (`${API_URL}/${id}`, {
    method: 'DELETE'
  })
  textbooks.value = textbooks.value.filter(post => post.id !== id)
}

const editTextbook = async(id) => {
  const textbook = textbooks.value.find(post => post.id === id)
  
  title.value = textbook.title
  isbn.value = textbook.isbn
  textbook_id.value = textbook.id
  isEditing.value = true

  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

export default {
  computed: {
    ...mapGetters('sessionManager', ['getUserID']),
    userId() {
      return this.getUserID
    }
  }
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