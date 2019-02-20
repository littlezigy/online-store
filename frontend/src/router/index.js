import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/pages/Home'
import Cart from '@/pages/Cart'
import ViewProducts from '@/pages/Products'
import ProductDetail from '@/pages/ProductDetail'
import ConfirmOrder from '@/pages/COrder'
import ThankYou from '@/pages/ThankYou'
import UserDashboard from '@/pages/UserDashboard'

// Admin components
import Dashboard from '@/pages/admin/Dashboard'
import CreateProduct from '@/pages/admin/CreateProduct'
import EditProduct from '@/pages/admin/EditProduct'
import AdminViewProducts from '@/pages/admin/Products'

// Login
import Login from '@/pages/Login'
import AdminLogin from '@/pages/admin/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    }, {
      path: '/admin',
      name: 'Admin',

      component: Dashboard,

      children: [
        {
          path: 'createproduct',
          name: 'CreateProduct',
          component: CreateProduct
        }, {
          path: 'products',
          name: 'Products',
          component: AdminViewProducts
        }, {
          path: 'edit/:id',
          name: 'Edit',
          component: EditProduct
        }
      ]
    }, {
      path: '/products',
      name: 'Products',
      component: ViewProducts
    }, {
      path: '/view-product/:id',
      component: ProductDetail
    }, {
      path: '/cart',
      name: 'Cart',
      component: Cart
    }, {
      path: '/checkout',
      name: 'Checkout',
      component: ConfirmOrder
    },{
      path: '/login',
      name: 'Login',
      component: Login
    }, {
      path: '/dashboard',
      name: 'User Dashboard',
      component: UserDashboard
    }, {
      path: '/admin/login',
      name: 'AdminLogin',
      component: AdminLogin
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})