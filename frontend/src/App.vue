<template>
  <div>
    <section id = "banner">
      <div class = 'hero-head'>
        <nav class = 'navbar'>
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
              <router-link to = '/' class = 'navbar-item is-size-5'>Home</router-link>
              <router-link v-if='showlogin' to = '/login' class = 'navbar-item is-size-5'>Login</router-link>
              <router-link to = '/products' class = 'navbar-item is-size-5'>Products</router-link>
              <router-link to = '/cart' class = 'navbar-item is-size-5'>Cart</router-link>
              <router-link v-if='showlogin' to = '/admin/login' class = 'navbar-item is-size-5'>Admin</router-link>
            </div>
          </div>
        </nav>
      </div>
    </section>

    <!-- Route Outlet -->
    <router-view></router-view>

    <footer class = 'footer'>
      <div>
        <h3 class = 'strong'>My Account</h3>
        <p><router-link to = '/cart'>View Cart</router-link></p>
      </div>
      <div>
        <p>Zigy store is a fantasy store. We have sourced and gotten every magical item that has ever existed.</p>

        <h3 style = "margin-top: 1em;">{{footerwelcome}}</h3>
        <router-link to = '/login' v-if = 'showlogin'>Login</router-link>
        <button v-else @click = 'logout()'>Logout</button>

          <p style = 'text-align: center; margin-top: 3em;'>
            <router-link to = '/admin/login' v-if = 'showlogin'>Admin? Log in here</router-link>
          </p>
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
      showlogin: true,
      heromessage: '',
      herosubtitle: ''
    }
  },
  props: {
    banner: ''
  },
  methods: {
    expandmenu: function() {
      this.isactive = !this.isactive
    },
    logout: function() {
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
.grid {
    display: grid;
    grid-gap: 2em;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    padding: 2em 10%;
}

footer {
  text-align: center;
}
.container {
  padding: 1em 3em;
}
.none {
  display: none;
}
</style>