import axios from 'axios'

const API_URL = 'http://localhost:3000/textbooks/'
const res = await fetch(API_URL)
const payload = await res.json()

const STATE = {
  textbooks: payload
}
const GETTERS = {
  getTextbooks(state) {
    return state.textbooks
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
  createTextbookMutation(state, data) {
    state.textbooks.push(data.data)
  },
  updateTextbookMutation(state, data) {
    console.log(data.data)
    const index = state.textbooks.findIndex(textbook => textbook.id === data.data.id)
    state.textbooks[index] = data.data
  },
  deleteTextbookMutation(state, id) {
    state.textbooks = state.textbooks.filter(textbook => textbook.id !== id)
  }
}
export default {
  namespaced: true,
  state: STATE,
  getters: GETTERS,
  actions: ACTIONS,
  mutations: MUTATIONS
}
