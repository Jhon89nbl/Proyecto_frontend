import Vue from 'vue'
import VueRouter from 'vue-router'
import Principal from '../views/Principal.vue';
//import Administrador from '../views/Administrador.vue';
//import Cliente from '../views/Cliente';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Principal',
    component: Principal
  },
  {
    path: '/administrador',
    name: 'Administrador',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Administrador.vue')
  },
  {
    path: '/cliente',
    name: 'Cliente',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Cliente.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
