import axios from 'axios'

const API_URL = 'http://localhost:3000/textbooks/'

var res = await fetch(API_URL)
const textbooks_data = await res.json()

res = await fetch(`${API_URL}explore`)
const textbooks_with_user_data = await res.json()

const STATE = {
  textbooks: textbooks_data,
  textbooks_with_user: textbooks_with_user_data
}
const GETTERS = {
  getTextbooks(state) {
    return state.textbooks
  },
  getTextbooksWithUser(state) {
    return state.textbooks_with_user
  }
}
const ACTIONS = {
  async createTextbook({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${API_URL}`, payload)
        .then((response) => {
          commit('createTextbookMutation', response)
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  async updateTextbook({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .patch(`${API_URL}${payload.textbook.id}`, payload)
        .then((response) => {
          commit('updateTextbookMutation', response)
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  async deleteTextbook({ commit }, id) {
    return new Promise((resolve, reject) => {
      axios
        .delete(`${API_URL}/${id}`)
        .then((response) => {
          commit('deleteTextbookMutation', id)
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },  
}
const MUTATIONS = {
  async createTextbookMutation(state, data) {
    state.textbooks.push(data.data)
    res = await fetch(`${API_URL}explore`)
    const response = await res.json()
    state.textbooks_with_user = response
  },
  async updateTextbookMutation(state, data) {
    console.log(data.data)
    const index = state.textbooks.findIndex(textbook => textbook.id === data.data.id)
    state.textbooks[index] = data.data
    res = await fetch(`${API_URL}explore`)
    const response = await res.json()
    state.textbooks_with_user = response
  },
  async deleteTextbookMutation(state, id) {
    state.textbooks = state.textbooks.filter(textbook => textbook.id !== id)
    res = await fetch(`${API_URL}explore`)
    const response = await res.json()
    state.textbooks_with_user = response
  }
}
export default {
  namespaced: true,
  state: STATE,
  getters: GETTERS,
  actions: ACTIONS,
  mutations: MUTATIONS
}
