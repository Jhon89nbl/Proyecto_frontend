<template>
  <div>
    <br />
    <header>
      <h1>Registrar Productos</h1>
    </header>
    <br />
    <br />
    <br />
    <!----Formulario para capturar datos de nuevo producto--->
    <div>
      <form id="form">
        <div class="row">
          <!---Nombre del Producto--->
          <div class="col-8 mb-3">
            <input
              type="text"
              class="form-control"
              id="nombre"
              placeholder="Nombre del Producto"
              v-model="nombre"
              required
            />
          </div>
          <!---Precio del Producto--->
          <div class="col-4 mb-3">
            <input
              type="number"
              class="form-control"
              id="precio"
              placeholder="Precio del Producto"
              v-model="precio"
              required
            />
          </div>
        </div>
        <!---Categoria del Producto--->
        <div class="row">
          <!---Imagen del Producto--->
          <div class="col-8 mb-3">
            <input
              type="text"
              class="form-control"
              id="urlImagen"
              placeholder="Ingrese la url Imagen el Producto"
              v-model="urlImagen"
              required
            />
          </div>
          <!---select del Producto--->
          <div class="col-4 mb-3">
            <select
              v-model="categoria"
              class="form-select"
              aria-label="Default select example"
              required
            >
              <option selected value="null">Categoria</option>
              <option value="Mecanicos">Mecanicos</option>
              <option value="Electricos">Electricos</option>
              <option value="Hidraulicos">Hidraulicos</option>
            </select>
          </div>
        </div>
        <div class="row">
          <!---Descripcion del Producto--->
          <div class="mb-3">
            <input
              type="text"
              class="form-control"
              id="descripcion"
              placeholder="Describa el Producto"
              v-model="descripcion"
              required
            />
          </div>
        </div>
        <!--Boton registrar producto-->
        <button v-if="bandera == true" type="button" class="btn btn-success" @click="btnRegistrar">
          Registrar
        </button>
        &nbsp;
        <!--Boton actualizar-->
        <button v-if="bandera == false" type="button" class="btn btn-secondary" @click="btnACtualizar">
          Actualizar
        </button>
        &nbsp;
        <!--Boton cancelar-->
        <button v-if="bandera == false" type="button" class="btn btn-dark" @click="limpiarCampos">
          Cancelar
        </button>
      </form>
      <br />
      <br />
      <br />
      <div id="tabla">
        <table class="table table-dark table-striped table-hover">
          <!----cabecera de la tabla----->
          <thead>
            <tr>
              <th scope="col">Imagen</th>
              <th scope="col">Nombre</th>
              <th scope="col">Precio</th>
              <th scope="col">Categoria</th>
              <th scope="col">Descripcion</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <!----cuerpo de la tabla----->
          <tbody>
            <tr v-for="objProducto in productos" :key="objProducto._id">
              <td id="imgTabla">
                <img
                  :src="objProducto.urlImagen"
                  class="avatar img-thumbnail rounded mx-auto d-block"
                  :alt="objProducto.nombre"
                />
              </td>
              <td>{{ objProducto.nombre }}</td>
              <td>{{ objProducto.precio }}</td>
              <td>{{ objProducto.categoria }}</td>
              <td>{{ objProducto.descripcion }}</td>
              <td id="botones">
                <!--Editar-->
                <button
                  type="button"
                  class="btn btn-success"
                  @click="btnEditar(objProducto)"
                >
                  Editar
                </button>
                &nbsp;
                <!--Eliminar-->
                <button
                  type="button"
                  class="btn btn-danger"
                  @click="btnEliminar(objProducto._id)"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import store from "../store/index.js";

export default {
  data: () => {
    return {
      nombre: null,
      precio: null,
      categoria: null,
      descripcion: null,
      urlImagen: null,
      id: null,
      bandera: true,
    };
  },
  methods: {
    btnRegistrar() {
      if (
        this.nombre != null &&
        this.precio != null &&
        this.categoria != null &&
        this.descripcion != null &&
        this.urlImagen != null
      ) {
        let objProducto = {
          nombre: this.nombre,
          precio: this.precio,
          categoria: this.categoria,
          descripcion: this.descripcion,
          urlImagen: this.urlImagen,
        };
        store.dispatch("crearProducto", objProducto).then(() => {
          this.limpiarCampos();
          store.dispatch("cargarProductos");
        });
      }
    },
    limpiarCampos() {
      this.nombre = null;
      this.precio = null;
      this.categoria = null;
      this.descripcion = null;
      this.urlImagen = null;
      this.id = null;
      this.bandera = true;
    },
    btnEliminar(id) {
      let obj = {
        id: id,
      };
      store.dispatch("eliminarProducto", obj).then(() => {
        store.dispatch("cargarProductos");
      });
    },
    btnEditar(objProducto) {
      this.nombre = objProducto.nombre;
      this.precio = objProducto.precio;
      this.categoria = objProducto.categoria;
      this.descripcion = objProducto.descripcion;
      this.urlImagen = objProducto.urlImagen;
      this.id = objProducto._id;
      this.bandera = false;
    },
    btnACtualizar(){
        let objProducto = {
            id: this.id,
            nombre: this.nombre,
            precio: this.precio,
            categoria: this.categoria,
            descripcion: this.descripcion,
            urlImagen: this.urlImagen,
        }
        store.dispatch('actualizarProducto' , objProducto).then(()=>{
            this.limpiarCampos();
            store.dispatch("cargarProductos");
        })
    }
  },
  created: () => {
    store.dispatch("cargarProductos");
  },
  computed: {
    productos: () => {
      return store.state.productos;
    },
  },
};
</script>

<style>
header {
    display: block;
  padding: 50px;
  background-color: rgba(33, 37, 41, 255);
  color: white;
}
#form {
    margin-left: 60px;
    margin-right: 60px;
}
#tabla {
    margin-left: 30px;
    margin-right: 30px;
}
#botones{
    padding: 1%;
    justify-content: center;
}
#imgTabla{
    justify-content: center;
}
.avatar {
  height: 90px;
  width: 150px;
}
</style>