<template>
  <div id="explore-textbooks-page" class="container">
    <div class="textbooks-header">
      <h1>Explore Textbooks</h1>
      <br><br>
      <div class="textbooks-fields">
        <input type="text" v-model="searchText" placeholder="Search...">
        <div class="buttons-container">
          <button @click="searchTextbooks">Search</button>
          <button @click="clearSearch">Clear</button>
        </div>
        <br>
        <span v-if="isLoggedIn"> <label class="textbooks-label">Only show textbooks at my University: &nbsp; </label><input type="checkbox" v-model="filterByUniversity" class="filter-checkbox"/> </span>
      </div>
      <br><br>
    </div>
    <!-- List of Textbooks -->
    <div v-for="textbook in getTextbooksWithUser" :key="textbook.id">
      <div class="border" v-if="textbook.user_id !== getUserID && textbook.title.toLowerCase().includes(filterParam.toLowerCase()) && universityFilter(textbook.universityName)">
        <br>
        <label class="textbooks-label">Title: </label> <span> &nbsp;"{{ textbook.title }}"</span> <br>
        <label class="textbooks-label">ISBN: </label> <span> &nbsp;{{ textbook.isbn }}</span> <br>
        <label class="textbooks-label">University: </label> <span> &nbsp;{{ textbook.universityName }}</span> <br>
        <label class="textbooks-label">Contact: </label> <span> &nbsp;{{ textbook.email }}</span> <br>
        <br>
      </div>
      <br>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'TextbooksPage',
  computed: {
    ...mapGetters('sessionManager', ['getUserID', 'getUserUniversityID', 'isLoggedIn']),
    ...mapGetters('textbooksManager', ['getTextbooksWithUser']),
    ...mapGetters('universityManager', ['getUniversities'])
  },
  data() {
    return {
      searchText: '',
      filterParam: '',
      filterByUniversity: false,
    }
  },
  methods: {
    searchTextbooks() {
      this.filterParam = this.searchText
    },
    clearSearch() {
      this.searchText = ''
      this.filterParam = ''
    },
    universityFilter(universityName) {
      var result = true;
      console.log(this.getUserUniversityID)
      if(this.filterByUniversity) {
        var university = this.getUniversities.filter((data) => data.id == this.getUserUniversityID)[0]
        if(university) {
          result = university.name === universityName
        }
      }
      return result;
    }
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
.span-centered {
  vertical-align: middle;
}
.filter-checkbox {
  vertical-align: middle;
}
.big {
  height: 100vh;
  width: 100vw;
  background-color: blue;
}
</style>