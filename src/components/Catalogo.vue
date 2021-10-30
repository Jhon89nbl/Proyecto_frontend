<template>
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
    <h1>Catalogo</h1>
    <div id="contProductos">
    <div  v-for="objProducto in productos" :key="objProducto._id" >
        <div class="card" style="width: 18rem;">
            <img id="img1" 
            :src="objProducto.urlImagen"
            :alt="objProducto.nombre"
            />
            <div class="card-body">
            <h5 class="card-title">{{objProducto.nombre}}</h5>
            <p class="card-text">{{ objProducto.descripcion}}</p>
            <p class="card-text">{{ objProducto.precio}}</p>
            
            </div>
        </div>
    </div>
    </div>


  </div>
</template>

<script>
import store from '../../frontend/src/store'
export default {
    methods:{

    },

    created:() =>{
        store.dispatch("cargarProductos")
    },
    computed:{
        productos: () => {
            return store.state.productos;
        }
    }

}
</script>

<style>
#contProductos {
    display: grid;
    grid-template-columns: repeat(3, 3fr);
    grid-template-rows: 200px 75px;
    column-gap: 20px;
    row-gap: 50px;
    align-content: center;

}

#img1{
    width: 200px;
    
}
.card{
    align-items: center;
    height: 350px;
}
</style>