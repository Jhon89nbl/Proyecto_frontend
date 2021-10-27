<template>
  <div>
    <div>
      <nav class="navbar navbar-dark bg-dark navbar-expand-sm">
      <!-- Navbar content -->
      <div class="container-fluid">
        <a class="navbar-brand" href="#">
            <img src="../assets/logoP.png" alt="Logo de la pagina" width="50" height="50" class="d-inline-block align-text-center">
            Aeroespacial Co
        </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
       <span class="navbar-toggler-icon"></span>
      </button>
          <div class="collapse navbar-collapse" id="navbarScroll">
            <ul class="navbar-nav ms-3">
                <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="/">Inicio</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/administrador">Producto</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/cliente">Catalogo</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link disabled">Noticias</a>
                </li>
            </ul>
        </div>
    </div>
    </nav>
    </div>
    
    <h1>Productos</h1>
    
    <div>
      <!--Fila para el nombre y precio del producto-->
      <div id="formulario1">
        <form id="formulario">
          <input
            id="nombre"
            class="form-control form-control-sm"
            type="text"
            placeholder="Nombre Producto"
            aria-label=".form-control-lg example"
            v-model="nombre"
          />
          <input
            id="precioP"
            class="form-control form-control-sm"
            type="number"
            placeholder="Precio"
            aria-label="default input example"
            v-model="precio"
          />
          <select
            v-model="categoria"
            id="categoria"
            class="form-select form-select-sm"
            aria-label="Default select example"
          >
            <option selected value="null">Seleccione la categoria</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
          <input
            id="Descripcion"
            class="form-control form-control-sm"
            type="text"
            placeholder="Descripcion"
            aria-label=".form-control-sm example"
            v-model="descripcion"
          />
          <input
            id="urlImagen"
            class="form-control form-control-sm"
            type="text"
            placeholder="url Imagen"
            aria-label=".form-control-sm example"
            v-model="urlImagen"
          />
        </form>
      </div>
      &nbsp;
      <div>
        <button v-if="id == null" type="button" class="btn btn-success" @click="btnRegistrar">Registrar</button>
        &nbsp;
        <button v-if="id!=null" type="button" class="btn btn-secondary" @click="limpiarCampos">Cancelar</button>
        &nbsp;
        <button v-if="id!=null" type="button" class="btn btn-warning" @click="btnActualizar">Actualizar</button>
        
      </div>
    </div>

    <table class="table table-striped table-hover">
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
      <tbody>
        <tr v-for="objProducto in productos" :key="objProducto._id">
          <td>
            <img
              :src="objProducto.urlImagen"
              class="avatar img-thumbnail rounded mx-auto d-block"
              :alt="objProducto.nombre"
            >
          </td>
          <td>{{ objProducto.nombre }}</td>
          <td>{{ objProducto.precio }}</td>
          <td>{{ objProducto.categoria }}</td>
          <td>{{ objProducto.descripcion }}</td>
          <td>
            <!----Editar--->
            <button type="button" class="btn btn-primary" @click="btnEditar(objProducto)">Editar</button>
            &nbsp;
            <!----Eliminar--->
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
        store.dispatch('crearProducto', objProducto).then(() => {
            this.limpiarCampos();
            store.dispatch("cargarProductos");
                });
            }
        },
        limpiarCampos(){
            this.nombre = null;
            this.precio = null;
            this.categoria = null;
            this.descripcion = null;
            this.urlImagen = null;
            this.id = null;
        },

        btnEliminar(id) {
            let obj = {
                id: id,
            };
        store.dispatch("eliminarProducto", obj).then(() => {
            store.dispatch("cargarProductos");
        });
        },
        btnEditar(objProducto){
            this.nombre = objProducto.nombre;
            this.precio = objProducto.precio;
            this.categoria = objProducto.categoria;
            this.descripcion = objProducto.descripcion;
            this.urlImagen = objProducto.urlImagen;
            this.id = objProducto._id;
        },
        btnActualizar(){
            let objProducto = {
                id: this.id,
                nombre: this.nombre,
                precio: this.precio,
                categoria: this.categoria,
                descripcion: this.descripcion,
                urlImagen:this.urlImagen
            }
            store.dispatch('actualizarProducto', objProducto).then(()=>{
                this.limpiarCampos();
                store.dispatch("cargarProductos",)
            });
        },
        goCategoria(){
            this.$router.push('/categoria');

        }
    },
        created: () => {
        //llamar las accione sdel store
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
.avatar{
    height: 80px;
    width: 80px;
}
#formulario1 {
    background-color: mediumblue;
}
#formulario {
    display: inline-block;
    width: 90%;
}
#nombre {
    background-color: aqua;
    opacity: 90%;
}
</style>