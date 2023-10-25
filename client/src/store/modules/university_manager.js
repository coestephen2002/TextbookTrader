
const API_URL = 'http://localhost:3000/universities'

var res = await fetch(API_URL)
const universities_data = await res.json()

const STATE = {
  universities: universities_data
}
const GETTERS = {
  getUniversities(state) {
    return state.universities
  }
}

export default {
  namespaced: true,
  state: STATE,
  getters: GETTERS
}