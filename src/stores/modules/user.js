import axios from 'axios';

function initData() {
    return {
       id: null,
       nombre: null,
       apellido: null,
       telefono: null,
       email: null,
       usuario: null,
       password: null,

       rol:1,
       created_at: null,
       updated_at: null,
    };
 }
 
export default {
    namespaced: true,
    state: {
       usuarios: [],
       usuario: {
        id: null,
        nombre: null,
        apellido: null,
        telefono: null,
        email: null,
        usuario: null,
        password: null,
        rol: 1,
        created_at: null,
        updated_at: null,
       },
       loading: false,
       notFoundRecords: false,
    },
    getters: {
        usuarios: (state) => state.usuarios,
        usuario: (state) => state.usuario,
        loading: (state) => state.loading,
        notFoundRecords: (state) => state.notFoundRecords,
    },
    mutations: {
        SET_USERS(state, users) {
            state.usuarios = users;
         },
         SET_USER(state, user) {
            state.usuario = user;
         },
        SET_LOADING(state, loading) {
           state.loading = loading;
        },
        SET_NOT_FOUND_RECORDS(state, notFoundRecords) {
           state.notFoundRecords = notFoundRecords;
        },
        RESET_STATE(state) {
           state.usuario = Object.assign(state.usuario, initData());
        },
    },
    actions: {
        resetState({ commit }) {
           commit("RESET_STATE");
        },
  
        //Este metodo debe traer el listado de las categorias de tienda
        async index({ commit }) {
           commit("SET_LOADING", true);
  
           try {
              const { data } = await axios.get("api/usuarios");
              if (data.usuarios.length === 0) {
                 commit("SET_NOT_FOUND_RECORDS", true);
              }
              commit("SET_USERS", data.usuarios);
              commit("SET_LOADING", false);
           } catch (e) {
              commit("SET_LOADING", false);
           }
        },
        usuario({ commit, state }) {
         return axios.post(
            "api/usuarios/create",
            state.usuario
            );
         },
         delete({}, id) {
            return axios.delete("api/usuarios/delete/" + id);
         },
     }
}