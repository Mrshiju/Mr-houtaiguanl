
import Vue from 'vue'
import Router from 'vue-router'

const Login = () =>import('@/components/login')
const Home = () =>import('@/components/home')
const users = () =>import('@/components/user')
const rights = () =>import('@/components/right')
const roles = () =>import('@/components/roles')
const reports = () =>import('@/components/reports')
const orders = () =>import('@/components/order')
const scate = () =>import('@/components/goodscate')
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path:'/home',
      name:'home',
      component:Home,children:[{
        path:'/users',
        name:'users',
        component:users
      },{
        path:'/rights',
        name:'rights',
        component:rights
      },{
        path:'/roles',
        name:'roles',
        component:roles
      },{
        path:'/reports',
        name:'reports',
        component:reports
      },{
        path:'/orders',
        name:'orders',
        component:orders
      },{
        path:'/categories',
        name:'categories',
        component:scate
      }]
    }
  ]
})
