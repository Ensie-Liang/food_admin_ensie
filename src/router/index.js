import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: ()=> import('../components/Login.vue') },
  {
    path: '/home',
    component: ()=> import('../views/Home.vue'),
    redirect: '/welcome',
    children: [
      { path: '/welcome', component: ()=> import('../components/Welcome.vue') },
      { path: '/users', component: ()=> import('../components/Users.vue') },
      { path: '/list', component: ()=> import('../components/List.vue') },
      { path: '/info', component: ()=> import('../components/Info.vue') },
      { path: '/order', component: ()=> import('../components/Order.vue') },
      { path: '/pinglun', component: ()=> import('../components/Pinglun.vue') },
      { path: '/luck', component: ()=> import('../components/Luck.vue') },
      { path: '/add', component: ()=> import('../components/add.vue') },
    ]
  }

]

const router = new VueRouter({
  routes
})

export default router
