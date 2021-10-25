import Vue from 'vue'
import VueRouter from 'vue-router'
import principal from '../views/Principal.vue';


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'principal',
    component: principal
  },
  {
    path: '/producto',
    name: 'producto',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/producto.vue')
  },
  {
    path: '/cliente',
    name: 'cliente',
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
