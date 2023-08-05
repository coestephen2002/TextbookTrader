<template>
  <div>
    <h1>Textbooks</h1>
    <router-link to="/hello">
      <button>Go to Other Component</button>
    </router-link>
    <!-- Create or Posts -->
    <input type="text"
      v-model="title"
      placeholder="Title"
      class="title-input" />
    <input type="text"
      v-model="isbn"
      placeholder="ISBN"
      class="isbn-input" />
    <!-- Only render if editing textbook -->
    <button v-if="isEditing" @click="updateTextbook">Update</button>
    <button v-if="isEditing" @click="cancelEdit">Cancel</button>

    <!-- Only render if NOT editing textbook -->
    <button v-else @click="createTextbook">Create</button>

    <!-- List of Textbooks -->
    <div v-for="textbook in textbooks" :key="textbook.id">
      <h5>{{ textbook.title }}</h5>
      <p>{{ textbook.isbn }}</p>

      <button @click="editTextbook(textbook.id)">Edit</button>
      <button @click="deleteTextbook(textbook.id)">Delete</button>
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue';
  const textbooks = ref([])

  const title = ref('')
  const isbn = ref('')
  const textbook_id = ref(0)
  const isEditing = ref(false)
  const API_URL = "http://localhost:3000/textbooks";

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
        isbn: isbn.value
      })
    })

    const data = await res.json()

    textbooks.value.push(data)
    title.value = ''
    isbn.value = ''
    textbook_id.value = 0;
  }

  const updateTextbook = async() => {
    const res = await fetch(`${API_URL}/${textbook_id.value}`, {
      method: "PUT",
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
    textbook_id.value = 0;
    isEditing.value = false
  }

  const cancelEdit = () => {
    title.value = ''
    isbn.value = ''
    textbook_id.value = 0;
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
</script>

<style scoped>
.title-input {
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

.isbn-input {
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