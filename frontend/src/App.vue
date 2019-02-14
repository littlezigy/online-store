<template>
  <div>
    <nav class = 'navbar is-dark'>
        <div class = 'navbar-brand' style = 'padding : 0 0.5em'>
          <router-link to = '/'> <img src = "@/assets/logo.png" width = 80></router-link>
          <a role = 'button' class = 'navbar-burger burger' target = 'mainmenu' @click = 'expandmenu()'>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>
          <div class = 'navbar-menu' v-bind:class = "{'is-active': isactive}" id = 'mainmenu'>
            <div class = 'navbar-end'>
              <!-- Navigation links -->
              <router-link to = '/' class = 'navbar-item'>Home</router-link>
              <router-link v-if='showlogin' to = '/login' class = 'navbar-item'>Login</router-link>
              <router-link to = '/products' class = 'navbar-item'>Products</router-link>
              <router-link to = '/cart' class = 'navbar-item'>Cart</router-link>
              <router-link v-if='showlogin' to = '/admin/login' class = 'navbar-item'>Admin</router-link>
            </div>
          </div>
    </nav>

    <!-- Route Outlet -->
    <router-view></router-view>
    <footer class = 'footer'>
      <div>
        <h3 class = 'strong'>My Account</h3>
        <p><router-link to = '/cart'>View Cart</router-link></p>
      </div>
      <div>
        <p>Zigy store is a fantasy store. We have sourced and gotten every magical item that has ever existed.</p>
        <p style = 'text-align: center; margin-top: 4em;'>
          <router-link to = '/admin/login'>Admin? Log in here</router-link></p>
          <h3>{{footerwelcome}}</h3>
          <button @click = 'logout()'>Logout</button>
      </div>
    </footer>
  </div>
</template>

<script>
import {api} from './gateways/api'
export default {
  name: 'home',
  data () {
    return {
      isactive: false,
      footerwelcome: "",
      showlogin: true
    }
  },
  methods: {
    expandmenu: function() {
      this.isactive = !this.isactive
    },
    logout() {
      api.get('/user/logout');
      self = this;
      window.sessionStorage.clear();
      window.location.reload();
    },

    getcartid: function() {
      if(window.sessionStorage.cartid != undefined) {
        console.log('Cart id is ', window.sessionStorage.cartid);
      } else {
        api.get('/getcartid').
          then(response => 
            {window.sessionStorage.cartid = response.data.id;})
      }
    }
  },

  created () {
    this.isactive = false;
    this.getcartid();

    if(window.sessionStorage.uname != undefined ) {
        console.log("You're logged in");
        window.sessionStorage.unameCaps = window.sessionStorage.uname.toUpperCase();
        this.footerwelcome = 'Welcome ' + window.sessionStorage.unameCaps;
        this.showlogin = false;
    } else {
        this.footerwelcome = "You're not logged in.";
        this.showlogin = true;
    }
  }
}
// eslint-disable-indent
</script>

<style>
footer {
  text-align: center;
}
.container {
  padding: 1em 3em;
}
</style>