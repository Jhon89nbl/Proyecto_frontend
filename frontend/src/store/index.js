import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const urlServer = "http://localhost:3000/";

export default new Vuex.Store({
  state: {
    productos: []
  },
  mutations: {
    setProductos(state, payload){
      state.productos = payload;
    }
  },
  actions: {
    async cargarProductos({commit}){
      const peticion = await fetch(urlServer+ "producto");
    //Obtener los datos de la peticion
      const data = await peticion.json();
      console.log(data);
      commit('setProductos', data);
    },

    //Metodo para crear un producto
    async crearProducto({commit}, objProducto){
      await fetch(urlServer + "producto", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify(objProducto)
      });
    },

    //Metodo para conectar con la api de eliminar un producto
    async eliminarProducto({commit}, obj){
      await fetch(urlServer + "producto", {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify(obj)
      })
    },

    //Metodo para conectar con la api de actualizar un producto
    async actualizarProducto({commit}, objProducto){
      await fetch(urlServer + "producto", {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(objProducto)
      });
    }
  },
  modules: {
  }
})

