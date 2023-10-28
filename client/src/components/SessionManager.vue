<template>
  <div class="container">
    <h1 class="sm-title">Textbook Trader</h1>
    <div class="sm-card">
      <div v-if="isLoggedIn">
        <button @click="logoutUser" class="logout-button">Logout</button>
        <table class="table">
          <thead class="thead-dark">
            <tr class="table-headers">
              <th scope="col">ID</th>
              <th scope="col">email</th>
              <th scope="col">Token</th>
            </tr>
          </thead>
          <tbody>
            <tr class="table-rows">
              <th class="table-row">[{{ getUserID }}]</th>
              <td class="table-row table-row-username">{{ getUserEmail }}</td>
              <td class="table-row">{{ getAuthToken }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else>
        <h3>Sign Up!</h3>
        <form @submit="onSignUp" class="sign-up-form">
          <br/>
          <input type="email" class="sign-up-form-email" v-model="signUpEmail" placeholder="Email" />
          <br/>
          <br/>
          <input type="password" class="sign-up-form-password" v-model="signUpPassword" placeholder="Password" />
          <br/>
          <br/>
          <input type="text" id="universityTextbox" class="sign-up-form-password" v-model="signUpUniversity" @focus="universityFocused = true" @blur="universityFocused = false" placeholder="University" />
          <div class="border university-list" v-if="signUpUniversity !== '' && universityFocused">
            <div v-for="university in getUniversities" :key="university.id">
              <button type="button" @mousedown="setUniversity(university)" class="university-list-button" v-if="university.name.toLowerCase().startsWith(signUpUniversity.toLowerCase())">{{ university.name }}</button>
            </div>
          </div>
          <br>
          <br>
          <input type="submit" value="Sign Up" class="sign-up-form-submit" />
          <br>
        </form>

        <hr />
        <br />
        <h3>Login!</h3>
        <form @submit="onLogin" class="login-form">
          <br/>
          <input type="email" class="login-form-email" v-model="loginEmail" placeholder="Email" />
          <br/>
          <br/>
          <input type="password" class="login-form-password" v-model="loginPassword" placeholder="Password" />
          <br/>
          <br/>
          <input type="submit" value="Login" class="login-form-submit" />
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'SessionManager',
  computed: {
    ...mapGetters('sessionManager', ['getAuthToken', 'getUserEmail', 'getUserID', 'isLoggedIn']),
    ...mapGetters('universityManager', ['getUniversities'])
  },
  async mounted() {
    
  },
  data() {
    return {
      signUpEmail: '',
      signUpPassword: '',
      signUpUniversity: '',
      loginEmail: '',
      loginPassword: '',
      universityFocused: false,
      universityId: -1,
    }
  },
  methods: {
    ...mapActions('sessionManager', ['registerUser', 'loginUser', 'logoutUser', 'addUniversity']),
    async onSignUp(event) {
      event.preventDefault()
      if (this.universityId === -1) {
        var res = this.getUniversities.filter((data) => data.name === this.signUpUniversity)

        if (res.length == 0) {
          this.$swal('Must enter a valid University!')
          return
        }
        
        this.universityId = res[0].id
      }
      let data = {
        user: {
          email: this.signUpEmail,
          password: this.signUpPassword,
        },
      }
      await this.registerUser(data)
      let universityData = {
        user: {
          id: this.getUserID,
          university_id: this.universityId,
        }
      }
      this.addUniversity(universityData)
      this.resetData()
      if(this.getUserID !== null) {
        this.$router.push({ path: '/textbooks' })
      }
    },
    async onLogin(event) {
      event.preventDefault()
      let data = {
        user: {
          email: this.loginEmail,
          password: this.loginPassword
        },
      }
      this.resetData()
      try {
        await this.loginUser(data)
      }
      catch {
        this.$swal('Wrong Username or Password')
      }
      if(this.getUserID !== null) {
        this.$router.push({ path: '/textbooks' })
      }
    },
    resetData() {
      this.signUpEmail = ''
      this.signUpPassword = ''
      this.signUpUniversity = ''
      this.universityId = -1
      this.loginEmail = ''
      this.loginPassword = ''
    },
    setUniversity(university) {
      this.signUpUniversity = university.name
      this.universityId = university.id
    }
  },
}

</script>



<style scoped>
.sm-title {
  font-size: 2.5rem;
  font-weight: bold;
  text-align: center;
  font-family: "Lucida Handwriting", cursive;
  padding-bottom: 10px;
}
.container {
  width: 90%;
  margin: 0 auto;
}
.sm-card {
  width: 75%;
  padding: 20px;
  margin: 0 auto;
  border-radius: 10px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
  background-color: white;
}
.sign-up-form {
  width: 100%;
}
.sign-up-form-email {
  width: 55%;
  padding: 10px;
  margin: 0 auto;
  border-radius: 5px;
  border: 1px solid #ccc;
}
.sign-up-form-password {
  width: 55%;
  padding: 10px;
  margin: 0 auto;
  border-radius: 5px;
  border: 1px solid #ccc;
}
.sign-up-form-submit {
  width: 15%;
  padding: 1em;
  margin: 0 auto;
  border-radius: 5px;
  background-color: #1a77ce;
  color: #fff;
  border: none;
}
.sign-up-form-submit:hover {
  background-color: #0d5c8a;
  cursor: pointer;
}
.login-form {
  width: 100%;
}
.login-form-email {
  width: 55%;
  padding: 10px;
  margin: 0 auto;
  border-radius: 5px;
  border: 1px solid #ccc;
}
.login-form-password {
  width: 55%;
  padding: 10px;
  margin: 0 auto;
  border-radius: 5px;
  border: 1px solid #ccc;
}
.login-form-submit {
  width: 15%;
  padding: 1em;
  margin: 0 auto;
  border-radius: 5px;
  background-color: #1a77ce;
  color: #fff;
  border: none;
}
.login-form-submit:hover {
  background-color: #0d5c8a;
  cursor: pointer;
}
.logout-button {
  width: 15%;
  padding: 1em;
  margin: 0 auto;
  border-radius: 5px;
  background-color: #1a77ce;
  color: #fff;
  border: none;
}
.logout-button:hover {
  background-color: #0d5c8a;
  cursor: pointer;
}
.table-headers {
  background-color: #2b3b49;
  color: #fff;
  max-width: 90%;
  margin: 0 auto;
}
.table-rows {
  background-color: #f2f2f2;
  margin: 0 auto;
}
.table-row {
  word-break: break-all;
  text-align: center;
  padding: 10px;
}
.table-row-username {
  width: 30%;
}
.university-list {
  z-index: 999;
  border-radius: 5px;
  width: 25%;
  max-height: 400px;
  overflow-y: scroll;
  position: absolute;
}
.university-list-button {
  width: 100%;
  text-align: left;
}
</style>