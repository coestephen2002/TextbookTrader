import axios from 'axios'
import router from '../../router.js'

const BASE_URL = 'http://localhost:3000/'

const STATE = {
  auth_token: null,
  user: {
    id: null,
    username: null,
    email: null,
    university_id: null,
  },
}
const GETTERS = {
  getAuthToken(state) {
    return state.auth_token
  },
  getUserEmail(state) {
    return state.user?.email
  },
  getUserID(state) {
    return state.user?.id
  },
  getUserUniversityID(state) {
    return state.user?.university_id
  },
  isLoggedIn: state => state.auth_token !== null && state.auth_token !== JSON.stringify(null) && state.user !== null
}
const ACTIONS = {
  async registerUser({ commit }, payload) {
    await new Promise((resolve, reject) => {
      axios
        .post(`${BASE_URL}users`, payload)
        .then((response) => {
          commit('setUserInfo', response)
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  async addUniversity({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .patch(`${BASE_URL}user/${payload.user.id}`, payload)
        .then((response) => {
          commit('setUserUniversity', response)
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  async loginUser({ commit }, payload) {
    console.log(payload)
    await new Promise((resolve, reject) => {
      axios
        .post(`${BASE_URL}users/sign_in`, payload)
        .then((response) => {
          commit('setUserInfo', response)
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  async logoutUser({ commit }) {
    try {
      await axios.delete(`${BASE_URL}users/sign_out`, {
        headers: {
          Authorization: STATE.auth_token
        }
      })
      commit('resetUserInfo')
    } catch (error) {
      console.error('Logout error:', error)
      throw error
    }
    router.push({ path: '/' })
  },  
  async loginUserWithToken({ commit }, payload) {
    const config = {
      headers: {
        authorization: payload.auth_token,
      },
    }
    new Promise((resolve, reject) => {
      axios
        .get(`${BASE_URL}member-data`, config)
        .then((response) => {
          commit('setUserInfoFromToken', response)
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
}
const MUTATIONS = {
  setUserInfo(state, data) {
    state.user = data.data.user
    state.auth_token = data.headers.authorization
    axios.defaults.headers.common['Authorization'] = data.headers.authorization
    localStorage.setItem('auth_token', data.headers.authorization)
  },
  setUserUniversity(state, data) {
    state.user.university_id = data.data.user.university_id
  },
  setUserInfoFromToken(state, data) {
    state.user = data.data.user
    state.auth_token = localStorage.getItem('auth_token')
  },
  resetUserInfo(state) {
    state.user = {
      id: null,
      username: null,
      email: null,
    }
    state.auth_token = null
    localStorage.removeItem('auth_token')
    axios.defaults.headers.common['Authorization'] = null
  },
}
export default {
  namespaced: true,
  state: STATE,
  getters: GETTERS,
  actions: ACTIONS,
  mutations: MUTATIONS,
}