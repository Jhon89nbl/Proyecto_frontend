import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const urlServer = "http://localhost:3000/";

export default new Vuex.Store({
  state: {
    productos:[]
  },
  mutations: {
    setProductos(state, payload){
      state.productos = payload;
    }
  },
  actions: {
    async cargarProductos({commit}){
      const peticion = await fetch(urlServer + "producto");
      //Obtener datos de la peticion
      const data = await peticion.json();
      console.log(data);
      commit('setProductos', data);
    },
    //metodo para crear un producto
    async crearProducto({ commit }, objProducto){
      await fetch(urlServer + "producto",{
        method: 'POST',
        headers:{
          'Content-Type':'application/json'
        },
        //asinar objeto json
        body: JSON.stringify(objProducto)
      });
    },
    async eliminarProducto({commit},obj){
      await fetch(urlServer + "producto",{
        method: 'DELETE',
        headers:{
          'Content-Type':'application/json'
        },
        body: JSON.stringify(obj)
      })

      
    },
    async actualizarProducto({commit},objProducto){
      await fetch(urlServer + "producto",{
        method: 'PUT',
        headers:{
          'Content-Type':'application/json'
        },
        body: JSON.stringify(objProducto)
      })
    }
  },
  modules: {
  }
})
