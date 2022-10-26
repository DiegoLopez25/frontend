import {createStore} from "vuex";

import auth from "./modules/auth"
import storeCategory from "./modules/storeCategory"
import user from "./modules/user"

const store = createStore({

  state:{
    errors: [],
  },

  getters : {
    errors: state => state.errors
  },

  mutations: {
    SET_ERRORS(state, errors) {
      state.errors = errors
    }
  },

  actions: {

  },

  modules: {
    auth,
    storeCategory,
    user,
  }

})

export default store;
